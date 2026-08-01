---
title: Smarter Ghosts: Implementing Pathfinding Algorithms in Pac-Man
date: 2026-03-06
---

![Pacman](https://api.cephie.app/img/bananensammler_/article_1)

Video games look simple on the surface, but underneath, they're often powered by surprisingly elegant computer science. For my high school thesis (Facharbeit) in computer science, I explored exactly that intersection: taking a 1980s arcade classic and upgrading it with real pathfinding algorithms, implemented in Java.

The question I set out to answer was straightforward: how do different pathfinding algorithms affect ghost behavior in Pac-Man, and which one is actually best suited for the job?

## The Algorithms

I compared two classics: **Dijkstra's algorithm** (1959) and **A\*** (1968).

Dijkstra works by exploring a weighted graph from a starting node outward in all directions, always expanding the nearest unvisited node first. It's thorough and always finds the optimal path, but it doesn't know where the target is, so it explores a lot of irrelevant territory along the way.

A\* improves on this by adding a heuristic, an estimate of the remaining distance to the goal. For a grid-based game like Pac-Man, the Manhattan distance (horizontal + vertical steps between two tiles) works perfectly. This guides the search toward the target and dramatically reduces the number of nodes visited. When the heuristic is set to zero, A\* behaves identically to Dijkstra, which also meant I could implement both algorithms in a single `findPath()` method, toggled by a `useHeuristic` parameter.

## The Implementation

I built on top of an existing open-source Java Pac-Man project by Drew Schuster, extending the `Ghost` class with a selectable algorithm mode: `RANDOM`, `DIJKSTRA`, `ASTAR`, `TEAM`, and `RANDOM_EACH`. The game board is modeled as a 2D grid where each walkable tile is a node. Walls are marked and skipped by the algorithm.

One detail I'm particularly happy with: to prevent ghosts from awkwardly reversing direction, I introduced a penalty cost of 10 (versus the normal 1) for U-turns. This small tweak made ghost movement feel much more natural.

## The Team Mode

Beyond the two standard algorithms, I implemented a **team mode** where all four ghosts coordinate to surround the player. Each ghost targets a different offset position relative to Pac-Man: one chases directly, one intercepts ahead, and two flank from the sides. All four use A\* internally to reach their individual targets. The result is a pincer movement that's genuinely hard to escape, far more threatening than four ghosts all chasing the same point.

## What I Learned

The most interesting takeaway wasn't technical, it was about the gap between algorithmic efficiency and user experience. A\* visits far fewer nodes than Dijkstra and is computationally superior for any scenario where the target is known. But from the player's perspective, both algorithms feel almost identical, since both always find the shortest path. The real performance difference would only matter at a much larger scale.

The team mode, on the other hand, made a massive difference to gameplay despite using the same underlying A\* algorithm, just with smarter target selection. That was a good reminder that *what* you compute often matters more than *how efficiently* you compute it.

The full source code is available on my [GitHub](https://github.com/dev-banane/javapacman).

Read the [full thesis PDF](https://media.devjakob.com/Facharbeit-Informatik.pdf).
