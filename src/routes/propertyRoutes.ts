import express from "express";
import multer from "multer";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getActiveProperties,
} from "../services/propertyService";

import { authenticateToken } from "../middleware/authenticateToken";


const router = express.Router();
const upload = multer();

router.post("/", authenticateToken, upload.array("imagens"), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const property = await createProperty(req.body, files);
    res.status(201).json(property);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/:id", authenticateToken, upload.array("imagens"), async (req, res): Promise<any> => {
  try {
    const files = req.files as Express.Multer.File[];
    const property = await updateProperty(req.params.id, req.body, files);
    if (!property) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }
    res.json(property);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.json(properties);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/active", async (req, res) => {
  try {
    const properties = await getActiveProperties();
    res.json(properties);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/:id", async (req, res): Promise<any> => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }
    res.json(property);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res): Promise<any> => {
  try {
    const property = await deleteProperty(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }
    res.json({ message: "Imóvel removido com sucesso" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
