import express from "express";
import multer from "multer";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getActiveProperties,
  favoriteProperty,
} from "../services/propertyService";

import { authenticateToken } from "../middleware/authenticateToken";


const router = express.Router();
const upload = multer();

// Rota para cadastro de imóvel (protegida por autenticação)
router.post("/", authenticateToken, upload.array("imagens"), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const property = await createProperty(req.body, files);
    res.status(201).json(property);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Rota para atualização de imóvel (protegida por autenticação)
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

// Rota para obter todos os imóveis (protegida por autenticação)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.json(properties);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Rota para obter todos os imóveis ativos (pública)
router.get("/active", async (req, res) => {
  try {
    const properties = await getActiveProperties();
    res.json(properties);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Rota para obter um imóvel por ID (pública)
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

// Rota para remoção de imóvel (protegida por autenticação)
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

// Rota para favoritar um imóvel (protegida por autenticação)
router.put("/:id/favorite", authenticateToken, async (req, res): Promise<any> => {
  try {
    const property = await favoriteProperty(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }
    res.json(property);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
