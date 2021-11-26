import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import NotData from '../NotData'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '2%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 500,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },   
  root2: {
    flexGrow: 1,
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }, 
}));


const Show = () => {
  const classes = useStyles();
  const history = useHistory()
  
  const [affiliets, setAffiliets] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('jwt');

    if (!loggedUserJSON) {
      history.push("/")
    }
  },[])

  useEffect(() => {
    getAll()
  },[])

  const getAll = async () => {
    const res = await axios.get('/adm/red-sponsor')
    const da = await res.data
    setAffiliets(da)
  }

  return ( 
    <>
      <h2 className="text-center my-2">Red de Afiliados</h2>
 
      <table className="table table-striped table-md">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Celular</th>
            <th scope="col">Email</th>
            <th scope="col">Sponsor</th>
            <th scope="col">Creado en:</th>
            <th scope="col">Estado Solicitud</th>
            <th scope="col">Fecha</th>
            <th scope="col">Monto</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(affiliets) === "object") ? 
            affiliets.map(item => {
              return (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td>{item.Nombre}</td>
                <td>{item.celular}</td>
                <td>{item.email}</td>
                <td>{item.Sponsor}</td>
                <td>{item.dateCreated}</td>
                <td>{item.Estado}</td>
                <td>{item.fcreate}</td>
                <td>{new Intl.NumberFormat("en-US", {currency: 'USD', minimumFractionDigits: 2}).format(Number(item.loanPP))}</td>
              </tr>
            )})
          :
            <tr>
              <td colSpan="13">
              <NotData />
              </td>
            </tr>
          }
        </tbody>
      </table>
    </>
   )
}
 

export default Show