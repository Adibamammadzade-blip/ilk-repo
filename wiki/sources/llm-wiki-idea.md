---
title: "Source Summary: LLM Wiki Idea"
type: source
created: 2026-08-19
updated: 2026-08-19
tags: [architecture, llm, pkm, knowledge-base]
---

# Source: LLM Wiki Idea

- **Source File**: `raw/llm-wiki-idea.md`
- **Category**: Knowledge Management Architecture / AI Workflows

## Core Thesis
Traditional RAG setups re-derive knowledge dynamically from scratch on every query without accumulating insight. The **LLM Wiki Pattern** shifts this paradigm by using an LLM to build and maintain a persistent, compounding markdown wiki (interlinked pages, index, log) acting as a compiled middle layer between raw immutable sources and user queries.

## Key Takeaways
1. **Three-Layer Architecture**:
   - `raw/`: Immutable source of truth.
   - `wiki/`: Persistent markdown knowledge base written and maintained by the LLM.
   - `schema` (e.g. `AGENTS.md`): Operational protocol and formatting rules governing the agent.
2. **Three Core Operations**:
   - `Ingest`: Extract key points, update cross-referenced entities/concepts, maintain catalog index, and log.
   - `Query`: Consult wiki first, synthesize answers with citations, file high-value synthesis back into the wiki.
   - `Lint`: Periodically detect stale claims, contradictions, orphans, and knowledge gaps.
3. **Compounding Value**: The user explores and asks questions; the LLM handles all tedious bookkeeping, cross-referencing, and synthesis.

## Related Links
- [[LLM Wiki Pattern]]
