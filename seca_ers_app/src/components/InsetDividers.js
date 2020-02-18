import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import OpacityIcon from '@material-ui/icons/Opacity';
import ExploreIcon from '@material-ui/icons/Explore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { Query,Loading} from 'react-admin';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function InsetDividers() {
  const classes = useStyles();
  const payload1 ={

       
       pagination: { page: 1, perPage: 7 },
       sort: { field: 'createdAt', order: 'DESC' },
    }; 
  const Storelist = ({payload}) => (
  <div>
    <Query type="GET_LIST" resource="records" payload={payload}>
        {({ data, total, loading, error }) => {
            if (loading) { return <Loading />; }
            if (error) { return <p>ERROR</p>; }
            console.log("get_one", data);
            return (
              <Grid container className={classes.root} >
         
                <ListItemAvatar>
                  <Avatar>
                    <WbSunnyIcon />
                    
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Temperatura" secondary={data.map(function(obj){
                    if(obj.suid==11){  return obj.dat +"°C";}
                    })

                } />

              <Divider variant="inset" component="tb"  orientation="horizontal"/>
              
                <ListItemAvatar>
                  <Avatar>
                    <OpacityIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Humedad" secondary={data.map(function(obj){
                    if(obj.suid==8){  return obj.dat +"%";}
                    })

                } />
            
              <Divider variant="inset" component="tb" orientation="horizontal" />
           
                <ListItemAvatar>
                  <Avatar>
                    <ExploreIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Presion Atm" secondary={data.map(function(obj){
                    if(obj.suid==3){  return obj.dat +"mb";}
                    })

                } />
     
        </Grid>
            );
        }}
    </Query>
    </div>
); 
   
  return (
    <div>
    <Storelist payload={payload1}/>
    
    </div>
  );
}