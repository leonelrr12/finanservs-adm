import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { logOut } from '../../store/user';


const LayoutNav = styled.nav`
  max-height: 50px;
`

export const Nav = () => {
  const { user } = useSelector(state => state.user);
  let navigate = useNavigate()
  const dispatch = useDispatch()

  if (!user) return navigate("/", { replace: true })
  const { Role: role } = user

  const handleLogout = () => {
    dispatch(
      logOut()
    )
    navigate("/", { replace: true })
  }

  return (
    <LayoutNav className="navbar navbar-expand-lg navbar-dark">
      <div className="collapse navbar-collapse" id="navbarScroll">
        <div>
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
            {role !== 1 ?
              <>
                <li className="nav-item">
                  <Link to={"/prospects"} className="nav-link"></Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <Link to={"/prospects"} className="nav-link">Prospectos</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/affiliets"} className="nav-link">Red de Afiliados</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to={""} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Parametros
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><Link to={"/payments"} className="dropdown-item">Frecuencia de Pago</Link></li>
                    <li><Link to={"/housings"} className="dropdown-item">Tipo de Viviendas</Link></li>
                    <li><Link to={"/civilstatus"} className="dropdown-item">Estado Civil</Link></li>
                    <li><Link to={"/purposes"} className="dropdown-item">Propósito del Préstamo</Link></li>
                    <li><Link to={"/profesions_lw"} className="dropdown-item">Profesiones Linea Blanca</Link></li>
                    <li><Link to={"/planillas_j"} className="dropdown-item">Planillas CSS</Link></li>
                    <li><Link to={"/institutions"} className="dropdown-item">Instituciones</Link></li>
                    <li><Link to={"/estados_tramite"} className="dropdown-item">Estados del Trámite</Link></li>
                    <li><Link to={"/type_documents"} className="dropdown-item">Tipo de Documentos</Link></li>
                    <li><Link to={"/terms_loan"} className="dropdown-item">Plazos del Préstamo</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link to={""} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><Link to={"/entities_f"} className="dropdown-item">Entidades Financieras</Link></li>
                    <li><Link to={"/sectors"} className="dropdown-item">Sector Laboral</Link></li>
                    <li><Link to={"/profesions"} className="dropdown-item">Profesión</Link></li>
                    <li><Link to={"/sector_profesion"} className="dropdown-item">Rel. Sector - Profesión</Link></li>
                    <li><Link to={"/entity_params"} className="dropdown-item">Tarifas para los Cálculos</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link to={""} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Users
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><Link to={"/roles"} className="dropdown-item">Roles</Link></li>
                    <li><Link to={"/users"} className="dropdown-item">Usuarios</Link></li>
                    <li><Link to={"/solFinancomer"} className="dropdown-item">Financomer</Link></li>
                  </ul>
                </li>
              </>}
          </ul>
        </div>
        <div style={{ flex: 1 }} />
        <div>
          {user ?
            <button onClick={handleLogout} className="btn btn-info" type="button">Log Out</button>
            :
            ""
          }
        </div>
      </div>
    </LayoutNav>
  )
}