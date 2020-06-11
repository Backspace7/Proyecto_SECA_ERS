import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import InformData from './InformData';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function SimpleSelect2() {
  const classes = useStyles();
  const [ZonaId, setZonaId] = React.useState(1);
  const [SelectDateFrom, setSelectDateFrom] = React.useState("2020-3-29");
  const [SelectDateTo, setSelectDateTo] = React.useState("2020-5-25");
  const [FullDateFrom, setFullDateFrom] = React.useState("2020-3-29");
  const [FullDateTo, setFullDateTo] = React.useState("2020-5-25");
  var zone_list = JSON.parse(localStorage.getItem('zoneData'));
  const handleChange = event => {
    setZonaId(event.target.value);
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
      const day = event.getDate() +1;
      var fulldate =  event.getFullYear().toString()+'-'+month+'-'+day.toString();
      setFullDateTo(fulldate);
    }
    setSelectDateTo(event);
  };
  

  return (

    <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-start" spacing={4}  >
      <Grid item xs={3} >
         <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Fecha inicial"
          
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
          id="date-picker-dialog"placeholder="Fecha limite"
          label="Fecha limite"
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
                <InputLabel id="demo-simple-select-helper-label">Seleccione Zona</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={ZonaId}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {zone_list.map(zona => <MenuItem value={zona.id}>{zona.zuid},{zona.location},{zona.description}</MenuItem>)}
                </Select>
              </FormControl>
          </Grid>
    </Grid>
    </MuiPickersUtilsProvider>
     
    <div>
      <Grid container spacing={4}>
          <Grid  item sm={12}  spacing={4}>
            <InformData zona={ZonaId} DateFrom={FullDateFrom} DateTo={FullDateTo}  />
          </Grid >
      </Grid>
    </div>
      
    </div>
    
  );
}
