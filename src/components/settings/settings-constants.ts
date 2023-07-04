const MANIFEST = chrome.runtime.getManifest();
export const MANIFEST_INFO = {
  appVersion: MANIFEST.version,
  appName: MANIFEST.name,
  appDesc: MANIFEST.description,
};
export const REPO_LINK = 'https://github.com/s0rus/kick-kit' as const;

export const SETTINGS_MODAL_ID = 'kickkit-settings' as const;
export const MAIN_NAVBAR_TOKEN = 'main-navbar' as const;
export const SETTINGS_STORAGE_TOKEN = '__kickkit-settings__' as const;

export const DEFAULT_SETTINGS = {
  seekImages: true,
  blurImages: false,
};

export type KKSettings = typeof DEFAULT_SETTINGS;
export type KKSettingKey = keyof KKSettings;
export type KKSettingValue<T extends KKSettingKey> = KKSettings[T];
