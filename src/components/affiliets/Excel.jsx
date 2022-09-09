import ReactExport from "react-export-excel";
import GridOnIcon from '@mui/icons-material/GridOn';
import { Button } from "@mui/material";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadExcel = ({items}) => {

    return (
        <ExcelFile element={            
            <Button
            color="primary"
            variant="contained"
            endIcon={<GridOnIcon />}
          >Exportar a Excel</Button>}>
            <ExcelSheet data={items} name="Afiliados">
                <ExcelColumn label="ID" value="id"/>
                <ExcelColumn label="Nombre" value="Nombre"/>
                <ExcelColumn label="Celular" value="celular"/>
                <ExcelColumn label="Email" value="email"/>
                <ExcelColumn label="Sponsor" value="Sponsor"/>
                <ExcelColumn label="Creado en:" value="dateCreated"/>
                <ExcelColumn label="Estado Solicitud" value="Estado"/>
                <ExcelColumn label="Fecha" value="fcreate"/>
                <ExcelColumn label="Monto" value="loanPP"/>
            </ExcelSheet>
        </ExcelFile>
    );
}

export default DownloadExcel;