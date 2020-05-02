import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import TestComp from './TestComp';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




export default function SimpleSelect() {
  const classes = useStyles();
  const [SensorId, setSensorId] = React.useState('');
  const [SelectDateFrom, setSelectDateFrom] = React.useState("2020-3-30");
  const [SelectDateTo, setSelectDateTo] = React.useState("2020-4-12");
  
  const [FullDateFrom, setFullDateFrom] = React.useState("2020-3-29");
  const [FullDateTo, setFullDateTo] = React.useState("2020-4-11");
  const [FullTimeFrom, setFullTimeFrom] = React.useState("00:00");
  const [FullTimeTo, setFullTimeTo] = React.useState("23:00");
  
  const inputLabel = React.useRef(null);
  var sensorsData = JSON.parse(JSON.stringify(localStorage.getItem('sensorUids')));
  
  const handleChange = event => {
    setSensorId(event.target.value);
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
    <div className="container">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-start">
      <Grid item xs={3}>
         <KeyboardDatePicker
          disableToolbar
          variant="inline"
          margin="normal"
          label="Fecha inicial"
          id="date-picker-dialog"
          
          format="MM/dd/yyyy"
          value={SelectDateFrom}
          onChange={handleDateChange1}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        <Grid item xs={3}>
        <KeyboardDatePicker
          margin="normal"
          disableToolbar
          variant="inline"
          label="Fecha limite"
          id="date-picker-dialog"
          
          format="MM/dd/yyyy"
          value={SelectDateTo}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
          <Grid item xs={3}>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Seleccione Sensor</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={SensorId}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {JSON.parse(sensorsData).map(sensor => <MenuItem value={sensor.value}>{sensor.label}, {sensor.location}</MenuItem>)}
         
        </Select>
        
      </FormControl>
      </Grid>

      </Grid>
      </MuiPickersUtilsProvider>

      </div>
      
      
      
      <div>

      <Grid container spacing={4}>
          <Grid  item sm={12}  spacing={4}>
            {console.log("json",FullDateFrom,FullDateTo)}
            <TestComp DateFrom={FullDateFrom} DateTo={FullDateTo} SensId={SensorId} TimeFrom={FullTimeFrom} TimeTo={FullTimeTo}/>
          </Grid >
          
      </Grid>
      </div>
      
    </div>
    
  );
}
