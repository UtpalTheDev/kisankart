const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {productmodel}=require("../models/product.model.js")




router.route('/')
 .get(async (req, res) => {
   try{
     const products=await productmodel.find({});
     res.json(products)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get products",errormessage:err.message})
   }
  
})
.post(async(req, res) => {
  try{
  let product=req.body;
  let newproduct=await productmodel.create(product);
  //let savedproduct=await newproduct.save();
  res.json({success:true,product:newproduct})
  }
  catch (err){
    res.status(500).json({success:false,message:"unable to add products",errormessage:err.message})
  }
});

// router.param("productid",async(req,res,next,id)=>{
//   try{
//     const product=await productmodel.findById(id);
//     //console.log("L",product);
//     if(!product){
//       res.status(400).json({success:false,message:"product not found"})
//     }
//     req.product=product;
//     next()
//   }
//   catch{
//       res.status(400).json({success:false,message:"could not retrieve product"})

//   }
// })

// router.route('/:productid') 
// .get((req, res) => {
//   const {product}=req;
//   console.log(product);
//   product.__v=undefined;
//   res.json({ message: "this api is under construction, please check later",product:product })

// })

// .post(async(req, res) => {
//    let {product}=req;
//    const productupdate=req.body;
//    product=extend(product,productupdate);
//    product.updated=Date.now();
//    product=await product.save();
//    res.json({success:true,product});

// })
// .delete(async(req,res)=>{
//   let {product}=req;
//   await product.remove();
//   res.json({success:true,product})
// })

module.exports=router;