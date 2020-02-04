import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chart from './chart';
import Chartbar from './chartbar';
import Cuztomchart from './cuztomchart';
import Chartscatter from './chartscatter';
import TestComp from './TestComp';
import SimpleSelect from './SimpleSelect';
import SimpleSelect2 from './SimpleSelect2';
import InsetDividers from './InsetDividers';
import {Query,Loading} from 'react-admin';
const payload2 ={
   pagination: { page: 1, perPage: 10 },
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
const Sensorlist  = () =>(
  <Query type="GET_LIST" resource="sensors" payload={payload2}>
          {({ data, total, loading, error }) => {
              if (loading) { return <Loading />; }
              if (error) { return <p>ERROR</p>; }
              var sensorsuids = data.map(values => ({ value: values.id, location: values.location, label:values.description }));
              //console.log("object", JSON.stringify(sensorsuids));
              localStorage.setItem('sensorUids',JSON.stringify(sensorsuids));
             // console.log("inter",sensorsuids);
              return (
              <Grid container spacing={4}>
               <Grid  item sm={6}  spacing={2}>
                      <InsetDividers/>
                </Grid >
                <Grid  item sm={12}  spacing={4}>
                  {<Chartbar sensorsuids={sensorsuids}/>}
                </Grid >
             
              <Grid  item sm={12} spacing={4}>
                <div>
                  {<Cuztomchart sensorsuids={sensorsuids}/>}               
                </div>
              </Grid >
          </Grid>);
          }}
  </Query>
 );
export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Monitoreo 24H" {...a11yProps(0)} />
          <Tab label="Historicos" {...a11yProps(1)} />
          <Tab label="Informes Datos" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Sensorlist/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SimpleSelect/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SimpleSelect2/>
      </TabPanel>
    </div>
  );
}
