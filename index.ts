import 'dotenv/config';
import express from 'express';
import boardRouter from './router/boardRouter';

//import { encrypt, decrypt } from './lib/crypto';

const server_port = process.env.HTTP_PORT;

const app = express();

app.use(express.json());
//app.use(express.urlencoded());

app.use('/api/board', boardRouter);


app.listen(server_port, function() {
    console.log(`Server Start : PORT : ${server_port}`);
});