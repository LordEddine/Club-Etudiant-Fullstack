import express from 'express';
import studentRoutes from './routes/studentRoutes'
import clubRoutes from './routes/clubRoutes';
import 'dotenv/config';
import prisma from './prisma/prisma.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clubs', clubRoutes)
app.use('/etudiants', studentRoutes); // http:localhost:3000/etudiants/......

export default app;