import './css/Login.css';
import { useState } from "react";
import axios from "axios";

function Login() {

    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [modo, setModo] = useState("login");
    const [nombre, setNombre] = useState("");
    const [alias, setAlias] = useState("");
    const [claveRegistrar, setClaveRegistrar] = useState("");
    const [claveRepetir, setClaveRepetir] = useState("");
    const [terminos, setTerminos] = useState(false);

    const entrar = () => {
        if(usuario == "" || clave == ""){
            alert("Debe completar todos los campos.");
        }
        else{
            let datos = { alias: usuario, clave: clave};

            axios.post("http://localhost:3005/api/login", datos)
                .then(response => {
                    if(response.data.estado){
                        localStorage.setItem("id", response.data.datos[0].id_usuario);
                        if(response.data.datos[0].tipo_usuario == "Cliente"){
                            localStorage.setItem("tipo", "cliente");
                            window.location.href = "/cliente/mascotas";
                        }
                        else if(response.data.datos[0].tipo_usuario == "Veterinario"){
                            localStorage.setItem("tipo", "vete");
                            window.location.href = "/vete/citas";
                        }
                        else if(response.data.datos[0].tipo_usuario == "Administrador"){
                            localStorage.setItem("tipo", "admin")
                            window.location.href = "/admin/productos";
                        }
                        else{
                            localStorage.setItem("tipo", "superadmin")
                            window.location.href = "/productos";
                        }
                    }
                    else{
                        alert("Error: usuario y/o contraseña incorrecta.")
                    }

                });
        }
    }

    const registrarse = () => {
        let exp = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
        if(nombre == "" || alias == "" || claveRegistrar == "" || claveRepetir == ""){
            alert("Debe completar todos los campos.");
        }
        else if(claveRegistrar.length<8){
            alert("La contraseña debe tener 8 caracteres.");
        }
        else if(claveRegistrar.match(exp)==null){
            alert("La contraseña debe tener al menos 1 mayuscula y 1 número.");
        }
        else if(terminos == false){
            alert("Debe aceptar los términos y condiciones de uso.");
        }
        else{
            if(claveRegistrar != claveRepetir){
                alert("Las contraseñas no coinciden.");
            }
            else{
                let datos = { 
                    nombre: nombre,
                    tipo: "Cliente",
                    alias: alias, 
                    clave: claveRegistrar
                };

                axios.post("http://localhost:3005/api/usuario", datos)
                    .then(response => {
                        localStorage.setItem("id", response.data.insertId);
                        window.location.href = "/cliente/mascotas";
                    });
            }
        }
    }

    return (
        <div className="container-fluid bg-login px-0 pb-5 overflow-x-hidden min-vh-100 d-flex justify-content-center align-items-center">
            {modo == "login" &&
                <div className="card transparente w-50 mw-310px">
                    <div className="card-body">
                        <div className="w-100 text-center">
                            <img className="w-25" src="img/perfil.png" />
                        </div>
                        <h5 className="card-title text-center mt-3">Iniciar Sesión</h5>
                        <div className="row mt-3">
                            <div className="col-12">
                                <input type="text" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Usuario" />
                            </div>
                            <div className="col-12 mt-3">
                                <input type="password" className="form-control" value={clave} onChange={(e) => setClave(e.target.value)} placeholder="Contraseña" />
                            </div>
                            <div className="col-12 mt-3 text-center">
                                <button type="button" className="btn btn-primary" onClick={entrar}>Acceder</button>
                            </div>
                            <div className="col-12 mt-3 text-primary fw-bold pointer" onClick={() => setModo("registro")}>
                                ¿No tienes cuenta? Registrate haciendo click aquí.
                            </div>
                        </div>
                    </div>
                </div>
            }
            {modo == "registro" &&
                <div className="card transparente w-50 mw-310px">
                    <div className="card-body">
                        <div className="w-100 text-center">
                            <img className="w-25" src="img/perfil.png" />
                        </div>
                        <h5 className="card-title text-center mt-3">Registrarse</h5>
                        <div className="row">
                            <div className="col-12 col-lg-6 mt-3">
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                            </div>
                            <div className="col-12 col-lg-6 mt-3">
                                <input type="text" className="form-control" value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Usuario" />
                            </div>
                            <div className="col-12 col-lg-6 mt-3">
                                <input type="password" className="form-control" value={claveRegistrar} onChange={(e) => setClaveRegistrar(e.target.value)} placeholder="Contraseña" />
                            </div>
                            <div className="col-12 col-lg-6 mt-3">
                                <input type="password" className="form-control" value={claveRepetir} onChange={(e) => setClaveRepetir(e.target.value)} placeholder="Contraseña" />
                            </div>
                            <div className="col-12 mt-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="terminos" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} />
                                    <label className="form-check-label">Aceptar los términos y condiciones de uso.</label>
                                </div>
                            </div>
                            <div className="col-12 mt-3 text-center">
                                <button type="button" className="btn btn-primary" onClick={registrarse}>Registrarse</button>
                            </div>
                            <div className="col-12 mt-3 text-primary fw-bold pointer" onClick={() => setModo("login")}>
                                ¿Ya tienes cuenta? Accede haciendo click aquí.
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
  }
  
  export default Login;