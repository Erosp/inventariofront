import './css/Tienda.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Tienda() {

    const [productos, setProductos] = useState([]);
    const [lista, setLista] = useState([]);

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/producto/tienda');
        setProductos(respuesta.data);
    }

    const addDatos = (pro) => {
        if(localStorage.getItem("id") == null){
            window.location.href = "/login";
        }
        else{
            setLista([...lista, pro]);
            document.getElementById("add" + pro.id_producto).innerHTML="Agregado";
            document.getElementById("add" + pro.id_producto).classList.remove("btn-success");
            document.getElementById("add" + pro.id_producto).classList.add("btn-secondary");
            document.getElementById("add" + pro.id_producto).disabled = true;
        }
    }

    const removeDatos = (id) => {
        const nuevaLista = lista.filter((list) => list.id_producto !== id);
        setLista(nuevaLista);
        document.getElementById("add" + id).innerHTML="Agregar";
        document.getElementById("add" + id).classList.remove("btn-secondary");
        document.getElementById("add" + id).classList.add("btn-success");
        document.getElementById("add" + id).disabled = false;
    }

    const sumar = (pro) => {
        if(pro.cantidad_carro<pro.cantidad_stock){
            const nuevaLista = lista.map((li) => {
                if(li.id_producto == pro.id_producto){
                    return {
                        ...li,
                        cantidad_carro: li.cantidad_carro + 1,
                        total: ((li.cantidad_carro + 1) * li.precio_producto).toFixed(2)
                    }
                }
                return li;
            });
            setLista(nuevaLista);
        }
    }

    const restar = (pro) => {
        if(pro.cantidad_carro>1){
            const nuevaLista = lista.map((li) => {
                if(li.id_producto == pro.id_producto){
                    return {
                        ...li,
                        cantidad_carro: li.cantidad_carro - 1,
                        total: ((li.cantidad_carro - 1) * li.precio_producto).toFixed(2)
                    }
                }
                return li;
            });
            setLista(nuevaLista);
        }
    }

    const salir = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("tipo");
        window.location.href = "/";
    }

    const calcularTotal = () => {
        let total = 0;
        lista.map((li) => {
            total = parseFloat(total) + parseFloat(li.total);
        });
        localStorage.setItem("lista", JSON.stringify(lista));
        localStorage.setItem("total", total);
        window.location.href = "/pagar";
    }

    return (
        <div className="container-fluid px-0 pb-5">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Veterinaria ADSO</a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        { localStorage.getItem("tipo") == "cliente" &&
                            <Link className="li" to="/cliente/mascotas">
                                <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center">
                                    <img className="icono-menu me-2" src="http://localhost:3000/img/panel.png" />
                                    Panel
                                </li>
                            </Link>
                        }
                        { localStorage.getItem("tipo") == "vete" &&
                            <Link className="li" to="/vete/citas">
                                <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center">
                                    <img className="icono-menu me-2" src="http://localhost:3000/img/panel.png" />
                                    Panel
                                </li>
                            </Link>
                        }
                        { localStorage.getItem("tipo") == "admin" &&
                            <Link className="li" to="/admin/productos">
                                <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center">
                                    <img className="icono-menu me-2" src="http://localhost:3000/img/panel.png" />
                                    Panel
                                </li>
                            </Link>
                        }
                        { localStorage.getItem("tipo") == "superadmin" &&
                            <Link className="li" to="/productos">
                                <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center">
                                    <img className="icono-menu me-2" src="http://localhost:3000/img/panel.png" />
                                    Panel
                                </li>
                            </Link>
                        }
                    </ul>
                    { localStorage.getItem("id") == null &&
                        <a className="btn btn-outline-primary" href="/login">Acceder</a>
                    }
                    { localStorage.getItem("id") != null &&
                        <button type="button" onClick={salir} className="btn btn-outline-primary">Salir</button>
                    }
                </div>
            </nav>
            <div className="w-100 mt-3">
                <h2 className="text-center">Productos</h2>
            </div>
            <div className="w-100 px-3 mt-3 d-flex">
                {productos.map(pro => (
                    <div className="card rem18 me-3 mb-3" key={pro.id_producto}>
                        <img src={'http://localhost:3005/'+pro.img_producto} className="card-img-top" alt="no disponible" />
                        <div className="card-body">
                            <h5 className="card-title">{pro.nombre_producto}</h5>
                            <p className="card-text mb-0">Disponibles: {pro.cantidad_stock}</p>
                            <h5 className="card-text text-end text-success">${pro.precio_producto}</h5>
                            <div className="w-100 text-center mt-3">
                                <button className="btn btn-success" id={'add' + pro.id_producto} onClick={() => addDatos(pro)}>Agregar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <button type="button" className="btn btn-outline-success btn-compra rounded-circle position-fixed" data-bs-toggle="modal" data-bs-target="#modalCarrito">
                <img src="img/comprar.png" className="w-100" />
            </button>


            <div className="modal fade" id="modalCarrito" tabIndex="-1" aria-labelledby="modalAgregarLabel" aria-hidden="true">
                <div className="modal-dialog w-75 mw-100">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalAgregarLabel">Carrito de Productos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-3 text-center">Producto</div>
                                <div className="col-2 text-center">Cantidad</div>
                                <div className="col-2 text-center">Disponible</div>
                                <div className="col-2 text-center">Precio</div>
                                <div className="col-2 text-center">Total</div>
                                <div className="col-1"></div>
                            </div>
                            {lista.map(li => (
                                <div className="row" key={li.id_producto}>
                                    <div className="col-3">
                                        {li.nombre_producto}
                                    </div>
                                    <div className="col-2 d-flex">
                                        <button className="btn btn-sm btn-primary" onClick={() => restar(li)}>-</button>
                                        <input type="number" className="form-control text-end" value={li.cantidad_carro} readOnly />
                                        <button className="btn btn-sm btn-primary" onClick={() => sumar(li)}>+</button>
                                    </div>
                                    <div className="col-2 text-end">
                                        {li.cantidad_stock}
                                    </div>
                                    <div className="col-2 text-end">
                                        ${li.precio_producto}
                                    </div>
                                    <div className="col-2 text-end">
                                        ${li.total}
                                    </div>
                                    <div className="col-1 text-center">
                                        <button className="btn btn-sm btn-danger" onClick={() => removeDatos(li.id_producto)}>X</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={calcularTotal}>Comprar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalCarrito" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Tienda;