import express from 'express';
import path from 'path';
import cors from 'cors';
/*import cookieParser from 'cookie-parser';
import logger from 'morgan';*/
/*import indexRouter from './routes/index';
import usersRouter from './routes/users';*/
const PORT = process.env.PORT || 5000;

import { Octokit } from "@octokit/rest";
const octokit = new Octokit({auth: process.env.GITHUB_REST_API_KEY});

var corsOptions = {
  origin: 'https://patthenoble.github.io',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}




var app = express();
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));*/
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
app.get('/', cors(corsOptions), (req, res) => res.json({"thing": "new thing 2"}));
app.get('/github-repos', cors(corsOptions), async(req, res) => {
  try{
    res.json({"data": await octokit.request('GET /user/repos')})
  }
  catch(err){
    console.log(err)
  }
})
app.get('/octokit', cors(corsOptions), (req, res) => res.json({"octokit": octokit}));

/*app.use('/', indexRouter);
app.use('/users', usersRouter);*/
export default app;




  /*
  const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  */


  /*.get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
  app.get('/github-repos', (req, res) => {
    res.json({"data": "data"})
  })*/


  /*
  app.get('/github-repos', async(req, res) => {
    try{
      res.json({"data": await octokit.request('GET /user/repos')})
    }
    catch(err){
      console.log(err)
    }
  })
  */
