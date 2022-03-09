module.exports = {
  transform: {
    'android/pxToDp': require('./pxToDp'),
    'android/color': require('../common/colorToHex8'),
    'android/fontSize': require('./fontSizeToSp'),
    'android/colorName': require('./colorName')
  },
  action: {
    copy_fileOrFolder: require('../common/copyFileOrFolder')
  },
  format: {
    'android/resourcesSorted': require('./formatResourcesSorted'),
    'android/fontStyle': require('./formatFontStyle'),
    'android/spacingStyle': require('./formatSpaceStyle'),
    'android/borderStyle': require('./formatBorderStyle'),
    'android/radiusStyle': require('./formatRadiusStyle'),
    'android/transition': require('./formatTransition')
  }
}
