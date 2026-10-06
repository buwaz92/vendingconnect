// RSS feed of guides and news. Handy for auto-posting to Facebook later.
import rss from '@astrojs/rss';
import settings from '../data/settings.json';
import { getGuides, getNews } from '../lib/posts';

export async function GET(context) {
  const guides = (await getGuides()).map((p) => ({ ...p, base: 'guides' }));
  const news = (await getNews()).map((p) => ({ ...p, base: 'news' }));
  const items = [...guides, ...news]
    .sort((a, b) => b.data.date - a.data.date)
    .map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/${p.base}/${p.id}/` }));
  return rss({ title: settings.siteName, description: settings.tagline, site: context.site, items });
}
