/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import pdfMake from "pdfmake";
import vfs from "../fonts/vfs_fonts";
import axios from "axios";
import apiConfig from '../config/api'
import { Button } from "@material-ui/core";

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
      { text: idx + 1, alignment: "center" },
      d.nombreCompleto,
      { text: d.celular, alignment: "center" },
      { text: d.parentesco, alignment: "center" }
    ];
  });
};

const docDefinitionDefault = {
  pageSize: "LETTER",
  // pageOrientation: "landscape",
  pageMargins: [40, 60, 40, 60],
  content: [
    {
      text: 'Información del Prospecto',
      style: 'header',
      alignment: "center"
    },
    '\n',  
    {
      text: "",
      style: 'header20',
    },
    '\n',  
    {
      layout: 'noBorders', 
      table: {
        widths: [370, '*'],
        body: [  
          [],
        ]
      }
    },
    {
      table: {
        widths: [ 'auto', 'auto', 'auto', '*' ],
        body: [
          []
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
    '\n',  
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
        widths: [ 130, 130, 110, "*" ],
        body: [
          [],
          ["", "", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [ 130, 130, 55, 48, '*' ],
        body: [
          [],
          ["", "", "", "", ""]
        ]
      }
    },
    '\n',  
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
    '\n',  
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
    // '\n',   
    // {
    //   table: {
    //     headerRows: 1,
    //     widths: [ '*' ],
    //     body: [
    //       [],
    //     ]
    //   }
    // }, 
    // {
    //   table: {
    //     headerRows: 1,
    //     widths: [ '*' ],
    //     body: [
    //       [],
    //     ]
    //   }
    // }, 
    // '\n',   
    // {
    //   table: {
    //     headerRows: 1,
    //     widths: [ '*', '*', '*' ],
    //     heights: 80,
    //     body: [
    //       ["", "", ""]
    //     ]
    //   }
    // }, 
  ],
  defaultStyle: {
    font: "Roboto",
    fontSize: 9,
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
      fontSize: 6
    },
    header20: {
      fontSize: 20,
      alignment: 'center'
    },
    blueWhite: {
      fillColor: '#0d6efd',
      color: 'white',
      fontSize: 10,
      bold: true
    }
  }
};

export default function SolicitudProspect({ idContact }) {
  const [data, setData] = useState({});
  const [refe, setRefe] = useState([]);
  const [docDefinition, setDocDefinition] = useState({});

  const getData = async (id) => {
    const res = await axios.get(URL_API + `/upload/datosProspect/${id}`)
    const da = await res.data
    
    setData(da.Info)
    if(Object.keys(da.Refe).length) {
      setRefe(parseToPdfData(da.Refe))
    }
  }

  const hoyes = new Date().toUTCString()
  const div1 = [{ text: "A. DATOS CLIENTE (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div2 = [{ text: "B. DOMICILIO DEL CLIENTE (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div3 = [{ text: "C. INFORMACIÓN LABORAL (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div4 = [{ text: "D. RFERENCIAS PERSONALES (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  // const div5 = [{ text: "AUTORIZACIÓN PARA REFERENCIAS DE LA ASOCIACIÓN PANAMEÑA DE CREDITO (APC)", style: "blueWhite" }]

  const headerf = [{ style: 'small1', alignment: 'right', text: 'Fecha: ' }, 
            { style: 'small1', text: hoyes }]
  const header0 = [{ text: ['ID: ',  data.id], style: 'blueWhite' }, { text: ['Alta: ', data.fechaSolicitud] }, { text: 'Estado: ' }, { text:  data.estado, alignment: 'center', fontSize: 18 }]            
  const header1 = [{ text: "Nombres", style: "alignCenter" }, { text: "Apellidos", style: "alignCenter" }, { text: "Cédula", style: "alignCenter" }]
  const rowData1 = [[data?.fname + " " + data?.fname_2, data?.lname+ " " + data?.lname_2, data?.cedula]]
  const header2 = [{ text: "Fecha de Nacimiento", style: "alignCenter" }, { text: "Sexo", style: "alignCenter" }, { text: "Estado Civíl", style: "alignCenter" }, { text: "Edad", style: "alignCenter" }]
  const rowData2 = [[{ text: data?.fechaNac, style: "alignCenter" }, { text: data?.genero, style: "alignCenter" }, { text: data?.estadoCivil, style: "alignCenter" }, { text: data?.edad, style: "alignCenter" }]]

  const header3 = [{ text: "Provincia", style: "alignCenter" }, { text: "Distrito", style: "alignCenter" }, { text: "Corregimiento", style: "alignCenter" }, { text: "Barriada / Nombre del Edificio", style: "alignCenter" }]
  const rowData3 = [[data?.provincia, data?.distrito, data?.corregimiento, data?.barriada_edificio]]
  const header4 = [{ text: "Calle", style: "alignCenter" }, { text: "No. de Casa No. de Piso y Apartamento", style: "alignCenter" }, { text: "Teléfono Residencial", style: "alignCenter" }, { text: "Teléfono Celular", style: "alignCenter" }, { text: "Correo Electrónico", style: "alignCenter" }]
  const rowData4 = [[data?.calle, data?.no_casa_piso_apto, { text: data?.telefono, style: "alignCenter" }, { text: data?.celular, style: "alignCenter" }, data?.email]]

  const header5 = [{ text: "Lugar de Trabajo", style: "alignCenter" }, { text: "Ocupación / Cargo", style: "alignCenter" }, { text: "Profesión", style: "alignCenter" }]
  const rowData5 = [[data?.trabActual, data?.trabCargo, data?.profesion]]
  const header6 = [{ text: "Fecha de Ingreso (DD/MM/año)", style: "alignCenter" }, { text: "Salario", style: "alignCenter" }, { text: "Teléfono Laboral", style: "alignCenter" }, { text: "No. de Extensión", style: "alignCenter" }]
  const rowData6 = [["", { text: data?.salario, style: "alignCenter" }, { text: data?.trabTelefono, style: "alignCenter" }, { text: data?.trabTelExt, style: "alignCenter" }]]
  const rowData7 = ["Dirección Detallada del Empleo:", data?.trabDirección]

  const header8 = [ "", { text: "Nombre Completo", style: "alignCenter" }, { text: "Teléfono", style: "alignCenter" }, { text: "Parentesco", style: "alignCenter" }]
  const rowData8 = refe

  // const APC = "Por este medio autorizo(amos) expresamente a FINANCOMER S.A., sus subsidiarias y/o afiliadas, cesionarios o sucesoras, así como cualquier compañía que por una operación de cesión, administración o compra de cartera adquiera los derechos de mi crédito, a que de conformidad con lo expresado en el artículo 24 y demás disposiciones aplicables de la Ley 24 de 22 mayo de 2002, solicite, consulte, recopile, intercambie y transmita a cualquier agencia de información de datos, bancos o agentes económicos informaciones relacionadas con obligaciones o transacciones crediticias, que mantengo o pudiera mantener con dichos agentes económicos de la localidad o del exterior, sobre mi(nuestros) historial de crédito y relaciones con acreedores. También queda facultado FINANCOMER S.A., sus subsidiarias y/o afiliadas, cesionarios o sucesoras, así como cualquier compañía que, por una operación de cesión, administración o compra de cartera adquiera los derechos de mi crédito, a que solicite y obtenga información de instituciones gubernamentales relacionadas con las obligaciones o transacciones crediticias arriba referidas. Asimismo, exonero (amos) de cualquier consecuencia o responsabilidad resultante del ejercicio de solicitar o suministrar información, o por razón de cualesquiera autorizaciones contenidas en la presente carta, a FINANCOMER S.A., a sus compañías afiliadas, subsidiarias, cesionarios y/o sucesoras, a sus empleados, ejecutivos, directores, dignatarios o apoderados, así como cualquier compañía que por una operación de cesión, administración o compra de cartera adquiera los derechos de mi crédito."
  // const rowData9 = [{ text: APC, style: "small", alignment: "justify" }]
  // const rowData10 = 
  //   [{ text: "Firma del Cliente", style: "alignCenter" }, { text: "Nombre del CLiente", style: "alignCenter"}, { text: "Cédula", style: "alignCenter" }]


  const setTableBodyData = () => {
    let idx = 4
    const template = { ...docDefinitionDefault };
    template.content[2].text = data?.lname+ " " + data?.fname
    template.content[idx].table.body = [headerf]; idx+=1
    template.content[idx].table.body = [header0]; idx+=1
    template.content[idx].table.body = [div1]; idx+=1
    template.content[idx].table.body = [header1, ...rowData1]; idx+=1
    template.content[idx].table.body = [header2, ...rowData2]; idx+=2
    template.content[idx].table.body = [div2]; idx+=1
    template.content[idx].table.body = [header3, ...rowData3]; idx+=1
    template.content[idx].table.body = [header4, ...rowData4]; idx+=2
    template.content[idx].table.body = [div3]; idx+=1
    template.content[idx].table.body = [header5, ...rowData5]; idx+=1
    template.content[idx].table.body = [header6, ...rowData6]; idx+=1
    template.content[idx].table.body = [rowData7]; idx+=2
    template.content[idx].table.body = [div4]; idx+=1
    template.content[idx].table.body = [header8, ...rowData8]; idx+=2
    // template.content[idx].table.body = [div5]; idx+=1
    // template.content[idx].table.body = [rowData9]; idx+=2
    // template.content[idx].table.body = [rowData10]; idx+=1
    
    setDocDefinition(template);
  };

  const create = () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.open();
    // pdfDocGenerator.download();
  };

  useEffect(() => {
    setTableBodyData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, refe]);

  useEffect(() => {
    getData(idContact)
  }, [])

  return (
    <Button variant="outlined" color="primary" onClick={() => { create() }}>
      Solicitud de Préstamo
    </Button>
  )
}
