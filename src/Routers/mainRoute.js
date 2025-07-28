const express = require("express");
const router = express.Router();
const mainController = require("../Controllers/mainController.js");
const mainMiddleware = require("../Middlewares/routeMiddlewares.js");
const routerMiddleware = require("../Middlewares/routeMiddlewares.js");
const categoriesRoute = require("./categoriesRoute.js");
const customersRoute = require("./customersRoute.js");
const productsRoute = require("./productsRoute.js");
const retailStoreRoute = require("./retailStoreRoute.js");
const wholesalersRoute = require("./wholesalersRoute.js");
const salesRoute = require("./salesRoute.js");
const adminRoute = require('./adminRoute.js');

router.use("/", mainMiddleware.mainMiddleware);
router.get("/", mainController.mainController);

router.use("/admin", adminRoute);

router.use("/categories", routerMiddleware.categoryMiddleware);
router.use("/categories", categoriesRoute);

router.use("/customers", routerMiddleware.customerMiddleware);
router.use("/customers", customersRoute);

router.use("/products", routerMiddleware.productMiddleware);
router.use("/products", productsRoute);

router.use("/retailstore", routerMiddleware.retainStoreMiddleware);
router.use("/retailstore", retailStoreRoute);

router.use("/sales", routerMiddleware.saleMiddleware);
router.use("/sales", salesRoute);

router.use("/wholesalers", routerMiddleware.wholesalerMiddleware);
router.use("/wholesalers", wholesalersRoute);

module.exports = router;