import { Link } from "react-router-dom";
import IconWhatsapp from "./icons/IconWhatsapp";
import IconFacebook from "./icons/IconFacebook";
import IconInstagram from "./icons/IconInstagram"
function Footer() {
  return (
    <footer className="mx-auto px-4 lg:px-20 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo y descripción */}
        <div className="mb-6 md:mb-0 text-center px-24">
          <Link
            to="/"
            className="flex flex-col items-center justify-center md:justify-start"
          >
            <img src="/logo.png" alt="Logo" className="w-40 mb-2" />
            
          </Link>
        </div>

        <div className="flex justify-center">
          <p className="mt-4 text-base md:text-lg lg:text-xl max-w-xs text-black text-center px-4">
            Bolívar posee una gran historia artística y cultural. Con PAMPA
            tiene, además, quien la exprese.
          </p>
        </div>

        {/* Redes Sociales */}
        <div className="flex justify-center space-x-6 my-4 md:mr-9 ">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
           <IconFacebook/>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <IconInstagram/>
          </a>
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            
          >
            <IconWhatsapp/>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-400">
        © {new Date().getFullYear()} PAMPA. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
