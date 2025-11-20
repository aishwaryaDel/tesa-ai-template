import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import useCaseRoutes from './routes/useCaseRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { APP_CONFIG } from './config';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/use-cases', useCaseRoutes);

app.get('/', (req, res) => {
  res.send('Tesa AI Hub Backend is running 🚀');
});

app.use(errorHandler);

const PORT = APP_CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf Port ${PORT}`);
});
