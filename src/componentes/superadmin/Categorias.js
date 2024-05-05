import '../css/Categorias.css'
import { useState, useEffect } from "react";
import axios from "axios";

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [id, setId] = useState("");
    const [busqueda, setBusqueda] = useState([]);

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/categoria');
        setCategorias(respuesta.data);
    }

    const bindDatos = cat => {
        setNombre(cat.nombre_categoria);
        setId(cat.id_categoria);
    }

    const cleanDatos = () => {
        setNombre("");
        setId("");
    }

    const guardarCategoriaAgregar = () => {
        let datos = { nombre: nombre};

        axios.post("http://localhost:3005/api/categoria", datos)
            .then(response => {
                document.getElementById("cerrarModalAgregar").click();
                alert("Guardado");
                getCategorias();
            });
    }

    const guardarCategoriaEditar = () => {
        let datos = { nombre: nombre};

        axios.put("http://localhost:3005/api/categoria/"+id, datos)
            .then(response => {
                document.getElementById("cerrarModalEditar").click();
                alert("Guardado");
                getCategorias();
            });
    }

    const eliminarCategoria = () => {

        axios.delete("http://localhost:3005/api/categoria/"+id)
            .then(response => {
                document.getElementById("cerrarModalEliminar").click();
                alert("Eliminado");
                getCategorias();
            });
    }

    const buscar = async(texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto == ""){
            respuesta = await axios.get('http://localhost:3005/api/categoria');
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/categoria/buscar/' + texto);
        }
        setCategorias(respuesta.data);
    }

    return (
        <div className="row d-flex align-items-center">
            <div className="col-8">
                <h1 className="mb-0">Categorías</h1>
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
                        
                        {categorias.map(cat => (
                            <tr key={cat.id_categoria} className="align-middle">
                                <td>{cat.nombre_categoria}</td>
                                <td className="text-center">
                                    <button type="button" className="btn btn-success me-2" onClick={() => bindDatos(cat)} data-bs-toggle="modal" data-bs-target="#modalEditar">
                                        <img className="img-btn" src="img/editar.png" />
                                    </button>
                                    <button type="button" className="btn bg-rojo ms-2" onClick={() => bindDatos(cat)} data-bs-toggle="modal" data-bs-target="#modalEliminar">
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
                            <h1 className="modal-title fs-5" id="modalAgregarLabel">Agregar Categoría</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarCategoriaAgregar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAgregar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Editar Categoría : {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardarCategoriaEditar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEditar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Eliminar Categoría: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea eliminar la Categoría {nombre}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={eliminarCategoria}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Categorias;