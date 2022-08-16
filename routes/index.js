import express from "express";
import { CategoryController, CouponController, ProductController, RegisterController, RestaurantController, UserController } from "../controllers";
const router = express.Router();

// user api
router.post("/register",RegisterController.register);
router.get("/user",UserController.user);
router.post("/user/notificationToken",UserController.userNotification);
router.post("/user/update",UserController.userUpdate);
router.post("/user/address/add",UserController.addAddress);
router.post("/user/address/update",UserController.updateAddress);
router.delete("/user/address/remove",UserController.removeAddress);


// restaurant api
router.post("/restaurant/register",RestaurantController.register);
router.post("/restaurant/update",RestaurantController.updateRestaurant);
router.post("/restaurant/address/update",RestaurantController.updateAddress);
router.post("/restaurant/time/manage",RestaurantController.manageTime);
router.post("/restaurant/delivery/charge",RestaurantController.deliveryCharge);
router.post("/restaurant/status",RestaurantController.status);


//category api
router.post("/product/category/add",CategoryController.addCategory);
router.post("/product/category/update",CategoryController.updateCategory);
router.get("/product/category",CategoryController.Category);
router.get("/product/category/all",CategoryController.allCategory);
router.delete("/product/category/remove",CategoryController.removeCategory);


//product api
router.post("/product/add",ProductController.addProduct);
router.get("/product/search",ProductController.searchProduct);
router.get("/product/filter",ProductController.filterProduct);


//coupon api
router.post("/coupon/add",CouponController.addCoupon);
router.get("/coupon/all",CouponController.allCoupon);
router.get("/coupon",CouponController.singleCoupon);
router.delete("/coupon/remove",CouponController.removeCoupon);


//orders api
router.post("/orders/save",ProductController.saveOrder);



export default router;