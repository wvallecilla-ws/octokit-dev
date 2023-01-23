// const {Octokit} = require('octokit');

// const octokit = new Octokit({
//     auth: process.env.GITHUB_TOKEN,
// });

// async function run(){

//     // Repository owner and name
//     const owner = "Woodside";
//     const repo = "vscode_ext_test03";

//     // Branch name
//     const branch = "main";

//     // Protection rule options
//     const options = {
//     required_status_checks: {
//         strict: true,
//         contexts: ["ci/test"]
//     },
//     enforce_admins: true,
//     required_pull_request_reviews: {
//         dismissal_restrictions: {
//         users: ["wilson.vallecilla@woodside.com.au"],
//         teams: ["EDP-Admin", "EDP-Developers"]
//         },
//         dismiss_stale_reviews: true,
//         required_approving_review_count: 1,
//         require_code_owner_reviews: true
//     }
//     };

//     octokit.repos.updateBranchProtection({
//     owner,
//     repo,
//     branch,
//     ...options
//     });
    
// }



// run();


// const Octokit = require("@octokit/rest");
// const octokit = new Octokit();


const {Octokit} = require('octokit');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

// import { Octokit } from "@octokit/rest";
// const octokit = new Octokit();

// octokit.authenticate({
//   type: "token",
//   token: "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"
// });

// Repository owner and name
const owner = "Woodside";
const repo = "vscode_ext_test03";

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
      users: ["wilson.vallecilla@woodside.com.au"],
      teams: ["EDP-Admin", "EDP-Developers"]
    },
    dismiss_stale_reviews: true,
    require_code_owner_reviews: true
  }
};

octokit.repos.setProtection({
  owner,
  repo,
  branch,
  ...options
});
