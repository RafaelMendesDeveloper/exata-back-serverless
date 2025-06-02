import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB conectado!');
    app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));
