import React from 'react';
import {FormControl,
        MenuItem,
        Button,
        Grid,
        List,
        ListItem,
        ListItemText,
        Tooltip,
        Fab,
        Modal } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {CropsCreate} from './crops'
import AddIcon from '@material-ui/icons/Add';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
   	margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  rootdiv:{
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(4),
    },
    '& hr': {
      margin: theme.spacing(0, 2),
    },
  },
  paper2: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



export default function Cropstate() {
	const classes = useStyles();

	const [zone, setZone] = React.useState('zona');
	const [crop, setCrop] = React.useState('crop');
	const [CropTrace, setCropTrace] = React.useState();
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
    var cropdata = JSON.parse(JSON.stringify(localStorage.getItem('cropData')));
    var croptypedata = JSON.parse(JSON.stringify(localStorage.getItem('croptypeData')));
    var cropphases = JSON.parse(localStorage.getItem('phaseData'));
    const zones = [...new Set(JSON.parse(cropdata).map(item => item.locations))];

    const zoneCrops = JSON.parse(cropdata).filter(function(obj) {
		return obj.locations == zone;
	});

   	const zoneCrops_names = JSON.parse(croptypedata).filter(function(obj) {
   		
		return zoneCrops.find( zc => zc.crops == obj.id );

	});
   	const handleChange_zone = event => {
		
   		 setZone(event.target.value);
  	};
  	const handleChange_crop = event => {
   		 setCrop(event.target.value);
  	};
	const handleChange_gethistory = event => {
   		var url="http://192.168.0.4:3030/crops?location="+zone+"&cropId="+crop+"&$sort[date]=-1";
	    //console.log(url);
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
	      setCropTrace(data.data);	      
	    })
	    .catch(function(err) {
	         console.log("error",err);
	    })
  	};
  	var BodyModal = <div style={modalStyle} className={classes.paper2}><CropsCreate basePath={"/"} location={"/crops"} resource={"crops"}/ ></div>;

   // console.log("cropdData",cropdata);
   // console.log("zoneCrops",zoneCrops);
   // console.log("zone",zone);
   // console.log("croptypedata",croptypedata);
   // console.log("zoneCrops_names",zoneCrops_names);
   // console.log("CropTrace",CropTrace);
   // console.log("cropphases",cropphases);
    if (!CropTrace) {
     var CropTraceRender = "Please Selecet a Zone and Crop";
    } else {
     	 CropTraceRender = CropTrace.map(crpt =>

     	 	<List >
     	 		
     	 		<ListItem divider>

                  <ListItemText
                    primary={new Date(crpt.date ).toLocaleDateString()}/>
                </ListItem>

                <ListItem divider>            
	                <ListItemText
	                primary={cropphases.find(x => x.id === crpt.phaseId).name}/>
	                
                </ListItem>

                <ListItem >        
	                <ListItemText
	                primary={crpt.description}/>
                </ListItem>

     	 	</List>

     	 ) ;    
  	}


	return (
		<div className={classes.root} >
			<Grid container spacing={3} justify="flex-start" alignItems="center">
				<div item xs={3}>
					<FormControl className={classes.formControl}>
				        <InputLabel id="demo-simple-select-helper-label">Seleccione Zona</InputLabel>
				        <Select
				          labelId="demo-simple-select-helper-label"
				          id="demo-simple-select-helper"
				          value={zone}
				          onChange={handleChange_zone}>

				          <MenuItem value="">
				            <em>None</em>
				          </MenuItem>

				          {zones.map(dat => <MenuItem value={dat}>{dat}</MenuItem>)}
			        </Select>
			      </FormControl>
				</div>

				<div item xs={3}>
					<FormControl className={classes.formControl}>
			        	<InputLabel id="demo-simple-select-helper-label">Seleccione Cultivo</InputLabel>
				        <Select
				          labelId="demo-simple-select-helper-label"
				          id="demo-simple-select-helper"
				          value={crop}
				          onChange={handleChange_crop}>

				          <MenuItem value="">
				            <em>None</em>
				          </MenuItem>

				          {zoneCrops_names.map(dat => <MenuItem value={dat.id}>{dat.names}, {dat.informations}</MenuItem>)}
			       		 </Select>
			      </FormControl>
				</div>

				<div item xs={3}>
					<Button variant="contained" color="primary" onClick={handleChange_gethistory} >
		              Get Data
		      		</Button>
				</div>
				<div item xs={3}>
					<Tooltip title="Add New Phase" aria-label="add" >
					  <Fab color="primary" className={classes.fab}>
					  	<AddIcon onClick={handleOpen}/>
				      	<Modal
					        open={open}
					        onClose={handleClose}
					        aria-labelledby="simple-modal-title"
					        aria-describedby="simple-modal-description"
					      >
					        {BodyModal}
				      	</Modal>
					  </Fab>
					</Tooltip>
					
				</div>
			</Grid>		

			<Grid container  className={classes.rootdiv} alignItems="center">
				
			<List >
     	 		<ListItem divider >
                  <ListItemText
                  	primary={<b>Fecha de Registro</b>}/>
                </ListItem>
                
                <ListItem divider>            
	                <ListItemText
	                    primary={<b>Fase Fenologica</b>}/> 
                </ListItem>
                
                <ListItem >        
	                <ListItemText
                    primary={<b>Descripcion</b>}/>   
                </ListItem>
     	 	</List>
     	 	
				{CropTraceRender}
			
			</Grid>
			
		</div >
		);
}
