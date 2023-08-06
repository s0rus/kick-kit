import { waitForElement } from '@/utils/waitForElement';

interface ScrollChatToBottomProps {
  bypassPause?: boolean;
}

export const scrollChatToBottom = async ({ bypassPause }: ScrollChatToBottomProps) => {
  const chatroom = await waitForElement<HTMLDivElement>({
    mode: 'class',
    name: 'overflow-y-scroll',
  });
  if (chatroom && !isChatPaused(chatroom, bypassPause)) {
    chatroom.scrollTop = chatroom.scrollHeight;
  }
};

const isChatPaused = (chatroom: HTMLDivElement, bypassPause?: boolean) => {
  if (bypassPause) {
    return false;
  }
  if (chatroom) {
    return chatroom?.parentElement?.children?.[1]?.classList?.contains('absolute') ?? false;
  }
  return false;
};
