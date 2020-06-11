import React from 'react';
import feathersClient from './feathersClient';
import { authClient, restClient } from 'aor-feathers-client'
import { Admin, Resource,ListGuesser, EditGuesser, ShowGuesser,Login} from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';
import '../node_modules/react-vis/dist/style.css';

import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import UserIcon from '@material-ui/icons/Group';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import StorageIcon from '@material-ui/icons/Storage';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import TuneIcon from '@material-ui/icons/Tune';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import MemoryIcon from '@material-ui/icons/Memory';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

import {SensorList,SensorCreate,SensorEdit,SensorShow} from './components/sensors'
import {SentypeList,SentypeCreate,SentypeEdit,SentypeShow} from './components/sentypes'
import {CropstypesCreate,CropstypesEdit,CropstypesList,CropstypesShow} from './components/cropstypes'
import {UserList,UserCreate,UserShow} from './components/users'
import {RecordList,RecordEdit,RecordCreate} from './components/records'
import {InformList,InformEdit,InformShow,InformCreate} from './components/informs'
import {CropsstagesCreate,CropsstagesEdit,CropsstagesList,CropsstagesShow} from './components/cropsstages'
import {CropsCreate,CropsList,CropsShow,CropsEdit } from './components/crops'
import {ActuatorCreate,ActuatorList,ActuatorShow,ActuatorEdit } from './components/actuators'
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard'
import customRoutes from './components/customRoutes';
import ReactDOM from 'react-dom';

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

const MyLoginPage = () => (
    <Login
        backgroundImage="https://source.unsplash.com/1600x900/?traffic,road"
    />
);
const App = () => (
  <Admin loginPage={MyLoginPage} customRoutes={customRoutes} dashboard={Dashboard} history={history} authProvider={authClient(feathersClient, authClientOptions)} dataProvider={restClient(feathersClient, restClientOptions)}>
        <Resource name="users" list={UserList} create={UserCreate} icon={UserIcon} show={UserShow}/>
        <Resource name="sen-types" list={SentypeList} edit={SentypeEdit} create={SentypeCreate} show={SentypeShow} icon={MemoryIcon}/>
        <Resource name="sensors" list={SensorList} edit={SensorEdit} create={SensorCreate} show={SensorShow} icon={SettingsRemoteIcon}/>
        <Resource name="records" list={RecordList} edit={EditGuesser} create={RecordCreate} show={ShowGuesser} icon={StorageIcon}/>
        <Resource name="informs" list={InformList} show={InformShow} edit={InformEdit} create={InformCreate} icon={TrendingUpIcon} />
        <Resource name="crops-types" list={CropstypesList} show={CropstypesShow} edit={CropstypesEdit} create={CropstypesCreate} icon={FilterVintageIcon}/>
        <Resource name="crops-stages" list={CropsstagesList} show={CropsstagesShow} edit={CropsstagesEdit} create={CropsstagesCreate} icon={FormatListNumberedIcon}/>
        <Resource name="crops" list={CropsList} show={CropsShow} edit={CropsEdit } create={CropsCreate} icon={LocalFloristIcon} />
        <Resource name="actuators" list={ActuatorList} show={ActuatorShow} create={ActuatorCreate} edit={ActuatorEdit } icon={TuneIcon} />
        <Resource name="zones" list={ListGuesser} show={ShowGuesser} edit={EditGuesser } icon={DeviceHubIcon} />
  </Admin>

);
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
export default App;