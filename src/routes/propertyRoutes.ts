import express, { Request, Response } from "express";
import multer from "multer";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../services/propertyService";

const router = express.Router();
const upload = multer();

router.post("/", upload.array("imagens"), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const property = await createProperty(req.body, files);
    res.status(201).json(property);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", async (req, res) => {
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

router.put("/:id", async (req, res): Promise<any> => {
  try {
    const property = await updateProperty(req.params.id, req.body);
    if (!property) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }
    res.json(property);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res): Promise<any> => {
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
