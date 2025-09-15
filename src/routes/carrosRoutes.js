import express from "express";
import { createCarro, deleteCarro, getAllCarros, getCarroById, updateCarro } from "../controllers/carrosController.js";

const router = express.Router();

router.get("/", getAllCarros);
router.get("/:id", getCarroById);
router.post("/", createCarro);
router.delete("/:id", deleteCarro);
router.put("/:id", updateCarro);

export default router;