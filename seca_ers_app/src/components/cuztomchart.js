import React, { PureComponent } from 'react';
import { Query,Loading} from 'react-admin';
import Moment from 'moment';
import TestComp from './TestComp';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer,
} from 'recharts';
import {FormControl,
        InputLabel,
        Input,
        Button,
        TextField,
        MenuItem,
        Select,
        FormHelperText } from "@material-ui/core";


const Storelist = ({payload}) => (
  <div>
    <Query type="GET_MANY_REFERENCE" resource="records" payload={payload}>
        {({ data, total, loading, error }) => {
            if (loading) { return <Loading />; }
            if (error) { return <p>ERROR</p>; }
            console.log("data ->",data)
            var result = data.map(values => ({ Data: values.dat, Hour:Moment(values.createdAt).format('HH:mm DD/MM ') }));
            return (
            <div style={{ width: '100%', height: 350}}>
             <ResponsiveContainer>
              <LineChart
                  width={300}
                  height={300}
                  data={result}
                  margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Hour" name="Date Hour" height={50} tick={<CustomizedAxisTick />} />
                  <YAxis dataKey="Data" domain={['auto', 'auto']} type="number" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Data" stroke="#82ca9d" label={<CustomizedLabel />} />
              </LineChart>
              </ResponsiveContainer>
            </div>
            );
        }}
    </Query>
    </div>
); 
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

export default class Cuztomchart extends PureComponent {
  constructor(props){
   super(props);
   this.state = { s_uid: '1', t_uid:'2', sensors:[], };
    }
  handleChange1 = event => {
    console.log("event",event)
     this.setState({ s_uid: event.target.value });
  };
  handleChange2 = event => {
     this.setState({ t_uid: event.target.value });
  };

  render() {
     const payload ={

       filter:{'suid':this.state.s_uid},
       pagination: { page: 1, perPage: 24 },
       sort: { field: 'createdAt', order: 'DESC' },
    }; 
    return (
      <div style={{ width: '90%', height: 350 ,background:'white',padding:'20px','borderRadius':'10px',margin: '20px'} }>
        
        {console.log("this data",this.props.sensorsuids)}
        <div>
          
          <form  autoComplete="off" >
            <FormControl >
              <FormHelperText>Select sensor description</FormHelperText>

              <Select
                label="With placeholder"
                value={this.state.s_uid}
                onChange={this.handleChange1}
              >
              {this.props.sensorsuids.map(option => (
                <MenuItem  key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
              </Select>
            </FormControl>
          </form>

        
        </div>
        <div>

        <Storelist payload={payload}/>
        </div>
      </div>
      
    );
  }
}
