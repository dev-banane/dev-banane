---
title: ToonScope: giving AI agents a map instead of the whole codebase
date: 2026-07-22
---

![ToonScope logo](https://api.cephie.app/img/bananensammler_/toonscope_logo)

I built ToonScope after a meeting at work where we presented some new AI features we were working on. Someone else presented a file-by-file framework for building "flawlessly" with AI, you specify what to build next and exactly how it should be implemented. That didn't seem practical to me. It assumes you know the shape of the solution before you start, which isn't how things get built in practice (with exceptions, as always).

Shortly after that meeting it occurred to me that AI agents almost always have to read your whole files, or large parts of them, just to understand the logic they're about to touch. That takes a few rounds of grepping, reading, and evaluating before the agent can even start on the actual task. None of that is token-efficient.

The project sat half-finished after that until my Claude context filled up mid-task one too many times and I burned through my usage just re-reading the same files across sessions. I decided to finish it. A few iterations later, it now cuts the tokens an agent needs to read a project by roughly two-thirds, reliably, and makes responses to architecture-level questions noticeably faster because the agent isn't paging through files it doesn't need.

## What it actually does

ToonScope compiles a codebase into a `.toon/` folder: YAML files with each file's exports, function signatures, types, and the import graph. Point an agent at that instead of your source tree, and "what does this file export, and who calls it?" gets answered by a few hundred tokens instead of a full file read.

It's static analysis via tree-sitter WASM grammars, not an LLM call per file. No API key needed, nothing sent anywhere, and it's fast. There's an optional layer where an LLM rewrites the templated one-line summaries into nicer prose, but the exports/signatures/graph data that actually saves tokens doesn't depend on a model at all.

## Numbers, not estimates

I ran it against ToonScope's own source, 42 TypeScript files.

![ToonScope stats](https://api.cephie.app/img/bananensammler_/toonscope_stats)

That last row is the number that actually matters day to day. An agent rarely needs the whole map, it needs the file it's editing plus its direct neighbors, which is what `toonscope scope <file> --depth 2` returns. That's 3,383 tokens instead of reading several source files by hand.

Build time, measured with `time npx toonscope generate`: 0.2–0.3s of actual analysis work for the 42-file repo (parse + graph + summaries + write), reported by the tool's own build timer. Wall-clock including `npx` cold-start overhead was ~2.7–3.2s. For anything past a handful of files, `npx toonscope watch` avoids paying that repeatedly, and incremental builds only re-analyze changed files via a content-hash cache (`.toon/cache.json`).

The single largest file in ToonScope's own repo, `src/analyzer/generic.ts` at 12,855 raw tokens, compresses to 1,070, a 92% saving. That's the extreme case, one function per supported language, almost entirely boilerplate an agent doesn't need to see to know the function signatures exist.

## Getting started

```bash
npx toonscope init
```

That's the whole pitch. It detects your project, writes `.toonscope.yaml`, wires up whichever of AGENTS.md, CLAUDE.md, Cursor, Copilot, Gemini, or Windsurf config it finds, and runs the first build. `npx toonscope generate` refreshes it after a change; `npx toonscope watch` keeps it live while you work.

## The part I actually care about: trust

An index that quietly drifts from the source is worse than no index. The agent goes from slow to confidently wrong. So there's `npx toonscope check`: a content-hash comparison against source, no rebuild involved. It exits clean when `.toon/` is current, and otherwise lists exactly which files are new, changed, or removed. Agents set up by `init` are instructed to run this before trusting the map, and to fall back to reading the real source if `.toon/` and the source ever disagree.

## Under the hood

Parsing goes through tree-sitter grammars compiled to WASM, so there's no native build step and it runs the same on every platform. Builds are incremental by default. AI summaries, when enabled, are cached per file-content-hash and provider/model, and a provider failure on one file falls back to that file's template summary instead of aborting the whole run. API keys, if you use them, live in `~/.config/toonscope/config.json`, never in the repo.

It's AGPL-3.0, on npm as [`toonscope`](https://www.npmjs.com/package/toonscope), source at [github.com/dev-banane/toonscope](https://github.com/dev-banane/toonscope). It's the tool I wanted to exist before I was annoyed enough to build it: less "another AI wrapper," more a smaller, truer map of the codebase you already have.

```bash
npx toonscope init
```
