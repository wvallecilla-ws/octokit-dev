const {Octokit} = require('octokit');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

async function run(){
    // option 1
    const response1 = await octokit.request('GET /user')
    console.log(`authenticated as ${response1.data.login} using response var`);

    // option 2
    const {data: user} = await octokit.request('GET /user')
    console.log(`authenticated as ${user.login} using user var`);

    // get the file
    const { data: readme }= await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Woodside',
        repo: 'vscode-ext-test03',
        path: 'README.md',
    });

    // console.log(readme.sha);
    // console.log(Buffer.from(readme.content, 'base64').toString());

    // get content and decrypt it
    const content = Buffer.from(readme.content, 'base64').toString();
    // console.log(content);

    // testing setting admin branch protection
    const { data: response3} = await octokit.repos.setAdminBranchProtection({owner: 'Woodside', repo: 'vscode-ext-test03', branch: 'main'});
    // const { data: response3} = await octokit.request(`POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins`, {
    //   owner: 'Woodside',
    //   repo: 'vscode-ext-test03',
    //   branch: 'main'
    // });
    
    console.log(response3);
}



run();
