const {Octokit} = require('octokit');
// import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })
  

async function run() {
// await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection', {
let response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner: 'Woodside',
    repo: 'vscode_ext_test03',
    branch: 'main'
});

console.log(response);
}

try{
      run();    
  } catch (e){
    console.log(e);  
}
