import 'date-fns';
import Moment from 'moment';
import React, { PureComponent } from 'react';
import {ResponsiveContainer, 
        ComposedChart, 
        Line, 
        Area, 
        Bar, 
        XAxis, 
        YAxis, 
        CartesianGrid, 
        Tooltip, 
        Legend,
        BarChart,
         LineChart   } from 'recharts';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {FormControl,
        InputLabel,
        Input,
        Button,
        TextField,
        MenuItem,
        Select,
        FormHelperText } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(0)">{payload.value}</text>
      </g>
    );
  }
}


class TestComp extends React.Component {

	constructor(props){

	   super(props);
	   this.state = { SensorData: [] };
	  }
     handleChange1 = event => {
       this.QueryData();
    };
 
  QueryData(){
    console.log("props",this.props.DateFrom,this.props.DateTo);
    console.log("props",this.props.TimeFrom,this.props.TimeTo);
    var url="http://localhost:3030/records?$limit=70&createdAt[$gte]='"+this.props.DateFrom+" "+this.props.TimeFrom+":00.340Z'&createdAt[$lte]='"+this.props.DateTo+" "+this.props.TimeTo+":00.340Z'&suid="+this.props.SensId+"&$sort[createdAt]=-1";
    console.log(url);
    if(this.props.DateFrom == '' || this.props.DateTo  =='' || this.props.TimeTo =='' || this.props.TimeFrom =='' || this.props.SensId ==''){
        url = "http://localhost:3030/records?createdAt[$gt]='2019-09-11 15:22:29.340Z'&createdAt[$lt]='2019-09-11 17:22:29.340Z'&suid=7"
    }
    fetch(url,{
       method: 'get',
       headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('feathers-jwt')}`
        }
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ SensorData: data.data })
      console.log("sensordata ",this.state.SensorData)
    })
    .catch(console.log)

  }

  render() {
    
    var result = this.state.SensorData.map(values => ({ Data: values.dat, Hour:Moment(values.createdAt).format('HH:mm DD/MM') }));
    return (

       <div className="container">
       <Button variant="contained" color="primary" onClick={this.handleChange1} >
              Get Data
      </Button>
       <div style={{ width: '100%', height: 350}}>
             <ResponsiveContainer>
              <LineChart
                  width={300}
                  height={300}
                  data={result}
                  margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis dataKey="Hour" name="Date Hour" height={50} tick={<CustomizedAxisTick />} />
                  <YAxis dataKey="Data" domain={['auto', 'auto']} type="number" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Data" stroke="#82ca9d" label={<CustomizedLabel />} />
              </LineChart>
              </ResponsiveContainer>
            </div>
       </div>
    );
  }
}


export default TestComp;