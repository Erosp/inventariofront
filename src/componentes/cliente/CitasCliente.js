import '../css/Citas.css'
import { useState, useEffect } from "react";
import axios from "axios";

function CitasCliente() {
    const [citas, setCitas] = useState([]);
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");
    const [minFecha, setMinFecha] = useState(formatearFecha2(new Date()));
    const [idMascota, setIdMascota] = useState("");
    const [mascotas, setMascotas] = useState([]);
    const [id, setId] = useState("");
    const [busqueda, setBusqueda] = useState("");

    const [desactivar8, setDesactivar8] = useState("");
    const [desactivar9, setDesactivar9] = useState("");
    const [desactivar10, setDesactivar10] = useState("");
    const [desactivar11, setDesactivar11] = useState("");
    const [desactivar12, setDesactivar12] = useState("");
    const [desactivar13, setDesactivar13] = useState("");
    const [desactivar14, setDesactivar14] = useState("");
    const [desactivar15, setDesactivar15] = useState("");
    const [desactivar16, setDesactivar16] = useState("");
    const [desactivar17, setDesactivar17] = useState("");
    const [desactivar18, setDesactivar18] = useState("");

    useEffect(() => {
        getCitas();
        getMascotas();
    }, []);

    const getCitas = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/cita/cliente/' + localStorage.getItem("id"));
        setCitas(respuesta.data);
    }

    const getMascotas = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/mascota/' + localStorage.getItem("id"));
        setMascotas(respuesta.data);
    }

    const bindDatos = cit =>{
        setFecha(formatearFecha2(cit.fecha_cita));
        setHora(formatearHora(cit.fecha_cita));
        setMotivo(cit.motivo_cita);
        setIdMascota(cit.id_mascota);
        setId(cit.id_cita);
    }

    const cleanDatos = () =>{
        setFecha("");
        setHora("");
        setMotivo("");
        setIdMascota("");
        setId("");
    }

    const guardarCitaAgregar = () => {
        let datos = { 
            fecha: fecha + " " + hora,
            motivo: motivo,
            id_mascota: idMascota
        };

        axios.post("http://localhost:3005/api/cita", datos)
            .then(response => {
                document.getElementById("cerrarModalAgregar").click();
                alert("Guardado");
                getCitas();
            });
    }

    const guardarCitaEditar = () => {
        let datos = { 
            fecha: fecha + " " + hora,
            motivo: motivo,
            id_mascota: idMascota
        };

        axios.put("http://localhost:3005/api/cita/"+id, datos)
            .then(response => {
                document.getElementById("cerrarModalEditar").click();
                alert("Guardado");
                getCitas();
            });
    }

    const cancelarCita = () => {
        axios.put("http://localhost:3005/api/cita/cancelar/"+id)
            .then(response => {
                document.getElementById("cerrarModalEliminar").click();
                alert("Guardado");
                getCitas();
            });
    }

    const buscar = async(texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto == ""){
            respuesta = await axios.get('http://localhost:3005/api/cita/cliente/' + localStorage.getItem("id"));
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/cita/cliente/' + localStorage.getItem("id") + '/buscar/' + texto);
        }
        setCitas(respuesta.data);
    }

    const consultarFecha = (f) => {
        let datos = {
            fecha: f
        };

        axios.post("http://localhost:3005/api/cita/verificar", datos)
            .then(response => {
                setDesactivar8("");
                setDesactivar9("");
                setDesactivar10("");
                setDesactivar11("");
                setDesactivar12("");
                setDesactivar13("");
                setDesactivar14("");
                setDesactivar15("");
                setDesactivar16("");
                setDesactivar17("");
                setDesactivar18("");

                for(let i=0; i<response.data.length; i++){
                    let hora = new Date(response.data[i].fecha_cita).getHours();
                    if(hora == 8){
                        setDesactivar8("disabled");
                    }
                    else if(hora == 9){
                        setDesactivar9("disabled");
                    }
                    else if(hora == 10){
                        setDesactivar10("disabled");
                    }
                    else if(hora == 11){
                        setDesactivar11("disabled");
                    }
                    else if(hora == 12){
                        setDesactivar12("disabled");
                    }
                    else if(hora == 13){
                        setDesactivar13("disabled");
                    }
                    else if(hora == 14){
                        setDesactivar14("disabled");
                    }
                    else if(hora == 15){
                        setDesactivar15("disabled");
                    }
                    else if(hora == 16){
                        setDesactivar16("disabled");
                    }
                    else if(hora == 17){
                        setDesactivar17("disabled");
                    }
                    else if(hora == 18){
                        setDesactivar18("disabled");
                    }
                }
            });
    }

    const cambioFecha = (f) => {
        setFecha(f); 
        consultarFecha(f);
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

    function formatearFecha2(fecha) {
        let f = new Date(fecha);
        let dia = f.getDate();
        let mes = (f.getMonth() + 1);
        if(dia<10){
            dia = "0" + dia;
        }
        if(mes<10){
            mes = "0" + mes;
        }
        return f.getFullYear() + "-" + mes + "-" + dia;
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
                <button type="button" className="btn btn-success fw-bold me-3" onClick={cleanDatos} data-bs-toggle="modal" data-bs-target="#modalAgregar">Nuevo</button>
                <input type="text" className="form-control" value={busqueda} onChange={(e) => buscar(e.target.value)} placeholder="Filtrar" />
            </div>
            <div className="col-12 mt-3">
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-verde">
                            <th className="bg-verde text-white text-center" scope="col">Nombre Mascota</th>
                            <th className="bg-verde text-white text-center" scope="col">Fecha</th>
                            <th className="bg-verde text-white text-center" scope="col">Hora</th>
                            <th className="bg-verde text-white text-center" scope="col">Estado</th>
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(cit => (
                            <tr key={cit.id_cita} className="align-middle">
                                <td>{cit.nombre_mascota}</td>
                                <td className="text-center">{formatearFecha(cit.fecha_cita)}</td>
                                <td className="text-center">{formatearHora(cit.fecha_cita)}</td>
                                <td>{cit.status_cita}</td>
                                <td className="text-center">
                                    {cit.status_cita == "Pendiente" &&
                                        <button type="button" className="btn btn-success me-2" onClick={() => bindDatos(cit)} data-bs-toggle="modal" data-bs-target="#modalEditar">
                                            <img className="img-btn" src="../img/editar.png" />
                                        </button>
                                    }
                                    {cit.status_cita == "Pendiente" &&
                                        <button type="button" className="btn bg-rojo ms-2" onClick={() => bindDatos(cit)} data-bs-toggle="modal" data-bs-target="#modalEliminar">
                                            <img className="img-btn" src="../img/borrar.png" />
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <div className="modal fade" id="modalAgregar" tabIndex="-1" aria-labelledby="modalAgregarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalAgregarLabel">Agregar Cita</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Fecha</label>
                                <input type="date" className="form-control" value={fecha} onChange={(e) => cambioFecha(e.target.value)} min={minFecha} />
                            </div>
                            <div>
                                <label>Hora</label>
                                <select className="form-select" value={hora} onChange={(e) => setHora(e.target.value)}>
                                    <option value="">Seleccione</option>
                                    <option value="08:00" disabled={desactivar8}>08:00</option>
                                    <option value="09:00" disabled={desactivar9}>09:00</option>
                                    <option value="10:00" disabled={desactivar10}>10:00</option>
                                    <option value="11:00" disabled={desactivar11}>11:00</option>
                                    <option value="12:00" disabled={desactivar12}>12:00</option>
                                    <option value="13:00" disabled={desactivar13}>13:00</option>
                                    <option value="14:00" disabled={desactivar14}>14:00</option>
                                    <option value="15:00" disabled={desactivar15}>15:00</option>
                                    <option value="16:00" disabled={desactivar16}>16:00</option>
                                    <option value="17:00" disabled={desactivar17}>17:00</option>
                                    <option value="18:00" disabled={desactivar18}>18:00</option>
                                </select>
                            </div>
                            <div>
                                <label>Mascota</label>
                                <select className="form-select" value={idMascota} onChange={(e) => setIdMascota(e.target.value)}>
                                    <option value="">Seleccione</option>
                                    {mascotas.map(mas => (
                                        <option key={mas.id_mascota} value={mas.id_mascota}>{mas.nombre_mascota}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Motivo</label>
                                <input type="text" className="form-control" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarCitaAgregar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAgregar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Editar Cita : {fecha}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Fecha</label>
                                <input type="date" className="form-control" value={fecha} onChange={(e) => cambioFecha(e.target.value)} min={minFecha} />
                            </div>
                            <div>
                                <label>Hora</label>
                                <select className="form-select" value={hora} onChange={(e) => setHora(e.target.value)}>
                                    <option value="">Seleccione</option>
                                    <option value="08:00" disabled={desactivar8}>08:00</option>
                                    <option value="09:00" disabled={desactivar9}>09:00</option>
                                    <option value="10:00" disabled={desactivar10}>10:00</option>
                                    <option value="11:00" disabled={desactivar11}>11:00</option>
                                    <option value="12:00" disabled={desactivar12}>12:00</option>
                                    <option value="13:00" disabled={desactivar13}>13:00</option>
                                    <option value="14:00" disabled={desactivar14}>14:00</option>
                                    <option value="15:00" disabled={desactivar15}>15:00</option>
                                    <option value="16:00" disabled={desactivar16}>16:00</option>
                                    <option value="17:00" disabled={desactivar17}>17:00</option>
                                    <option value="18:00" disabled={desactivar18}>18:00</option>
                                </select>
                            </div>
                            <div>
                                <label>Mascota</label>
                                <select className="form-select" value={idMascota} onChange={(e) => setIdMascota(e.target.value)}>
                                    <option value="">Seleccione</option>
                                    {mascotas.map(mas => (
                                        <option key={mas.id_mascota} value={mas.id_mascota}>{mas.nombre_mascota}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Motivo</label>
                                <input type="text" className="form-control" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardarCitaEditar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEditar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Cancelar Cita: {fecha}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea Cancelar la Cita {fecha}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={cancelarCita}>Cancelar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default CitasCliente;