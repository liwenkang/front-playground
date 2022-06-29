const fs = require('fs'); // 引入fs模块
const dayjs = require('dayjs');
const todayFileName = dayjs().format('YYYYMMDD');
const today = dayjs().format('YYYY [年] MM [月] DD [日]');

const dailyRecordPath = `./src/pages/markdown/record/${todayFileName}.md`;
const dailyRecordTemplate = `## ${today}

TODO
- [x]
`;

fs.writeFile(dailyRecordPath, dailyRecordTemplate, {}, function (err) {
  if (err) {
    throw err;
  }
});
