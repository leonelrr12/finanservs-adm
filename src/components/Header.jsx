import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../config/firebase.js'

const Header = () => {
  const history = useHistory()
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged( user => {
      if (user){
        setUser(user.email)
      }
    })
  }, [])

  const handleLogin = () => {
    history.push("/login")
  }

  const handleLogout = () => {
    auth.signOut()
    setUser(null)
    history.push("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid mx-3">
        <Link to={user ? "/" : "/login"} className="navbar-brand" href="#">
          <span className="logo">FINAN<span className="logo_2">SERVS</span></span>
        </Link>

        {user ? 
        <>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
            <li className="nav-item dropdown">
              <Link to={""} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Entidades F
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><Link to={"/entiry_f"} className="dropdown-item">Listado de Prospectos</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to={""} className="nav-link">Prospectos</Link>
            </li>
            <li className="nav-item dropdown">
              <Link to={""} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Admin
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><Link to={"/entities_f"} className="dropdown-item">Entidades Financieras</Link></li>
                <li><Link to={"/sectors"} className="dropdown-item">Sector Laboral</Link></li>
                <li><Link to={"/profesions"} className="dropdown-item">Profesión</Link></li>
                <li><Link to={"/payments"} className="dropdown-item">Frecuencia de Pago</Link></li>
                <li><Link to={"/housings"} className="dropdown-item">Tipo de Viviendas</Link></li>
                <li><Link to={"/civilstatus"} className="dropdown-item">Estado Civil</Link></li>
                <li><Link to={"/purposes"} className="dropdown-item">Propósito del Préstamo</Link></li>
                <li><Link to={"/profesions_lw"} className="dropdown-item">Profesiones Linea Blanca</Link></li>
                <li><Link to={"/planillas_j"} className="dropdown-item">Planillas CSS</Link></li>
                <li><Link to={"/institutions"} className="dropdown-item">Instituciones</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link to={""} className="dropdown-item">Tipo de Documentos</Link></li>
                <li><Link to={""} className="dropdown-item">Capacidad</Link></li>
              </ul>
            </li>
          </ul>
          <div className="d-flex">
            {user ? 
              <button onClick={handleLogout} className="btn btn-info" type="button">Log Out</button>
              :  
              (
                <button onClick={handleLogin} className="btn btn-info" type="subbuttonmit">Log In</button>
              )
            }
          </div>
        </div>
        </>
        : ""
        }
      </div>
    </nav>
  )
}

export default Header