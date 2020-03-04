import 'date-fns';
import Moment from 'moment';
import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';



import {ResponsiveContainer, 
        Area, 
        XAxis, 
        YAxis, 
        CartesianGrid, 
        Tooltip, 
         AreaChart   } from 'recharts';
import Grid from '@material-ui/core/Grid';
import { Button} from "@material-ui/core";




class InformData extends React.Component {

	constructor(props){

	   super(props);
	   this.state = { Grd0:0,Grd5:0,Grd7:0,Grd10:0,SensorData: []};
	  }
     handleChange1 = event => {
       this.QueryData();
       
       
    };

  Grados_dia(){

    const sum = this.state.SensorData.map(element => element.Tpro).reduce((a, b) => a + (b-0), 0);
    var sum_ = sum.toFixed(2);
    this.setState({ Grd0: sum_ })
    console.log("suma",sum);
    const sum2 = this.state.SensorData.map(element => element.Tpro).reduce((a, b) => a + (b-5), 0);
    var sum2_ = sum2.toFixed(2);
    this.setState({ Grd5: sum2_})
    console.log("suma2",sum2);
    const sum3 = this.state.SensorData.map(element => element.Tpro).reduce((a, b) => a + (b-7), 0);
    var sum3_ = sum3.toFixed(2);
    this.setState({ Grd7: sum3_ })
    console.log("suma3",sum3);
    const sum4 = this.state.SensorData.map(element => element.Tpro).reduce((a, b) => a + (b-10), 0);
    var sum4_ = sum4.toFixed(2);
    this.setState({ Grd10: sum4_ })
    console.log("suma4",sum4);
  }
  QueryData(){
    console.log("props",this.props.DateFrom,this.props.DateTo);
    console.log("agroval", this.props.AgroVal)
    var url="http://localhost:3030/informs?[$limit]=100&Date[$gte]='"+this.props.DateFrom+"'&createdAt[$lte]='"+this.props.DateTo+"'&$sort[createdAt]=-1";
    console.log(url);
    if(this.props.DateFrom == '' || this.props.DateTo  =='' || this.props.TimeTo =='' || this.props.TimeFrom =='' || this.props.SensId ==''){
        url = "http://localhost:3030/informs?[$limit]=100&Date[$gte]='2020-2-7'&$sort[createdAt]=-1"
    }
    console.log("http://localhost:3030/informs?[$limit]=100&Date[$gte]='2020-2-7'&$sort[createdAt]=-1");
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
      console.log("sensordata inform ",this.state.SensorData)
      this.Grados_dia();
    })
    .catch(function(err) {
        console.info(err);
    })
  }


  render() {
    
    var result = this.state.SensorData.map(values => ({ "Tmax": values.Tmax,"Tmin": values.Tmin,"Tpro": values.Tpro, "Hour":Moment(values.createdAt).format('DD/MM ') }));
    return (

       <div className="container">

       
       <Grid container spacing={12}>
          <Grid  item sm={2}  spacing={2}>
             <Button variant="contained" color="primary" onClick={this.handleChange1} >
              Get Data
             </Button>
          </Grid >
           <Grid  item sm={2}  spacing={2}>
             <ListItemAvatar>
                  <Avatar>
                    <LocalFloristIcon style={{color:'Aquamarine'}}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.Grd0}  secondary="Grados Dia base 0"/>
          </Grid >
           <Grid  item sm={2}  spacing={2}>
             <ListItemAvatar>
                  <Avatar>
                    <LocalFloristIcon style={{color:'Aquamarine'}}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.Grd5} secondary="Grados Dia base 5" />
          </Grid >
          <Grid  item sm={2}  spacing={2}>
             <ListItemAvatar>
                  <Avatar>
                    <LocalFloristIcon style={{color:'Aquamarine'}}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.Grd7} secondary="Grados Dia base 7" />
          </Grid >
          <Grid  item sm={2}  spacing={2}>
             <ListItemAvatar>
                  <Avatar>
                    <LocalFloristIcon style={{color:'Aquamarine'}} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.Grd10} secondary="Grados Dia base 10" />
          </Grid >
       </Grid>
       <div style={{ width: '100%', height: 350}}>
             <ResponsiveContainer>
          

              <AreaChart
                  width={450}
                  height={400}
                  data={result}
                  margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                  }}
                >
        <defs>
    <linearGradient id="colorTmax" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#ff8f65" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#ff8f65" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorTpro" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#65ff8f" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#65ff8f" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorTmin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8f65ff" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8f65ff" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="Hour" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="Tmax" stroke="#ff8f65" fillOpacity={1} fill="url(#colorTmax)" />
  <Area type="monotone" dataKey="Tpro" stroke="#65ff8f" fillOpacity={1} fill="url(#colorTpro)" />
  <Area type="monotone" dataKey="Tmin" stroke="#8f65ff" fillOpacity={1} fill="url(#colorTmin)" />
        
      </AreaChart>


              </ResponsiveContainer>
            </div>
       </div>
    );
  }
}


export default InformData;