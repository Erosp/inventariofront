import '../css/Usuarios.css'
import { useState, useEffect } from "react";
import axios from "axios";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState("");
    const [alias, setAlias] = useState("");
    const [clave, setClave] = useState("");
    const [tipo, setTipo] = useState("");
    const [id, setId] = useState("");
    const [busqueda, setBusqueda] = useState([]);

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/usuario');
        setUsuarios(respuesta.data);
    }

    const bindDatos = usu =>{
        setNombre(usu.nombre_usuario);
        setAlias(usu.alias_usuario);
        setClave(usu.clave_usuario);
        setTipo(usu.tipo_usuario);
        setId(usu.id_usuario);
    }

    const cleanDatos = () =>{
        setNombre("");
        setAlias("");
        setClave("");
        setTipo("");
        setId("");
    }

    const guardarUsuarioAgregar = () => {
        let datos = { 
            nombre: nombre, 
            alias: alias, 
            clave: clave,
            tipo: tipo
        };

        axios.post("http://localhost:3005/api/usuario", datos)
            .then(response => {
                document.getElementById("cerrarModalAgregar").click();
                alert("Guardado");
                getUsuarios();
            });
    }

    const guardarUsuarioEditar = () => {
        let url="http://localhost:3005/api/usuario/"+id;
        let datos = { 
            nombre: nombre, 
            alias: alias, 
            clave: clave,
            tipo: tipo
        };

        axios.put(url, datos)
            .then(response => {
                document.getElementById("cerrarModalEditar").click();
                alert("Guardado");
                getUsuarios();
            });
    }

    const eliminarUsuario = () => {

        axios.delete("http://localhost:3005/api/usuario/"+id)
            .then(response => {
                document.getElementById("cerrarModalEliminar").click();
                alert("Eliminado");
                getUsuarios();
            });
    }

    const buscar = async(texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto == ""){
            respuesta = await axios.get('http://localhost:3005/api/usuario');
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/usuario/buscar/' + texto);
        }
        setUsuarios(respuesta.data);
    }

    return (
        <div className="row d-flex align-items-center">
            <div className="col-8">
                <h1 className="mb-0">Usuarios</h1>
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
                            <th className="bg-verde text-white text-center" scope="col">Tipo</th>
                            <th className="bg-verde text-white text-center" scope="col">Alias</th>
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {usuarios.map(usu => (
                            <tr key={usu.id_usuario} className="align-middle">
                                <td>{usu.nombre_usuario}</td>
                                <td>{usu.tipo_usuario}</td>
                                <td>{usu.alias_usuario}</td>
                                <td className="text-center">
                                    {usu.tipo_usuario == "Cliente" &&
                                        <a className="btn btn-primary me-3" href={"/mascotas/"+usu.id_usuario}>
                                            <img className="img-btn" src="img/huella.png" />
                                        </a>
                                    }
                                    <button type="button" className="btn btn-success" onClick={() => bindDatos(usu)} data-bs-toggle="modal" data-bs-target="#modalEditar">
                                        <img className="img-btn" src="img/editar.png" />
                                    </button>
                                    <button type="button" className="btn bg-rojo ms-3" onClick={() => bindDatos(usu)} data-bs-toggle="modal" data-bs-target="#modalEliminar">
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
                            <h1 className="modal-title fs-5" id="modalAgregarLabel">Agregar Usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div>
                                <label>Tipo</label>
                                <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                    <option value="">Seleccione</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Veterinario">Veterinario</option>
                                    <option value="Cliente">Cliente</option>
                                </select>
                            </div>
                            <div>
                                <label>Alias</label>
                                <input type="text" className="form-control" value={alias} onChange={(e) => setAlias(e.target.value)} />
                            </div>
                            <div>
                                <label>Contraseña</label>
                                <input type="password" className="form-control" value={clave} onChange={(e) => setClave(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarUsuarioAgregar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAgregar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Editar Usuario: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div>
                                <label>Tipo</label>
                                <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                    <option value="">Seleccione</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Veterinario">Veterinario</option>
                                    <option value="Cliente">Cliente</option>
                                </select>
                            </div>
                            <div>
                                <label>Alias</label>
                                <input type="text" className="form-control" value={alias} onChange={(e) => setAlias(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardarUsuarioEditar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEditar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Eliminar Usuario: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea eliminar el usuario {nombre}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={eliminarUsuario}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Usuarios;