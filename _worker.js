export default {
  async fetch(request, env, ctx) {
    const targetUrl = 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/BLACK_VLESS_RUS.txt';
    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        return new Response('Error fetching subscription source', { status: 502 });
      }
      const text = await response.text();
      
      // 过滤掉注释行和空行
      const cleanLines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('#'));
      
      // 去除重复节点
      const uniqueLines = Array.from(new Set(cleanLines));
      
      const cleanText = uniqueLines.join('\n');
      
      return new Response(cleanText, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (err) {
      return new Response(`Error: ${err.message}`, { status: 500 });
    }
  }
};
