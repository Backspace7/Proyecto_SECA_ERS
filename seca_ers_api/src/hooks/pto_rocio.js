// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

  	console.log("context",context.result.limit);
  	if(context.result.limit==9){
  		
  		var temp = context.result.data.find(obj => obj.suid == 11);
  		var hum = context.result.data.find(obj => obj.suid == 8);
  		console.log("resulta1",temp.dat);
  		console.log("resulta2",hum.dat);
  		const humedad = hum.dat/100;
  		const temperatura=temp.dat;
  		const ptroc = (Math.pow(humedad,0.125)*(112+(0.9*temperatura)))+(0.1*temperatura)-112;
  		console.log("resulta3",ptroc);
  	    context.result.data.push({id: -1,dat:ptroc.toFixed(2), suid: 99,tuid: 99,createdAt: '2020-02-26T20:45:39.028Z', updatedAt: '2020-02-26T20:45:39.028Z'});
  		console.log("resulta",context.result.data);
  	}
    return context;
  };
};
