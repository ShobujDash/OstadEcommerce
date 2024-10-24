const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    shortDes: { type: String,trim:true,required: true },
    price: { type: String,trim:true,required: true },
    descount: { type: Boolean,trim:true,default:false },
    descountPrice: { type: String,trim:true },
    image: { type: String,trim:true,required:true },
    star: { type: String,trim:true,required:true },
    stock: { type: Boolean,trim:true,required:true,default:true },
    remark: { type: String,trim:true,required:true,enum:['new',"tranding",'popular','top','special','regular'] },
  },
  { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("products", DataSchema);

module.exports = ProductModel;
