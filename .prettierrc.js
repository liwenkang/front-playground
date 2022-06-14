// 2022-06-14
// https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 80, // 超过多少换行
  tabWidth: 2, // 缩进 2 个字符
  useTabs: false, // 使用 空格 缩进
  semi: true, // 行尾是否使用分号，默认为true
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  quoteProps: 'preserve', // 什么时候加引号
  // as-needed - 仅在需要时在对象属性周围添加引号
  // consistent - 如果对象中的至少一个属性需要加引号，就对所有属性加引号
  // preserve - 按照对象属性中引号的输入用法
  jsxSingleQuote: true, // jsx 是否使用单引号，默认为false，使用双引号
  trailingComma: 'all', //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, // 对象中的空格 默认true
  bracketSameLine: false, // 结尾 > 是否换行
  arrowParens: 'always', // (x) => x
  rangeStart: 0, // 格式化区间
  rangeEnd: Infinity, // 格式化区间
  // parser: '', 指定解析器
  proseWrap: 'always', // 是否自动换行
  requirePragma: false, // 顶部注释
  htmlWhitespaceSensitivity: 'ignore', // 针对 span 形成空格的问题,也换行(可能会有问题)
  endOfLine: 'lf', // 换行符
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: true, // 每个属性一行
};
