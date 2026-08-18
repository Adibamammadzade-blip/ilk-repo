---
title: "Marp"
type: entity
tags: [tools, presentation, markdown, marp, slides]
created: 2026-08-18
updated: 2026-08-18
sources: ["[[llm-wiki-concept]]"]
status: mature
---

# Marp

## Overview
**Marp** (Markdown Presentation Ecosystem) is a toolchain and format for converting standard markdown files into presentation slide decks. 

## Role in the LLM Wiki Ecosystem
- **Synthesized Slide Generation:** Allows the LLM agent to directly export query results, literature summaries, and executive briefings into presentation-ready slide decks without manual slide design.
- **Obsidian Integration:** Works via the Marp community plugin in [[obsidian]], enabling live slide deck rendering directly within the vault.

## Example Slide Format
```markdown
---
marp: true
theme: default
paginate: true
---

# LLM Wiki Executive Briefing
## Compounding Knowledge Systems

---

- Persistent compilation vs. ephemeral RAG
- Zero marginal maintenance cost
```

## Relationships
- Integrates with [[obsidian]].
- Referenced in [[llm-wiki-concept]].
