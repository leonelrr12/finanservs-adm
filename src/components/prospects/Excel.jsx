import ReactExport from "react-export-excel";
import GridOnIcon from '@material-ui/icons/GridOn';
import { Button } from '@material-ui/core';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadExcel = ({prospects}) => {

    let prospAproved = prospects.filter(p => p.n1Estado === 1)
    let prospDecline = prospects.filter(p => p.n1Estado === 4)
    let prospResto = prospects.filter(p => p.n1Estado !== 1 && p.n1Estado !== 4)

    return (
        <ExcelFile element={            
            <Button
            color="primary"
            variant="contained"
            endIcon={<GridOnIcon />}
          >Exportar a Excel</Button>}>

            <ExcelSheet data={prospAproved} name="Aprobados">
                <ExcelColumn label="ID" value="A1ID"/>
                <ExcelColumn label="Nombre" value="A5Nombre"/>
                <ExcelColumn label="Cédula" value="A4Cédula Id"/>
                <ExcelColumn label="Entidad" value="C8Entidad"/>
                <ExcelColumn label="Email" value="C5Email"/>
                <ExcelColumn label="Celular" value="C6Celular"/>
                <ExcelColumn label="Telefono" value="C7Telefono"/>
                <ExcelColumn label="Sector" value="B1Sector"/>
                <ExcelColumn label="Profesión" value="B2Profesión"/>
                <ExcelColumn label="Ejecutivo" value="F6Ejecutivo"/>
                <ExcelColumn label="Monto solicitado" value="B6Préstamo Personal"/>
                
                <ExcelColumn label="Salario" value="B5Salario"/>
                <ExcelColumn label="Estado Civil" value="C5Estado Civil"/>
                <ExcelColumn label="Fecha Nacimiento" value="D2Fecha Nacimiento"/>

                <ExcelColumn label="Tipo Residencia" value="D4Tipo Residencia"/>
                <ExcelColumn label="Pago Casa o Alquiler" value="D5Pago Casa o Alquiler"/>

                <ExcelColumn label="Provincia" value="F2Provincia"/>
                <ExcelColumn label="Distrito" value="F3Distrito"/>
                <ExcelColumn label="Corregimiento" value="F4Corregimiento"/>
                <ExcelColumn label="Barrio casa calle" value="F5Barrio casa calle"/>

            </ExcelSheet>
            <ExcelSheet data={prospDecline} name="Rechazados">
                <ExcelColumn label="ID" value="A1ID"/>
                <ExcelColumn label="Nombre" value="A5Nombre"/>
                <ExcelColumn label="Cédula" value="A4Cédula Id"/>
                <ExcelColumn label="Entidad" value="C8Entidad"/>
                <ExcelColumn label="Email" value="C5Email"/>
                <ExcelColumn label="Celular" value="C6Celular"/>
                <ExcelColumn label="Telefono" value="C7Telefono"/>
                <ExcelColumn label="Sector" value="B1Sector"/>
                <ExcelColumn label="Profesión" value="B2Profesión"/>
                <ExcelColumn label="Ejecutivo" value="F6Ejecutivo"/>
                <ExcelColumn label="Monto solicitado" value="B6Préstamo Personal"/>

                <ExcelColumn label="Salario" value="B5Salario"/>
                <ExcelColumn label="Estado Civil" value="C5Estado Civil"/>
                <ExcelColumn label="Fecha Nacimiento" value="D2Fecha Nacimiento"/>

                <ExcelColumn label="Tipo Residencia" value="D4Tipo Residencia"/>
                <ExcelColumn label="Pago Casa o Alquiler" value="D5Pago Casa o Alquiler"/>

                <ExcelColumn label="Provincia" value="F2Provincia"/>
                <ExcelColumn label="Distrito" value="F3Distrito"/>
                <ExcelColumn label="Corregimiento" value="F4Corregimiento"/>
                <ExcelColumn label="Barrio casa calle" value="F5Barrio casa calle"/>
            </ExcelSheet>
            <ExcelSheet data={prospResto} name="Otros">
                <ExcelColumn label="ID" value="A1ID"/>
                <ExcelColumn label="Nombre" value="A5Nombre"/>
                <ExcelColumn label="Cédula" value="A4Cédula Id"/>
                <ExcelColumn label="Entidad" value="C8Entidad"/>
                <ExcelColumn label="Email" value="C5Email"/>
                <ExcelColumn label="Celular" value="C6Celular"/>
                <ExcelColumn label="Telefono" value="C7Telefono"/>
                <ExcelColumn label="Sector" value="B1Sector"/>
                <ExcelColumn label="Profesión" value="B2Profesión"/>
                <ExcelColumn label="Ejecutivo" value="F6Ejecutivo"/>
                <ExcelColumn label="Monto solicitado" value="B6Préstamo Personal"/>
                <ExcelColumn label="Estado" value="A2Estado"/>

                <ExcelColumn label="Salario" value="B5Salario"/>
                <ExcelColumn label="Estado Civil" value="C5Estado Civil"/>
                <ExcelColumn label="Fecha Nacimiento" value="D2Fecha Nacimiento"/>

                <ExcelColumn label="Tipo Residencia" value="D4Tipo Residencia"/>
                <ExcelColumn label="Pago Casa o Alquiler" value="D5Pago Casa o Alquiler"/>

                <ExcelColumn label="Provincia" value="F2Provincia"/>
                <ExcelColumn label="Distrito" value="F3Distrito"/>
                <ExcelColumn label="Corregimiento" value="F4Corregimiento"/>
                <ExcelColumn label="Barrio casa calle" value="F5Barrio casa calle"/>
            </ExcelSheet>

        </ExcelFile>
    );
}

export default DownloadExcel;