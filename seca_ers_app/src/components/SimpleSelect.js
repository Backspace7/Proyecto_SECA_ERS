import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import TestComp from './TestComp';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
}));




export default function SimpleSelect() {
  const classes = useStyles();
  const [SensorId, setSensorId] = React.useState('');
  const [SelectDateFrom, setSelectDateFrom] = React.useState('');
  const [SelectDateTo, setSelectDateTo] = React.useState('');
  const [SelectTimeFrom, setSelectTimeFrom] = React.useState('');
  const [SelectTimeTo, setSelectTimeTo] = React.useState('');
  const [FullDateFrom, setFullDateFrom] = React.useState('');
  const [FullDateTo, setFullDateTo] = React.useState('');
  const [FullTimeFrom, setFullTimeFrom] = React.useState('');
  const [FullTimeTo, setFullTimeTo] = React.useState('');
  
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
  const handleDateChange3 = event => {
    if(event!=null){
      var fulltime = event.getHours()+":"+event.getMinutes();
      console.log("hour ", fulltime);
      setFullTimeFrom(fulltime);
    }
    setSelectTimeFrom(event);
  };
  const handleDateChange4 = event => {
    if(event!=null){
      var fulltime = event.getHours()+":"+event.getMinutes();
      setFullTimeTo(fulltime);
    }
    setSelectTimeTo(event);
  };

  return (

    <div>
    <div className="container">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
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
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          placeholder="Hora inicial"
          format="hh:mm"
          value={SelectTimeFrom}
          onChange={handleDateChange3}
          KeyboardButtonProps={{
            'aria-label': 'change time',
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
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          placeholder="Hora Limite"
          format="hh:mm"
          value={SelectTimeTo}
          onChange={handleDateChange4}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Sensor </InputLabel>
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
        <FormHelperText>Seleccione Sensor</FormHelperText>
      </FormControl>

      
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
