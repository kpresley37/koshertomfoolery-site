import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const channelId = "UCqtCi9HzgtNrXlGJDHpPwpQ";
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const response = await fetch(rssUrl);
    const xml = await response.text();

    return new Response(xml, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    return new Response("Fetch failed", { status: 500 });
  }
};