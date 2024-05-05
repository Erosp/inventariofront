import { useState, useEffect } from "react";
import axios from "axios";

function Historial() {
    const [historial, setHistorial] = useState([]);
    const [busqueda, setBusqueda] = useState([]);

    useEffect(() => {
        getHistorial();
    }, []);

    const getHistorial = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/historial');
        setHistorial(respuesta.data);
    }

    const buscar = async(texto) => {
        setBusqueda(texto);
        let respuesta = [];
        if(texto == ""){
            respuesta = await axios.get('http://localhost:3005/api/historial');
        }
        else{
            respuesta = await axios.get('http://localhost:3005/api/historial/buscar/' + texto);
        }
        setHistorial(respuesta.data);
    }

    function formatearFecha(fecha) {
        let f = new Date(fecha);
        let dia = f.getDate();
        let mes = (f.getMonth() + 1);
        if(dia<10){
            dia = "0" + dia;
        }
        if(mes<10){
            mes = "0" + mes;
        }
        return dia + "-" + mes + "-" + f.getFullYear();
    }

    function formatearHora(fecha){
        let f=new Date(fecha);
        let hora = f.getHours();
        let minuto = f.getMinutes();
        if(hora<10){
            hora = "0" + hora;
        }
        if(minuto<10){
            minuto = "0" + minuto;
        }
        return hora+":"+minuto;
    }

    return (
        <div className="row">
            <div className="col-8">
                <h1>Historial</h1>
            </div>
            <div className="col-4">
                <input type="text" className="form-control" value={busqueda} onChange={(e) => buscar(e.target.value)} placeholder="Filtrar" />
            </div>
            <div className="col-12">
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-verde">
                            <th className="bg-verde text-white text-center" scope="col">Nombre</th>
                            <th className="bg-verde text-white text-center" scope="col">Fecha</th>
                            <th className="bg-verde text-white text-center" scope="col">Cantidad</th>
                            <th className="bg-verde text-white text-center" scope="col">Movimiento</th>
                            <th className="bg-verde text-white text-center" scope="col">Existencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {historial.map(h => (
                            <tr key={h.id_historial}>
                                <td>{h.nombre_producto}</td>
                                <td className="text-center">{formatearFecha(h.fecha_historial) + ' ' + formatearHora(h.fecha_historial)}</td>
                                <td className="text-end">{h.cantidad_historial}</td>
                                <td className="text-end">{h.tipo_historial}</td>
                                <td className="text-end">{h.cantidad_stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
  
  export default Historial;