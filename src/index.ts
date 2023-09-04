import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from "fs";
import childProcess from "child_process";
import {Buffer} from "buffer";

const FILES_TO_DELETE = [
    ".git",
    ".github",
    ".gitignore",
    "docker-compose.yml",
];

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
        fs.writeFileSync(zipName, Buffer.from((<ArrayBuffer>response.data)), {encoding: "utf-8"});
        const result = childProcess.execSync(`unzip ${zipName}`);
        fs.unlinkSync(zipName);
        const firstFolder = fs.readdirSync(".", {encoding: "utf-8", withFileTypes: true}).find(element => element.isDirectory());
        if (firstFolder === undefined) throw new Error("No folder found");
        const firstFolderName = firstFolder.name;
        const files = fs.readdirSync(firstFolderName, {encoding: "utf-8", withFileTypes: true});
        files.forEach(file => {
            console.log(file);
            if (FILES_TO_DELETE.indexOf(file.name) !== -1) return;
            // if (file.isDirectory()) fs.rmSync(file.name, {recursive: true, force: true});
            // if (file.isFile()) fs.unlinkSync(file.name);
        });
        console.log(github);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
