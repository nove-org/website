import { COOKIE_HOSTNAME } from '@util/CONSTS';
import { Post } from '@util/helpers/Schema';
import RSS from 'rss';

export default class RSSHandler {
    private feed?: RSS;

    constructor() {
        this.feed = new RSS({
            title: 'Blog - Nove',
            description: 'Latest information about product releases and improvements.',
            site_url: `https://${COOKIE_HOSTNAME}`,
            feed_url: `https://${COOKIE_HOSTNAME}/blog/rss.xml`,
        });
    }

    public getXML() {
        return this.feed?.xml();
    }

    public addItems({ posts }: { posts: Post[] }) {
        const tagPattern = /<[^>]*?>/g;
        const brPattern = /<br\s*\/?>/gi;
        const urlPattern = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
        const host = COOKIE_HOSTNAME.startsWith('.') ? COOKIE_HOSTNAME.slice(1) : COOKIE_HOSTNAME;

        posts.forEach((post) => {
            this.feed?.item({
                title: post.title,
                description: post.text.replace(brPattern, '\n').replace(urlPattern, '$2 ($1) ').replace(tagPattern, ''),
                url: `https://${host}/blog/${post.id}`,
                author: post.authorUsername,
                date: post.createdAt,
            });
        });
    }
}
