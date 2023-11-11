import './css/Estructura.css';
import Productos from './Productos';
import Stock from './Stock';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Estructura() {
    return (
        <Router>
            <div className="container-fluid bg-gris px-0 pb-5 overflow-x-hidden min-vh-100">
                <nav className="navbar navbar-expand-lg bg-verde" data-bs-theme="dark">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1 text-white">CRM</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <Link className="li" to="/">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="img/producto.png" />
                                        Productos
                                    </li>
                                </Link>
                                <Link className="li" to="/stock">
                                    <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center text-white">
                                        <img className="icono-menu me-2" src="img/inventario.png" />
                                        Stock
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="row mt-3 px-3">
                    <div className="col-12">
                        <div className="card border border-0 rounded">
                            <div className="card-body">
                                <Switch>
                                    <Route path="/stock">
                                        <Stock />
                                    </Route>
                                    <Route path="/">
                                        <Productos />
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
  
  export default Estructura;