const fs = require('fs');

const path = require('path');

// 修改前的内容
let updateStr = '任务';
// 要替换的内容
let newStr = '';
function travel(entryPath) {
  const files = fs.readdirSync(entryPath);
  files.forEach((file, index) => {
    const filePath = path.join(entryPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      travel(filePath);
    } else {
      if (file.includes(updateStr)) {
        let newName = filePath.replace(updateStr, newStr);
        // console.log(filePath, '->', newName);
        fs.renameSync(`./${filePath}`, `./${newName}`, err => {
          if (err) {
            console.log(err);
          } else {
            console.log(newName + ' 已重命名！');
          }
        });
      }
    }
  });
}

travel('./file');
