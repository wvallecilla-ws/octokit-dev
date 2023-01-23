// const {Octokit} = require('octokit');
import { Octokit } from "@octokit/rest";
import { getOctokit, sanitizeRepositoryName } from "./gitAuth";
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

// Repository owner and name
const owner = "Woodside";
// const repo = "vscode_ext_test03";
const repo = "octokit-dev";

// Branch name
const branch = "main";

// Protection rule options
const options = {
    required_status_checks: {
      strict: true,
      contexts: ["ci/test"]
    },
    enforce_admins: true,
    required_pull_request_reviews: {
      dismissal_restrictions: {
        users: ["wilson.vallecilla@woodside.com.au"]/*,
        teams: ["EDP-Admin", "EDP-Developers"]*/
      },
      dismiss_stale_reviews: true,
      require_code_owner_reviews: true
    }
  };

async function run(){
    // authentication
    const {data: user} = await octokit.request('GET /user')
    console.log(`authenticated as ${user.login} using user var`);

    // // get the file - update the file
    // const response = await octokit.createOrUpdateTextFile({
    //     owner: 'wvallecilla-ws',
    //     repo: 'octokit-dev',
    //     path: 'README.md',
    //     message: 'Updating README file',
    //     committer: {
    //       name: 'Wilson Vallecilla',
    //       email: 'wilson.vallecilla@woodside.com.au'
    //     },
    //     content: ({ content }) => {
    //         return bumpRepoCounter(content);
    //     }
    // });

    // console.log(response.data);   

    // octokit.repos.setProtection({
    //     owner,
    //     repo,
    //     branch,
    //     ...options
    //   });

    const octokit = await getOctokit();

    await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions', {
        owner,
        repo,
        branch
      })
}


run();

function bumpRepoCounter(content) {
    return content.replace(
        /<!-- repo-counter -->(\d+)<!-- \/repo-counter -->/,
        (_content, counter) =>
        `<!-- repo-counter -->${Number(counter) + 1}<!-- /repo-counter -->`
    )
}


let _octokit= '';
const scopes = ['repo', 'workflow'];

async function getSession(){
	return await authentication.getSession('github', scopes, { createIfNone: true });
}

function getOctokit(){
	if (!_octokit) {
		_octokit = getSession().then(async session => {
			const token = process.env.GITHUB_TOKEN
			const agent = getAgent();

			const { Octokit } = await import('@octokit/rest');

			return new Octokit({
				request: { agent },
				userAgent: 'GitHub VSCode',
				auth: `token ${token}`
			});
		}).then(null, async err => {
			_octokit = undefined;
			throw err;
		});
	}

	return _octokit;
}







