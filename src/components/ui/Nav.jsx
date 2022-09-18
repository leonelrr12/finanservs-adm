import { useContext } from "react";
import { LoginContext } from "../../context/loginContext";
import { Link, useNavigate } from "react-router-dom";
import { FinanservsHorizontalLogoWhiteImg } from "../images";

export const Nav = () => {
  const { userInfo: user, setUserInfo } = useContext(LoginContext);

  let navigate = useNavigate();

  if (user) {
    if (!Object.keys(user).length) return navigate("/", { replace: true });
  } else return navigate("/", { replace: true });
  const { Role: role } = user;

  const handleLogout = () => {
    window.localStorage.removeItem("ctx-api");
    setUserInfo(null)
    navigate("/", { replace: true });
  };

  // eslint-disable-next-line
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <FinanservsHorizontalLogoWhiteImg />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-lg-0">
            {
              role !== 1 ? (
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
          <div className="d-flex">
            <button
              onClick={handleLogout}
              className="btn btn-info mt-2"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    // <nav className="navbar navbar-expand-lg navbar-dark">
    //   <div className="cols collapse navbar-collapse" id="navbarScroll">
    //       <div className="col-11">
    //         <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
    //           {role !== 1 ?
    //             <>
    //               <li className="nav-item">
    //                 <Link to={"/prospects"} className="nav-link"></Link>
    //               </li>
    //             </>
    //             :
    //             <>
    //               <li className="nav-item">
    //                 <Link to={"/prospects"} className="nav-link">Prospectos</Link>
    //               </li>
    //               <li className="nav-item">
    //                 <Link to={"/affiliets"} className="nav-link">Red de Afiliados</Link>
    //               </li>
    //               <li className="nav-item dropdown">
    //                 <Link to={""} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                   Parametros
    //                 </Link>
    //                 <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
    //                   <li><Link to={"/payments"} className="dropdown-item">Frecuencia de Pago</Link></li>
    //                   <li><Link to={"/housings"} className="dropdown-item">Tipo de Viviendas</Link></li>
    //                   <li><Link to={"/civilstatus"} className="dropdown-item">Estado Civil</Link></li>
    //                   <li><Link to={"/purposes"} className="dropdown-item">Propósito del Préstamo</Link></li>
    //                   <li><Link to={"/profesions_lw"} className="dropdown-item">Profesiones Linea Blanca</Link></li>
    //                   <li><Link to={"/planillas_j"} className="dropdown-item">Planillas CSS</Link></li>
    //                   <li><Link to={"/institutions"} className="dropdown-item">Instituciones</Link></li>
    //                   <li><Link to={"/estados_tramite"} className="dropdown-item">Estados del Trámite</Link></li>
    //                   <li><Link to={"/type_documents"} className="dropdown-item">Tipo de Documentos</Link></li>
    //                   <li><Link to={"/terms_loan"} className="dropdown-item">Plazos del Préstamo</Link></li>
    //                 </ul>
    //               </li>
    //               <li className="nav-item dropdown">
    //                 <Link to={""} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                   Admin
    //                 </Link>
    //                 <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
    //                   <li><Link to={"/udtProspect"} className="dropdown-item">Actualizar datos del Prospecto</Link></li>
    //                   <li><Link to={"/entities_f"} className="dropdown-item">Entidades Financieras</Link></li>
    //                   <li><Link to={"/sectors"} className="dropdown-item">Sector Laboral</Link></li>
    //                   <li><Link to={"/profesions"} className="dropdown-item">Profesión</Link></li>
    //                   <li><Link to={"/sector_profesion"} className="dropdown-item">Rel. Sector - Profesión</Link></li>
    //                   <li><Link to={"/entity_params"} className="dropdown-item">Tarifas para los Cálculos</Link></li>
    //                 </ul>
    //               </li>
    //               <li className="nav-item dropdown">
    //                 <Link to={""} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                   Users
    //                 </Link>
    //                 <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
    //                   <li><Link to={"/roles"} className="dropdown-item">Roles</Link></li>
    //                   <li><Link to={"/users"} className="dropdown-item">Usuarios</Link></li>
    //                   <li><Link to={"/solFinancomer"} className="dropdown-item">Financomer</Link></li>
    //                 </ul>
    //               </li>
    //             </>}
    //         </ul>
    //       </div>
    //       <div className="col-2">
    //         {
    //           user && Object.keys(user).length ?
    //             <button onClick={handleLogout} className="btn btn-info" type="button">Log Out 2</button>
    //           :
    //             ""
    //         }
    //       </div>
    //   </div>
    // </nav>
  );
};
