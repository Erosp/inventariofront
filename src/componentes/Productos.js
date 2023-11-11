import './css/Productos.css'
import { useState, useEffect } from "react";
import axios from "axios";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [nombreImagen, setNombreImagen] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/producto');
        setProductos(respuesta.data);
    }

    const cargarImagen = e => {
        setImagen(e[0]);
        setNombreImagen(e[0].name);
    }

    const bindDatos = pro =>{
        setNombre(pro.nombre_producto);
        setPrecio(pro.precio_producto);
        setImagen(pro.img_producto);
        setNombreImagen(pro.img_producto);
        setId(pro.id_producto);
    }

    const guardarProductoAgregar = () => {
        let datos = new FormData();
        datos.append("nombre", nombre);
        datos.append("precio", precio);
        datos.append("file", imagen);

        axios.post("http://localhost:3005/api/producto", datos, { headers: {'Content-Type': "multipart/form-data"} })
            .then(response => {
                document.getElementById("cerrarModalAgregar").click();
                alert("Guardado");
                getProductos();
            });
    }

    const guardarProductoEditar = () => {
        let url="http://localhost:3005/api/producto/"+id;
        let headers = '{}';
        let datos = { nombre: nombre, precio: precio};
        if(imagen!==""){
            headers = '{ headers: {"Content-Type": "multipart/form-data"} }';
            datos = new FormData();
            datos.append("nombre", nombre);
            datos.append("precio", precio);
            datos.append("file", imagen);
            url=url+"/imagen";
        }

        axios.put(url, datos, headers)
            .then(response => {
                document.getElementById("cerrarModalEditar").click();
                alert("Guardado");
                getProductos();
            });
    }

    const eliminarProducto = () => {

        axios.delete("http://localhost:3005/api/producto/"+id)
            .then(response => {
                document.getElementById("cerrarModalEliminar").click();
                alert("Eliminado");
                getProductos();
            });
    }

    return (
        <div className="row d-flex align-items-center">
            <div className="col-6">
                <h1 className="mb-0">Productos</h1>
            </div>
            <div className="col-6 text-end">
                <button type="button" className="btn btn-success fw-bold" data-bs-toggle="modal" data-bs-target="#modalAgregar">Nuevo</button>
            </div>
            <div className='col-12 mt-3'>
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-verde">
                            <th className="bg-verde text-white text-center" scope="col">Nombre</th>
                            <th className="bg-verde text-white text-center" scope="col">Precio</th>
                            <th className="bg-verde text-white text-center" scope="col">Imagen</th>
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {productos.map(pro => (
                            <tr key={pro.id_producto} className="align-middle">
                                <td>{pro.nombre_producto}</td>
                                <td className="text-end">${pro.precio_producto}</td>
                                <td className="text-center">
                                    <img className="w-img rounded-1 shadow" src={'http://localhost:3005/'+pro.img_producto} onClick={() => bindDatos(pro)} data-bs-toggle="modal" data-bs-target="#modalVer" />
                                </td>
                                <td className="text-center">
                                    <button type="button" className="btn btn-success me-2" onClick={() => bindDatos(pro)} data-bs-toggle="modal" data-bs-target="#modalEditar">
                                        <img className="img-btn" src="img/editar.png" />
                                    </button>
                                    <button type="button" className="btn bg-rojo ms-2" onClick={() => bindDatos(pro)} data-bs-toggle="modal" data-bs-target="#modalEliminar">
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
                            <h1 className="modal-title fs-5" id="modalAgregarLabel">Agregar Producto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div>
                                <label>Precio</label>
                                <input type="text" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                            </div>
                            <div>
                                <label>Imagen</label>
                                <input type="text" className="form-control" value={nombreImagen} onClick={() => document.getElementById('archivo').click()} readOnly/>
                                <input type="file" className="d-none" onChange={(e) => cargarImagen(e.target.files)} id="archivo" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarProductoAgregar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAgregar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Editar Producto: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div>
                                <label>Precio</label>
                                <input type="text" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                            </div>
                            <div>
                                <label>Imagen</label>
                                <input type="text" className="form-control" value={nombreImagen} onClick={() => document.getElementById('archivo').click()} readOnly/>
                                <input type="file" className="d-none" onChange={(e) => cargarImagen(e.target.files)} id="archivo" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardarProductoEditar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEditar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Eliminar Producto: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea eliminar el producto {nombre}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={eliminarProducto}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalVer" tabIndex="-1" aria-labelledby="modalVerLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalVerLabel">{nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img className="w-100" src={'http://localhost:3005/'+imagen} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Productos;