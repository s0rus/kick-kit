import { log } from '@/utils/logger';
import { DEFAULT_SETTINGS, KKSettingKey, KKSettings, SETTINGS_STORAGE_TOKEN } from './settings-constants';

export const initializeSettings = (): void => {
  if (!localStorage.getItem(SETTINGS_STORAGE_TOKEN)) {
    try {
      const serializedValue = JSON.stringify(DEFAULT_SETTINGS);
      localStorage.setItem(SETTINGS_STORAGE_TOKEN, serializedValue);
    } catch (e) {
      log('Error while initializing settings...');
    }
  }
};

export const getAllSettings = (): KKSettings => {
  try {
    const serializedValue = localStorage.getItem(SETTINGS_STORAGE_TOKEN);
    if (serializedValue) {
      return JSON.parse(serializedValue) as KKSettings;
    }
  } catch (e) {
    log('No settings found, using defaults...');
  }
  return DEFAULT_SETTINGS;
};

export const getSetting = <T extends KKSettingKey>(key: T): KKSettings[T] => {
  const settings = getAllSettings();
  return settings[key];
};

export const setSetting = <T extends KKSettingKey>(key: T, value: KKSettings[T]) => {
  try {
    const settings = getAllSettings();
    settings[key] = value;
    const updatedValue = JSON.stringify(settings);
    localStorage.setItem(SETTINGS_STORAGE_TOKEN, updatedValue);
  } catch (e) {
    log('Error while changing setting...');
  }
};
