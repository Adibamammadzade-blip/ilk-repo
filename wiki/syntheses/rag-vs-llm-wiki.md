---
title: "Synthesis: RAG vs LLM-Maintained Wiki"
type: synthesis
tags: [architecture-comparison, rag, knowledge-graphs, llm-systems]
created: 2026-08-18
updated: 2026-08-18
sources: ["[[llm-wiki-concept]]"]
status: growing
---

# Synthesis: RAG vs LLM-Maintained Wiki

## Problem Statement
Information retrieval from growing collections of personal and professional documents typically relies on naive Retrieval-Augmented Generation (RAG). While RAG handles point-lookups well, it fails on complex multi-hop synthesis and does not accumulate systemic understanding over time.

## Comparison Matrix

| Dimension | Traditional Vector RAG | LLM-Maintained Wiki |
|---|---|---|
| **Knowledge State** | Ephemeral & stateless across queries | Persistent, structured, and compounding |
| **Cross-Referencing** | Calculated on-the-fly via similarity search | Explicitly wired via bidirectional `[[wikilinks]]` |
| **Contradiction Handling** | Unpredictable (fragments compete in prompt) | Explicitly reconciled and noted on concept pages |
| **Multi-Hop Synthesis** | Weak; relies on retriever hitting all pieces | Strong; pre-linked concepts are traversed naturally |
| **User Experience** | Chat box query/response | Live visual knowledge graph in [[obsidian]] |
| **Maintenance Cost** | Low upfront, static vector index | Zero marginal cost (LLM handles bookkeeping) |

## Key Takeaway
The LLM Wiki converts documents into a structured, pre-compiled knowledge codebase. Use RAG when working with massive external corpora that cannot be pre-processed; use an LLM Wiki for high-value, curated personal and domain-specific knowledge bases.
