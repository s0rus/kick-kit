export default {
  startListening: () => {
    const chatroomElement = document.getElementById('chatroom');
    if (chatroomElement) {
      const observer = new MutationObserver(() => {
        const anchorTags = chatroomElement.querySelectorAll('a');
        anchorTags.forEach(async (anchorTag) => {
          const href = anchorTag.getAttribute('href');
          if (href && href.includes('streamable.com/')) {
            const shortcode = href.split('/').pop();
            if (shortcode) {
              try {
                const videoData = await fetchStreamableVideo(shortcode);
                const title = videoData.title;
                anchorTag.textContent = title;
                anchorTag.style.color = '#53fc18';
              } catch (error) {
                console.error('Error fetching Streamable video:', error);
              }
            }
          }
        });
      });

      observer.observe(chatroomElement, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  },
};

async function fetchStreamableVideo(shortcode: string) {
  const response = await fetch(
    `https://api.streamable.com/videos/${shortcode}`
  );
  const data = await response.json();
  return data;
}
