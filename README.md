# ilk-repo: Persistent LLM Wiki & Full-Stack Sandbox

An autonomous, persistent, and compounding **LLM Wiki Knowledge Base** paired with a full-stack development sandbox.

---

## 🏛️ Repository Architecture

This repository operates on a 3-layer architecture uniting human curation, local markdown storage (Obsidian-compatible), and autonomous LLM maintenance:

```text
ilk-repo/
├── AGENTS.md                 # Agent Operating Manual (Codex / Claude / OpenCode schema)
├── GEMINI.md                 # Agent Operating Manual (Gemini / Antigravity schema)
├── .gitignore                # Excludes Obsidian internal caches, caches, and OS artifacts
├── README.md                 # Master project & file-by-file documentation
│
├── html/                     # Web Frontend & Knowledge Workbench
│   └── index.html            # Interactive Knowledge Hub & SVG Graph Explorer
│
├── css/                      # Web Frontend Styles
│   └── index.css             # Sleek Obsidian-inspired dark theme stylesheet
│
├── js/                       # Web Frontend Logic
│   └── index.js              # Interactive Knowledge Graph engine & modal inspector
│
├── python/                   # Python Scripting & Local Tooling
│   ├── main.py               # Core syntax, data structures, and OOP Repository demo
│   ├── wiki_search.py        # Local zero-dependency CLI search engine for the wiki
│   └── wiki_lint.py          # Automated graph health & wikilink resolution auditor
│
├── raw/                      # LAYER 1: Raw Sources (IMMUTABLE Ground Truth)
│   ├── articles/             # Clipped web articles, blogs, essays (.gitkeep)
│   ├── papers/               # Research papers, preprints, whitepapers
│   │   ├── as-we-may-think-bush-1945.md
│   │   └── augmenting-human-intellect-engelbart-1962.md
│   ├── notes/                # Raw thoughts, book transcripts, idea drafts
│   │   └── llm-wiki-concept.md # Genesis concept document for the LLM Wiki
│   └── assets/               # Locally stored images, diagrams, attachments (.gitkeep)
│
└── wiki/                     # LAYER 2: The Living Wiki (LLM-MAINTAINED)
    ├── index.md              # Content-oriented master catalog (20 active nodes)
    ├── log.md                # Append-only chronological audit log
    ├── sources/              # Structured extractions of raw sources
    │   ├── llm-wiki-concept.md
    │   ├── as-we-may-think-bush-1945.md
    │   ├── augmenting-human-intellect-engelbart-1962.md
    │   └── codebase-starter-modules.md
    ├── concepts/             # Evolving topic overviews & mental models
    │   ├── persistent-knowledge-bases.md
    │   ├── associative-trails.md
    │   └── h-lam-t-system.md
    ├── entities/             # People, tools, organizations, projects
    │   ├── obsidian.md
    │   ├── vannevar-bush.md
    │   ├── douglas-engelbart.md
    │   ├── memex.md
    │   ├── ilk-repo.md
    │   ├── dataview.md
    │   ├── marp.md
    │   └── qmd.md
    └── syntheses/            # Deep-dive analyses, comparisons & slide decks
        ├── engelbart-bush-symbiosis-ai.md
        ├── memex-to-llm-wiki-evolution.md
        ├── rag-vs-llm-wiki.md
        ├── obsidian-llm-wiki-guide.md
        └── llm-wiki-architecture-slides.md
```

---

## 📂 File-by-File Documentation

### ⚙️ Root Configuration & Protocols
| File | Role | Description |
|---|---|---|
| [`AGENTS.md`](./AGENTS.md) | Schema & Protocol | Operational manual for AI agents (OpenAI Codex, Claude Code, Pi) specifying ingest, query, and lint flows. |
| [`GEMINI.md`](./GEMINI.md) | Schema & Protocol | Mirror operating manual for Google Gemini / Antigravity agent environments. |
| [`.gitignore`](./.gitignore) | Git Configuration | Comprehensive ignore rules for `.obsidian/`, `.obsidian-sync/`, caches, and OS junk. |
| [`README.md`](./README.md) | Documentation | Comprehensive repository overview, file map, and usage guide. |

### 🌐 Frontend & Interactive Workbench
| File | Technology | Description |
|---|---|---|
| [`html/index.html`](./html/index.html) | HTML5 | Interactive browser workbench with search, category filtering, and SVG graph canvas. |
| [`css/index.css`](./css/index.css) | Vanilla CSS3 | Obsidian-inspired dark theme with glassmorphism, responsive grid, and category glow colors. |
| [`js/index.js`](./js/index.js) | Vanilla JS | Relational graph engine, modal slide-over inspector, and keyboard navigation. |

