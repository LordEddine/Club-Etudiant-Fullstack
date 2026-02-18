import app from './src/app.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});