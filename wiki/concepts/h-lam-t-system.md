---
title: "The H-LAM/T System"
type: concept
tags: [mental-models, cognitive-architecture, engelbart, human-ai-symbiosis, frameworks]
created: 2026-08-19
updated: 2026-08-19
sources: ["[[augmenting-human-intellect-engelbart-1962]]"]
status: mature
---

# The H-LAM/T System

## Definition
The **H-LAM/T System** (**H**uman using **L**anguage, **A**rtifacts, **M**ethodology, and **T**raining) is a cognitive augmentation framework formulated by [[douglas-engelbart|Douglas Engelbart]] in 1962. It asserts that intellectual problem-solving capability is not a fixed biological attribute of the human brain alone, but an emergent property of the integrated system comprising the human and four foundational cognitive pillars.

```mermaid
flowchart TD
    subgraph Augmented Human Intellect (H-LAM/T)
        H[Human Thinker]
        L[Language: Mental Models & Ontologies]
        A[Artifacts: External Storage, Vaults & Obsidian]
        M[Methodology: LLM Wiki Schema & Agent Protocols]
        T[Training: Interaction Skills & Prompting Mastery]
        
        H <--> L
        H <--> A
        H <--> M
        H <--> T
        L <--> A
        A <--> M
        M <--> T
    end
```

## The Four Pillars Explained

| Pillar | Engelbart's 1962 Vision | LLM Wiki Modern Mapping |
|---|---|---|
| **Language (L)** | Conceptual symbols and categorization models | YAML frontmatter schemas, tag taxonomies, wikilink semantics |
| **Artifacts (A)** | Physical paper, CRT displays, electronic storage | Local markdown vaults (`wiki/`, `raw/`), [[obsidian]], Web UI Graph |
| **Methodology (M)** | Structured problem-solving procedures | Operating manuals (`AGENTS.md` / `GEMINI.md`), `/ingest`, `/query`, `/lint` |
| **Training (T)** | Skill development in symbol manipulation | Human prompt crafting, graph navigation, and agent collaboration |

## Core Implications for Agentic Knowledge Bases
1. **Overcoming Working Memory Limits:** Biological working memory is strictly bounded ($7 \pm 2$ items). The H-LAM/T system externalizes multi-layer conceptual pyramids into persistent markdown files.
2. **Recursive Bootstrapping:** Improving the *Methodology* and *Artifacts* (e.g., automated python linting, agentic cross-referencing) enhances all subsequent research workflows.
3. **Agentic Integration:** In the modern AI era, the LLM acts as an active component within the *Artifact* and *Methodology* layers, automating the symbol-manipulation grunt work that historically overwhelmed human maintainers.

## Connected Pages
- [[augmenting-human-intellect-engelbart-1962]]
- [[douglas-engelbart]]
- [[persistent-knowledge-bases]]
- [[associative-trails]]
- [[engelbart-bush-symbiosis-ai]]
