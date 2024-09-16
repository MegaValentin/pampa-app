import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo y descripción */}
        <div className="mb-6 md:mb-0 text-center">
          <Link
            to="/"
            className="flex flex-col items-center justify-center md:justify-start"
          >
            <img src="/logo.png" alt="Logo" className="w-40 mb-2" />
            <span className="md:ml-9 text-2xl font-bold text-black">
              PAMPA Bolivar y sus creadores
            </span>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
            </svg>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 hover:text-pink-500 transition duration-300"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M16.5 7.5l0 .01" />
            </svg>
          </a>
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-gray-700 hover:text-green-500 transition duration-300"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
              <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
            </svg>
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
