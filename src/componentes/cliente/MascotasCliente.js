import '../css/Mascotas.css'
import { useState, useEffect } from "react";
import axios from "axios";

function MascotasCliente() {
    const [mascotas, setMascotas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [peso, setPeso] = useState("");
    const [tamano, setTamano] = useState("");
    const [color, setColor] = useState("");
    const [alergico, setAlergico] = useState("");
    const [enfermedades, setEnfermedades] = useState("");
    const [idEspecie, setIdEspecie] = useState("");
    const [idRaza, setIdRaza] = useState("");
    const [id, setId] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [especies, setEspecies] = useState([]);
    const [razas, setRazas] = useState([]);

    useEffect(() => {
        getMascotas();
        getEspecies();
    }, []);

    const getMascotas = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/mascota/' + localStorage.getItem("id"));
        setMascotas(respuesta.data);
    }

    const getEspecies = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/especie');
        setEspecies(respuesta.data);
    }

    const bindDatos = mas =>{
        setNombre(mas.nombre_mascota);
        setPeso(mas.peso_mascota);
        setTamano(mas.tamano_mascota);
        setColor(mas.color_mascota);
        setAlergico(mas.alergico_mascota);
        setEnfermedades(mas.enfermedades_mascota);
        setIdRaza(mas.id_raza);
        setId(mas.id_mascota);
        bindRaza(mas.id_especie, mas.id_raza);
    }

    const cleanDatos = () =>{
        setNombre("");
        setPeso("");
        setTamano("");
        setColor("");
        setAlergico("");
        setEnfermedades("");
        setIdRaza("");
        setId("");
    }

    const guardarMascotaAgregar = () => {
        let datos = { 
            nombre: nombre, 
            peso: peso, 
            tamano: tamano,
            color: color,
            alergico: alergico,
            enfermedades: enfermedades,
            id_raza: idRaza,
            id_usuario: localStorage.getItem("id")
        };

        axios.post("http://localhost:3005/api/mascota", datos)
            .then(response => {
                document.getElementById("cerrarModalAgregar").click();
                alert("Guardado");
                getMascotas();
            });
    }

    const guardarMascotaEditar = () => {
        let url="http://localhost:3005/api/mascota/"+id;
        let datos = { 
            nombre: nombre, 
            peso: peso,
            tamano: tamano,
            color: color,
            alergico: alergico,
            enfermedades: enfermedades,
            id_raza: idRaza
        };

        axios.put(url, datos)
            .then(response => {
                document.getElementById("cerrarModalEditar").click();
                alert("Guardado");
                getMascotas();
            });
    }

    const eliminarMascota = () => {

        axios.delete("http://localhost:3005/api/mascota/"+id)
            .then(response => {
                document.getElementById("cerrarModalEliminar").click();
                alert("Eliminado");
                getMascotas();
            });
    }

    const buscar = async (texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto === ""){
            respuesta = await axios.get('http://localhost:3005/api/mascota');
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/mascota/buscar/' + texto);
        }
        setMascotas(respuesta.data);
    }

    const bindRaza = async (id, raza = null) => {
        setIdEspecie(id);
        setIdRaza("");
        const respuesta = await axios.get('http://localhost:3005/api/raza/especie/' + id);
        setRazas(respuesta.data);
        if(raza != null){
            setIdRaza(raza);
        }
    }

    return (
        <div className="row d-flex align-items-center">
            <div className="col-8">
                <h1 className="mb-0">Mascotas</h1>
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
                            <th className="bg-verde text-white text-center" scope="col">Peso</th>
                            <th className="bg-verde text-white text-center" scope="col">Raza</th>
                            <th className="bg-verde text-white text-center" scope="col">Tamaño</th>
                            <th className="bg-verde text-white text-center" scope="col">Color</th>
                            <th className="bg-verde text-white text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {mascotas.map(mas => (
                            <tr key={mas.id_mascota} className="align-middle">
                                <td>{mas.nombre_mascota}</td>
                                <td>{mas.peso_mascota}</td>
                                <td>{mas.nombre_raza}</td>
                                <td>{mas.tamano_mascota}</td>
                                <td>{mas.color_mascota}</td>
                                <td className="text-center">
                                    <a href={"/cliente/historialclinico/" + mas.id_mascota} className="btn btn-primary">
                                        <img className="img-btn" src="../img/inventario.png" alt="no encontrado" />
                                    </a>
                                    <button type="button" className="btn btn-success mx-3" onClick={() => bindDatos(mas)} data-bs-toggle="modal" data-bs-target="#modalEditar">
                                        <img className="img-btn" src="../img/editar.png" alt="no encontrado" />
                                    </button>
                                    <button type="button" className="btn bg-rojo" onClick={() => bindDatos(mas)} data-bs-toggle="modal" data-bs-target="#modalEliminar">
                                        <img className="img-btn" src="../img/borrar.png" alt="no encontrado" />
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
                            <h1 className="modal-title fs-5" id="modalAgregarLabel">Agregar Mascota</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Peso</label>
                                    <input type="text" className="form-control" value={peso} onChange={(e) => setPeso(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Especie</label>
                                    <select className="form-select" value={idEspecie} onChange={(e) => bindRaza(e.target.value)}>
                                        <option value="">Seleccione</option>
                                        {especies.map(esp => (
                                            <option key={esp.id_especie} value={esp.id_especie}>{esp.nombre_especie}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label>Raza</label>
                                    <select className="form-select" value={idRaza} onChange={(e) => setIdRaza(e.target.value)}>
                                        <option value="">Seleccione</option>
                                        {razas.map(ra => (
                                            <option key={ra.id_raza} value={ra.id_raza}>{ra.nombre_raza}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Tamaño</label>
                                    <input type="text" className="form-control" value={tamano} onChange={(e) => setTamano(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Color</label>
                                    <input type="text" className="form-control" value={color} onChange={(e) => setColor(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Alergico a</label>
                                    <input type="text" className="form-control" value={alergico} onChange={(e) => setAlergico(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Enfermedades</label>
                                    <input type="text" className="form-control" value={enfermedades} onChange={(e) => setEnfermedades(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={guardarMascotaAgregar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalAgregar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditarLabel">Editar Mascota: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <div className="row">
                                <div className="col-6">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Peso</label>
                                    <input type="text" className="form-control" value={peso} onChange={(e) => setPeso(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Especie</label>
                                    <select className="form-select" value={idEspecie} onChange={(e) => bindRaza(e.target.value)}>
                                        <option value="">Seleccione</option>
                                        {especies.map(esp => (
                                            <option key={esp.id_especie} value={esp.id_especie}>{esp.nombre_especie}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label>Raza</label>
                                    <select className="form-select" value={idRaza} onChange={(e) => setIdRaza(e.target.value)}>
                                        <option value="">Seleccione</option>
                                        {razas.map(ra => (
                                            <option key={ra.id_raza} value={ra.id_raza}>{ra.nombre_raza}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Tamaño</label>
                                    <input type="text" className="form-control" value={tamano} onChange={(e) => setTamano(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Color</label>
                                    <input type="text" className="form-control" value={color} onChange={(e) => setColor(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Alergico a</label>
                                    <input type="text" className="form-control" value={alergico} onChange={(e) => setAlergico(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label>Enfermedades</label>
                                    <input type="text" className="form-control" value={enfermedades} onChange={(e) => setEnfermedades(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardarMascotaEditar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEditar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEliminarLabel">Eliminar Mascota: {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Desea eliminar la mascota {nombre}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={eliminarMascota}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" id="cerrarModalEliminar" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default MascotasCliente;