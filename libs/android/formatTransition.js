const { fileHeader } = require('style-dictionary').formatHelpers
const camelCase = require('../common/camelCaseHelper')
const fs = require('fs');

const letterSpacingToFloat = (letterSpacing, fontSize) => 1 + (letterSpacing / fontSize)

const printDescription = description => (description && description !== '' && description !== null ? `    <!-- ${description} -->\n` : '')

module.exports = ({ dictionary, platform, options = {}, file }) => {
  var fileName = ""
  var data = ""
  const fontStyles = dictionary.allTokens
    // remove underlined
    .filter(compositeToken => compositeToken.original.value.textDecoration !== 'underline')
    // create style
    .map(compositeToken => {
      fileName = compositeToken.original.value.transitionType
      console.log(fileName)
      data = `<?xml version="1.0" encoding="utf-8"?>\n<set xmlns:android="http://schemas.android.com/apk/res/android" android:fillAfter="true">\n` +
      printDescription(compositeToken.description) +
    `     <translate
        android:fromXDelta="${compositeToken.original.value.easingFunction.x1}"
        android:toXDelta="${compositeToken.original.value.easingFunction.x2}"
        android:fromYDelta="${compositeToken.original.value.easingFunction.y1}"
        android:toYDelta="${compositeToken.original.value.easingFunction.y2}"
        android:duration="${compositeToken.original.value.duration * 1000}" />\n` +
    '</set>\n'

       fs.writeFile("./examples/build/android/values/"+fileName+".xml", data, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      return ""
    })

   
  return (
    ""
  )
}
