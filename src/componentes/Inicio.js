import './css/Inicio.css';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

function Inicio() {

    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
      }
      
      const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '650px'
      }

    const slideImages = [
        {
          url: 'http://localhost:3000/img/login.jpg',
          caption: 'Profesionalismo'
        },
        {
          url: 'http://localhost:3000/img/veterinario1.jpg',
          caption: 'Confianza'
        },
        {
          url: 'http://localhost:3000/img/veterinario2.jpg',
          caption: 'Empatia'
        },
      ];
      

    return (
        <div className="container-fluid px-0">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Veterinaria ADSO</a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <a className="li" href="/tienda">
                            <li className="li px-3 py-3 fs-5 fw-light d-flex align-items-center">
                                <img className="icono-menu me-2" src="http://localhost:3000/img/tienda.png" alt="no encontrado" />
                                Tienda
                            </li>
                        </a>
                    </ul>
                    <a className="btn btn-outline-primary" href="/login">Acceder</a>
                </div>
            </nav>
            <div className="slide-container">
                <Slide>
                    {slideImages.map((slideImage, index)=> (
                        <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                        </div>
                    ))} 
                </Slide>
            </div>
            <div className="w-100 vh-100 mt-3 d-flex justify-content-between">
                <div className="flex-grow-1 pt-3 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-center text-primary">Nuestos servicios</h1>
                    <ul className="ul-list mt-3">
                        <li className="li-list">Consulta Veterinaria Online</li>
                        <li className="li-list">Seguimiento en Tiempo Real</li>
                        <li className="li-list">Historial Médico Digital</li>
                        <li className="li-list">Farmacia Online</li>
                        <li className="li-list">Soporte y Tutoriales</li>
                    </ul>
                </div>
                <div className="h-100" id="imgDog"></div>
            </div>
            <div className="w-100 vh-100 position-relative" id="bgTarjetas">
                <h1 className="position-absolute" id="h1Tarjetas">Ventajas de nuestos servicios</h1>
                <div className="tarjetas">
                    <div className="tarjeta">
                        <div className="tarjeta__side tarjeta__side--front tarjeta__side--front-1">
                            <div className="tarjeta__description">
                                Plataforma de Salud Animal Online
                            </div>
                        </div>
                        <div className="tarjeta__side tarjeta__side--back tarjeta__side--back-1">
                            <div className="tarjeta__description2">
                                Nuestra avanzada plataforma te permite acceder a servicios veterinarios de calidad desde la comodidad de tu hogar. Consultas, seguimientos y cuidados, todo en un solo lugar.
                            </div>
                        </div>
                    </div>
                    <div className="tarjeta">
                        <div className="tarjeta__side tarjeta__side--front tarjeta__side--front-2">
                            <div className="tarjeta__description">
                                Ahorro de Recursos
                            </div>
                        </div>
                        <div className="tarjeta__side tarjeta__side--back tarjeta__side--back-2">
                            <div className="tarjeta__description2">
                                Optimiza tu tiempo y evita desplazamientos innecesarios. Con nuestras herramientas, obtén el cuidado necesario para tus mascotas sin salir de casa, reduciendo el estrés tanto para ti como para tus animales
                            </div>
                        </div>
                    </div>
                    <div className="tarjeta">
                        <div className="tarjeta__side tarjeta__side--front tarjeta__side--front-3">
                            <div className="tarjeta__description">
                                Soporte Veterinario 24/7
                            </div>
                        </div>
                        <div className="tarjeta__side tarjeta__side--back tarjeta__side--back-3">
                            <div className="tarjeta__description2">
                                Entendemos que las emergencias pueden ocurrir en cualquier momento. Nuestro equipo de profesionales está disponible las 24 horas del día, los 7 días de la semana, para brindarte la asistencia que necesitas en esos momentos críticos
                            </div>
                        </div>
                    </div>
                    <div className="tarjeta">
                        <div className="tarjeta__side tarjeta__side--front tarjeta__side--front-4">
                            <div className="tarjeta__description">
                                Equipo de Veterinarios Certificados
                                </div>
                        </div>
                        <div className="tarjeta__side tarjeta__side--back tarjeta__side--back-4">
                            <div className="tarjeta__description2">
                                Contamos con un equipo de veterinarios altamente capacitados y apasionados por el bienestar de tus mascotas. Cada uno de ellos está comprometido con proporcionar el mejor cuidado posible
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 vh-100" id="imgVete">
                <div className="row h-100">
                    <div className="col-4 h-50"></div>
                    <div className="col-4 h-50"></div>
                    <div className="col-4 h-50 pt-3 px-5">
                        <div className="text-justify fs-5 anton-regular text-white">
                            En Veterinaria ADSO, nos dedicamos a llevar el cuidado de tus mascotas al siguiente nivel. Ofrecemos una plataforma de salud veterinaria online diseñada para hacer que el cuidado de tus animales sea más accesible, eficiente y sostenible.
                        </div>
                    </div>
                    <div className="col-4 h-50 pb-3 px-5 d-flex align-items-end">
                        <div className="text-justify fs-5 anton-regular text-white">
                            En nombre de Veterinaria ADSO, estamos comprometidos a hacer que el cuidado de tus mascotas sea más accesible que nunca. Contáctanos hoy y descubre cómo podemos mejorar la salud de tus animales desde la comodidad de tu hogar. ¡Estamos aquí para ti y para ellos!
                        </div>
                    </div>
                    <div className="col-4 h-50"></div>
                    <div className="col-4 h-50"></div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6">
                    <img className="w-100" src="img/mapa.jpg" />
                </div>
                <div className="col-6 ps-3 pe-5 d-flex flex-column justify-content-center">
                    <h1 className="text-primary text-center">¡Contáctanos!</h1>
                    <div>
                        <div className="fs-3 fw-bold">Correo Electrónico:</div>
                        <div className="fs-3">alejandrosanchezloaiza@gmail.com</div>
                    </div>
                    <div>
                        <div className="fs-3 fw-bold">Teléfono:</div>
                        <div className="fs-3">3234439728</div>
                    </div>
                    <div>
                        <div className="fs-3 fw-bold">Ubicación:</div>
                        <div className="fs-3">Centro de Diseño e Innovación tecnológica industrial, Dosquebradas</div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Inicio;