import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';

const apiUrl = 'http://192.168.0.10:3030';

const restClient = rest(apiUrl);
const app = feathers();

app.configure(restClient.fetch(window.fetch));
//app.configure(socketio(socket));
app.configure(auth({ jwtStrategy: 'jwt', storage: window.localStorage }));

export default app;
