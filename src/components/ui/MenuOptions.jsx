import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";

const MenuOptions = () => {
  const { userInfo: user } = useContext(LoginContext);

  return ( 
    <ul className="navbar-nav me-auto mb-lg-0">
    {
      user.Role !== 1 ? (
        <li className="nav-item">
          <Link to={"/prospects"} className="nav-link"></Link>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <Link to={"/prospects"} className="nav-link">
              Prospectos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/affiliets"} className="nav-link">
              Red de Afiliados
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              to={""}
              className="nav-link dropdown-toggle"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Parametros
            </Link>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarScrollingDropdown"
            >
              <li>
                <Link to={"/payments"} className="dropdown-item">
                  Frecuencia de Pago
                </Link>
              </li>
              <li>
                <Link to={"/housings"} className="dropdown-item">
                  Tipo de Viviendas
                </Link>
              </li>
              <li>
                <Link to={"/civilstatus"} className="dropdown-item">
                  Estado Civil
                </Link>
              </li>
              <li>
                <Link to={"/purposes"} className="dropdown-item">
                  Propósito del Préstamo
                </Link>
              </li>
              <li>
                <Link to={"/profesions_lw"} className="dropdown-item">
                  Profesiones Linea Blanca
                </Link>
              </li>
              <li>
                <Link to={"/planillas_j"} className="dropdown-item">
                  Planillas CSS
                </Link>
              </li>
              <li>
                <Link to={"/institutions"} className="dropdown-item">
                  Instituciones
                </Link>
              </li>
              <li>
                <Link to={"/estados_tramite"} className="dropdown-item">
                  Estados del Trámite
                </Link>
              </li>
              <li>
                <Link to={"/type_documents"} className="dropdown-item">
                  Tipo de Documentos
                </Link>
              </li>
              <li>
                <Link to={"/terms_loan"} className="dropdown-item">
                  Plazos del Préstamo
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <Link
              to={""}
              className="nav-link dropdown-toggle"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </Link>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarScrollingDropdown"
            >
              <li>
                <Link to={"/udtProspect"} className="dropdown-item">
                  Actualizar datos del Prospecto
                </Link>
              </li>
              <li>
                <Link to={"/entities_f"} className="dropdown-item">
                  Entidades Financieras
                </Link>
              </li>
              <li>
                <Link to={"/sectors"} className="dropdown-item">
                  Sector Laboral
                </Link>
              </li>
              <li>
                <Link to={"/profesions"} className="dropdown-item">
                  Profesión
                </Link>
              </li>
              <li>
                <Link to={"/sector_profesion"} className="dropdown-item">
                  Rel. Sector - Profesión
                </Link>
              </li>
              <li>
                <Link to={"/entity_params"} className="dropdown-item">
                  Tarifas para los Cálculos
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <Link
              to={""}
              className="nav-link dropdown-toggle"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Users
            </Link>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarScrollingDropdown"
            >
              <li>
                <Link to={"/roles"} className="dropdown-item">
                  Roles
                </Link>
              </li>
              <li>
                <Link to={"/users"} className="dropdown-item">
                  Usuarios
                </Link>
              </li>
              <li>
                <Link to={"/solFinancomer"} className="dropdown-item">
                  Financomer
                </Link>
              </li>
            </ul>
          </li>
        </>
      )}
  </ul>
   );
}
 
export default MenuOptions;