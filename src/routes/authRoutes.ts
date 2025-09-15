import express from 'express';

import {
  loginService,
  registerService,
  generateTokenService,
  verifyTokenService,
  redefinePasswordService
} from '../services/authService';

import { authenticateToken } from '../middleware/authenticateToken';

const router = express.Router();

// Rota para login
router.post('/login', async (req, res) => {
  try {
    const token = await loginService(req.body.email, req.body.password);
    res.json({ token });
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
});

// Rota para registro de novo usuário (protegida por autenticação)
router.post('/register', authenticateToken, async (req, res) => {
  try {
    await registerService(req.body.email, req.body.password);
    res.sendStatus(201);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
});

// Rota para enviar token de redefinição de senha
router.post('/send-token', async (req, res) => {
  try {
    await generateTokenService(req.body.email);
    res.sendStatus(200);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

// Rota para verificar token de redefinição de senha
router.post('/verify-token', async (req, res) => {
  try {
    await verifyTokenService(req.body.email, req.body.token);
    res.sendStatus(200);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
});

// Rota para redefinir senha (protegida por autenticação)
router.post('/redefine-password', authenticateToken, async (req, res) => {
  try {
    await redefinePasswordService(req.body.email, req.body.password);
    res.sendStatus(200);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
});

export default router;
