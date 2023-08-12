import { EVENTS, type EventKey } from './event-constants';

chrome.runtime.onMessage.addListener((eventKey: EventKey) => {
  const event = EVENTS[eventKey];
  if (event) {
    event.action();
  }
});
