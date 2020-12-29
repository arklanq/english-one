import NativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

class AsyncStorage {
  public readonly prefix: string;

  constructor() {
    const appSlug = Constants.manifest.slug
      ? Constants.manifest.slug.toLowerCase()
      : Constants.manifest.name
      ? Constants.manifest.name.toLowerCase()
      : 'unknown-expo-app';
    this.prefix = `@${appSlug}:`;
  }

  public async getItem(key: string, fallback?: string): Promise<string | null> {
    const value = await NativeAsyncStorage.getItem(this.prefix + key);
    if (value !== null) return value;
    else if (fallback !== undefined) return fallback;
    else return null;
  }

  public async getJsonItem<T = unknown>(key: string, fallback?: T): Promise<T | null> {
    const value = await NativeAsyncStorage.getItem(this.prefix + key);
    if (value === null) {
      if (fallback !== undefined) return fallback;
      else return null;
    }

    return JSON.parse(value) as T;
  }

  public async setItem(key: string, value: string): Promise<void> {
    await NativeAsyncStorage.setItem(this.prefix + key, value);
  }

  public async setJsonItem<T>(key: string, value: T): Promise<void> {
    const stringifiedValue = JSON.stringify(value);
    await NativeAsyncStorage.setItem(this.prefix + key, stringifiedValue);
  }

  public async isItemSet(key: string): Promise<boolean> {
    return (await NativeAsyncStorage.getItem(this.prefix + key)) !== null;
  }

  public async unsetItem(key: string): Promise<void> {
    await NativeAsyncStorage.removeItem(this.prefix + key);
  }
}

export default new AsyncStorage();
