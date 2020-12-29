import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'English One',
  slug: 'english-one',
  version: '0.1.0',
  orientation: 'portrait',
  platforms: ['android'],
  icon: './src/assets/icons/simple-icon.png',
  splash: {
    'image': './src/assets/splash/splash.png',
    'resizeMode': 'contain',
    'backgroundColor': '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    'src/assets/**/*'
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src//assets/icons/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    }
  },
});
