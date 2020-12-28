import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'English One',
  slug: 'english-one',
  version: '0.1.0',
  orientation: 'portrait',
  platforms: ['android'],
  icon: './assets/icon.png',
  splash: {
    'image': './assets/splash.png',
    'resizeMode': 'contain',
    'backgroundColor': '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    }
  },
});
