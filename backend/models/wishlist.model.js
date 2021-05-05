const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const wishlistSchema=new mongoose.Schema({
 wishlistNo:{type:Number,required:true}, 
 items:[]
})
//model creation
const wishlistmodel=mongoose.model('wishlist',wishlistSchema);

module.exports={wishlistmodel}