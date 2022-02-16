import { useEffect, useState } from "react";
import pdfMake from "pdfmake";
import vfs from "../fonts/vfs_fonts";
import axios from "axios";
import apiConfig from '../config/api'

const URL_API = apiConfig.domain

pdfMake.vfs = vfs;
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
}
};

const parseToPdfData = (data) => {
  return data.map((d, idx) => {
    return [
      idx + 1,
      d.nombreCompleto,
      d.parentesco,
      d.celular
    ];
  });
};

const docDefinitionDefault = {
  pageSize: "A4",
  // pageOrientation: "landscape",
  pageMargins: [40, 60, 40, 60],
  content: [
    {
      text: 'SOLICITUD DE PRÉSTAMO FINANCOMER',
      style: 'header',
      alignment: "center"
    },
    {
      table: {
        headerRows: 1,
        widths: [ 120, 120 ],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ '*' ],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ 200, 200, '*' ],
        body: [
          [],
          ["", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ 'auto', '*', '*', "*" ],
        body: [
          [],
          ["", "", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ '*' ],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ 'auto', '*', '*', "*" ],
        body: [
          [],
          ["", "", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ 'auto', '*', '*', "*", "*" ],
        body: [
          [],
          ["", "", "", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ '*' ],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ 'auto', '*', '*' ],
        body: [
          [],
          ["", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ 'auto', '*', '*', "*" ],
        body: [
          [],
          ["", "", "", ""]
        ]
      }
    },  
    {
      table: {
        headerRows: 1,
        widths: [ 120, '*' ],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ '*' ],
        body: [
          [],
        ]
      }
    },  
    {
      table: {
        headerRows: 1,
        widths: [ 50, '*', '*', '*' ],
        body: [
          [],
          ["", "", "", ""]
        ]
      }
    },      
    {
      table: {
        headerRows: 1,
        widths: [ '*' ],
        body: [
          [],
        ]
      }
    }, 
  ],
  defaultStyle: {
    font: "Roboto"
  },
  espacioLinas: {
    lineHeight: 1,
  },
  info: {
    title: 'Información del Prospecto',
    author: 'Leonel Rodríguez R.',
    subject: 'finanservs.comt',
    keywords: 'finanservs',
  },
  styles: {
    withMargin: {
      margin: [20, 20, 20, 20]
    },
    alignCenter: {
      alignment: "center"
    },
    header: {
      fontSize: 16,
      bold: true
    },
    textBody: {
      fontSize: 12
    },
    subheader: {
      fontSize: 15,
      bold: true
    },
    quote: {
      italics: true
    },
    small: {
      fontSize: 8
    },
    header20: {
      fontSize: 20,
      alignment: 'center'
    },
    blueWhite: {
      fillColor: '#0d6efd',
      color: 'white',
      fontSize: 12,
      bold: true
    }
  }
};

export default function PruebaPDF() {
  const [data, setData] = useState({});
  const [refe, setRefe] = useState([]);
  const [docDefinition, setDocDefinition] = useState({});

  const getData = async () => {
    const res = await axios.get(URL_API + '/upload/solicitudFinancomer/177')
    const da = await res.data
    
    setData(da.Info)
    setRefe(parseToPdfData(da.Refe))
    debugger
  }

  const div1 = [{ text: "A. DATOS CLIENTE (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div2 = [{ text: "B. DOMICILIO DEL CLIENTE (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div3 = [{ text: "C. INFORMACIÓN LABORAL (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div4 = [{ text: "D. RFERENCIAS PERSONALES (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div5 = [{ text: "AUTORIZACIÓN PARA REFERENCIAS DE LA ASOCIACIÓN PANAMEÑA DE CREDITO (APC)", style: "blueWhite" }]

  const header0 = ["Fecha de la Solicitud:", data?.fechaSolicitud]
  const header1 = [{ text: "Nombres", style: "alignCenter" }, { text: "Apellidos", style: "alignCenter" }, { text: "Cédula", style: "alignCenter" }]
  const rowData1 = [[data?.fname + " " + data?.fname_2, data?.lname+ " " + data?.lname_2, data?.cedula]]
  const header2 = [{ text: "Fecha de Nacimiento", style: "alignCenter" }, { text: "Sexo", style: "alignCenter" }, { text: "Estado Civíl", style: "alignCenter" }, { text: "Edad", style: "alignCenter" }]
  const rowData2 = [[data?.fechaNac, data?.genero, data?.estadoCivil, data?.edad]]

  const header3 = [{ text: "Provincia", style: "alignCenter" }, { text: "Distrito", style: "alignCenter" }, { text: "Corregimiento", style: "alignCenter" }, { text: "Barriada / Nombre del Edificio", style: "alignCenter" }]
  const rowData3 = [[data?.provincia, data?.distrito, data?.corregimiento, data?.barrio_Casa_Calle]]
  const header4 = [{ text: "Calle", style: "alignCenter" }, { text: "No. de Casa No. de Piso y Apartamento", style: "alignCenter" }, { text: "Teléfono Residencial", style: "alignCenter" }, { text: "Teléfono Celular", style: "alignCenter" }, { text: "Correo Electrónico", style: "alignCenter" }]
  const rowData4 = [["", "", data?.telefono, data?.celular, data?.email]]

  const header5 = [{ text: "Lugar de Trabajo", style: "alignCenter" }, { text: "Ocupación / Cargo", style: "alignCenter" }, { text: "Profesión", style: "alignCenter" }]
  const rowData5 = [[data?.trabActual, data?.trabCargo, data?.profesion]]
  const header6 = [{ text: "Fecha de Ingreso (DD/MM/año)", style: "alignCenter" }, { text: "Salario", style: "alignCenter" }, { text: "Teléfono Laboral", style: "alignCenter" }, { text: "No. de Extensión", style: "alignCenter" }]
  const rowData6 = [["", data?.salario, data?.trabTelefono, data?.trabTelExt]]
  const rowData7 = ["Dirección Detallada del Emplea:", data?.trabDirección]

  const header8 = [ "", { text: "Nombre Completo", style: "alignCenter" }, { text: "Teléfono", style: "alignCenter" }, { text: "Parentesco", style: "alignCenter" }]
  const rowData8 = refe


  const setTableBodyData = () => {
    const template = { ...docDefinitionDefault };
    template.content[1].table.body = [header0];
    template.content[2].table.body = [div1];
    template.content[3].table.body = [header1, ...rowData1];
    template.content[4].table.body = [header2, ...rowData2];
    template.content[5].table.body = [div2];
    template.content[6].table.body = [header3, ...rowData3];
    template.content[7].table.body = [header4, ...rowData4];
    template.content[8].table.body = [div3];
    template.content[9].table.body = [header5, ...rowData5];
    template.content[10].table.body = [header6, ...rowData6];
    template.content[11].table.body = [rowData7];
    template.content[12].table.body = [div4];
    template.content[13].table.body = [header8, ...rowData8];
    template.content[14].table.body = [div5];
    
    setDocDefinition(template);
  };

  useEffect(() => {
    setTableBodyData();
  }, [data]);

  useEffect(() => {
    getData()
  }, [])

  const create = () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download();
  };

  return (
    <div>
      <h2>Solicitud de Présatmo de Financomer</h2>
      <button onClick={create}>Descargar Formulario</button>
    </div>
  );
}
