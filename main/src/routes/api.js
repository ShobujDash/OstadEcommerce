const express = require('express')
const BrandController = require("../controllers/BrandController")
const CategoryCotroller = require("../controllers/CategoryCotroller");
const ProductController = require("../controllers/ProductController");
const ProfileController = require("../controllers/ProfileController");
const UserController = require("../controllers/UserController");
const InvoiceController = require("../controllers/InvoiceController");
const AuthVerification = require("../middlewares/AuthVerification");

const router = express.Router();


// Brand Category
router.get('/BrandList',BrandController.BrandList)
router.get("/CategoryList", CategoryCotroller.CategoryList);

// Product
router.get("/SliderList", ProductController.SliderList);
router.get("/ListByCategory/:categoryID", ProductController.ListByCategory);
router.get("/ListByBrand/:brandID", ProductController.ListByBrand);
router.get("/ListBySimilar/:categoryID", ProductController.ListBySimilar);
router.get("/ListByKeyword/:keyword", ProductController.ListByKeyword);
router.get("/ListReview", ProductController.ListReview);
router.get("/ProductDetails", ProductController.ProductDetails);
router.get("/ListByRemark/:remark", ProductController.ListByRemark);

router.get("/WishList",AuthVerification, ProductController.WishList);
router.post("/CreateWishList",AuthVerification, ProductController.CreateWishList);
router.post("/RemoveWishList", AuthVerification, ProductController.RemoveWishList);

router.get("/CartList",AuthVerification, ProductController.CartList);
router.post("/CreateCartList",AuthVerification, ProductController.CreateCartList);
router.post("/RemoveCartList",AuthVerification, ProductController.RemoveCartList);


// User
router.get("/UserLogin/:email", UserController.UserLogin);
router.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin);
router.get("/UserLogout", UserController.UserLogout);


// Profile
router.post("/CreateProfile",AuthVerification, ProfileController.CreateProfile);
router.get("/ReadProfile",AuthVerification, ProfileController.ReadProfile);
router.get("/UpdateProfile",AuthVerification, ProfileController.UpdateProfile);

//Invoice
router.get("/InvoiceCreate",AuthVerification, InvoiceController.InvoiceCreate);
router.get("/InvoiceList",AuthVerification, InvoiceController.InvoiceList);
router.get(
  "/InvoiceProductList",
  AuthVerification, InvoiceController.InvoiceProductList
);
router.get("/PaymentSuccess", InvoiceController.PaymentSuccess);
router.get("/PaymentFail", InvoiceController.PaymentFail);
router.get("/PaymentCancel", InvoiceController.PaymentCancel);
router.get("/PaymentIpn", InvoiceController.PaymentIpn);



module.exports = router;