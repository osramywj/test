const Diff2html = require('diff2html');
const fs = require('fs');
const child_process = require('child_process');
const simpleGit = require('simple-git');
const git = simpleGit();
(async function (){
    // await git.init().addRemote('origin', 'git@github.com:osramywj/testgit.git');
    const logs = await git.show('15c5160e95df780b2dd39c950a5e19bf719b00fc');
    const diffJson = Diff2html.parse(logs);
    const diffHtml = Diff2html.html(diffJson, { drawFileList: true });
    console.log(diffHtml);
})()

// git.raw(['diff', '--no-index', 'diff1.js', 'diff2.js'], (err, res) => {
    // console.log(res);
    // const diffJson = Diff2html.parse(res);
    // const diffHtml = Diff2html.html(diffJson, { drawFileList: true });
    // console.log(diffHtml);
// });
// const diffStr = child_process.exec(`git diff --no-index diff1.js diff2.js`, {encoding: 'utf-8'},(err,stdout,stderr)=>{
    // console.log(stdout);
// })


// const file1 = fs.readFileSync('./diff1.js', {encoding: 'utf-8'});
// const file2 = fs.readFileSync('./diff2.js', {encoding: 'utf-8'});

// const diffStr = `diff --git a/diff2.js b/diff1.js
// index 43e5c71..6b74e2e 100644
// --- a/diff2.js
// +++ b/diff1.js
// @@ -1 +1 @@
// -var openedFile = fs.readFileSync(file, 'utf-8');
// \ No newline at end of file
// +var openedFile = fs.readFileSync(file, 'utf-8').trim()
// \ No newline at end of file`
// const diffJson = Diff2html.parse(diffStr);
// const diffHtml = Diff2html.html(diffJson, { drawFileList: true });
// console.log(diffHtml);