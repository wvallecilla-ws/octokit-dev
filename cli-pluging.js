const {Octokit} = require('octokit');
const {
    createOrUpdateTextFile,
    composeCreateOrUpdateTextFile,
} = require("@octokit/plugin-create-or-update-text-file");

const MyOctokit = Octokit.plugin(createOrUpdateTextFile).defaults({ 
    userAgent: 'Wilson Vallecilla',
});

const octokit = new MyOctokit({
    auth: process.env.GITHUB_TOKEN,
});

async function run(){
    // authentication
    const {data: user} = await octokit.request('GET /user')
    console.log(`authenticated as ${user.login} using user var`);

    // get the file - update the file
    const response = await octokit.createOrUpdateTextFile({
        owner: 'wvallecilla-ws',
        repo: 'octokit-dev',
        path: 'README.md',
        message: 'Updating README file',
        committer: {
          name: 'Wilson Vallecilla',
          email: 'wilson.vallecilla@woodside.com.au'
        },
        content: ({ content }) => {
            return bumpRepoCounter(content);
        }
    });

    console.log(response.data);   
}


run();

function bumpRepoCounter(content) {
    return content.replace(
        /<!-- repo-counter -->(\d+)<!-- \/repo-counter -->/,
        (_content, counter) =>
        `<!-- repo-counter -->${Number(counter) + 1}<!-- /repo-counter -->`
    )
}
