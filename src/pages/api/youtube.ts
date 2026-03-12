export async function GET() {

  const channelId = "UCqtCi9HzgtNrXlGJDHpPwpQ";

  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {

    const response = await fetch(rssUrl);

    if (!response.ok) {
      return new Response(JSON.stringify([]));
    }

    const xml = await response.text();

    const videoIds = [...xml.matchAll(/<yt:videoId>(.*?)<\/yt:videoId>/g)]
      .slice(0, 3)
      .map(match => ({
        videoId: match[1]
      }));

    return new Response(JSON.stringify(videoIds), {
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (err) {

    console.error("YouTube RSS failed:", err);

    return new Response(JSON.stringify([]), {
      headers: {
        "Content-Type": "application/json"
      }
    });

  }

}