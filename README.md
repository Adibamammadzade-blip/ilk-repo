# ilk-repo: Persistent LLM Wiki & Full-Stack Sandbox

A multi-language codebase and persistent, compounding **LLM Wiki knowledge base**.

---

## 🏛️ Repository Architecture

This repository operates on a 3-layer architecture uniting human curation, local markdown storage (Obsidian-compatible), and autonomous LLM maintenance:

```text
ilk-repo/
├── AGENTS.md                 # Agent Operating Manual (Codex / Claude / OpenCode schema)
├── GEMINI.md                 # Agent Operating Manual (Gemini / Antigravity schema)
├── .gitignore                # Excludes Obsidian internal caches and OS artifacts
├── README.md                 # Master project & file-by-file documentation
│
├── html/                     # Web Frontend Markup
│   └── index.html            # Minimal HTML5 boilerplate with dark styling hooks
│
├── css/                      # Web Frontend Styles
│   └── index.css             # Dark-themed responsive stylesheet
│
├── js/                       # Web Frontend Logic
│   └── index.js              # DOM manipulation script
│
├── python/                   # Python Scripting & Local Tooling
│   ├── main.py               # Core syntax, data structures, and OOP Repository demo
│   └── wiki_search.py        # Local zero-dependency CLI search engine for the wiki
│
├── raw/                      # LAYER 1: Raw Sources (IMMUTABLE Ground Truth)
│   ├── articles/             # Clipped web articles, blogs, essays (.gitkeep)
│   ├── papers/               # Research papers, preprints, whitepapers (.gitkeep)
│   ├── notes/                # Raw thoughts, book transcripts, idea drafts
│   │   └── llm-wiki-concept.md # Genesis concept document for the LLM Wiki
│   └── assets/               # Locally stored images, diagrams, attachments (.gitkeep)
│
└── wiki/                     # LAYER 2: The Living Wiki (LLM-MAINTAINED)
    ├── index.md              # Content-oriented master catalog
    ├── log.md                # Append-only chronological audit log
    ├── sources/              # Structured extractions of raw sources
    │   ├── llm-wiki-concept.md
    │   └── codebase-starter-modules.md
    ├── concepts/             # Evolving topic overviews & mental models
    │   └── persistent-knowledge-bases.md
    ├── entities/             # People, tools, organizations, projects
    │   ├── obsidian.md
    │   ├── ilk-repo.md
    │   ├── dataview.md
    │   ├── marp.md
    │   └── qmd.md
    └── syntheses/            # Deep-dive analyses & cross-cutting comparisons
        ├── rag-vs-llm-wiki.md
        └── obsidian-llm-wiki-guide.md
```

---

## 📂 File-by-File Documentation

### ⚙️ Root Configuration & Protocols
| File | Role | Description |
|---|---|---|
| [`AGENTS.md`](./AGENTS.md) | Schema & Protocol | Operational manual for AI agents (OpenAI Codex, Claude Code, Pi) specifying ingest, query, and lint flows. |
| [`GEMINI.md`](./GEMINI.md) | Schema & Protocol | Mirror operating manual for Google Gemini / Antigravity agent environments. |
| [`.gitignore`](./.gitignore) | Git Configuration | Ignores `.obsidian/` workspace cache, starred notes, and OS junk (`Thumbs.db`, `.DS_Store`). |
| [`README.md`](./README.md) | Documentation | Comprehensive repository overview, file map, and usage guide. |

### 🌐 Frontend & Core Scripts
| File | Language | Description |
|---|---|---|
| [`html/index.html`](./html/index.html) | HTML5 | Entrypoint webpage linked to dark-theme styles. |
| [`css/index.css`](./css/index.css) | CSS3 | Universal reset, dark background (`#000`), centered typography. |
| [`js/index.js`](./js/index.js) | JavaScript | Browser script logging to console and styling headers. |
| [`python/main.py`](./python/main.py) | Python 3 | Demonstrates functions, type hints, list comprehensions, and OOP with the `Repository` class. |
| [`python/wiki_search.py`](./python/wiki_search.py) | Python 3 | Standalone CLI search engine that parses YAML frontmatter and body text with relevance ranking. |

### 📥 Layer 1: Raw Sources (`raw/`)
*Immutable ground truth. The agent reads from this folder but never modifies or deletes existing raw files.*
- **[`raw/notes/llm-wiki-concept.md`](./raw/notes/llm-wiki-concept.md)**: The original thesis document defining the persistent LLM Wiki pattern and Vannevar Bush's Memex philosophy.
- **`raw/articles/`**: Dedicated drop folder for Obsidian Web Clipper articles.
- **`raw/papers/`**: Drop folder for academic papers, preprints, and PDFs.
- **`raw/assets/`**: Local storage for downloaded figures, charts, and diagrams.

### 🧠 Layer 2: Living Wiki (`wiki/`)
*Continuously maintained and cross-linked by the LLM agent.*
- **[`wiki/index.md`](./wiki/index.md)**: Master index listing all active concepts, entities, sources, and syntheses.
- **[`wiki/log.md`](./wiki/log.md)**: Machine-parseable chronological audit trail of all ingests, queries, and lints.
- **`wiki/sources/`**:
  - [`llm-wiki-concept.md`](./wiki/sources/llm-wiki-concept.md): Atomic claims extracted from the founding manifesto.
  - [`codebase-starter-modules.md`](./wiki/sources/codebase-starter-modules.md): Structural breakdown of the project's code files.
- **`wiki/concepts/`**:
  - [`persistent-knowledge-bases.md`](./wiki/concepts/persistent-knowledge-bases.md): Compounding markdown graphs vs. stateless query-time RAG.
- **`wiki/entities/`**:
  - [`obsidian.md`](./wiki/entities/obsidian.md): Obsidian as the interactive knowledge IDE.
  - [`ilk-repo.md`](./wiki/entities/ilk-repo.md): This repository's architecture and modules.
  - [`dataview.md`](./wiki/entities/dataview.md): Plugin for executing structured frontmatter queries.
  - [`marp.md`](./wiki/entities/marp.md): Markdown presentation deck engine.
  - [`qmd.md`](./wiki/entities/qmd.md): Local hybrid search engine (BM25 + vector search).
- **`wiki/syntheses/`**:
  - [`rag-vs-llm-wiki.md`](./wiki/syntheses/rag-vs-llm-wiki.md): Comparative analysis matrix between Vector RAG and LLM Wiki.
  - [`obsidian-llm-wiki-guide.md`](./wiki/syntheses/obsidian-llm-wiki-guide.md): In-depth guide on operating Obsidian alongside the LLM Agent.

---

## ⚡ Quick Start: Using Obsidian with the LLM Wiki

1. **Open Vault in Obsidian**:
   - Open Obsidian -> Choose **Open folder as vault** -> Select `ilk-repo`.
2. **Explore the Graph**:
   - Press `Ctrl+G` (or `Cmd+G` on Mac) to open **Graph View**. Watch your entities and concepts light up with real-time links.
3. **Ingest New Sources**:
   - Add any markdown/text note to `raw/` and tell the agent:
     > *"Ingest `raw/articles/my-article.md`"*
4. **Search via CLI**:
   ```bash
   python python/wiki_search.py "obsidian"
   ```
5. **Git Protocol**:
   - The agent automatically commits changes (`git commit`).
   - You retain full control over remote publishing (`git push`).
