export async function GET() {

  const channelId = "UCqtCi9HzgtNrXlGJDHpPwpQ";

  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  const response = await fetch(rssUrl);
  const xml = await response.text();

  const videoIds = [];

  const regex = /<yt:videoId>(.*?)<\/yt:videoId>/g;

  let match;

  while ((match = regex.exec(xml)) !== null) {
    videoIds.push({ videoId: match[1] });
  }

  const latest = videoIds.slice(0,3);

  return new Response(JSON.stringify(latest), {
    headers: {
      "Content-Type": "application/json"
    }
  });

}