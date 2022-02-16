import { useEffect, useState } from "react";
import pdfMake from "pdfmake";
import vfs from "../fonts/vfs_fonts";
import axios from "axios";
// import html2canvas from "html2canvas";
// import { lookAheadData } from "../test-data";
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

// const parseLookAheadData = ({ scheduleData }) => {
//   return scheduleData
//     .map((d) => {
//       const milestoneData = d.recentMilestones.map((m) => {
//         return {
//           projectName: d.projectName,
//           phaseName: d.phaseName,
//           completionDate: d.completionDate,
//           totalDelay: d.totalDelay,
//           ...m
//         };
//       });
//       return milestoneData;
//     })
//     .flat();
// };

// const parseToPdfData = (data) => {
//   return data.map((d) => {
//     const status = d.status === "IP" ? "In Progress" : "Not Started";
//     return [
//       d.projectName,
//       d.phaseName,
//       d.name,
//       d.baselineDate,
//       status,
//       d.plannedDate,
//       d.completionDate,
//       d.totalDelay
//     ];
//   });
// };

// const headers = [
//   "Project",
//   "Project Phase",
//   "Recent Milestone",
//   "Baseline",
//   "Status",
//   "Planned",
//   "Completion",
//   "Total Delay"
// ];

const header0 = [{ text: "A. DATOS CLIENTE (COMPLETAR POR EL CLIENTE)", style: "blueWhite" }]

const header1 = [{ text: "Nombres", style: "alignCenter" }, { text: "Apellidos", style: "alignCenter" }, { text: "Cédula", style: "alignCenter" }]
const rowData1 = [["Juan", "Perez", "8-74-8965"]]

const header2 = ["Fecha de Nacimiento", "Sexo", "Estado Civíl", "Edad"]
const rowData2 = [["15-Abr-1965", "M o F", "Casado5", "56"]]

const docDefinitionDefault = {
  pageSize: "A4",
  // pageOrientation: "landscape",
  pageMargins: [40, 60, 40, 60],
  content: [
    {
      text: 'SOLICITUD DE PRÉSTAMO FINANCOMER',
      style: 'header',
      alignment: "center"
    }
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
  // const [url, setUrl] = useState(null);
  const [data, setData] = useState([]);
  // const [pdfData, setPdfData] = useState([]);
  const [docDefinition, setDocDefinition] = useState({});

  const getData = async () => {
    const res = await axios.get(URL_API + '/upload/solicitudFinancomer/177')
    const da = await res.data
    setData(da)
  }

  // useEffect(() => {
  //   return () => {
  //     if (url !== null) {
  //       URL.revokeObjectURL(url);
  //     }
  //   };
  // }, [url]);

  const setTableBodyData = () => {
    const template = { ...docDefinitionDefault };
    template.content[1].table.body = [header0];
    template.content[2].table.body = [header1, ...rowData1];
    template.content[3].table.body = [header2, ...rowData2];
    setDocDefinition(template);
  };

  // useEffect(() => {
  //   const parsed = parseLookAheadData(lookAheadData);
  //   const pdfData = parseToPdfData(parsed);
  //   setPdfData(pdfData);
  //   setData(parsed);
  //   debugger
  // }, []);

  useEffect(() => {
    setTableBodyData();
  }, [data]);

  useEffect(() => {
    getData()
  }, [])

  const create = () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.open();
  };

  // const genPdf = () => {
  //   //get table html
  //   const pdfTable = document.getElementById("divToPrint");
  //   html2canvas(pdfTable).then(function (canvas) {
  //     const imgObj = {
  //       image: canvas.toDataURL(),
  //       width: 600,
  //       style: {
  //         alignment: "center"
  //       }
  //     };
  //     const documentDefinition = {
  //       content: [imgObj],
  //       defaultStyle: {
  //         font: "Roboto"
  //       },
  //       pageSize: "A4",
  //       pageOrientation: "landscape",
  //       pageMargins: [40, 60, 40, 60]
  //     };
  //     const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  //     pdfDocGenerator.download();
  //   });
  // };

  return (
    <div>
      <h2>Solicitud de Présatmo de Financomer</h2>
      <button onClick={create}>Descargar Formulario</button>
    </div>
  );
}
