import './css/Pagar.css';
import React, { useState } from "react";
import ReactDOM from "react-dom"
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

function Pagar() {

    const [lista, setLista] = useState(JSON.parse(localStorage.getItem("lista")));
    const [total, setTotal] = useState(localStorage.getItem("total"));

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                description: "Servicios varios",
                amount: {
                    value: total
                }
            }]
        });
    }

    const onApprove = async (data, actions) => {
        const order = await actions.order?.capture();
        console.log("order");
        console.log(order);

        let datos = { 
            productos: lista,
            total: total,
            id: localStorage.getItem("id")
        };

        axios.post("http://localhost:3005/api/venta", datos)
            .then(response => {
                alert("Guardado");
                window.location.href = "/tienda";
            });
    }

    return (
        <div className="container mt-3 px-0 pb-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Pagar</h1>
                </div>
                <div className="col-12 mt-3">
                    <table className="table table-striped">
                        <thead>
                            <tr className="bg-verde">
                                <th className="bg-verde text-white text-center" scope="col">Nombre</th>
                                <th className="bg-verde text-white text-center" scope="col">Cantidad</th>
                                <th className="bg-verde text-white text-center" scope="col">Precio</th>
                                <th className="bg-verde text-white text-center" scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(li => (
                                <tr key={li.id_producto} className="align-middle">
                                    <td>{li.nombre_producto}</td>
                                    <td className="text-end">{li.cantidad_carro}</td>
                                    <td className="text-end">${li.precio_producto}</td>
                                    <td className="text-end">${li.total}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="text-end fw-bold" colSpan="3">Total:</td>
                                <td className="text-end fw-bold">${parseInt(total).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4"></div>
                <div className="col-4">
                    <PayPalButtons
                      createOrder={(data, actions) => createOrder(data, actions)}
                      onApprove={(data, actions) => onApprove(data, actions)}
                    />
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    );
}
  
export default Pagar;