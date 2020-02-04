// in src/Dashboard.js
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chart from './chart';
import Chartbar from './chartbar';
import Chartscatter from './chartscatter';
import {Query,Loading} from 'react-admin';
import Paper from '@material-ui/core/Paper';
import SimpleTabs from './SimpleTabs'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
const payload2 ={
   pagination: { page: 1, perPage: 10 },
   sort: { field: 'id', order: 'ASC' },
};


export default () => (
	   			
    <div >
    		<SimpleTabs/>
    </div>
    
    

);