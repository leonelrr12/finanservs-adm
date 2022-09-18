/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import pdfMake from "pdfmake";
import vfs from "../fonts/vfs_fonts";
import axios from "axios";
import apiConfig from '../config/api'
import { Button } from "@mui/material";
import PrintIcon from '@mui/icons-material/LocalPrintshop';

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

const separator = (numb) => {
  var str = numb.toString().split(".");
  if (str.length > 1) {
    str[1] = str[1].padEnd(2, '0')
  } else {
    str[1] = '00'
  }
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

let cnt = 0, cna = 0, cnr = 0, cnp = 0;

const parseToPdfData = (data) => {
  return data.map((d, idx) => {

    cnt += 1;
    if (d.estado === 'Rechazado') {
      cnr += 1
    } else if (d.estado === 'Aprobado') {
      cna += 1
    } else cnp += 1

    return [
      { style: ['small', 'center'], text: d.id },
      { style: 'small', text: d.name },
      { style: 'small', text: d.cedula },
      { style: 'small', text: d.email },
      { style: 'small', text: d.celular },
      { style: 'small', text: d.telefono },
      { style: ['small', 'center'], text: d.fecha },
      { style: ['small', 'right'], text: separator(d.monto) },
      { style: ['small', 'center'], text: d.sector },
      { style: ['small', 'left'], text: d.ejecutivo },
      { style: ['small', 'center'], text: d.estado },
      { style: 'small', text: d.comentarios }
    ];
  });
};

const docDefinitionDefault = {
  pageSize: "LETTER",
  pageOrientation: "landscape",
  pageMargins: [20, 20, 20, 20],
  content: [
    {
      text: 'Listado de Prospectos',
      style: 'header',
      alignment: "center"
    },
    '\n',
    {
      text: "",
      style: 'samll8',
      alignment: "center"
    },
    '\n',
    {
      layout: 'noBorders',
      table: {
        widths: ['*', 370, '*'],
        body: [
          [],
        ]
      }
    },
    {
      layout: 'noBorders',
      table: {
        headerRows: 1,
        widths: [20, 80, 50, 80, 50, 50, 40, 50, 40, 50, 50, '*'],
        body: [
          [],
          ["", "", "", "", "", "", "", "", "", "", "", ""],
        ]
      }
    },
    '\n\n',
    {
      layout: 'noBorders',
      table: {
        widths: [80, 30, 80, 30, 80, 30, 80, 30],
        body: [
          [],
        ]
      }
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
    small8: {
      fontSize: 8
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

export default function ListProspects({ id, estado, nameEntity }) {
  const [data, setData] = useState([]);
  const [resumen, setResumen] = useState([]);
  const [docDefinition, setDocDefinition] = useState({});

  const getData = async (id, estado) => {
    const res = await axios.get(URL_API + `/upload/prospectsPDF/${id}/${estado}`)
    const da = await res.data

    console.log(da)
    cnt = 0; cna = 0; cnr = 0; cnp = 0;
    setData(parseToPdfData(da))
  }

  const hoyes = new Date().toUTCString()

  const headerf = [
    { style: 'small1', text: nameEntity },
    { style: 'small1', alignment: 'right', text: 'Fecha: ' },
    { style: 'small1', text: hoyes }
  ]

  const header0 = [
    { style: ['blueWhite', 'center'], text: 'ID' },
    { style: 'blueWhite', text: 'Nombre' },
    { style: 'blueWhite', text: 'Cédula' },
    { style: 'blueWhite', text: 'Email' },
    { style: 'blueWhite', text: 'Celular' },
    { style: 'blueWhite', text: 'Teléfono' },
    { style: ['blueWhite', 'center'], text: 'Fecha' },
    { style: ['blueWhite', 'right'], text: 'Monto' },
    { style: ['blueWhite', 'center'], text: 'Sector' },
    { style: 'blueWhite', text: 'Ejecutivo' },
    { style: ['blueWhite', 'center'], text: 'Estado' },
    { style: 'blueWhite', text: 'Comentarios' },
  ]

  const setTableBodyData = () => {
    let idx = 4
    const template = { ...docDefinitionDefault };
    template.content[2].text = 'Período de: xx/xx/xxxx a xx/xx/xxx'
    template.content[idx].table.body = [headerf]; idx += 1
    template.content[idx].table.body = [header0, ...data]; idx += 2
    template.content[idx].table.body = [...resumen]; idx += 1

    setDocDefinition(template);
  };

  const create = async () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.open();
    // pdfDocGenerator.download();
  };

  useEffect(() => {
    setTableBodyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);


  useEffect(() => {
    const fnData = async () => {
      await getData(id, estado)

      const res = []
      res.push({ style: 'blueWhite', text: 'Total prospectos:' }, { text: cnt, style: 'small1' })
      res.push({ style: 'blueWhite', text: 'Aprobadoss:' }, { text: cna, style: 'small1' })
      res.push({ style: 'blueWhite', text: 'Rechazados:' }, { text: cnr, style: 'small1' })
      res.push({ style: 'blueWhite', text: 'En Proceso:' }, { text: cnp, style: 'small1' })

      setResumen([res])
    }
    fnData()
  }, [id, estado])


  return (
    <Button
      onClick={() => { create() }}
      color="secondary"
      variant="contained"
      endIcon={<PrintIcon />}
    >Imprimir</Button>
  )
}
