import './css/Estructura.css';
import { useEffect } from "react";
import Productos from './superadmin/Productos';
import Stock from './superadmin/Stock';
import Historial from './superadmin/Historial';
import Categorias from './superadmin/Categorias';
import Usuarios from './superadmin/Usuarios';
import Mascotas from './superadmin/Mascotas';
import HistorialClinico from './superadmin/HistorialClinico';
import Especies from './superadmin/Especies';
import Razas from './superadmin/Razas';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function EstructuraAdmin() {
    useEffect(() => {
        if(localStorage.getItem("id") == null){
            window.location.href = "/";
        }
        else{
            if(localStorage.getItem("tipo") == "cliente"){
                window.location.href = "/cliente/mascotas";
            }
            else if(localStorage.getItem("tipo") == "vete"){
                window.location.href = "/vete/citas";
            }
            else if(localStorage.getItem("tipo") == "superadmin"){
                window.location.href = "/productos";
            }
        }
    }, []);

    const salir = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("tipo");
        window.location.href = "/";
    }
    return (
        <Router>
            <div className="container-fluid bg-gris px-0 pb-5 overflow-x-hidden min-vh-100">
                <nav className="navbar navbar-expand-lg bg-verde" data-bs-theme="dark">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1 text-white">ADSO</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <Link className="li" to="/productos">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/productos.png" />
                                        Productos
                                    </li>
                                </Link>
                                <Link className="li" to="/admin/stock">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/stock.png" />
                                        Stock
                                    </li>
                                </Link>
                                <Link className="li" to="/admin/historial">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/historial.png" />
                                        Historial
                                    </li>
                                </Link>
                                <Link className="li" to="/admin/categorias">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/categorias.png" />
                                        Categorías
                                    </li>
                                </Link>
                                <Link className="li" to="/admin/usuarios">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/usuario.png" />
                                        Usuarios
                                    </li>
                                </Link>
                                <Link className="li" to="/admin/especies">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/especie.png" />
                                        Especies
                                    </li>
                                </Link>
                                <Link className="li" to="/admin/razas">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/raza.png" />
                                        Razas
                                    </li>
                                </Link>
                                <a className="li" href="/tienda">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/tienda.png" alt="no encontrado" />
                                        Tienda
                                    </li>
                                </a>
                            </ul>
                            <button type="button" onClick={salir} className="btn btn-outline-light">Salir</button>
                        </div>
                    </div>
                </nav>
                <div className="row mt-3 px-3">
                    <div className="col-12">
                        <div className="card border border-0 rounded">
                            <div className="card-body">
                                <Switch>
                                    <Route path="/admin/stock">
                                        <Stock />
                                    </Route>
                                    <Route path="/admin/historial">
                                        <Historial />
                                    </Route>
                                    <Route path="/admin/categorias">
                                        <Categorias />
                                    </Route>
                                    <Route path="/admin/usuarios">
                                        <Usuarios />
                                    </Route>
                                    <Route path="/admin/mascotas/:idusu">
                                        <Mascotas />
                                    </Route>
                                    <Route path="/admin/historialclinico/:idmas">
                                        <HistorialClinico />
                                    </Route>
                                    <Route path="/admin/productos">
                                        <Productos />
                                    </Route>
                                    <Route path="/admin/especies">
                                        <Especies />
                                    </Route>
                                    <Route path="/admin/razas">
                                        <Razas />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
  }
  
  export default EstructuraAdmin;