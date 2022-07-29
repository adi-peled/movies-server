import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './api/routes/index.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('build'));
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
    // app.use(express.static(path.resolve(__dirname, 'build')));
} else {
    const corsOptions = {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    };
    app.use(cors(corsOptions));
}
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(router);
const port = process.env.PORT || 4000;
const host = '0.0.0.0';

app.listen({ port, host }, () => console.log(`server start in  port :${port}`));
