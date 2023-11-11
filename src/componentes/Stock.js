import { useState, useEffect } from "react";
import axios from "axios";

function Stock() {
    const [stock, setStock] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [id, setId] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [numero, setNumero] = useState(1);

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/stock');
        setStock(respuesta.data);
    }

    const bindDatos = st =>{
        setNombre(st.nombre_producto);
        setPrecio(st.precio_producto);
        setId(st.id_producto);
        setCantidad(st.cantidad_stock);
        setNumero(1);
    }

    const guardarAumentar = () => {
        let suma=parseInt(cantidad)+parseInt(numero);
        let datos = { stock: suma};

        axios.put("http://localhost:3005/api/stock/"+id, datos)
            .then(response => {
                document.getElementById("cerrarModalAumentar").click();
                alert("Guardado");
                getStock();
            });
    }

    const guardarDisminuir = () => {
        let resta=parseInt(cantidad)-parseInt(numero);
        let datos = { stock: resta};

        axios.put("http://localhost:3005/api/stock/"+id, datos)
            .then(response => {
                document.getElementById("cerrarModalDisminuir").click();
                alert("Guardado");
                getStock();
            });
    }

    return (
        <div className="row">
            <div className="col-8">
                <h1>Stock</h1>
            </div>
            <div className="col-4">
            </div>
            <div className="col-12">
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-verde">
                            <th className="bg-verde text-white text-center" scope="col">Nombre</th>
                            <th className="bg-verde text-white text-center" scope="col">Precio</th>
                            <th className="bg-verde text-white text-center" scope="col">Existencia</th>
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {stock.map(st => (
                            <tr key={st.id_stock}>
                                <td>{st.nombre_producto}</td>
                                <td className="text-end">${st.precio_producto}</td>
                                <td className="text-end">{st.cantidad_stock}</td>
                                <td className="text-center">
                                    <button type="button" className="btn btn-success me-2" onClick={() => bindDatos(st)} data-bs-toggle="modal" data-bs-target="#modalAumentar">+</button>
                                    { st.cantidad_stock>0 ? (
                                        <button type="button" className="btn bg-rojo ms-2" onClick={() => bindDatos(st)} data-bs-toggle="modal" data-bs-target="#modalDisminuir">-</button>
                                    ) : '' }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>









            <div className="modal fade" id="modalAumentar" tabIndex="-1" aria-labelledby="modalAumentarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalAumentarLabel">Ingresar Stock</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} readOnly />
                            </div>
                            <div>
                                <label>Precio</label>
                                <input type="text" className="form-control" value={precio} readOnly />
                            </div>
                            <div>
                                <label>Cantidad</label>
                                <input type="number" min="1" className="form-control" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarAumentar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAumentar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalDisminuir" tabIndex="-1" aria-labelledby="modalDisminuirLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalDisminuirLabel">Egresar Stock</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={nombre} readOnly />
                            </div>
                            <div>
                                <label>Precio</label>
                                <input type="text" className="form-control" value={precio} readOnly />
                            </div>
                            <div>
                                <label>Cantidad</label>
                                <input type="number" min="1" max={cantidad} className="form-control" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={guardarDisminuir}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalDisminuir" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Stock;