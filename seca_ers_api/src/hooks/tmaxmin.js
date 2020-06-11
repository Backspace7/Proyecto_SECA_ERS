// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
  	const { app, method, result, params } = context;
    console.log("zona en insercion",result.zuid);
  	var date = new Date();
  	const month = date.getMonth()+1;
  	const day = date.getDate();
  	const year = date.getFullYear();
  	var today = year+'-'+month+'-'+day;
  	
    if(context.result.tuid==9){
    	console.log("today", today);
    	const item =  await app.service('informs').find({query: {
    'Date': today,"zuid":context.result.zuid }});
    	console.log("response of find",item);
    	if(item.total==0){
    		await app.service('informs').create({ 'Date': today,'Tmax':context.result.dat,'Tmin':context.result.dat,'Tpro':context.result.dat,'Rsol':0,'zuid':context.result.zuid });
    	}else{
    		if(item.data[0].Tmax<context.result.dat){
    	      
    		  const Tpro = (context.result.dat+item.data[0].Tmin)/2;
    		  console.log("nueva max",context.result.dat);
    		  console.log("nueva pro",Tpro);
    		  await app.service('informs').patch(item.data[0].id,{'Date': today,'Tmax':context.result.dat,'Tpro':Tpro});	
    		}
    		if(item.data[0].Tmin>context.result.dat){
              const Tpro = (context.result.dat+item.data[0].Tmax)/2;
              console.log("nueva min",context.result.dat);
    		  console.log("nueva pro",Tpro);
    		  await app.service('informs').patch(item.data[0].id,{ 'Date': today,'Tmin':context.result.dat,'Tpro':Tpro});
    		}
    	}
        console.log("context.result inside",context.result);
    }
  	
  	    return context;
  };
};
