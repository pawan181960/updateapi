const mongoose=require('mongoose');

const loginSchema=mongoose.Schema({
	adminid:String,
	password:String
});
module.exports=mongoose.model('Login',loginSchema);

/*const cloginSchema=mongoose.Schema({
	emailid:String,
	password:String,
});
module.exports=mongoose.model('CLogin',cloginSchema	);
*/