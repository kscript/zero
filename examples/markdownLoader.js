const markdown = require('markdown-it')

const transform = function(src) {
  const start = '<!--'
  const end = '-->'
  const regS = new RegExp(start, 'g')
  const regE = new RegExp(end, 'g')
  let curr
  try {
    while(curr = regS.exec(src)) {
      const startIndex = curr.index + start.length
      const text = src.slice(startIndex)
      const next = regE.exec(text)
      if (next) {
        src = src.slice(0, curr.index)
        + '{{`'
        + src.slice(startIndex, startIndex + next.index).replace(/(\{\{|\}\}|`)/g, function (s) {
          return {
            '{{' : '\\{\\{',
            '}}' : '\\}\\}',
            '`': '\\`'
          }[s]
        })
        + '`}}'
        + src.slice(startIndex + next.index + end.length)
        regS.lastIndex = regE.lastIndex = 0
      } else {
        break
      }
    }
  } catch (err) {
    console.log(err)
  }
  return src
}
module.exports = function(src) {
  const html = markdown({
    html: true,
    linkify: true,
    typographer: true
  }).render(transform(src))
  return (
    `<template>\n` +
      `<div class="markdown-body">${html}</div>\n` +
    `</template>\n`
  )
}