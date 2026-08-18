---
title: "Obsidian and LLM Wiki Workflow Guide"
type: synthesis
created: 2026-08-19
updated: 2026-08-19
tags: [synthesis, obsidian, workflow, guide, pkm, agent-pair]
---

# Obsidian & LLM Wiki Workflow Guide

A practical handbook on configuring, navigating, and collaborating with your LLM Wiki inside Obsidian.

---

## 1. The Core Philosophy: Obsidian as IDE, LLM as Developer

In modern software development, developers use IDEs (like VS Code or JetBrains) to write and inspect code. In the [[LLM Wiki Pattern]]:
- **The Wiki (`wiki/`) is the Codebase**: Plaintext markdown files organized into entities, concepts, sources, and synthesis.
- **The LLM is the Programmer**: Reads raw sources, writes structured markdown, maintains `[[Wikilinks]]`, resolves inconsistencies, and appends to `log.md`.
- **Obsidian is the Knowledge IDE**: You use Obsidian to read notes, navigate backlinks, explore the interactive graph view, and direct research.

---

## 2. Setting Up Your Workspace in Obsidian

1. **Open Vault**:
   - Open Obsidian.
   - Click **"Open folder as vault"** and select `/Users/macbookairm2/Documents/GitHub/ilk-repo`.
2. **Recommended Settings**:
   - **Files and links**:
     - *New link format*: **Shortest path when possible** (uses `[[Page Name]]`).
     - *Use `[[Wikilinks]]`*: **ON**.
     - *Default location for new attachments*: `raw/assets/` (or in subfolder).
3. **Graph View Navigation**:
   - Press `Cmd + G` to open the **Graph View**.
   - Color code your nodes by folder or tag:
     - Purple for `type: concept` / `wiki/concepts`
     - Green for `type: entity` / `wiki/entities`
     - Cyan for `type: source` / `wiki/sources`
     - Amber for `type: synthesis` / `wiki/synthesis`

---

## 3. The Daily Operational Cycle

```text
Step 1: Input (Human)
  └─ You drop an article or notes into `raw/` or paste in chat.

Step 2: Compilation (LLM)
  └─ LLM creates `wiki/sources/<slug>.md`, updates relevant concepts/entities,
     refreshes `wiki/index.md`, and logs the operation in `wiki/log.md`.

Step 3: Exploration (Human in Obsidian)
  └─ You open Obsidian on your screen, see new nodes light up in Graph View,
     and follow associative trails.

Step 4: Compounding Synthesis (Human + LLM)
  └─ You ask exploratory questions; valuable insights are saved back into `wiki/synthesis/`.
```

---

## 4. Why This Outperforms Traditional Note-Taking

| Traditional Human Note-Taking | LLM-Maintained Persistent Wiki |
| :--- | :--- |
| **High Maintenance Burden**: Hours spent tagging, filing, and fixing links. | **Zero Maintenance Cost**: LLM handles cross-linking and indexing instantly. |
| **Entropy & Abandonment**: Wikis get messy and outdated as they grow. | **Self-Healing**: Automated linters (`wiki_tools.py lint`) and periodic agent audits keep links fresh. |
| **Isolated Notes**: Hard to spot cross-source contradictions. | **Automatic Synthesis**: LLM flags corroborations and contradictions across sources. |

---

## Related Links
- [[LLM Wiki Pattern]]
- [[Zettelkasten Method]]
- [[Memex]]
- [[Wikilinks]]
- [[wiki_tools]]
- [[Knowledge Architecture and Codebase Synthesis]]
- [[Evolution of Knowledge Systems - Memex to LLM Wiki]]
