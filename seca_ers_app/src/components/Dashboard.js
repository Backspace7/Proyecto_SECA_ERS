// in src/Dashboard.js
import React from 'react';
import SimpleTabs from './SimpleTabs';
import {Query,Loading} from 'react-admin';


const Zones_list = ()=>(
  <Query type="GET_LIST" resource="zones" payload={{
		   pagination: { page: 1, perPage: 24 },
		   sort: { field: 'id', order: 'ASC' },
		}}>
          {({ data, total, loading, error }) => {
              if (loading) { return <Loading />; }
              if (error) { return <p>ERROR</p>; }
              var zonedata = data.map(values => ({ id:values.id,location: values.location, description: values.description, zuid:values.zuid }));
              localStorage.setItem('zoneData',JSON.stringify(zonedata));
          return <SimpleTabs zonedata={zonedata}/>;
          }}
  </Query>
);
class Dashboard extends React.Component {
constructor(props) {
    super(props);
    this.state={};
}
  render() {
    return ( 
    	<div>
    		<Zones_list/>
    		
    	</div>
    );
  }
}

export default Dashboard;