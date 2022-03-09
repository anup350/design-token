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
    `    <item name="android:topLeftRadius">${compositeToken.original.value.topLeft}dp</item>\n` +
    `    <item name="android:topRightRadius">${compositeToken.original.value.topRight}dp</item>\n` +
    `    <item name="android:bottomLeftRadius">${compositeToken.original.value.bottomLeft}dp</item>\n` +
    `    <item name="android:bottomRightRadius">${compositeToken.original.value.bottomRight}dp</item>\n` +
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
