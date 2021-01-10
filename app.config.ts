import {ConfigContext, ExpoConfig} from '@expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'English One',
  slug: 'english-one',
  version: '0.1.0',
  orientation: 'portrait',
  platforms: ['android'],
  githubUrl: 'https://github.com/IdkMan2/english-one',
  userInterfaceStyle: 'automatic',
  primaryColor: '#3f51b5',
  backgroundColor: '#fafafa',
  icon: './src/assets/icons/simple-icon.png',
  assetBundlePatterns: ['src/assets/**/*'],
  splash: {
    image: './src/assets/splash/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 0,
    checkAutomatically: 'ON_ERROR_RECOVERY',
  },
  android: {
    package: 'pl.edu.wwsi.poczta.a_nurzynski',
    versionCode: 1,
    splash: {
      backgroundColor: '#fafafa',
      resizeMode: 'native',
      image: './src/assets/splash/splash.png',
    },
    adaptiveIcon: {
      foregroundImage: './src/assets/icons/adaptive-icon.png',
      backgroundColor: '#fafafa',
    },
  },
  androidStatusBar: {
    hidden: true,
    translucent: false,
    barStyle: 'dark-content',
    backgroundColor: '#00000000',
  },
});
