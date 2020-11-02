/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const fs = require('fs')
const blacklist = require('metro-config/src/defaults/blacklist')
const path = require('path')
const rnPath = fs.realpathSync(path.resolve(require.resolve('react-native/package.json'), '..'))
const rnwPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-web/package.json'), '..')
)

module.exports = {
  resolver: {
    extraNodeModules: {
      'react-native': rnwPath,
      'react-native-web': rnwPath,
    },
    blacklistRE: blacklist([
      // Since there are multiple copies of react-native, we need to ensure that metro only sees one of them
      new RegExp(`${(path.resolve(rnPath) + path.sep).replace(/[/\\\\]/g, '\\\\')}.*`),
      // This stops "react-native run-web" from causing the metro server to crash if its already running
      new RegExp(`${path.resolve(__dirname, 'web').replace(/[/\\]/g, '/')}.*`),
    ]),
    platforms: ['ios', 'android', 'web'],
  },
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: false,
      },
    }),
  },
}
