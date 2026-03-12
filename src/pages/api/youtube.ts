export async function GET() {

  const channelId = "UCqtCi9HzgtNrXlGJDHpPwpQ";

  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    }
  );

  const xml = await response.text();

  const matches = [...xml.matchAll(/<yt:videoId>(.*?)<\/yt:videoId>/g)];

  const videos = matches.slice(0, 3).map(match => ({
    videoId: match[1]
  }));

  return new Response(JSON.stringify(videos), {
    headers: { "Content-Type": "application/json" }
  });

}