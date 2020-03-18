// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
  	const { app, method, result, params } = context;

  	var date = new Date();
  	const month = date.getMonth()+1;
  	const day = date.getDate();
  	const year = date.getFullYear();
  	var today = year+'-'+month+'-'+day;
  	if(context.result.suid==13){

  		console.log("today", today);
    	const item =  await app.service('informs').find({query: {
    	'Date': today  }});
    	console.log("response of find",item);
    	if(item.total==0){
    		await app.service('informs').create({ 'Date': today,'Tmax':-99,'Tmin':99,'Tpro':45,'Rsol': context.result.dat});
    	}else{
    		if(item.data[0].Rsol<context.result.dat){
    		  await app.service('informs').patch(item.data[0].id,{'Date': today,'Rsol':context.result.dat});	
    		}
    		
    	}
  	}
    return context;
  };
};
