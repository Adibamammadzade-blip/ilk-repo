---
title: "Guide: Obsidian & The LLM Wiki Paradigm"
type: synthesis
tags: [obsidian, llm-wiki, pkm, workflow, guide, architecture]
created: 2026-08-18
updated: 2026-08-18
sources: ["[[llm-wiki-concept]]", "[[persistent-knowledge-bases]]", "[[obsidian]]"]
status: mature
---

# Guide: Obsidian & The LLM Wiki Paradigm

## 1. The Core Mental Model

In traditional knowledge management (PKM), you are responsible for everything: finding sources, reading, summarizing, manually creating links, updating index files, and filing notes. Over time, the bookkeeping burden becomes too heavy, and the wiki falls into disuse.

The **LLM Wiki** divides labor along natural strengths:

```text
┌────────────────────────────────────────────────────────┐
│                   HUMAN USER                           │
│  - Curates raw sources (Articles, Papers, Notes)       │
│  - Directs inquiries & asks high-level questions       │
│  - Explores connections visually in Obsidian           │
└───────────────────────────┬────────────────────────────┘
                            │
              Markdown Vault (Disk Interface)
                            │
┌───────────────────────────▼────────────────────────────┐
│                    LLM AGENT                           │
│  - Ingests raw text & extracts atomic facts            │
│  - Builds & maintains pages in wiki/                   │
│  - Links concepts automatically via [[wikilinks]]      │
│  - Resolves tensions, updates index.md, and logs audits│
└────────────────────────────────────────────────────────┘
```

> **The Analogy:**
> - **Obsidian** is your **IDE** (like VS Code).
> - **The LLM Agent** is your **Programmer / Senior Librarian**.
> - **The Wiki Vault** is your **Codebase**.

---

## 2. Why Obsidian is the Perfect Companion

1. **Local-First Markdown Files:**
   - Obsidian does not store notes in a proprietary database or cloud silo. Everything is plain `.md` files on your local drive.
   - Because of this, LLM agents have native, zero-latency filesystem access to read, create, and refactor pages.

2. **Bidirectional Wikilinks (`[[Page Name]]`):**
   - Obsidian automatically builds a bidirectional knowledge graph from standard wikilinks. When the agent writes `[[persistent-knowledge-bases]]`, Obsidian immediately registers backlinks, mentions, and visual nodes.

3. **Interactive Graph View (`Ctrl+G` / `Cmd+G`):**
   - You can visually inspect your brain's topology in real time.
   - Central hubs (nodes with many connections) represent mature core topics.
   - Outlying nodes or clusters highlight emerging research areas or concepts that need more sourcing.

4. **YAML Frontmatter & Metadata (`Dataview`):**
   - The LLM writes standardized YAML headers (`type`, `tags`, `sources`, `status`).
   - Using the [[dataview|Dataview plugin]], Obsidian turns your markdown into a queryable database:
     ```dataview
     TABLE status, updated, tags
     FROM "wiki"
     WHERE type = "concept"
     SORT updated desc
     ```

---

## 3. The Daily Workflow

### Step 1: Human Curates (`raw/`)
- When reading online, use the **Obsidian Web Clipper** or save a PDF/markdown note into `raw/articles/` or `raw/notes/`.
- Download images locally to `raw/assets/` using the hotkey (`Ctrl+Shift+D`).

### Step 2: Agent Ingests (`/ingest`)
- Tell your agent: *"Ingest `raw/articles/ai-trends.md`"*.
- The agent reads the raw file, extracts key claims into `wiki/sources/`, updates or creates relevant `wiki/concepts/` and `wiki/entities/`, updates `wiki/index.md`, and writes to `wiki/log.md`.
- The agent automatically commits the changes to Git.

### Step 3: Human Explores & Queries (`/query`)
- Open Obsidian on one screen and the agent on the other.
- As the agent works, watch the files and Graph View update live in Obsidian.
- Ask questions: *"What does our wiki say about the difference between Vector RAG and Persistent Wikis?"*
- The agent references `[[wiki/sources/llm-wiki-concept|sources]]`, provides an answer, and files new comparisons into `wiki/syntheses/`.

### Step 4: Health Audits (`/lint`)
- Ask the agent to run `/lint` periodically to find broken links, unlinked keywords, or unresolved contradictions.

---

## 4. Key Configurations in this Repository

| Component | Location | Purpose |
|---|---|---|
| **Schemas** | [`AGENTS.md`](../../AGENTS.md), [`GEMINI.md`](../../GEMINI.md) | Enforces agent consistency across sessions. |
| **Git Safety** | [`.gitignore`](../../.gitignore) | Keeps Obsidian workspace cache local; agent commits locally but **never** pushes. |
| **Search Engine** | [`python/wiki_search.py`](../../python/wiki_search.py) | Zero-dependency CLI search across frontmatter and body. |
