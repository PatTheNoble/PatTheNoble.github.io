import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 5000;
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({ auth: process.env.GITHUB_REST_API_KEY }); // Using Heroku environment variable to protect API key.

var corsOptions = {
  origin: ['https://patthenoble.github.io', 'http://localhost:3000'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}




var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
app.get('/', cors(corsOptions), (req, res) => res.json({ "defaultJson": "default" }));
app.get('/github-data', cors(corsOptions), async (req, res) => {
  const repos = await octokit.request('GET /user/repos', {
    accept: "application/vnd.github.v3.json",
    mediaType: { // You must provide a custom media type in the Accept header like this in order to receive topics from the github rest api.
      previews: [
        'mercy'
      ]
    }
  });
  var readMes = [];
  for (var i = 0; i < repos.data.length; i++) {
    const currentName = repos.data[i].name;
    try {
      const currentReadMe = await octokit.request('GET /repos/{owner}/{repo}/readme', {
        accept: "application/vnd.github.v3.raw",
        owner: 'PatTheNoble',
        repo: currentName
      });
      readMes.push(currentReadMe);
    } 
    catch (error) {
      console.log(error);
    }
  }
  const data = {"repos": repos, "readMes": readMes};
  res.json({ "data": data });
})
export default app;