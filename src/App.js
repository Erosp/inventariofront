import Estructura from './componentes/Estructura';
import EstructuraCliente from './componentes/EstructuraCliente';
import EstructuraAdmin from './componentes/EstructuraAdmin';
import EstructuraVete from './componentes/EstructuraVete';
import Inicio from './componentes/Inicio';
import Login from './componentes/Login';
import Tienda from './componentes/Tienda';
import Pagar from './componentes/Pagar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        {/* RUTAS SUPERADMIN */}
        <Route path="/stock">
          <Estructura />
        </Route>
        <Route path="/citas">
          <Estructura />
        </Route>
        <Route path="/historial">
          <Estructura />
        </Route>
        <Route path="/categorias">
          <Estructura />
        </Route>
        <Route path="/usuarios">
          <Estructura />
        </Route>
        <Route path="/mascotas/:idusu">
          <Estructura />
        </Route>
        <Route path="/historialclinico/:idmas">
          <Estructura />
        </Route>
        <Route path="/productos">
          <Estructura />
        </Route>
        <Route path="/especies">
          <Estructura />
        </Route>
        <Route path="/razas">
          <Estructura />
        </Route>
        {/* FIN RUTAS SUPERADMIN */}

        {/* RUTAS ADMIN */}
        <Route path="/admin/stock">
          <EstructuraAdmin />
        </Route>
        <Route path="/admin/historial">
          <EstructuraAdmin />
        </Route>
        <Route path="/admin/categorias">
          <EstructuraAdmin />
        </Route>
        <Route path="/admin/usuarios">
          <EstructuraAdmin />
        </Route>
        <Route path="/admin/mascotas/:idusu">
          <EstructuraAdmin />
        </Route>
        <Route path="/admin/historialclinico/:idmas">
          <EstructuraAdmin />
        </Route>
        <Route path="/admin/productos">
          <EstructuraAdmin />
        </Route>
        <Route path="/admin/especies">
          <EstructuraAdmin />
        </Route>
        <Route path="/admin/razas">
          <EstructuraAdmin />
        </Route>
        {/* FIN RUTAS ADMIN */}

        {/* RUTAS VETERINARIO */}
        <Route path="/vete/citas">
          <EstructuraVete />
        </Route>
        {/* FIN RUTAS VETERINARIO */}

        {/* RUTAS CLIENTE */}
        <Route path="/cliente/mascotas">
          <EstructuraCliente />
        </Route>
        <Route path="/cliente/Citas">
          <EstructuraCliente />
        </Route>
        <Route path="/cliente/historialclinico/:idmas">
          <EstructuraCliente />
        </Route>
        {/* FIN RUTAS CLIENTE */}

        {/* RUTAS EXTERIOR */}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/tienda">
          <Tienda />
        </Route>
        <Route path="/pagar">
          <Pagar />
        </Route>
        <Route path="/">
          <Inicio />
        </Route>
        {/* FIN RUTAS EXTERIOR */}
      </Switch>
    </Router>
    
  );
}

export default App;
