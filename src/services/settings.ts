import {Settings} from '../types/Settings';
import storage from './localStorage';

const SETTINGS_STORAGE_KEY = 'settings-storage-key';

const defaultSettings: Settings = {
  activeTheme: 'system',
};

export async function getSettings(): Promise<Settings> {
  try {
    const settings = await storage.load<Settings | undefined>({
      key: SETTINGS_STORAGE_KEY,
    });
    return settings || defaultSettings;
  } catch (e) {
    return defaultSettings;
  }
}

export async function setSettings(settings: Partial<Settings>) {
  const previousSettings = await getSettings();
  const toSave = {
    ...previousSettings,
    ...settings,
  };
  await storage.save({
    key: SETTINGS_STORAGE_KEY,
    data: toSave,
  });
  return toSave;
}
