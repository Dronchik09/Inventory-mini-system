import { Router } from "express";
import { productController } from "../controllers/product";

const router = Router();

router.get("/", (req, res) => productController.getProducts(req, res));
router.post("/", (req, res) => productController.createProduct(req, res));
router.patch("/:id", (req, res) => productController.updateProduct(req, res));
router.delete("/:id", (req, res) => productController.deleteProduct(req, res));

export default router;
