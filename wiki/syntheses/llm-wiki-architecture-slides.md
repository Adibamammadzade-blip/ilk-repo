---
marp: true
theme: default
paginate: true
header: 'LLM Wiki: Architecture & Operational Paradigm'
footer: 'ilk-repo | Persistent Compounding Knowledge'
title: "Slide Deck: LLM Wiki Architecture"
type: synthesis
tags: [marp, presentation, architecture, slides, llm-wiki]
created: 2026-08-19
updated: 2026-08-19
sources: ["[[llm-wiki-concept]]", "[[as-we-may-think-bush-1945]]"]
status: mature
---

# The LLM Wiki Paradigm
## Persistent, Compounding Knowledge Bases vs. Ephemeral RAG
**Repository:** `ilk-repo` | **Branch:** `mehriban`

---

# The Problem: Ephemeral RAG
- Traditional RAG systems retrieve isolated chunks at runtime.
- **Zero Accumulation:** The LLM re-derives insights from scratch on every prompt.
- **Multi-Hop Blindspots:** Questions requiring synthesis across 5+ documents fail when the vector retriever misses subtle contextual bridges.

---

# The Solution: The 3-Layer LLM Wiki

```
┌────────────────────────────────────────────────────────┐
│ LAYER 1: Raw Sources (Immutable Ground Truth)         │
│ raw/articles, raw/papers, raw/notes, raw/assets        │
├────────────────────────────────────────────────────────┤
│ LAYER 2: The Living Wiki (LLM-Maintained Markdown)     │
│ wiki/sources, wiki/concepts, wiki/entities, syntheses  │
├────────────────────────────────────────────────────────┤
│ LAYER 3: Schema & Operating Protocols                  │
│ AGENTS.md / GEMINI.md                                  │
└────────────────────────────────────────────────────────┘
```

---

# 80-Year Historical Lineage: Memex to Agentic Wiki

1. **1945 (Vannevar Bush):** Conceived the *Memex* and *Associative Trails*.
2. **1960s–80s (Niklas Luhmann):** *Zettelkasten* slip-box indexing.
3. **2020s (Obsidian):** Local-first bidirectional `[[wikilinks]]`.
4. **The Maintenance Tax:** Humans abandon wikis because manual linking cost is $O(N^2)$.
5. **2026 (LLM Wiki):** Autonomous LLM agents eliminate the maintenance tax.

---

# Core Operations & Division of Labor

| Operation | Human Role (High-Leverage) | LLM Agent Role (Zero Friction) |
|---|---|---|
| **/ingest** | Curate raw sources in `raw/` | Extract claims, update 10+ wiki pages, append to `log.md` |
| **/query** | Ask strategic multi-hop inquiries | Traverse graph, compile answer, file back as synthesis |
| **/lint** | Direct health focus areas | Audit broken wikilinks, fix orphan pages, verify schemas |

---

# Live Tools in this Repository

- **`python/wiki_search.py`:** Zero-dependency hybrid CLI search engine.
- **`python/wiki_lint.py`:** Automated graph health and link resolution linter.
- **`html/index.html`:** Interactive browser-based Knowledge Graph Explorer.
- **`wiki/index.md` & `wiki/log.md`:** Living catalog and audit trail.

---

# Summary & Vision

> *"The wiki is a persistent, compounding artifact. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase."*

**Get Started:** Explore the vault in Obsidian or launch `html/index.html`!
