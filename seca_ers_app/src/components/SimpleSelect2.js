import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import InformData from './InformData';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
}));




export default function SimpleSelect2() {
  const classes = useStyles();
  const [SensorId, setSensorId] = React.useState('');
  const [SelectDateFrom, setSelectDateFrom] = React.useState('');
  const [SelectDateTo, setSelectDateTo] = React.useState('');
  const [FullDateFrom, setFullDateFrom] = React.useState('');
  const [FullDateTo, setFullDateTo] = React.useState('');
  const [SelectAgroV, setSelectAgroV] = React.useState('');
  
  const inputLabel = React.useRef(null);
  var sensorsData = JSON.parse(JSON.stringify(localStorage.getItem('sensorUids')));
  
 
  const handleChange5 = event => {
    setSelectAgroV(event.target.value);
  };
  const handleDateChange1 = event => {
    if(event!=null){
      const month = event.getMonth() +1;
      var fulldate =  event.getFullYear().toString()+'-'+month+'-'+event.getDate().toString();
      setFullDateFrom(fulldate);
    }
    setSelectDateFrom(event);
  };
  const handleDateChange2 = event => {
    if(event!=null){
      const month = event.getMonth() +1;
      var fulldate =  event.getFullYear().toString()+'-'+month+'-'+event.getDate().toString();
      setFullDateTo(fulldate);
    }
    setSelectDateTo(event);
  };
  

  return (

    <div>


    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" >
         <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          placeholder="Fecha inicial"
          format="MM/dd/yyyy"
          value={SelectDateFrom}
          onChange={handleDateChange1}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          placeholder="Fecha limite"
          format="MM/dd/yyyy"
          value={SelectDateTo}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </Grid>
    </MuiPickersUtilsProvider>
     
    <div>
      <Grid container spacing={4}>
          <Grid  item sm={12}  spacing={4}>
            {console.log("json",FullDateFrom,FullDateTo)}
            <InformData DateFrom={FullDateFrom} DateTo={FullDateTo}  />
          </Grid >
      </Grid>
    </div>
      
    </div>
    
  );
}
