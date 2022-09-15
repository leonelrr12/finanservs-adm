import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import {
  Box, IconButton, Paper, InputBase, InputAdornment
} from '@mui/material/';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles((theme) => ({
  item: {
    maxWidth: 545,
  },
  pageSearch: {
    [theme.breakpoints.up('sm')]: {
      display: "flex"
    }
  },
  paper: {
    padding: 5,
    margin: 10,
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      margin: 15,
      width: '50%',
    }
  }
}))

const Search = ({ prospects, setID }) => {
  const classes = useStyles()

  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState('')
  const [loading, setLoading] = useState(true);

  const search = () => {
    setLoading(true)
    const rows = []
    for (const row of prospects) {
      if (row.name.toLocaleLowerCase().includes(searched.toLocaleLowerCase())) {
        rows.push(row)
      }
    }
    return rows
  }

  const requestSearch = (ev) => {
    setSearched(ev.target.value)
  };

  const cancelSearch = () => {
    setSearched('')
    setRows(prospects.slice(0, 5))
  }

  useEffect(() => {
    if (searched && searched.length > 2) {
      setRows(search())
    } 
    if (searched.length === 0) {
      setRows(prospects)
    }
    setLoading(false)
    // eslint-disable-next-line
  }, [searched, prospects]);

  useEffect(() => {
    setRows(prospects)
  }, [prospects]);

  if (loading) {
    return (
      <div>
        <h1>Cargando ...</h1>
      </div>
    )
  }

  return (
    <div id="divSearch">
      <Box className={classes.pageSearch}>
        <Paper
          className={classes.paper}
        >
          <InputBase
            style={{ marginLeft: '5px', width: '80%' }}
            placeholder="Busqueda por Nombre"
            onChange={requestSearch}
            value={searched}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={cancelSearch}
                  edge="end"
                >
                  {
                    searched ? <CloseOutlinedIcon /> : null
                  }
                </IconButton>
              </InputAdornment>
            }
          />
          {/* <IconButton type="button" style={{ padding: '10px' }} aria-label="search">
            <SearchOutlinedIcon />
          </IconButton> */}
        </Paper>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>+</StyledTableCell>
              <StyledTableCell >ID</StyledTableCell>
              <StyledTableCell>Cedula</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Celular</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map(xrow => (
              <StyledTableRow key={xrow.id}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setID(xrow.id)}
                  >
                    <RemoveRedEyeOutlinedIcon />
                  </IconButton>
                </TableCell>
                <StyledTableCell component="th" scope="row">{xrow.id}</StyledTableCell>
                <StyledTableCell>{xrow.id_personal}</StyledTableCell>
                <StyledTableCell>{xrow.name}</StyledTableCell>
                <StyledTableCell>{xrow.cellphone}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Search;