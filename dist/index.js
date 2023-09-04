"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const fs = __importStar(require("fs"));
const child_process_1 = __importDefault(require("child_process"));
const buffer_1 = require("buffer");
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
        fs.writeFileSync(zipName, buffer_1.Buffer.from(response.data), { encoding: "utf-8" });
        const result = child_process_1.default.execSync(`unzip ${zipName}`);
        fs.unlinkSync(zipName);
        const firstFolder = fs.readdirSync(".", { encoding: "utf-8", withFileTypes: true }).find(element => element.isDirectory());
        if (firstFolder === undefined)
            throw new Error("No folder found");
        const firstFolderName = firstFolder.name;
        const files = fs.readdirSync(firstFolderName, { encoding: "utf-8", withFileTypes: true });
        files.forEach(file => {
            console.log(file);
            if (FILES_TO_DELETE.indexOf(file.name) !== -1)
                return;
            // if (file.isDirectory()) fs.rmSync(file.name, {recursive: true, force: true});
            // if (file.isFile()) fs.unlinkSync(file.name);
        });
        console.log(github);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();
