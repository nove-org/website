import { COOKIE_HOSTNAME } from '@util/CONSTS';
import { Post } from '@util/schema';
import RSS from 'rss';

export default class RSSHandler {
    private feed?: RSS;
    private host = COOKIE_HOSTNAME.startsWith('.') ? COOKIE_HOSTNAME.slice(1) : COOKIE_HOSTNAME;

    constructor() {
        this.feed = new RSS({
            title: 'Blog - Nove',
            description: 'Latest information about product releases and improvements.',
            site_url: `https://${this.host}`,
            feed_url: `https://${this.host}/blog/rss.xml`,
        });
    }

    public getXML() {
        return this.feed?.xml();
    }

    public addItems({ posts }: { posts: Post[] }) {
        posts.forEach((post) => {
            this.feed?.item({
                title: post.title,
                description: `<![CDATA[${post.text}]]>`,
                url: `https://${this.host}/blog/${post.id}`,
                author: post.authorUsername,
                date: post.createdAt,
            });
        });
    }
}
