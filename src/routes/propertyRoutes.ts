import express, { Request, Response } from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../services/propertyService";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const property = await createProperty(req.body);
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
