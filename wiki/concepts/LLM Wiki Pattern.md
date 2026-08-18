---
title: "LLM Wiki Pattern"
type: concept
created: 2026-08-19
updated: 2026-08-19
tags: [concept, architecture, knowledge-base, memex]
---

# LLM Wiki Pattern

The **LLM Wiki Pattern** is a knowledge management framework where an LLM incrementally maintains a persistent, interlinked markdown wiki rather than relying on ephemeral RAG lookups.

## Key Characteristics
- **Persistence & Compounding**: Insights, cross-references, and entity connections are saved as markdown files that grow richer over time.
- **Clear Separation of Concerns**:
  - **Human**: Curates sources, asks exploratory questions, reviews synthesis, sets directions.
  - **LLM**: Bookkeeping, page creation, cross-linking, contradiction detection, catalog indexing.
- **Obsidian / Markdown Native**: Files live locally as plain text, compatible with Obsidian (graph view, Dataview, canvas) and version-controlled via Git.

## Comparison: Traditional RAG vs. LLM Wiki

| Dimension | Traditional RAG | LLM Wiki |
| :--- | :--- | :--- |
| **Knowledge State** | Ephemeral (re-computed per prompt) | Persistent (compiled into markdown files) |
| **Synthesis** | Fragmentary retrieval | Interconnected, multi-document synthesis |
| **Contradictions** | Unnoticed across distant queries | Explicitly flagged and reconciled in wiki |
| **Compounding** | Zero accumulation across chats | Compounding value with each ingest & query |

## References
- [[llm-wiki-idea]]
