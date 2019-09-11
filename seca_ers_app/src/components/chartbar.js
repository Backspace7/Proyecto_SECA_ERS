import React from 'react';
import { Query,Loading} from 'react-admin';
import Moment from 'moment';

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
        BarChart   } from 'recharts';

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
            var result = data.map(values => ({ Data: values.dat, Hour:Moment(values.createdAt).format('hh:mm a') }));
            
            return (
              <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart  width={300} height={300} data={result} margin={{ top: 10, right: 10, bottom: 10, left: 10,}}>
                      <CartesianGrid stroke="#f5f5f5" />
                      <YAxis />
                      <XAxis dataKey="Hour" />
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Legend />
                      <Bar type="monotone" dataKey="Data"  fill="#82ca9d" stroke="#8884d8" barSize={30} />
                    </BarChart >
                  </ResponsiveContainer>
              </div>
            );
        }}
    </Query>
    </div>
); 



class Chartbar extends React.Component {
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
       pagination: { page: 1, perPage: 15 },
       sort: { field: 'createdAt', order: 'DESC' },
    }; 
    return (
    
      <div style={{ width: '90%', height: 400 ,background:'white',padding:'20px','border-radius':'10px',margin: '15px' }}>
        
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
export default Chartbar;