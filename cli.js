const {Octokit} = require('octokit');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

async function run(){
// option 2
const response = await octokit.request('GET /user')
console.log(`authenticated as ${response.data.login} using response var`);

    // option 1
    const {data: user} = await octokit.request('GET /user')
    console.log(`authenticated as ${user.login} using user var`);
}

run();