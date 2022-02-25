import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SolicitudFinancomer from '../SolicitudFinancomer';
import SolicitudProspect from '../SolicitudProspect';


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
  
export const InfoModal = (props) => {
  const classes = useStyles();
  const { item, open, setOpen, handleClose, entity } = props;

  // const crearPdf = async (id) => {
  //   var oReq = new XMLHttpRequest();
  //   var URLToPDF = `/upload/prospectPDF/${id}`
    
  //   oReq.open("GET", URLToPDF, true);
    
  //   oReq.responseType = "blob";
  //   oReq.onload = await function() {
  //     const pdfFile = new Blob([oReq.response], { type: "application/pdf" });
  //     const fileURL = URL.createObjectURL(pdfFile);
  //     window.open(fileURL, "_blank");
  //   };
  //   oReq.send();
  
  //   setOpen(false)
  // }


  return (
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title" className="text-center">Información General</h2>
          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableBody id="transition-modal-description">
                  {Object.keys(item).map((key) => (
                  <TableRow>
                    <TableCell align="right">{key[0] === '_' ? key.slice(3) :key.slice(2)}:</TableCell>
                    {key[0] === '_' && item[key] !== "undefined"
                      ? <TableCell align="left"><a href={item[key]} target="_blank" rel="noreferrer"><img src={item[key]} width="200" alt={key}/></a></TableCell>
                      : <TableCell align="left">{item[key] !== "undefined" ? item[key] : "?"}</TableCell>}
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.root + " text-center"}>
            <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
            {/* <Button variant="outlined" color="primary" onClick={() => { crearPdf(item['A1ID']) }}>
              Imprimir
            </Button> */}
            { entity !== '600' && <SolicitudProspect idContact={item['A1ID']} /> }
            { entity === '600' && <SolicitudFinancomer idContact={item['A1ID']} /> }

          </div>
        </div>
      </Fade>
    </Modal>
  )
}
