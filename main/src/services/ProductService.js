const mongoose = require("mongoose");
const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ObjectId = mongoose.Types.ObjectId;

// Get Categroris
const AllCategoris = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: "Something went Wrong" };
  }
};

// Get Brands
const AllBrands = async () => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: "Something went Wrong" };
  }
};

// Product By Remark
const ProductByREmark = async (req) => {
  try {
    let remark = req.params.remark;

    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { remark: remark } };

    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };

    const data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: "Something went Wrong" };
  }
};

// Product By Category
const ProductByCategory = async (req) => {
  try {
    let categoryID = new ObjectId(req.params.categoryID);
   

    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    // let matchStage = { $match: { categoryID: categoryID } };
    let matchStage = {
      $match: { categoryID: categoryID },
    };


    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };

    const data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: "Something went Wrong" };
  }
};











// Product By Brand
const ProductByBrand = async (req) => {
  try {
    let brandID = new ObjectId(req.params.brandID);
    console.log(req.params.brandID);
    console.log(brandID);

    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { brandID: brandID } };

    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };

    const data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: "Something went Wrong" };
  }
};

// Product By Brand
const ProductByCategoryLimit10 = async (req) => {
  try {
    let categoryID = new ObjectId(req.params.categoryID);

    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { categoryID: categoryID } };
    let limit = { $limit: 10 };

    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };

    const data = await ProductModel.aggregate([
      matchStage,
      limit,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: "Something went Wrong" };
  }
};

// Product Slider
const ProductSlider = async (req) => {
  try {
    let matchStage = { $match: {} };
    let limit = { $limit: 5 };
    let data = await ProductSliderModel.aggregate([matchStage, limit]);
    return { status: "success", data};
  } catch (error) {
    return { status: "fail", data: "Something went Wrong" };
  }
};


// Product Search By Keyword
const ProductByKeyword = async (req) => {
  try {
    let searchRegex = { $regex: req.params.keyword, $options: "i" };
    let searchParam = [{ title: searchRegex }, { shortDes: searchRegex }];
    let searchQuery = { $or: searchParam };

    let matchStage = { $match: searchQuery };

    let joinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let joinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };

    const data = await ProductModel.aggregate([
      matchStage,
      joinStage1,
      joinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: "Something went wrong" };
  }
};

module.exports = {
  AllCategoris,
  AllBrands,
  ProductByREmark,
  ProductByBrand,
  ProductByCategory,
  ProductByCategoryLimit10,
  ProductSlider,
  ProductByKeyword,
};
