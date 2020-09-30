const mongoose=require('mongoose');
const addSchema=mongoose.Schema({
	lat:String,
	long:String,
});
module.exports=mongoose.model('items',addSchema);