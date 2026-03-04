import type { APIRoute } from "astro";
import { XMLParser } from "fast-xml-parser";

export const GET: APIRoute = async () => {
  const channelId = "UCqtCi9HzgtNrXlGJDHpPwpQ";
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const response = await fetch(rssUrl);
    const xml = await response.text();

    const parser = new XMLParser();
    const json = parser.parse(xml);

    const entries = json?.feed?.entry || [];
    const videos = (Array.isArray(entries) ? entries : [entries])
      .slice(0, 3)
      .map((video: any) => {
        const videoId =
          video?.["yt:videoId"] ||
          video?.id?.split(":").pop();

        return {
          videoId,
          title: video?.title,
        };
      });

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 200 });
  }
};