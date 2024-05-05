import '../css/Razas.css'
import { useState, useEffect } from "react";
import axios from "axios";

function Razas() {
    const [razas, setRazas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [idEspecie, setIdEspecie] = useState("");
    const [id, setId] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [especies, setEspecies] = useState([]);

    useEffect(() => {
        getRazas();
        getEspecies();
    }, []);

    const getRazas = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/raza');
        setRazas(respuesta.data);
    }

    const getEspecies = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/especie');
        setEspecies(respuesta.data);
    }

    const bindDatos = raz =>{
        setNombre(raz.nombre_raza);
        setIdEspecie(raz.id_especie);
        setId(raz.id_raza);
    }

    const cleanDatos = () =>{
        setNombre("");
        setIdEspecie("");
        setId("");
    }

    const guardarRazaAgregar = () => {
        let datos = { nombre: nombre, especie: idEspecie };

        axios.post("http://localhost:3005/api/raza", datos)
            .then(response => {
                document.getElementById("cerrarModalAgregar").click();
                alert("Guardado");
                getRazas();
            });
    }

    const guardarRazaEditar = () => {
        let datos = { nombre: nombre, especie: idEspecie };

        axios.put("http://localhost:3005/api/raza/"+id, datos)
            .then(response => {
                document.getElementById("cerrarModalEditar").click();
                alert("Guardado");
                getRazas();
            });
    }

    const eliminarRaza = () => {

        axios.delete("http://localhost:3005/api/raza/"+id)
            .then(response => {
                document.getElementById("cerrarModalEliminar").click();
                alert("Eliminado");
                getRazas();
            });
    }

    const buscar = async(texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto == ""){
            respuesta = await axios.get('http://localhost:3005/api/raza');
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/raza/buscar/' + texto);
        }
        setRazas(respuesta.data);
    }

    return (
        <div className="row d-flex align-items-center">
            <div className="col-8">
                <h1 className="mb-0">Razas</h1>
            </div>
            <div className="col-4 d-flex">
                <button type="button" className="btn btn-success fw-bold me-3" onClick={cleanDatos} data-bs-toggle="modal" data-bs-target="#modalAgregar">Nuevo</button>
                <input type="text" className="form-control" value={busqueda} onChange={(e) => buscar(e.target.value)} placeholder="Filtrar" />
            </div>
            <div className='col-12 mt-3'>
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-verde">
                            <th className="bg-verde text-white text-center" scope="col">Nombre</th>
                            <th className="bg-verde text-white text-center" scope="col">Especie</th>
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {razas.map(raz => (
                            <tr key={raz.id_raza} className="align-middle">
                                <td>{raz.nombre_raza}</td>
                                <td>{raz.nombre_especie}</td>
                                <td className="text-center">
                                    <button type="button" className="btn btn-success me-2" onClick={() => bindDatos(raz)} data-bs-toggle="modal" data-bs-target="#modalEditar">
                                        <img className="img-btn" src="img/editar.png" />
                                    </button>
                                    <button type="button" className="btn bg-rojo ms-2" onClick={() => bindDatos(raz)} data-bs-toggle="modal" data-bs-target="#modalEliminar">
                                        <img className="img-btn" src="img/borrar.png" />
                                    </button>
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
                            <h1 className="modal-title fs-5" id="modalAgregarLabel">Agregar Raza</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div>
                                <label>Especie</label>
                                <select className="form-select" value={idEspecie} onChange={(e) => setIdEspecie(e.target.value)}>
                                    <option value="">Seleccione</option>
                                    {especies.map(esp => (
                                        <option key={esp.id_especie} value={esp.id_especie}>{esp.nombre_especie}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarRazaAgregar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAgregar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Editar Raza : {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div>
                                <label>Especie</label>
                                <select className="form-select" value={idEspecie} onChange={(e) => setIdEspecie(e.target.value)}>
                                    <option value="">Seleccione</option>
                                    {especies.map(esp => (
                                        <option key={esp.id_especie} value={esp.id_especie}>{esp.nombre_especie}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardarRazaEditar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEditar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Eliminar Raza: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea eliminar la Raza {nombre}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={eliminarRaza}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Razas;