### 🐍 Python Core & Automation Tools
| File | Role | Description |
|---|---|---|
| [`python/main.py`](./python/main.py) | Demo / Sandbox | Demonstrates functions, type hints, list comprehensions, and OOP with the `Repository` class. |
| [`python/wiki_search.py`](./python/wiki_search.py) | CLI Search Tool | Standalone CLI search engine that parses YAML frontmatter and body text with relevance ranking. |
| [`python/wiki_lint.py`](./python/wiki_lint.py) | Health Auditor | Automated linter verifying YAML schemas, broken `[[wikilinks]]`, orphan pages, and index synchronization. |

---

## 📚 Living Knowledge Base Catalog

### 🧠 Core Concepts (`wiki/concepts/`)
- **[`persistent-knowledge-bases.md`](./wiki/concepts/persistent-knowledge-bases.md):** Compounding markdown graphs vs. stateless query-time RAG.
- **[`associative-trails.md`](./wiki/concepts/associative-trails.md):** Non-linear multi-hop pathways mirroring human cognition through associative indexing.
- **[`h-lam-t-system.md`](./wiki/concepts/h-lam-t-system.md):** Douglas Engelbart's 4-pillar framework (*Language, Artifacts, Methodology, Training*) for cognitive augmentation.

### 🛠️ Entities & Tools (`wiki/entities/`)
- **[`obsidian.md`](./wiki/entities/obsidian.md):** Obsidian as the interactive local-first knowledge IDE.
- **[`vannevar-bush.md`](./wiki/entities/vannevar-bush.md):** Engineer, inventor, and conceptual father of hypertext and the Memex.
- **[`douglas-engelbart.md`](./wiki/entities/douglas-engelbart.md):** Pioneer of interactive computing, mouse inventor, creator of NLS.
- **[`memex.md`](./wiki/entities/memex.md):** Electro-mechanical desk concept for personal associative memory.
- **[`ilk-repo.md`](./wiki/entities/ilk-repo.md):** Host repository architecture, sandbox code, and knowledge base.
- **[`dataview.md`](./wiki/entities/dataview.md):** Obsidian plugin for executing structured YAML frontmatter queries.
- **[`marp.md`](./wiki/entities/marp.md):** Markdown presentation slide deck ecosystem.
- **[`qmd.md`](./wiki/entities/qmd.md):** Local hybrid search engine (BM25 + vector search).

### 🔬 Syntheses & Comparisons (`wiki/syntheses/`)
- **[`engelbart-bush-symbiosis-ai.md`](./wiki/syntheses/engelbart-bush-symbiosis-ai.md):** The 80-year evolution of cognitive augmentation from 1945 Memex and 1962 H-LAM/T to agentic wikis.
- **[`memex-to-llm-wiki-evolution.md`](./wiki/syntheses/memex-to-llm-wiki-evolution.md):** Deep comparative analysis across 5 generations of knowledge management and the resolution of the "Maintenance Tax".
- **[`rag-vs-llm-wiki.md`](./wiki/syntheses/rag-vs-llm-wiki.md):** Comparative matrix between traditional vector retrieval and compounding wikis.
- **[`obsidian-llm-wiki-guide.md`](./wiki/syntheses/obsidian-llm-wiki-guide.md):** Master guide explaining the human-agent collaboration and Obsidian IDE workflow.
- **[`llm-wiki-architecture-slides.md`](./wiki/syntheses/llm-wiki-architecture-slides.md):** 6-slide Marp presentation deck summarizing the tri-layer architecture and operational workflows.

### 📥 Ingested Sources (`wiki/sources/`)
- **[`llm-wiki-concept.md`](./wiki/sources/llm-wiki-concept.md):** Extraction of the founding manifesto.
- **[`as-we-may-think-bush-1945.md`](./wiki/sources/as-we-may-think-bush-1945.md):** Extraction of Vannevar Bush's 1945 Memex paper.
- **[`augmenting-human-intellect-engelbart-1962.md`](./wiki/sources/augmenting-human-intellect-engelbart-1962.md):** Extraction of Douglas Engelbart's 1962 H-LAM/T framework.
- **[`codebase-starter-modules.md`](./wiki/sources/codebase-starter-modules.md):** Extraction of the repository's frontend and backend code files.

---

## ⚡ Operational Quick Start

### 1. View Vault in Obsidian
- Open **Obsidian** -> **Open folder as vault** -> Select `ilk-repo`.
- Press `Ctrl+G` (or `Cmd+G`) to open **Graph View** and view all 20 interconnected nodes.

### 2. Launch the Web Knowledge Workbench
- Open [`html/index.html`](./html/index.html) in any web browser to view the interactive SVG Knowledge Graph and search catalog.

### 3. Ingest a New Source
Drop any markdown/text note into `raw/` and tell the agent:
> *"Ingest `raw/articles/my-article.md`"*

### 4. Search & Lint via CLI
```bash
# Keyword / Tag Search
python python/wiki_search.py "memex"

# Run Graph Health & Broken Link Audit
python python/wiki_lint.py
```

### 5. Git Protocol
- The agent automatically commits changes (`git commit`) to the active branch (`mehriban`).
- Pushing to remote repositories (`git push`) is exclusively reserved for you.
