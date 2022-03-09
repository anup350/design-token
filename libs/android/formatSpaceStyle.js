const { fileHeader } = require('style-dictionary').formatHelpers
const camelCase = require('../common/camelCaseHelper')

const letterSpacingToFloat = (letterSpacing, fontSize) => 1 + (letterSpacing / fontSize)

const printDescription = description => (description && description !== '' && description !== null ? `    <!-- ${description} -->\n` : '')

module.exports = ({ dictionary, platform, options = {}, file }) => {
  const fontStyles = dictionary.allTokens
    // remove underlined
    .filter(compositeToken => compositeToken.original.value.textDecoration !== 'underline')
    // create style
    .map(compositeToken => {
      return `  <style name="${camelCase(compositeToken.name)}">\n` +
      printDescription(compositeToken.description) +
    `    <item name="android:paddingLeft">${compositeToken.original.value.left}dp</item>\n` +
    `    <item name="android:paddingTop">${compositeToken.original.value.top}dp</item>\n` +
    `    <item name="android:paddingBottom">${compositeToken.original.value.bottom}dp</item>\n` +
    `    <item name="android:paddingRight">${compositeToken.original.value.right}dp</item>\n` +
    '  </style>\n'
    })
  return (
    '<?xml version="1.0" encoding="utf-8"?>\n' +
      fileHeader({ file, commentStyle: 'xml' }) +
      '\n<resources>\n' +
        fontStyles.join('\n') +
      '\n</resources>\n'
  )
}
