import express, { Express, Request, Response } from "express";
import 'dotenv/config'
import{userRouter} from './routes/index.js'
const port = 3000;
const app: Express = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
// app.get('/',async(req:Request, res:Response)=>{
//   console.log(await db.query('SELECT * FROM public."user"'))
// });

app.listen(port,() => {
  console.log(`Example app listening on port ${port}`);
});