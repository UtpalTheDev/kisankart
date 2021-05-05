const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {wishlistmodel}=require("../models/wishlist.model.js")



router.route('/')
 .get(async (req, res) => {
   try{
     const products=await wishlistmodel.findOne({wishlistNo:1});
     res.status(200).json(products)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get products",errormessage:err.message})
   }
  
})
.post(async(req, res) => {
  try{
  let previtems=await wishlistmodel.findOne({wishlistNo:1}) ; 
  if(!previtems){
    await wishlistmodel.create({wishlistNo:1,items:[]});
    let previtems=await wishlistmodel.findOne({wishlistNo:1}) ; 
  }
  console.log("here");
  let {itemId}=req.body;
  let data={...previtems,items:[...previtems.items,itemId]};
  console.log({data})
  data=extend(previtems,data);
  let savedproduct=await data.save();
  res.json({success:true,product:savedproduct})
  }
  catch (err){
    console.log(err);
    res.status(500).json({success:false,message:"unable to add products",errormessage:err.message})
  }
})
// .put(async(req,res)=>{
//   try{
//     let previtems=await wishlistmodel.findOne({wishlistNo:1}) ; 
//     let {items}=req.body;
//     console.log(previtems);
//     let mapdata=previtems.items.map(eachitem=>{
//       if(eachitem.itemId===items.itemId){
//         return {...eachitem,qty:items.qty}
//       }
//       return eachitem
//     })
//     console.log({mapdata});
//     let newdata={...previtems,items:mapdata}
    
//     let data=extend(previtems,newdata);
//     let savedproduct=await data.save();
//     res.json({success:true,product:savedproduct})
//   }
//   catch(err){
//     //console.log(err);
//     res.status(500).json({success:false,message:"unable to add products",errormessage:err.message})
//   }
// })
.delete(async(req,res)=>{
  try{
  let previtems=await wishlistmodel.findOne({wishlistNo:1}) ; 
  let {itemId}=req.body;
  let filterdata=previtems.items.filter(eachitem=>eachitem!==itemId);

  let newdata={...previtems,items:filterdata}
    
  let data=extend(previtems,newdata);
  let savedproduct=await data.save();
  res.json({success:true,savedproduct})
  }
  catch(err){
        res.status(500).json({success:false,message:"unable to delete products",errormessage:err.message})
  }
});

// router.param("productid",async(req,res,next,id)=>{
//   try{
//     const product=await wishlistmodel.findById(id);
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