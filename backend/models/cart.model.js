const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const cartSchema=new mongoose.Schema({
 cartNo:{type:Number,required:true}, 
 items:[]
})
//model creation
const cartmodel=mongoose.model('cart',cartSchema);

module.exports={cartmodel}