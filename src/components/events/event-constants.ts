import { toggleEmoteHolder, toggleTopGifters } from '../element-hider/';

export const initEvent = (message: EventKey) => chrome.runtime.sendMessage(message);

export const INIT_EVENT_KEYS = {
  initToggleTopGifters: 'initToggleTopGifters',
  initToggleEmoteHolder: 'initToggleEmoteHolder',
} as const;

export const EVENTS: Record<EventKey, EventShape> = {
  initToggleTopGifters: {
    key: 'toggleTopGifters',
    action: () => toggleTopGifters(),
  },
  initToggleEmoteHolder: {
    key: 'toggleEmoteHolder',
    action: () => toggleEmoteHolder(),
  },
} as const;

export type EventKey = keyof typeof INIT_EVENT_KEYS;
export interface EventShape {
  key: string;
  action: () => void;
}
