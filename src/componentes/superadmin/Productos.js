import '../css/Productos.css'
import { useState, useEffect } from "react";
import axios from "axios";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState(0);
    const [imagen, setImagen] = useState("");
    const [nombreImagen, setNombreImagen] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [id, setId] = useState("");
    const [busqueda, setBusqueda] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        getProductos();
        getCategorias();
    }, []);

    const getProductos = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/producto');
        setProductos(respuesta.data);
    }

    const getCategorias = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/categoria');
        setCategorias(respuesta.data);
    }

    const cargarImagen = e => {
        setImagen(e[0]);
        setNombreImagen(e[0].name);
    }

    const bindDatos = (pro, imagen = true) =>{
        setNombre(pro.nombre_producto);
        setPrecio(pro.precio_producto);
        if(imagen){
            setImagen(pro.img_producto);
            setNombreImagen(pro.img_producto);
        }
        else{
            setImagen("");
            setNombreImagen("");
        }
        setIdCategoria(pro.id_categoria);
        setId(pro.id_producto);
    }

    const cleanDatos = () =>{
        setNombre("");
        setPrecio("");
        setImagen("");
        setNombreImagen("");
        setIdCategoria("");
        setId("");
    }

    const guardarProductoAgregar = () => {
        let datos = new FormData();
        datos.append("nombre", nombre);
        datos.append("precio", precio);
        datos.append("stock", stock);
        datos.append("categoria", idCategoria);
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
        let datos = { nombre: nombre, precio: precio, categoria: idCategoria};
        if(imagen!==""){
            headers = '{ headers: {"Content-Type": "multipart/form-data"} }';
            datos = new FormData();
            datos.append("nombre", nombre);
            datos.append("precio", precio);
            datos.append("categoria", idCategoria);
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

    const buscar = async(texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto == ""){
            respuesta = await axios.get('http://localhost:3005/api/producto');
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/producto/buscar/' + texto);
        }
        setProductos(respuesta.data);
    }

    return (
        <div className="row d-flex align-items-center">
            <div className="col-8">
                <h1 className="mb-0">Productos</h1>
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
                            <th className="bg-verde text-white text-center" scope="col">Categoría</th>
                            <th className="bg-verde text-white text-center" scope="col">Precio</th>
                            <th className="bg-verde text-white text-center" scope="col">Imagen</th>
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {productos.map(pro => (
                            <tr key={pro.id_producto} className="align-middle">
                                <td>{pro.nombre_producto}</td>
                                <td>{pro.nombre_categoria}</td>
                                <td className="text-end">${pro.precio_producto}</td>
                                <td className="text-center">
                                    <img className="w-img rounded-1 shadow" src={'http://localhost:3005/'+pro.img_producto} onClick={() => bindDatos(pro)} data-bs-toggle="modal" data-bs-target="#modalVer" />
                                </td>
                                <td className="text-center">
                                    <button type="button" className="btn btn-success me-2" onClick={() => bindDatos(pro, false)} data-bs-toggle="modal" data-bs-target="#modalEditar">
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
                            <button type="button" onClick={cleanDatos} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Precio</label>
                                    <input type="text" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Stock Inicial</label>
                                    <input type="text" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Categoría</label>
                                    <select className="form-select" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                                        <option value="">Seleccione</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre_categoria}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label>Imagen</label>
                                    <input type="text" className="form-control" value={nombreImagen} onClick={() => document.getElementById('archivo').click()} readOnly/>
                                    <input type="file" className="d-none" onChange={(e) => cargarImagen(e.target.files)} id="archivo" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarProductoAgregar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={cleanDatos} id="cerrarModalAgregar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Editar Producto: {nombre}</h1>
                            <button type="button" onClick={cleanDatos} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Precio</label>
                                    <input type="text" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Categoría</label>
                                    <select className="form-select" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                                        <option value="">Seleccione</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre_categoria}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label>Imagen</label>
                                    <input type="text" className="form-control" value={nombreImagen} onClick={() => document.getElementById('archivo').click()} readOnly/>
                                    <input type="file" className="d-none" onChange={(e) => cargarImagen(e.target.files)} id="archivo" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardarProductoEditar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={cleanDatos} id="cerrarModalEditar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Eliminar Producto: {nombre}</h1>
                            <button type="button" onClick={cleanDatos} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea eliminar el producto {nombre}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={eliminarProducto}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" onClick={cleanDatos} id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalVer" tabIndex="-1" aria-labelledby="modalVerLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalVerLabel">{nombre}</h1>
                            <button type="button" onClick={cleanDatos} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img className="w-100" src={'http://localhost:3005/'+imagen} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cleanDatos} id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Productos;