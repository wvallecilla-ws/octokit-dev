const {Octokit} = require('octokit');
const {
    createOrUpdateTextFile,
    composeCreateOrUpdateTextFile,
} = require("@octokit/plugin-create-or-update-text-file");
const { createOAuthDeviceAuth } = require("@octokit/auth-oauth-device");

const MyOctokit = Octokit.plugin(createOrUpdateTextFile).defaults({ 
    userAgent: 'Wilson Vallecilla',
});

const octokit = new MyOctokit({
     auth: process.env.GITHUB_TOKEN,
    // authStrategy: createOAuthDeviceAuth,
    // auth: {
    //     clientType: "oauth-app",
    //     clientId: "5ba37fba6709d47be88b",
    //     scopes: ["public_repo"],
    //     onVerification(verification) {
    //       // verification example
    //       // {
    //       //   device_code: "3584d83530557fdd1f46af8289938c8ef79f9dc5",
    //       //   user_code: "WDJB-MJHT",
    //       //   verification_uri: "https://github.com/login/device",
    //       //   expires_in: 900,
    //       //   interval: 5,
    //       // };
      
    //       console.log("Open %s", verification.verification_uri);
    //       console.log("Enter code: %s", verification.user_code);
    //     },
    // }
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
