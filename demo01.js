const {Octokit} = require('octokit');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

const character = '**********************************';


// const owner = 'Woodside';
// const repo_name = 'vscode-ext-test03';
// const branch = 'main';

const owner = 'wvallecilla-ws';
const repo_name = 'octokit-dev';
const branch = 'master';

async function run(){
    
    const {data: user} = await octokit.request('GET /user')
    console.log(`authenticated as ${user.login} using user var`);

    let repository = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: owner,
        repo: repo_name
    });

    let branches = await octokit.request("GET /repos/{owner}/{repo}/branches", {
        owner: owner,
        repo: repo_name
    });

    let protection = await octokit.request("GET /repos/{owner}/{repo}/branches/{branch}/protection", {
        owner: owner,
        repo: repo_name,
        branch: branch
    });


    // console.log(`${character} Repository ${character}`);
    // console.log(repository.data);
    console.log(`${character} Branches ${character}`);
    console.log(branches.data);

    console.log(`${character} Protection ${character}`);
    console.log(protection.data);

    // // get the file
    // const { data: readme }= await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    //     owner: 'Woodside',
    //     repo: 'vscode-ext-test03',
    //     path: 'README.md',
    // });    

    // // get content and decrypt it
    // const content = Buffer.from(readme.content, 'base64').toString();
    // console.log(content);

    
}



run();
