---
title: "LLM Wiki: A Pattern for Building Personal Knowledge Bases Using LLMs"
type: source
tags: [knowledge-management, llm, obsidian, zettelkasten, memex]
created: 2026-08-18
updated: 2026-08-18
sources: ["[[raw/notes/llm-wiki-concept.md]]"]
status: mature
---

# Source: LLM Wiki Concept

## Summary
The LLM Wiki pattern is an architectural alternative to traditional query-time Retrieval-Augmented Generation (RAG). Instead of recalculating connections and searching raw chunks upon every query, an LLM agent incrementally compiles, cross-references, and maintains a persistent, interlinked markdown wiki in real time.

## Key Claims & Takeaways
1. **Compounding Knowledge:** Traditional RAG is stateless across queries; an LLM Wiki compiles raw sources into an evolving knowledge graph that compounds over time (`[[persistent-knowledge-bases]]`).
2. **Zero Maintenance Friction:** Humans struggle to maintain personal wikis due to the bookkeeping overhead (cross-referencing, re-summarizing, logging); LLMs perform this maintenance at virtually zero marginal effort.
3. **Tri-Layer Architecture:**
   - **Raw Layer:** Immutable source documents (`raw/`).
   - **Wiki Layer:** LLM-maintained interlinked markdown files (`wiki/`).
   - **Schema Layer:** Agent rules and operational protocol (`AGENTS.md` / `GEMINI.md`).
4. **Obsidian as Knowledge IDE:** Obsidian acts as the graphical workbench and graph visualizer (`[[obsidian]]`), while the LLM acts as the programmer/curator.
5. **Historical Precedent:** Modern realization of Vannevar Bush's 1945 Memex vision with associative trails maintained automatically.

## Entities Mentioned
- [[obsidian|Obsidian]]: Local-first markdown editor & knowledge graph visualization tool.
- [[marp|Marp]]: Markdown-based presentation deck generator.
- [[dataview|Dataview]]: Obsidian query plugin for YAML frontmatter metadata.
- [[qmd|qmd]]: Local hybrid search engine (BM25 + vector search) for markdown vaults.

## Concepts Connected
- [[persistent-knowledge-bases|Persistent Knowledge Bases vs Query-Time RAG]]
- [[rag-vs-llm-wiki|Synthesis: RAG vs LLM Wiki]]

## Backlinks & Ingest Audit
- Ingested on 2026-08-18 as the founding source of this wiki.
- Raw reference: `raw/notes/llm-wiki-concept.md`
