export async function GET() {

  const username = "koshertomfoolery";

  const response = await fetch(`https://decapi.me/twitch/uptime/${username}`);
  const text = await response.text();

  const isLive = !text.includes("offline");

  return new Response(JSON.stringify({ live: isLive }));
}