import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Query,Loading, Mutation} from 'react-admin';
import { showNotification } from 'react-admin';
import { push } from 'react-router-redux';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(Actuador, Descripcion, Activado, Umbral, Automatico, Minutos ) {
  return { Actuador, Descripcion, Activado, Umbral, Automatico, Minutos };
}

export default function Controls(dataf) {
  const classes = useStyles();
  var rows2 = dataf.actuatorsD;
  var statesVars = Object.assign(...rows2.map(({Actuador, Activado}) => ({[Actuador]: Activado})));
  const [state, setState] = React.useState(statesVars);
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //console.log("rows",event.target.checked);
    var itemchangue = rows2.find(item => item.Actuador === event.target.name);
    var upObjt= Object.create(null);
    upObjt.name=itemchangue.Actuador;
    upObjt.id=itemchangue.id;
    upObjt.activated=event.target.checked;
    upObjt.description=itemchangue.Descripcion;
    upObjt.threshold=itemchangue.Umbral;
    upObjt.minutes=itemchangue.Minutos;
    upObjt.automatic=itemchangue.Automatico;

   // console.log("payload", upObjt);
        fetch("http://192.168.0.4:3030/actuators/"+upObjt.id, { method: 'PUT',headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('feathers-jwt')}`
        }, body: JSON.stringify(upObjt)})
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Actuador</TableCell>
            <TableCell align="left">Descripcion</TableCell>
            <TableCell align="left">Activado</TableCell>
            <TableCell align="left">Umbral</TableCell>
            <TableCell align="left">Automatico</TableCell>
            <TableCell align="left">Minutos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map(({Activado,Actuador,Automatico,Descripcion,Minutos,Umbral}) => (

                <TableRow key={Actuador}>
                  <TableCell component="th" scope="row">
                    {Actuador}
                  </TableCell>
                  <TableCell align="left">{Descripcion}</TableCell>
                  <TableCell align="left">

                    <Switch
                          checked={state[Actuador]}
                          onChange={handleChange}
                          
                          name={Actuador}
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                 
                  
                  </TableCell>
                 
                  <TableCell align="left">{Umbral}</TableCell>
                  <TableCell align="left"><Switch
                      disabled 
                      checked={Automatico}
                      onChange={handleChange}
                      name={Automatico}
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /></TableCell>
                  <TableCell align="left">{Minutos}</TableCell>
                </TableRow>
              
              )
              )
          }
            </TableBody>
          </Table>
        </TableContainer>
    );
  }
