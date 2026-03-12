export async function GET() {

  const channelId = "UCqtCi9HzgtNrXlGJDHpPwpQ";

  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  );

  const xml = await response.text();

  const ids = [];

  const parts = xml.split("<yt:videoId>");

  for (let i = 1; i < parts.length; i++) {

    const id = parts[i].split("</yt:videoId>")[0];

    ids.push({ videoId: id });

  }

  return new Response(JSON.stringify(ids.slice(0,3)), {
    headers: {
      "Content-Type": "application/json"
    }
  });

}