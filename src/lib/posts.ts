// Small helpers for loading and showing posts.
import { getCollection, type CollectionEntry } from 'astro:content';

export const CATEGORIES = [
  'Starting a Business',
  'Choosing Machines',
  'Locations',
  'Repairs & Issues',
  'Running Your Business',
] as const;

// "Repairs & Issues" -> "repairs-issues"
export function slugify(text: string) {
  return text.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Hide drafts on the live site, newest first.
export async function getGuides() {
  const all = await getCollection('guides', (p) => !p.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getNews() {
  const all = await getCollection('news', (p) => !p.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Same category first, then the newest of the rest.
export function relatedGuides(current: CollectionEntry<'guides'>, all: CollectionEntry<'guides'>[], count = 3) {
  const others = all.filter((p) => p.id !== current.id);
  const same = others.filter((p) => p.data.category === current.data.category);
  const rest = others.filter((p) => p.data.category !== current.data.category);
  return [...same, ...rest].slice(0, count);
}

// About 200 words a minute.
export function readingTime(body = '') {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
