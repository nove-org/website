import RSSHandler from '@util/rss';
import NAPI from '@util/NAPI';

export async function GET() {
    const api = new NAPI();
    const posts = await api.blog().getPosts({ caching: false });

    const rss = new RSSHandler();
    rss.addItems({ posts });

    return new Response(rss.getXML(), { headers: { 'Content-Type': 'text/xml' } });
}
