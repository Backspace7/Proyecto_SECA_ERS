import React from 'react';
import {
        TableCell,
        Table,
        TableHead,
        TableBody,
        TableRow,
        ExpansionPanel,
        ExpansionPanelSummary,
        ExpansionPanelDetails } from "@material-ui/core";

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
const useStyles = theme => ({
    root: {
    width: 'fixed',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },table: {
    minWidth: 450,
  },
  });
var cropphases = JSON.parse(localStorage.getItem('phaseData'));
var croptypedata = JSON.parse(localStorage.getItem('croptypeData'));
var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const render2 =(object,classes)=>{
	const datatorend = [];
	
		for (let value of Object.values(object)) {
		datatorend.push(
			<ExpansionPanel>
		        <ExpansionPanelSummary
		          expandIcon={<ExpandMoreIcon />}
		          aria-controls="panel1a-content"
		          id="panel1a-header"
		        >
		          <Typography className={classes.heading}>{value[0]._crop}</Typography>
		        </ExpansionPanelSummary>
		        <ExpansionPanelDetails>
			        <Table size="small" aria-label="purchases">
	                <TableHead>
	                  <TableRow>
	                    <TableCell>Fecha</TableCell>
	                    <TableCell>Fase Fenologica</TableCell>
	                    <TableCell align="left">Descripcion</TableCell>
	                  </TableRow>
	                </TableHead>
	                <TableBody>
			  		{value.map(obj => 
			  			 	
				          <TableRow key={obj._crop}>
			              <TableCell component="th" scope="row">
			                {obj._date}
			              </TableCell>
			              <TableCell align="left">{obj._phase}</TableCell>
			    		  <TableCell align="left">{obj._desc}</TableCell>
		        		 </TableRow>
				       
			  			
			  		)}
			  		</TableBody>
	              </Table>
               </ExpansionPanelDetails>
  		 	</ExpansionPanel>
		)
		}

	return datatorend;
};

class Cropstates extends React.Component {
	constructor(props){
		super(props);
		this.state={
			zonaprevia:0,
			fetching:false,
		}
	}
	
	async procesData(zona,classes){
			var zoneCrops = await this.get_states(zona);
			if(zoneCrops!=null){
				zoneCrops = zoneCrops.map(obj =>({
					_crop : croptypedata.find(x => x.id === obj.cropId).names,
					_phase: cropphases.find(x => x.id === obj.phaseId).name,
					_desc: obj.description,
					_date :  new Date(obj.date ).toLocaleDateString(),
				}));
			}
			//console.log("zoneCrops",zoneCrops);
			var grouped = groupBy(zoneCrops,'_crop');
			const dataRend = render2(grouped,classes);
			
			this.setState({dataRend:dataRend});
			
	}
	async get_states(zona){
		try{
          const reposResponse = await fetch("http://192.168.0.4:3030/crops?zuid="+zona+"&$sort[date]=-1",{method:'get',headers:{'Content-Type':'application/json',Accept:'application/json','Authorization':`Bearer ${localStorage.getItem('feathers-jwt')}`}});
          const userRepos = await reposResponse.json();
          var newdata = userRepos.data;
          this.setState({fetching:true});
          return newdata;
        }catch (error) {
          console.log(error);
        }
	}

	render(){
		//console.log("cropphases",cropphases);
		//console.log("croptypedata",croptypedata);
		const {zona,classes} = this.props;
		if( this.state.zonaprevia!= zona){
		  this.setState({Render_data:null});
	      this.setState({zonaprevia:zona});
	      this.setState({fetching:false});
	    }
		if(this.state.fetching==false && zona!=0){
	      this.procesData(zona,classes);
	      
	    }
		return(
		<div className={classes.root}>
	    	{this.state.dataRend}
	    </div>
		);
	}
}
export default withStyles(useStyles)(Cropstates)