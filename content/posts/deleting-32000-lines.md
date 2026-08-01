---
title: Deleting 32,000 lines on purpose
date: 2026-06-30
---

Last month I deleted about 32,000 lines of code from Petal. Not refactored. Deleted. The Code and Cloud IDE surfaces, gone in one branch.

That code worked. People had used it. Some of it was the hardest engineering in the whole product: a browser IDE, file trees, remote execution, the kind of stuff you show off. And that was exactly the problem. I was building the parts that were fun to build instead of the parts that made Petal worth opening every day.

## How it got there

Petal started as a memory-first AI workspace. Markdown files you own, hybrid retrieval on top, chat with whatever model you want. Clear idea. Then scope did what scope does. If the AI can read your memory, why not your code? If it can read your code, why not edit it? If it can edit it, why not run it? Every step felt small and reasonable. Eighteen months later I had four products duct-taped together, and none of them were the best at anything.

The IDE was the worst offender. Building a code editor that competes with VS Code plus Copilot plus Cursor is not a side quest. It is a company. I was spending most of my time maintaining surfaces that maybe five percent of sessions ever touched, while the memory system, the actual reason Petal exists, got the leftovers.

## The cut

The decision took weeks. The deletion took an afternoon. I branched, removed the IDE routes, the execution workers, the file sync layer, the editor components, and everything that only existed to support them. CI went green. The app got faster to build, faster to load, and honestly, easier to explain.

That last part matters more than I expected. "Petal is an AI workspace with code execution and cloud storage and chat and memory" is a pitch that dies in the first sentence. "Petal is AI memory that's actually yours" is a product.

## What I learned

Sunk cost is loudest right before you delete something. Every argument for keeping the IDE was really an argument about the past: how long it took, how hard it was, how much I learned building it. None of that is a reason users would pick Petal. The learning stays even when the code goes.

Not every product needs to be a platform. Sometimes the most productive commit is the one with a minus sign in front of it.
