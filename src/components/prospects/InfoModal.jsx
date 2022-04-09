import { 
  Box,
  Button,  
  Modal, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SolicitudFinancomer from '../SolicitudFinancomer';
import SolicitudProspect from '../SolicitudProspect';


const useStyles = makeStyles( (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '2%',
    // boxShadow: theme.shadows[5],
    padding: 2, //theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 500,
  },
  root: {
    '& > *': {
      margin: 2, //theme.spacing(1),
    },
  },   
  root2: {
    flexGrow: 1,
  },
  paper2: {
    padding: 2, //theme.spacing(2),
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
        open={open}
        title="Nuevo Usuario"
        onCancel={handleClose}
        centered
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '95%' },
            position: 'relative',
            alignContent: 'center',
            width: 700,
            borderRadius: '7px',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            p: 2,
          }}
        >
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

        <Box textAlign="center" sx={{ mt: 1.5 }}>
          <Button sx={{ mr: 2 }} variant="contained" color="primary" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
          { entity !== '600' && <SolicitudProspect idContact={item['A1ID']} /> }
          { entity === '600' && <SolicitudFinancomer idContact={item['A1ID']} /> }
        </Box>
      </Box>
    </Modal>
  )
}
