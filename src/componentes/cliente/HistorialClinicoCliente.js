import '../css/HistorialClinico.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function HistorialClinicoCliente() {
    const [historialclinico, setHistorialClinico] = useState([]);
    const { idmas } = useParams();

    useEffect(() => {
        getHistorialClinico();
    }, []);

    const getHistorialClinico = async () => {
        const respuesta = await axios.get('http://localhost:3005/api/historialclinico/' + idmas);
        setHistorialClinico(respuesta.data);
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
        <div className="row d-flex align-items-center">
            <div className="col-8">
                <h1 className="mb-0">Historial Clinico</h1>
            </div>
            <div className="col-4 d-flex">
            </div>
            <div className='col-12 mt-3'>
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-verde">
                            <th className="bg-verde text-white text-center" scope="col">Fecha</th>
                            <th className="bg-verde text-white text-center" scope="col">Hora</th>
                            <th className="bg-verde text-white text-center" scope="col">Motivo</th>
                            <th className="bg-verde text-white text-center" scope="col">Diagnostico</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {historialclinico.map(hc => (
                            <tr key={hc.id_cita} className="align-middle">
                                <td className="text-center">{formatearFecha(hc.fecha_cita)}</td>
                                <td className="text-center">{formatearHora(hc.fecha_cita)}</td>
                                <td>{hc.motivo_cita}</td>
                                <td>{hc.diagnostico_cita}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            
        </div>
    );
  }
  
  export default HistorialClinicoCliente;