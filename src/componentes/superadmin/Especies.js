import '../css/Especies.css'
import { useState, useEffect } from "react";
import axios from "axios";

function Especies() {
    const [especies, setEspecies] = useState([]);
    const [nombre, setNombre] = useState("");
    const [id, setId] = useState("");
    const [busqueda, setBusqueda] = useState([]);

    useEffect(() => {
        getEspecies();
    }, []);

    const getEspecies = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/especie');
        setEspecies(respuesta.data);
    }

    const bindDatos = esp =>{
        setNombre(esp.nombre_especie);
        setId(esp.id_especie);
    }

    const cleanDatos = () =>{
        setNombre("");
        setId("");
    }

    const guardarEspecieAgregar = () => {
        let datos = { nombre: nombre};

        axios.post("http://localhost:3005/api/especie", datos)
            .then(response => {
                document.getElementById("cerrarModalAgregar").click();
                alert("Guardado");
                getEspecies();
            });
    }

    const guardarEspecieEditar = () => {
        let datos = { nombre: nombre};

        axios.put("http://localhost:3005/api/especie/"+id, datos)
            .then(response => {
                document.getElementById("cerrarModalEditar").click();
                alert("Guardado");
                getEspecies();
            });
    }

    const eliminarEspecie = () => {

        axios.delete("http://localhost:3005/api/especie/"+id)
            .then(response => {
                document.getElementById("cerrarModalEliminar").click();
                alert("Eliminado");
                getEspecies();
            });
    }

    const buscar = async(texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto == ""){
            respuesta = await axios.get('http://localhost:3005/api/especie');
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/especie/buscar/' + texto);
        }
        setEspecies(respuesta.data);
    }

    return (
        <div className="row d-flex align-items-center">
            <div className="col-8">
                <h1 className="mb-0">Especies</h1>
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
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {especies.map(esp => (
                            <tr key={esp.id_especie} className="align-middle">
                                <td>{esp.nombre_especie}</td>
                                <td className="text-center">
                                    <button type="button" className="btn btn-success me-2" onClick={() => bindDatos(esp)} data-bs-toggle="modal" data-bs-target="#modalEditar">
                                        <img className="img-btn" src="img/editar.png" />
                                    </button>
                                    <button type="button" className="btn bg-rojo ms-2" onClick={() => bindDatos(esp)} data-bs-toggle="modal" data-bs-target="#modalEliminar">
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
                            <h1 className="modal-title fs-5" id="modalAgregarLabel">Agregar Especie</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarEspecieAgregar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAgregar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Editar Especie : {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardarEspecieEditar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEditar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Eliminar Especie: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea eliminar la Especie {nombre}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={eliminarEspecie}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Especies;