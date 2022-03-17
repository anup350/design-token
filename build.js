/* eslint-disable @typescript-eslint/no-var-requires */
const deepMerge = require('deepmerge')
const androidConfig = require('./libs/android')
const iosConfig = require('./libs/ios')
const webConfig = require('./libs/web')
const StyleDictionary = require('style-dictionary')



// PATHS
const basePath = './'
const buildPath = 'output/'


const StyleDictionaryExtended = StyleDictionary.extend({
  // adding imported configs
  ...deepMerge.all([androidConfig, iosConfig, webConfig]),
  source: [basePath + 'input/*.json'],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      buildPath: buildPath + 'css/',
      options: {
        fontFamilies: {
          'Akzidenz-Grotesk Pro': '"Akzidenz-Grotesk Pro", sans-serif'
        }
      },
      files: [
        {
          filter: require('./libs/web/filterWeb'),
          format: 'custom/css',
          destination: 'variables.css'
        }
      ]
    },
    scss: {
      transformGroup: 'custom/css',
      buildPath: buildPath + 'scss/',
      files: [
        {
          filter: require('./libs/web/filterWeb'),
          format: 'scss/variables',
          destination: 'variables.scss'
        }
      ]
    },
    'ios-swift': {
      transforms: [
        'name/cti/camel'
      ],
      buildPath: buildPath + 'ios/',
      options: {
        fontFamilies: {
          'Akzidenz-Grotesk Pro.700': 'AkzidenzGroteskPro_Bold',
          'Akzidenz-Grotesk Pro.900': 'AkzidenzGroteskPro_Black'
        }
      },
      files: [
        {
          destination: 'Size.swift',
          filter: (token) => token.type === 'dimension',
          className: 'Size',
          format: 'ios-swift/class.swift'
        }
      ],
      actions: [
        'ios/colorSets',
        'ios/fontStyles'
      ]
    },
    android: {
      transforms: [
        'name/cti/camel',
        'android/colorName',
        'android/fontSize',
        'android/pxToDp',
        'android/color'
      ],
      buildPath: buildPath + 'android/',
      options: {
        copyFilesAction: [
          {
            destination: buildPath + 'android/font/font_family.xml',
            origin: basePath + 'filesToCopy/font_family.xml'
          }
        ]
      },
      files: [
        {
          destination: 'values/font_styles.xml',
          format: 'android/fontStyle',
          filter: (token) => token.type === 'custom-fontStyle',
          options: {
            fontFamilies: {
              'Akzidenz-Grotesk Pro': '@font/AkzidenzGroteskPro'
            }
          }
        },
        {
          destination: 'values/space_styles.xml',
          format: 'android/spacingStyle',
          filter: (token) => token.type === 'custom-spacing' || token.type == 'spacing'
        },
        {
          destination: 'values/border_styles.xml',
          format: 'android/borderStyle',
          filter: (token) => token.type === 'custom-stroke'
        },
        {
          destination: 'values/radius_styles.xml',
          format: 'android/radiusStyle',
          filter: (token) => token.type === 'custom-radius'
        },
        {
          destination: `values/transition.xml` ,
          format: 'android/transition',
          filter: (token) => token.type === 'custom-transition'
        },
        {
          destination: 'values/dimens.xml',
          format: 'android/resources',
          resourceType: 'dimen',
          filter: (token) => token.type === 'dimension' || token.type === 'custom-fontStyle' || token.type == 'borderWidth'
        },
        {
          destination: 'values/colors.xml',
          format: 'android/resourcesSorted',
          resourceType: 'color',
          filter: (token) => {
            return token.type === 'color' //token.type === 'color' && token.path[0].toLowerCase() === 'light'
          }
        },
        {
          destination: 'values-night/colors.xml',
          format: 'android/resourcesSorted',
          resourceType: 'color',
          filter: (token) => {
            return token.type === 'color' && token.path[0].toLowerCase() === 'dark'
          }
        }
      ],
      actions: ['copy_fileOrFolder']
    }
  }
})

StyleDictionaryExtended.buildAllPlatforms()
