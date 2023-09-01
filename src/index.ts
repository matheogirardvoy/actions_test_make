import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from "fs";
import childProcess from "child_process";

async function run() {
    try {
        const octokit = github.getOctokit(core.getInput('token'));
        // Get repository name and owner
        const owner = github.context.payload.repository.owner.login;
        const repository = github.context.payload.repository.name;
        // Get content of the README.md file
        const response = await octokit.request('GET /repos/{owner}/{repo}/zipball/{ref}', {
            request: {
                parseSuccessResponseBody: false
            },
            owner,
            repo: repository,
            ref: github.context.payload.ref
        });
        const zipName = "project.zip";
        fs.writeFileSync(zipName, (<ArrayBuffer>response.data).toString(), {encoding: "utf-8"});
        const result = childProcess.execSync(`unzip ${zipName}`);
        console.log(result.toString());
        console.log(fs.readdirSync("."));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
