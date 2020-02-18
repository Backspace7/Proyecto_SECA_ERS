import React from 'react';
import feathersClient from './feathersClient';
import { authClient, restClient } from 'aor-feathers-client'
import { Admin, Resource,ListGuesser, EditGuesser, ShowGuesser} from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';


import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import UserIcon from '@material-ui/icons/Group';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import StorageIcon from '@material-ui/icons/Storage';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';





import {SensorList,SensorCreate,SensorEdit,SensorShow} from './components/sensors'
import {SentypeList,SentypeCreate,SentypeEdit,SentypeShow} from './components/sentypes'
import {UserList,UserCreate,UserShow} from './components/users'
import {RecordList,RecordEdit,RecordCreate} from './components/records'
import {InformList,InformEdit,InformShow,InformCreate} from './components/informs'
import Dashboard from './components/Dashboard'

const history = createHistory();

const authClientOptions = {
  storageKey: 'feathers-jwt',
  authenticate: { strategy: 'local' },

};

const restClientOptions = {
  id: 'id',
  usePatch: true,
  headers:{'Access-Control-Expose-Headers': 'X-Total-Count'}

};


const App = () => (
  <Admin dashboard={Dashboard} history={history} authProvider={authClient(feathersClient, authClientOptions)} dataProvider={restClient(feathersClient, restClientOptions)}>
        <Resource name="users" list={UserList} create={UserCreate} icon={UserIcon} show={UserShow}/>
        <Resource name="sen-types" list={SentypeList} edit={SentypeEdit} create={SentypeCreate} show={SentypeShow} icon={FormatListBulletedIcon}/>
        <Resource name="sensors" list={SensorList} edit={SensorEdit} create={SensorCreate} show={SensorShow} icon={SettingsRemoteIcon}/>
        <Resource name="records" list={RecordList} edit={RecordEdit} create={RecordCreate} show={ShowGuesser} icon={StorageIcon}/>
        <Resource name="informs" list={InformList} show={InformShow} edit={InformEdit} create={InformCreate} icon={TrendingUpIcon} />
        
  </Admin>

);

export default App;