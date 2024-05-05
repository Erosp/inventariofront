import '../css/Citas.css'
import { useState, useEffect } from "react";
import axios from "axios";

function Citas() {
    const [citas, setCitas] = useState([]);
    const [cliente, setCliente] = useState("");
    const [motivo, setMotivo] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [id, setId] = useState("");
    const [busqueda, setBusqueda] = useState([]);

    useEffect(() => {
        getCitas();
    }, []);

    const getCitas = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/cita');
        setCitas(respuesta.data);
    }

    const bindDatos = cit =>{
        setCliente(cit.nombre_usuario);
        setMotivo(cit.motivo_cita);
        setId(cit.id_cita);
    }

    const atenderCita = () => {
        let datos = { 
            motivo: motivo,
            diagnostico: diagnostico,
            id: id
        };

        axios.post("http://localhost:3005/api/cita/atender", datos)
            .then(response => {
                document.getElementById("cerrarModalAtender").click();
                alert("Guardado");
                getCitas();
            });
    }

    const marcarCitaPerdida = () => {
        axios.put("http://localhost:3005/api/cita/perder/"+id)
            .then(response => {
                document.getElementById("cerrarModalPerder").click();
                alert("Guardado");
                getCitas();
            });
    }

    const buscar = async(texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto == ""){
            respuesta = await axios.get('http://localhost:3005/api/cita');
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/cita/buscar/' + texto);
        }
        setCitas(respuesta.data);
    }

    function formatearFecha(fecha) {
        let f = new Date(fecha);
        let dia = f.getDate();
        let mes = (f.getMonth() + 1);
        if(dia<10){
            dia = "0" + dia;
        }
        if(mes<10){
            mes = "0" + mes;
        }
        return dia + "-" + mes + "-" + f.getFullYear();
    }

    function formatearHora(fecha){
        let f=new Date(fecha);
        let hora = f.getHours();
        let minuto = f.getMinutes();
        if(hora<10){
            hora = "0" + hora;
        }
        if(minuto<10){
            minuto = "0" + minuto;
        }
        return hora+":"+minuto;
    }

    return (
        <div className="row d-flex align-items-center">
            <div className="col-8">
                <h1 className="mb-0">Citas</h1>
            </div>
            <div className="col-4 d-flex">
                <input type="text" className="form-control" value={busqueda} onChange={(e) => buscar(e.target.value)} placeholder="Filtrar" />
            </div>
            <div className='col-12 mt-3'>
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-verde">
                            <th className="bg-verde text-white text-center" scope="col">Nombre Cliente</th>
                            <th className="bg-verde text-white text-center" scope="col">Fecha</th>
                            <th className="bg-verde text-white text-center" scope="col">Hora</th>
                            <th className="bg-verde text-white text-center" scope="col">Estado</th>
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {citas.map(cit => (
                            <tr key={cit.id_cita} className="align-middle">
                                <td>{cit.nombre_usuario}</td>
                                <td className="text-center">{formatearFecha(cit.fecha_cita)}</td>
                                <td className="text-center">{formatearHora(cit.fecha_cita)}</td>
                                <td>{cit.status_cita}</td>
                                <td className="text-center">
                                    <button type="button" className="btn btn-success me-2" onClick={() => bindDatos(cit)} data-bs-toggle="modal" data-bs-target="#modalAtender">
                                        <img className="img-btn" src={ localStorage.getItem("tipo")=="vete"? "../img/editar.png":"img/editar.png" } />
                                    </button>
                                    <button type="button" className="btn bg-rojo ms-2" onClick={() => bindDatos(cit)} data-bs-toggle="modal" data-bs-target="#modalPerdida">
                                        <img className="img-btn" src={ localStorage.getItem("tipo")=="vete"? "../img/borrar.png":"img/borrar.png" } />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <div className="modal fade" id="modalAtender" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Atender Cita : {cliente}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Motivo</label>
                                <input type="text" className="form-control" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                            </div>
                            <div>
                                <label>Diagnostico</label>
                                <input type="text" className="form-control" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={atenderCita}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAtender" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalPerdida" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Marcar Cita Perdida: {cliente}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea Marcar Como Perdida la Cita {cliente}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={marcarCitaPerdida}>Marcar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalPerder" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Citas;