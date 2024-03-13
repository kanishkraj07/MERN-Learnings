const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();


function getFiles() {
    return new Promise((resolve, reject) => {
        fs.readdir("files", (err, files) => {
            resolve(files);
        })
    });
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const filePath = path.join('files', file);
        fs.readFile(filePath, 'utf-8', (err, content) => {
            resolve(content);
        })
    });
}

async function asyncReadFile(fileName, res) {
    const fileContent =  await readFile(fileName);
    res.status(200).json({
      fileContent
  });
  }

function isFilePresent(files, requiredFile) {
    for(let file of files) {
        if(file === requiredFile) {
            return true;
        }
    }
    return false;
}

app.get("/files", (req, res) => {
    getFiles().then(files => {
        res.status(200).json({
            files
        });
    });
});

app.get("/file", (req, res) => {
    const fileName = req.query.fileName;

    getFiles().then((files) => {
        if(isFilePresent(files, fileName)) {
            asyncReadFile(fileName, res);
        } else{
            res.status(404).send("file not found");
        }
    });
});

app.all('*', (req, res) => {
    res.status(404).send("request not found");
});

app.listen(5000);