import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
        const octokit = github.getOctokit(core.getInput('token'));
        // Get repository name and owner
        const owner = github.context.payload.repository.owner.login;
        const repository = github.context.payload.repository.name;
        // Get content of the README.md file
        const response = await octokit.rest.repos.getContent({
            owner,
            repo: repository,
            path: ''
        });
        console.log(response.data);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
