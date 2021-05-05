const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const productSchema=new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    material: String,
    brand: String,
    inStock: Boolean,
    isnew: Boolean,
    fastDelivery: Boolean,
    ratings:Number,
    offer: Number,
    idealFor:String ,
    color: String
})
//model creation
const productmodel=mongoose.model('product',productSchema);

module.exports={productmodel}