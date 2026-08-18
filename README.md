# ilk-repo: Multi-Language Project & LLM Wiki

An integrated software development repository and persistent **LLM Wiki** personal knowledge base.

---

## 📑 Project Architecture & Directory Map

```text
ilk-repo/
├── AGENTS.md                                   # Operational rules & protocols for AI Wiki maintainers
├── README.md                                   # Comprehensive repository documentation (this file)
├── .gitignore                                  # Git ignore rules (.obsidian, OS artifacts)
│
├── html/
│   └── index.html                              # Interactive Wiki Knowledge Explorer & reader web app
├── css/
│   └── index.css                               # Dark theme styling, glassmorphism, responsive layout
├── js/
│   └── index.js                                # 2D Force-directed Canvas graph engine & markdown parser
│
├── python/
│   ├── main.py                                 # Starter guide to Python fundamentals & OOP (Repository class)
│   └── wiki_tools.py                           # CLI for linting, searching, graph analytics, and JSON export
│
├── raw/                                        # Immutable source storage
│   └── llm-wiki-idea.md                        # Original architectural specification of the LLM Wiki pattern
│
└── wiki/                                       # Compiled persistent knowledge base (Obsidian vault)
    ├── index.md                                # Content catalog of all concepts, entities, sources, synthesis
    ├── log.md                                  # Chronological append-only operations log
    ├── wiki_data.json                          # Exported graph dataset powering the web visualizer
    ├── concepts/                               # Core concepts & frameworks
    │   ├── LLM Wiki Pattern.md                 # Persistent compounding knowledge vs. ephemeral RAG
    │   ├── Memex.md                            # 1945 Vannevar Bush associative workstation paradigm
    │   ├── Zettelkasten Method.md              # Niklas Luhmann's atomic slip-box methodology
    │   ├── Retrieval-Augmented Generation.md   # Mechanics and trade-offs of vector RAG
    │   ├── Wikilinks.md                        # Obsidian [[Page]] cross-referencing syntax
    │   ├── Web Basics Stack.md                 # HTML5, CSS3, and JavaScript web architecture
    │   └── Python Starter Architecture.md      # Idiomatic Python patterns and OOP design
    ├── entities/                               # People, software, projects, and tools
    │   ├── ilk-repo.md                         # Workspace mapping and project overview
    │   ├── Suleiman.md                         # Author, developer, and maintainer profile
    │   ├── Vannevar Bush.md                    # Pioneer of associative indexing & OSRD administrator
    │   ├── Niklas Luhmann.md                   # Sociologist and inventor of physical Zettelkasten
    │   └── wiki_tools.md                       # CLI maintenance tool profile
    ├── sources/                                # Structured literature notes
    │   ├── codebase-ilk-repo.md                # Multi-language codebase overview
    │   └── llm-wiki-idea.md                    # Core architecture source summary
    └── synthesis/                              # High-level compound insights & deep dives
        ├── Knowledge Architecture and Codebase Synthesis.md
        └── Evolution of Knowledge Systems - Memex to LLM Wiki.md
```

---

## 🚀 Getting Started

### 1. Python Starter Script
Run the Python fundamentals demo:
```bash
python3 python/main.py
```

### 2. Wiki Maintenance CLI (`wiki_tools.py`)
Run automated maintenance and graph analysis:
```bash
# Health check: scans all [[Wikilinks]], orphans, and YAML frontmatter
python3 python/wiki_tools.py lint

# Search across wiki concepts, entities, and sources
python3 python/wiki_tools.py search "Zettelkasten"

# Graph statistics: calculates nodes, edges, density, and top hubs
python3 python/wiki_tools.py stats

# Export synchronized JSON data for the web UI
python3 python/wiki_tools.py export
```

### 3. Interactive Web Explorer UI
Launch the live Knowledge Graph Explorer:
```bash
# Start a simple HTTP server from the project root
python3 -m http.server 8000
```
Then visit **`http://localhost:8000/html/`** in your browser.

---

## 🔮 How Obsidian Works with the LLM Wiki

The **LLM Wiki Pattern** bridges human insight and AI persistence through a dual-window workflow:

```text
┌───────────────────────────────┐     ┌───────────────────────────────┐
│     Obsidian (Your IDE)       │     │     AI Agent (Programmer)     │
│  - Real-time Graph View       │ ◄───┤  - Ingests raw sources        │
│  - Live Document Preview      │     │  - Writes & links markdown    │
│  - Associative Trail Tracking │     │  - Reconciles contradictions  │
└───────────────────────────────┘     └───────────────────────────────┘
```

1. **Obsidian is the IDE**: You open the repository folder as an Obsidian vault. Obsidian gives you live rendering of markdown, clickable `[[Wikilinks]]`, and interactive visual graph views.
2. **The LLM is the Maintainer**: You don't spend hours formatting notes. The AI ingests sources, drafts literature notes, links entities, flags contradictions, and keeps the catalog up-to-date.
3. **The Wiki is the Codebase**: Knowledge compounds in local, plain-text markdown files version-controlled with Git.
