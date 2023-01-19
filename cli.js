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
        owner: 'wvallecilla-ws',
        repo: 'octokit-dev',
        path: 'README.md',
    });

    // console.log(readme.sha);
    console.log(Buffer.from(readme.content, 'base64').toString());

    // update content
    const content = Buffer.from(readme.content, 'base64').toString();
    const updated = bumpRepoCounter(content);
    console.log(updated);

    // update file
    const response2 = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'wvallecilla-ws',
        repo: 'octokit-dev',
        path: 'README.md',
        message: 'Updating README file',
        committer: {
          name: 'Wilson Vallecilla',
          email: 'wilson.vallecilla@woodside.com.au'
        },
        content: Buffer.from(updated, 'utf8').toString('base64'),
        sha: readme.sha
      });

      console.dir(response2.data);
}



run();

function bumpRepoCounter(content) {
    return content.replace(
        /<!-- repo-counter -->(\d+)<!-- \/repo-counter -->/,
        (_content, counter) =>
        `<!-- repo-counter -->${Number(counter) + 1}<!-- /repo-counter -->`
    )
}
