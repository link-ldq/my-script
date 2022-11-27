const fs = require('fs');

function getHTML(json) {
  let htmlTEXT = `
    <!DOCTYPE NETSCAPE-Bookmark-file-1>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
    <TITLE>Bookmarks</TITLE>
    <H1>Bookmarks</H1>
    <DL><p>
    </DL><p>
  `;
  // 文件夹类型
  if (!json.target) {
    const childrenEL = json.children.reduce((p, c) => {
      return p + getHTML(c);
    }, '');
    return `<DT><H3 ADD_DATE="${new Date().getTime()}" >${
      json.name
    }</H3><br><DL><p>${childrenEL}</DL><p><br>`;
  } else {
    // url
    htmlTEXT = `<DT><A HREF="${json.target}">${json.name}</A><br>`;
  }
  return htmlTEXT;
}

// 1. 在bookmarket.json 文件粘贴 infinity的书签josn
// 读取josn
const BK = require('./bookmarket.json');
// 2. 执行次代码生成Google的书签html
const htmlTEXT = BK.sites.reduce((a, b) => {
  return (
    a +
    b.reduce((pre, cur) => {
      return pre + getHTML(cur);
    }, '')
  );
}, '');
fs.open('bk.html', 'w', function (err, fd) {
  if (!err) {
    console.time('test');
    // 如果没有出错 则对文件进行写入操作
    fs.write(fd, htmlTEXT, function (err) {
      if (!err) {
        console.log('创建成功');
      }
      fs.close(fd, function (err) {
        if (!err) {
          console.log('文件已关闭');
        }
        console.timeEnd('test');
      });
    });
  } else {
    console.log(err);
  }
});
