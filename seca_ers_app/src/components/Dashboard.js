// in src/Dashboard.js
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chart from './chart';
import {Query,Loading} from 'react-admin';


const payload2 ={
   pagination: { page: 1, perPage: 10 },
   sort: { field: 'id', order: 'ASC' },
};


const Sensorlist  = () =>(
  <Query type="GET_LIST" resource="sensors" payload={payload2}>
          {({ data, total, loading, error }) => {
              if (loading) { return <Loading />; }
              if (error) { return <p>ERROR</p>; }
              var sensorsuids = data.map(values => ({ value: values.id, location: values.location, label:values.description }));
              console.log("inter",sensorsuids);
              return ( <div>{<Chart sensorsuids={sensorsuids}/>}</div>);
          }}
  </Query>
 );



export default () => (
	   			
    <Card>
        <CardHeader title="Measures Graphs" />

        <CardContent> 
        	<Sensorlist/>
		</CardContent>
    </Card>
    
);