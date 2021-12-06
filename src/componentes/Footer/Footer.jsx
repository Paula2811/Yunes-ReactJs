import './Footer.css'

export function Footer(){
    return(
        <footer>
            <div className="footer__container">
                <div className="mediosdepago">
                    <p>Medios de pago</p>
                    <img src="../footer-mediosdepago.png" alt="Medios de pago"/>
                </div>
                <div className="redes">
                    <p>Redes</p>
                    <a href="https://www.instagram.com/chemistrystudy28/?hl=es-la"  className="redes__enlace">Instagram</a>
                </div>
            </div>
        </footer>
    )
}