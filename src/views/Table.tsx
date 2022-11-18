import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { render } from '@testing-library/react';

interface  rowDataI {
  name: string;
  last_name: string;
  position: number;
  points: number;

}


const  fetchTableEntries =  async (): Promise<Array<rowDataI>> => {
  let rows: Array<rowDataI> = []
   await fetch("https://quiniela-zubillaga-api.herokuapp.com/api/user-actions/get-ranking", {
    method: "GET",
    headers: {
    "Auth-token": (localStorage.getItem('token')!)
    ,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    
    }
})
    .then((response) => response.json())
    .then(response  => {
    console.log(response)
    console.log(response.data.length)
    
    for (let index = 0; index < response.data.length; index++) {

      rows.push(response.data[index].name,response.data[index].lastName,response.data[index].position,response.data[index].points)
    }
    console.log(rows)
     return rows

})
return rows
}


export default function BasicTable() {

const [isLoading, setIsLoading]  = React.useState(true)
const [rowData, setRowData]  = React.useState<Array<rowDataI>>([])

React.useEffect(async ()=>   {
  setRowData( await fetchTableEntries())
})


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell >Nombre</TableCell>
            <TableCell >Apellido</TableCell>
            <TableCell >Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.position}
              </TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.last_name}</TableCell>
              <TableCell >{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}