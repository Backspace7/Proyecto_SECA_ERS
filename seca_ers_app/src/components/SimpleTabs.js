import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Cropstate from './cropstate';
import SimpleSelect from './SimpleSelect';
import SimpleSelect2 from './SimpleSelect2';
import InsetDividers from './InsetDividers';
import InputLabel from '@material-ui/core/InputLabel';
import Controls from './controls';
import {Query,Loading} from 'react-admin';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import HistoryIcon from '@material-ui/icons/History';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import TuneIcon from '@material-ui/icons/Tune';
import Vischart from './vischart';
import Cropstates from './cropstates';
import { withStyles } from '@material-ui/core/styles';
import {FormControl,
        MenuItem,
        Select } from "@material-ui/core";

const useStyles = theme => ({
    root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    },
     formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  });
const payload2 ={
   pagination: { page: 1, perPage: 24 },
   sort: { field: 'id', order: 'ASC' },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Sensorlist  = (zona) =>(
  <Query type="GET_LIST" resource="sensors" payload={payload2}>
          {({ data, total, loading, error }) => {
              if (loading) { return <Loading />; }
              if (error) { return <p>ERROR</p>; }
              var sensorsuids = data.map(values => ({ value: values.id, location: values.location, label:values.description }));
              //console.log("object", JSON.stringify(sensorsuids));
              localStorage.setItem('sensorUids',JSON.stringify(sensorsuids));
             //console.log("inter",sensorsuids);
            
              return (
              <Grid container spacing={4}>
                  <Grid  item sm={12}  spacing={2}>
                       <div>
                       <InsetDividers zona={zona}/>
                       </div>
                  </Grid >
                  <Grid  item sm={12} spacing={4}>
                       <div>
                       <Vischart zona={zona}/>   
                       </div>
                  </Grid >
             </Grid>);
          }}
  </Query>
 );


 const Zoneslist  = () =>(

  <Query type="GET_LIST" resource="crops" payload={payload2}>
          {({ data, total, loading, error }) => {
              if (loading) { return <Loading />; }
              if (error) { return <p>ERROR</p>; }
              //console.log("object", JSON.stringify(data));
              var cropdata = data.map(values => ({ locations: values.location, crops: values.cropId, phases:values.phaseId, descriptions:values.description ,dates:values.date}));
             // console.log("object", JSON.stringify(cropdata));
              localStorage.setItem('cropData',JSON.stringify(cropdata));
             // console.log("inter",cropdata);
          return (<div>

              <Cropstate />

            </div>);
          }}
  </Query>
 );

 const Phaseslist  = () =>(

  <Query type="GET_LIST" resource="crops-stages" payload={payload2}>
          {({ data, total, loading, error }) => {
              if (loading) { return <Loading />; }
              if (error) { return <p>ERROR</p>; }
              //console.log("object", JSON.stringify(data));
              var phasedata = data.map(values => ({ id:values.id,name: values.name, family: values.family, description:values.description }));
             // console.log("object", JSON.stringify(cropdata));
              localStorage.setItem('phaseData',JSON.stringify(phasedata));
             // console.log("inter phase",phasedata);
          return null;
          }}
  </Query>
 );


const Cropslist  = () =>(

  <Query type="GET_LIST" resource="crops-types" payload={payload2}>
          {({ data, total, loading, error }) => {
              if (loading) { return <Loading />; }
              if (error) { return <p>ERROR</p>; }
              //console.log("object", JSON.stringify(data));
              var croptypedata = data.map(values => ({ id: values.id,names: values.name,  informations:values.information}));
             // console.log("object", JSON.stringify(cropdata));
              localStorage.setItem('croptypeData',JSON.stringify(croptypedata));
             // console.log("inter",cropdata);
             return null;
         }}
  </Query>
 );


const Controllist = () =>(

  <Query type="GET_LIST" resource="actuators" payload={payload2}>
          {({ data, total, loading, error }) => {
              if (loading) { return <Loading />; }
              if (error) { return <p>ERROR</p>; }
              //console.log("object", JSON.stringify(data));
              var actuatorsD = data.map(values => ({ id: values.id, Actuador: values.name,  Descripcion:values.description, Activado: values.activated, Umbral:values.threshold, Automatico: values.automatic, Minutos:values.minutes}));
              //console.log("object", JSON.stringify(actuatorsD));
             // console.log("inter",cropdata);
             return <Controls actuatorsD={actuatorsD}/>;
         }}
  </Query>

);
var zone_list = JSON.parse(localStorage.getItem('zoneData'));
class SimpleTabs extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      value:0,
      zona:1,
    }
  }
  
  handleChange = (event, newValue) => {
    this.setState({value:newValue});
  };
  handleChange1 = event => {
      //console.log("event",event.target.value)
     this.setState({ zona: event.target.value });
  };
  render(){
     const { classes,zonedata } = this.props;
     
    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab icon={<HistoryIcon/>}label="Monitoreo 24H" {...a11yProps(0)} />
          <Tab icon={<ImportContactsIcon/>}label="Historicos" {...a11yProps(1)} />
          <Tab icon={<TrendingUpIcon/>} label="Informes Datos" {...a11yProps(2)} />
          <Tab icon={<LocalFloristIcon/>} label="Estado Fenologico" {...a11yProps(3)} />
          <Tab icon={<TuneIcon/>} label="Control" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>
      <div className="container">
      <Grid container justify="flex-start">
        <Grid item xs={6}>
            <FormControl className={classes.formControl} >
              <InputLabel id="demo-simple-select-helper-label">Seleccione Zona</InputLabel>
              <Select
                label="With placeholder"
                value={this.state.zona}
                onChange={this.handleChange1}
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {zonedata.map(option => (
                <MenuItem  key={option.id} value={option.id}>
                 {option.zuid}, {option.location}
                </MenuItem>))}
              </Select>
            </FormControl>
        </Grid>
       </Grid>
       </div>
        <Sensorlist zid={this.state.zona}/>


      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        <SimpleSelect/>
      </TabPanel>
      <TabPanel value={this.state.value} index={2} icon={<TrendingUpIcon/>}>
        <SimpleSelect2/>
      </TabPanel>
      <TabPanel value={this.state.value} index={3} icon={<LocalFloristIcon/>}>
      <div className="container">
      <Cropslist/>
      <Grid container justify="flex-start">
        <Grid item xs={6}>
            <FormControl className={classes.formControl} >
              <InputLabel id="demo-simple-select-helper-label">Seleccione Zona</InputLabel>
              <Select
                label="With placeholder"
                value={this.state.zona}
                onChange={this.handleChange1}
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {zonedata.map(option => (
                <MenuItem  key={option.id} value={option.id}>
                 {option.zuid}, {option.location}
                </MenuItem>))}
              </Select>
            </FormControl>
        </Grid>
       </Grid>
       </div>
        <Phaseslist/>
        <Cropslist/>
        <Cropstates zona={this.state.zona}/>
      </TabPanel>
       <TabPanel value={this.state.value} index={4} icon={<TuneIcon/>}>
          <h2>Sistema de Control en Actuadores (Beta)</h2>
          <Controllist/>
          
      </TabPanel>
    </div>
    );
  }
}
export default withStyles(useStyles)(SimpleTabs)