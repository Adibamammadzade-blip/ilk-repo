---
title: "Obsidian"
type: entity
tags: [tools, pkm, markdown, graph-view, local-first]
created: 2026-08-18
updated: 2026-08-18
sources: ["[[llm-wiki-concept]]"]
status: mature
---

# Obsidian

## Overview
**Obsidian** is a local-first, extensible markdown note-taking and knowledge management application. In the LLM Wiki architecture, Obsidian acts as the **Integrated Development Environment (IDE)** for knowledge, while the LLM acts as the programmer/maintainer and the markdown files serve as the codebase.

## Role in the LLM Wiki Ecosystem
- **Graph View:** Visualizes associative trails, clusters, hub pages, and orphan notes.
- **Local Markdown Vault:** Stored directly on disk without proprietary vendor lock-in, enabling LLM agents to read, write, and lint files natively.
- **Obsidian Web Clipper:** Allows seamless one-click markdown clipping of web articles with localized asset downloading (`raw/assets/`).
- **Ecosystem Plugins:**
  - **Dataview:** Executes SQL-like metadata queries across YAML frontmatter.
  - **Marp:** Renders markdown slides directly from wiki pages.

## Key Relationships
- Maintained as the primary viewer for [[persistent-knowledge-bases]].
- Conceptually described in [[llm-wiki-concept]].
