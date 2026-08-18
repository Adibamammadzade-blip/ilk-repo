---
title: "qmd"
type: entity
tags: [tools, search, local-first, bm25, vector-search, cli, mcp]
created: 2026-08-18
updated: 2026-08-18
sources: ["[[llm-wiki-concept]]"]
status: mature
---

# qmd

## Overview
**qmd** is a fast, local-first search engine specifically built for markdown files and personal notes vaults. It combines hybrid BM25 lexical search with vector search and on-device LLM re-ranking.

## Role in the LLM Wiki Ecosystem
- **Agent CLI & MCP Server:** Provides both a terminal CLI and an MCP (Model Context Protocol) server interface, enabling LLM agents to execute high-precision searches across large vaults beyond `index.md` capacity (~100+ sources).
- **On-Device Search:** Retains complete data privacy by running indexing and embedding computation locally.

## Relationships
- Complements [[obsidian]] vaults and [[persistent-knowledge-bases]].
- Mentioned in [[llm-wiki-concept]].
