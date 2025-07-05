import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import propertyRoutes from './routes/propertyRoutes';
dotenv.config();
const app = express();

const cors = require('cors');
app.use(cors()); 

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/property', propertyRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB conectado!');
    app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));
