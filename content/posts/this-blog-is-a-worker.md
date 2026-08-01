---

title: This blog is a Cloudflare Worker
date: 2026-07-03
---

There is no static build behind this site. No content collection, no rebuild pipeline, no deploy step when I publish a post. Every article you read here is a Markdown file in an R2 bucket, fetched and rendered by a Cloudflare Worker at request time.

Publishing looks like this: I write a `.md` file with two lines of frontmatter, upload it to the bucket under `posts/`, and it is live. That's it.

![Cloudflare Workers Image](https://media.devjakob.com/cf-workers-image.png)

## Why not just use a static site generator

The standard answer for a portfolio blog is Astro content collections or MDX, build on push, ship static HTML. I use Astro too, but server-rendered on a Worker. The static path bothered me for one reason: it couples content to deployment. Fixing a typo should not require a Git commit, a CI run, and a cache purge. Content and code change at different speeds, so they should live in different places.

R2 turned out to be the right place. Posts are plain files I can edit with anything, back up with `rclone`, or upload from a script. The Worker lists the bucket for the index page and fetches a single object for a post page. `marked` turns the Markdown into HTML with GFM enabled, plus a few small passes I wrote myself: lazy loading on images, download icons on file links, that kind of thing.

## What about performance

Rendering Markdown on every request sounds wasteful until you look at where the requests actually land. The Worker runs on Cloudflare's edge, R2 reads from the same network, and the responses carry `s-maxage=300, stale-while-revalidate=3600`. In practice almost every visitor hits the CDN cache, and the ones who don't get a render that takes single-digit milliseconds. A new post shows up within five minutes without me purging anything.

The same Worker also serves the dynamic parts a static site can't do at all: comments in D1 behind GitHub OAuth, post voting, the AI chat, `llms.txt` for whatever crawls this site with a language model. One runtime, one deploy, one mental model.

## The trade-offs

Being honest about the costs: there is no type checking on frontmatter, a malformed file just renders weird. There is no local preview of the exact prod pipeline unless I point wrangler at the remote bucket. And I gave up the comfort of Git history on my writing, which I patched by keeping drafts in a separate repo anyway.

For a site this size, those trades are easy. The whole publishing system is about 150 lines in `src/lib/posts.ts`, and I understand every one of them.

Small tools you fully understand beat big frameworks you half understand.

