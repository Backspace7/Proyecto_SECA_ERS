import React from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import OpacityIcon from '@material-ui/icons/Opacity';
import ExploreIcon from '@material-ui/icons/Explore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import GrainIcon from '@material-ui/icons/Grain';
import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
    root: {
      width: '100%',
      maxWidth: 900,
      backgroundColor: theme.palette.background.paper,
    },
  });



class InsetDividers extends React.Component  {
  constructor(props){
    super(props);
    this.state={
      fetched:false,
      zonaprevia:0,
      data:[],
      Tem:null,
      Hum:null,
      Pre:null,
      Pto:null,
    }

  }
  
  async procesData(zona){
      var data = await this.QueryData2(zona);
      this.setState({data:data});
      //console.log("data",data);
      //console.log("data0",data[0].dat);
      //console.log("data1",data[1].dat);
      //console.log("data2",data[2].dat);
      //console.log("data3",data[3].dat);
      if(data[0]!=null){
        data.map(obj =>{
            if(obj.suid=='11'){
                this.setState({Tem:obj.dat});
            }
            if(obj.suid=='99'){
               this.setState({Pto:obj.dat});
            }
            if(obj.suid=='8'){
               this.setState({Hum:obj.dat});
            }
            if(obj.suid=='3'){
              this.setState({Pre:obj.dat});
            }
          }
         );
      }else{
        this.setState({Tem:NaN});
        this.setState({Pto:NaN});
        this.setState({Hum:NaN});
        this.setState({Pre:NaN});
      }
      
      
  }
  async QueryData2(zona){
         try {
            var url="http://192.168.0.4:3030/records?&zuid="+this.props.zona.zid+"&suid=3&suid=8&suid=11&$limit=3&$sort[createdAt]=-1";
            const reposResponse = await fetch(url,{method:'get',headers:{'Content-Type':'application/json',Accept:'application/json','Authorization':`Bearer ${localStorage.getItem('feathers-jwt')}`}});
            const userRepos = await reposResponse.json();
            var data=userRepos.data;
            this.setState({fetched:true});
            return data;
          }catch (error) {
            console.log(error);
          }
    }

    QueryData(){
    
    var url="http://192.168.0.4:3030/records?&zuid="+this.props.zona.zid+"&suid=8&suid=3&suid=11&$limit=3&$sort[createdAt]=-1";
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
      var result = data.data;
      
      this.setState({ data: result })
      this.setState({ fetched: true })
      //console.log("sensordata ",this.state.data)
    })
    .catch(function(err) {
         console.log(err);
    })

  }
   render(){
    const { classes } = this.props;
    const {zona} = this.props;
    if( this.state.zonaprevia!= zona.zid){
        this.setState({zonaprevia:zona.zid});
        this.setState({fetched:false});
    }
    if(this.state.fetched===false && zona.zid !=0){
      this.procesData(zona);

    }
    
    return (
      <div>
        <Grid container className={classes.root} >
         
                <ListItemAvatar>
                  <Avatar>
                    <WbSunnyIcon />
                    
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Temperatura" secondary={!!this.state.Tem? this.state.Tem +"°C":'no data'} />

              <Divider variant="inset" component="tb"  orientation="horizontal"/>
              
                <ListItemAvatar>
                  <Avatar>
                    <OpacityIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Humedad" secondary={!!this.state.Hum? this.state.Hum +"%":'no data'} />
            
              <Divider variant="inset" component="tb" orientation="horizontal" />
           
                <ListItemAvatar>
                  <Avatar>
                    <ExploreIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Presion Atm" secondary={!!this.state.Pre? this.state.Pre +"mbr":'no data'}/>
                <Divider variant="inset" component="tb" orientation="horizontal" />
           
                <ListItemAvatar>
                  <Avatar>
                    <GrainIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Punto de Rocio" secondary={!!this.state.Pto? this.state.Pto +"°C":'no data'}/>
              </Grid>
      
      </div>
    );
  }
}
export default withStyles(useStyles)(InsetDividers)