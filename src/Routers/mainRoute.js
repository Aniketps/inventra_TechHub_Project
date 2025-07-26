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

router.get("/", mainMiddleware.mainMiddleware);
router.get("/", mainController.mainController);

router.get("/admin", (req, res)=>res.status(404).send(`<h1 style="color:red">Forbidden</h1>`));

router.get("/categories", routerMiddleware.categoryMiddleware);
router.use("/categories", categoriesRoute);

router.get("/customers", routerMiddleware.customerMiddleware);
router.use("/customers", customersRoute);

router.get("/products", routerMiddleware.productMiddleware);
router.use("/products", productsRoute);

router.get("/retailstore", routerMiddleware.retainStoreMiddleware);
router.use("/retailstore", retailStoreRoute);

router.get("/sales", routerMiddleware.saleMiddleware);
router.use("/sales", salesRoute);

router.get("/wholesalers", routerMiddleware.wholesalerMiddleware);
router.use("/wholesalers", wholesalersRoute);

module.exports = router;