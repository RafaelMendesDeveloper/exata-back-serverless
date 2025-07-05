import express from 'express';
import {
  loginService,
  registerService,
  generateTokenService,
  verifyTokenService,
  redefinePasswordService
} from '../services/authService';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const token = await loginService(req.body.email, req.body.password);
    res.json({ token });
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    await registerService(req.body.email, req.body.password);
    res.sendStatus(201);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
});

router.post('/send-token', async (req, res) => {
  console.log('SEND TOKEN =======> ', req.body.email);
  
  try {
    await generateTokenService(req.body.email);
    console.log('Token enviado com sucesso para o email:', req.body.email);
    res.sendStatus(200);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

router.post('/verify-token', async (req, res) => {
  try {
    await verifyTokenService(req.body.email, req.body.token);
    res.sendStatus(200);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
});

router.post('/redefine-password', async (req, res) => {
  try {
    await redefinePasswordService(req.body.email, req.body.password);
    res.sendStatus(200);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
});

export default router;
