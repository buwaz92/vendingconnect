# Vending Connect Australia website

The website for vendingconnect.com.au. Free to host on Cloudflare, with an admin page for adding posts.

---

## What's in here

- **Pages:** Home, Free Machine (`/locations/`), For Operators, Guides, News, Contact, Privacy
- **Guides:** 5 starter articles in `src/content/guides/`
- **News:** 1 starter post in `src/content/news/`
- **Admin page:** `/admin/` for writing and editing posts in your browser
- **Site settings:** `src/data/settings.json` (email, phone, Facebook link, form key). You can edit these from the admin page too.

Read the starter guides before you go live and add your own experience to them. That's what helps them rank on Google.

---

## How it works (the simple version)

1. Your website files live on **GitHub**.
2. **Cloudflare Pages** watches GitHub. Whenever something changes, it rebuilds the site and puts it live, usually in about a minute.
3. The **admin page** saves your posts straight to GitHub. So: write a post → click Publish → it's live a minute later.

There's no server or database, and nothing to update or patch.

---

## Step 1: Put the files on GitHub

1. Log in to GitHub and create a **new repository** called `vendingconnect`. Leave it empty (no README).
2. On the empty repo page, click **"uploading an existing file"**.
3. Unzip this folder on your Mac and drag **everything inside it** onto the page. Include the `.node-version` and `.gitignore` files. On a Mac, press `Cmd + Shift + .` in Finder to show hidden files.
4. Click **Commit changes**.

Then fix one line so the admin page knows where your repo is:

1. On GitHub, open `public/admin/config.yml` and click the pencil icon to edit.
2. Change `YOUR-GITHUB-USERNAME` to your real GitHub username.
3. Commit.

## Step 2: Host it free on Cloudflare

1. Create a free account at cloudflare.com.
2. Go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Connect your GitHub account and pick the `vendingconnect` repo.
4. Use these build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Under **Environment variables**, add `NODE_VERSION` = `22`
5. Click **Save and Deploy**. After a minute or two, you'll get a free `something.pages.dev` link. Check the site looks right there.

> Cloudflare changes its menus now and then. If you only see "Workers", choose **Import a repository** and use the same build command and output folder.

## Step 3: Connect vendingconnect.com.au

The easiest way is to let Cloudflare manage the domain (it's free):

1. In Cloudflare, click **Add a domain** and enter `vendingconnect.com.au`. Pick the **Free** plan.
2. Cloudflare gives you two **nameservers**. Log in to the place where you bought the domain and replace its nameservers with these two.
3. Wait for it to switch over. Usually it's under an hour, but it can take up to a day.
4. Go back to your Pages project → **Custom domains** → add `vendingconnect.com.au` and `www.vendingconnect.com.au`.

## Step 4: Log in to the admin page

1. On GitHub, go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
   - Name: `Vending Connect admin`
   - Expiration: whatever you're comfortable with (you'll make a new one when it runs out)
   - Repository access: **Only select repositories** → `vendingconnect`
   - Permissions → Repository permissions → **Contents: Read and write**
2. Copy the token and keep it somewhere safe, like your password manager.
3. Go to `https://vendingconnect.com.au/admin/`, click **Sign In Using Access Token** and paste it in. Don't use the "Sign In with GitHub" button yet; it needs extra setup (see below).

You're in. You'll see **Guides**, **News** and **Site Settings** down the side.

> Later on, you can set up a "Sign in with GitHub" button instead of a token. It needs a small free Cloudflare Worker (see the Sveltia CMS docs). The token works fine to start with.

## Step 5: Turn on the enquiry form

The contact page shows a "message us on Facebook" note until you switch the form on.

1. Go to **web3forms.com** and enter the email address you want enquiries sent to. They'll email you a free **access key**.
2. In the admin page, open **Site Settings → Contact details & form**, paste the key into **Web3Forms access key**, add your email and Facebook page link, and click Save.
3. A minute later, the form is live. Send yourself a test enquiry.

**Free email on your domain:** in Cloudflare, go to **Email → Email Routing** and set up `hello@vendingconnect.com.au` to forward to your normal inbox. It's free.

## Step 6: Tell Google about the site

1. Go to **Google Search Console** and add `vendingconnect.com.au` as a **Domain** property. If Cloudflare manages the domain, it can verify it for you in a few clicks.
2. Go to **Sitemaps** and submit `sitemap-index.xml`.

That's it. Google will now find new posts on its own.

---

## Writing a new post

1. Go to `/admin/` → **Guides** → **New Guide**.
2. Fill in:
   - **Title:** write it the way people search, e.g. "How to fix a vending machine coin jam"
   - **Short description:** 1–2 sentences. This shows in Google and on Facebook.
   - **Category**
   - **Cover image** (optional): a wide photo, about 1200 × 675
   - **FAQ** (optional): 2–4 real questions people ask. These can show up right in Google results.
   - **Article:** use **Heading 2** for each main section
3. Click **Publish**. It's live in about a minute.

Tick **Draft** if you want to save it without showing it on the site yet.

**Tips for posts that rank:**
- One topic per post, answered properly
- Use real examples from your own work: machines you've fixed, sites you've seen do well
- Link to 1–2 of your other guides inside the post
- Update older posts now and then, and set the **Last updated** date

---

## SEO that runs automatically

Every time you publish, the site does all of this for you:

- Page title and description for Google
- Facebook and LinkedIn preview image and text (uses your cover image, or the default one)
- Google "Article" markup, plus "FAQ" markup when you add FAQs
- Breadcrumbs (Home › Guides › Category › Post)
- `sitemap-index.xml`, updated every build
- RSS feed at `/rss.xml`
- "Keep reading" links to related guides
- An "On this page" contents list on longer posts
- Category pages, made automatically
- Canonical links, so Google doesn't see duplicate pages
- Fast pages with no heavy scripts, which helps rankings

---

## Changing things

| I want to change… | Where |
| --- | --- |
| Email, phone, Facebook link, form key | Admin → Site Settings |
| Colours | `src/styles/global.css`, top of the file |
| Home page text | `src/pages/index.astro` |
| Free Machine page text and FAQs | `src/pages/locations.astro` |
| Menu links | `src/layouts/Base.astro` |
| Guide categories | `src/lib/posts.ts`, `src/content.config.ts` and `public/admin/config.yml` (change all three) |
| Default share image | Replace `public/og-default.png` (1200 × 630) |

## Running it on your Mac (optional)

You only need this if you want to change the code. Install Node.js 22 or newer, then in this folder run:

```
npm install
npm run dev
```

Open http://localhost:4321 to see the site.
