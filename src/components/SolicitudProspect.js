/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import pdfMake from "pdfmake";
import vfs from "../fonts/vfs_fonts";

import axios from "axios";
import apiConfig from '../config/api'
import { Button } from "@mui/material";


const URL_API = apiConfig.domain
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const f = new Date();
const hoyEs = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();

const separator = (numb) => {
  if (isNaN(numb)) return '0.00'
  var str = numb.toString().split(".");
  if (str.length > 1) {
    str[1] = str[1].padEnd(2, '0')
  } else {
    str[1] = '00'
  }
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}


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
  pageMargins: [40, 20, 40, 60],
  content: [
    {
      image: "LogoFina",
      width: 50
    },
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
    {
      layout: 'noBorders',
      table: {
        widths: [150, '*'],
        body: [
          [],
        ]
      }
    },
    {
      layout: 'noBorders',
      table: {
        widths: [400, '*'],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        widths: ['auto', 100, 'auto', 100, 'auto', 80, 'auto', 'auto', 'auto', '*'],
        body: [
          []
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [200, 200, '*'],
        body: [
          [],
          ["", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: ['auto', '*', '*', "*"],
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
        widths: ['*'],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [130, 130, 110, "*"],
        body: [
          [],
          ["", "", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [130, 130, 55, 48, '*'],
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
        widths: ['*'],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: ['auto', '*', '*'],
        body: [
          [],
          ["", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: ['auto', '*', '*', "*"],
        body: [
          [],
          ["", "", "", ""]
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [120, '*'],
        body: [
          [],
        ]
      }
    },
    '\n',
    {
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [],
        ]
      }
    },
    {
      table: {
        headerRows: 1,
        widths: [50, '*', '*', '*'],
        body: [
          [],
          ["", "", "", ""]
        ]
      }
    },
    '\n',
    {
      image: "FirmaRS",
      width: 300
    },
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
  },
  images: {
    "LogoFina": "data:image/png;base64,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",
    "FirmaRS": "data:image/png;base64,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"
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
    if (Object.keys(da.Refe).length) {
      setRefe(parseToPdfData(da.Refe))
    }
  }

  // const hoyes = new Date().toUTCString()
  const div1 = [{ text: "A. DATOS CLIENTE (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div2 = [{ text: "B. DOMICILIO DEL CLIENTE (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div3 = [{ text: "C. INFORMACIÓN LABORAL (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]
  const div4 = [{ text: "D. RFERENCIAS PERSONALES (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]

  const headerf = [{ style: 'small1', alignment: 'right', text: 'Fecha: ' }, { style: 'small1', text: hoyEs }]
  // const header0 = [{ text: ['ID: ',  data.id]
  const header0 = [{ text: 'ID:', style: 'blueWhite' },
  { text: ['Alta: ', data.fechaSolicitud], fontSize: 12 },
  { text: 'Estado: ' }, { text: data.estado, alignment: 'left', fontSize: 18 },
  { text: 'Monto: ' }, { text: separator(data.monto), alignment: 'right', fontSize: 14 },
  { text: 'Plazo: ' }, { text: data.plazo, alignment: 'right' },
  { text: 'Letra: ' }, { text: data.letra, alignment: 'right' }
  ]
  const header1 = [{ text: "Nombres", style: "alignCenter" }, { text: "Apellidos", style: "alignCenter" }, { text: "Cédula", style: "alignCenter" }]
  const rowData1 = [[data?.fname + " " + data?.fname_2, data?.lname + " " + data?.lname_2, data?.cedula]]
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

  const header8 = ["", { text: "Nombre Completo", style: "alignCenter" }, { text: "Teléfono", style: "alignCenter" }, { text: "Parentesco", style: "alignCenter" }]
  const rowData8 = refe
  
  // const headerH = [
  //   {
  //     image: "LogoFina",
  //     width: 50
  //   },
  //   {
  //     text: data?.lname + " " + data?.fname,
  //     style: 'header20',
  //   },
  // ]


  const setTableBodyData = () => {
    let idx = 5
    const template = { ...docDefinitionDefault };
    template.content[3].text = data?.lname + " " + data?.fname
    template.content[idx].table.body = [headerf]; idx += 1
    template.content[idx].table.body = [header0]; idx += 1
    template.content[idx].table.body = [div1]; idx += 1
    template.content[idx].table.body = [header1, ...rowData1]; idx += 1
    template.content[idx].table.body = [header2, ...rowData2]; idx += 2
    template.content[idx].table.body = [div2]; idx += 1
    template.content[idx].table.body = [header3, ...rowData3]; idx += 1
    template.content[idx].table.body = [header4, ...rowData4]; idx += 2
    template.content[idx].table.body = [div3]; idx += 1
    template.content[idx].table.body = [header5, ...rowData5]; idx += 1
    template.content[idx].table.body = [header6, ...rowData6]; idx += 1
    template.content[idx].table.body = [rowData7]; idx += 2
    template.content[idx].table.body = [div4]; idx += 1
    template.content[idx].table.body = [header8, ...rowData8]; idx += 2
    // template.content[idx].table.body = [div5]; idx+=1
    // template.content[idx].table.body = [rowData9]; idx+=2
    // template.content[idx].table.body = [rowData10]; idx+=1

    setDocDefinition(template);
  };

  const create = () => {
    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
    // pdf.download();
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
