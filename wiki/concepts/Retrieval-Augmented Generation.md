---
title: "Retrieval-Augmented Generation"
type: concept
created: 2026-08-19
updated: 2026-08-19
tags: [concept, ai, rag, information-retrieval, search]
---

# Retrieval-Augmented Generation (RAG)

**Retrieval-Augmented Generation (RAG)** is an AI architectural pattern where an external retrieval system (usually a vector database or hybrid search engine) provides context chunks to a large language model at query time.

## Standard RAG Pipeline
1. **Ingest & Chunking**: Raw documents are split into arbitrary token chunks (e.g. 500 tokens).
2. **Embedding**: Chunks are converted into high-dimensional vector embeddings and stored in a vector database.
3. **Query Retrieval**: The user's query is embedded, top-$k$ nearest neighbors are retrieved, and passed into the prompt context.
4. **Answer Generation**: The LLM synthesizes an ephemeral response from the injected chunks.

## Architectural Trade-offs: RAG vs. [[LLM Wiki Pattern]]

| Dimension | Standard RAG | LLM Wiki Pattern |
| :--- | :--- | :--- |
| **Synthesis State** | Ephemeral (lost after prompt response) | Persistent markdown knowledge layer |
| **Cross-Document Synthesis** | Weak across disparate or subtle relations | Strong; pre-compiled and continually updated |
| **Contradiction Detection** | Silent failures across conflicting chunks | Explicit contradiction tracking & resolution |
| **Inspectability** | Black-box vector space embeddings | Plain-text [[Wikilinks]] & Obsidian graph |

## References
- [[LLM Wiki Pattern]]
- [[llm-wiki-idea]]
- [[Knowledge Architecture and Codebase Synthesis]]
