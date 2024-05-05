import './css/Estructura.css';
import { useEffect } from "react";
import MascotasCliente from './cliente/MascotasCliente';
import CitasCliente from './cliente/CitasCliente';
import HistorialClinicoCliente from './cliente/HistorialClinicoCliente';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function EstructuraCliente() {
    useEffect(() => {
        if(localStorage.getItem("id") == null){
            window.location.href = "/";
        }
        else{
            if(localStorage.getItem("tipo") == "vete"){
                window.location.href = "/vete/citas";
            }
            else if(localStorage.getItem("tipo") == "admin"){
                window.location.href = "/admin/productos";
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
                                <Link className="li" to="/cliente/mascotas">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/raza.png" alt="no encontrado" />
                                        Mascotas
                                    </li>
                                </Link>
                                <Link className="li" to="/cliente/citas">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="http://localhost:3000/img/cita.png" alt="no encontrado" />
                                        Citas
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
                                    <Route path="/cliente/historialclinico/:idmas">
                                        <HistorialClinicoCliente />
                                    </Route>
                                    <Route path="/cliente/mascotas">
                                        <MascotasCliente />
                                    </Route>
                                    <Route path="/cliente/citas">
                                        <CitasCliente />
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
  
  export default EstructuraCliente;