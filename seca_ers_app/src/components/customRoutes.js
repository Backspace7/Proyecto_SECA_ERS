// in src/customRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Foo from './Foo';
import SimpleSelect from './SimpleSelect';
import Dashboard from './Dashboard';
import SimpleTabs from './SimpleTabs';


export default [

    <Route exact path="/Dashboard" component={Dashboard} />,
];