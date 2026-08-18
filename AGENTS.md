# LLM Wiki Schema & Operational Protocol

This repository is configured as an **LLM Wiki** — a persistent, compounding personal knowledge base maintained by the AI agent in collaboration with the user.

---

## 1. System Architecture

```text
.
├── raw/                 # Immutable source documents (articles, papers, clippings, transcripts)
├── wiki/                # LLM-maintained markdown knowledge base
│   ├── sources/         # Structured summaries of ingested sources
│   ├── entities/        # People, organizations, software, tools, projects
│   ├── concepts/        # Frameworks, core ideas, patterns, domain topics
│   ├── synthesis/       # Overviews, comparative analyses, compound insights
│   ├── index.md         # Dynamic catalog of all wiki pages
│   └── log.md           # Append-only chronological log of operations
└── AGENTS.md            # Schema, rules, and workflows (this file)
```

---

## 2. Core Operational Workflows

### 🟢 A. Ingest Workflow (`ingest`)
When the user adds a new document to `raw/` or provides source text:
1. **Read & Extract**: Thoroughly read the raw source file.
2. **Source Summary**: Create a new file in `wiki/sources/<source-slug>.md` with key takeaways, thesis, and metadata.
3. **Cross-Reference & Update**:
   - Identify mentioned entities and concepts.
   - Update existing pages in `wiki/entities/` and `wiki/concepts/` or create new ones if they meet the threshold for significance.
   - Note contradictions, corroborations, or evolving perspectives across pages.
4. **Update Index**: Add/update entries in [wiki/index.md](file:///Users/macbookairm2/Documents/GitHub/ilk-repo/wiki/index.md).
5. **Log Operation**: Append an entry to [wiki/log.md](file:///Users/macbookairm2/Documents/GitHub/ilk-repo/wiki/log.md) with format:
   `## [YYYY-MM-DD] ingest | <Source Title>`

### 🔍 B. Query Workflow (`query`)
When the user asks questions against the wiki:
1. **Search & Read**: Check `wiki/index.md` to identify relevant pages, then read the respective markdown files.
2. **Synthesize**: Formulate a comprehensive response citing specific wiki pages using Obsidian-style wikilinks (`[[Page Name]]`).
3. **Persist Valuable Findings**: If the query produces a novel comparison, deep analysis, or valuable synthesis, file it back into `wiki/synthesis/<topic>.md`, update `index.md`, and log the entry.

### 🧹 C. Lint Workflow (`lint`)
When the user requests a health check or lint pass:
1. **Broken Links & Orphans**: Scan for wiki links that lead to nonexistent files or pages with zero incoming links.
2. **Contradictions & Stale Claims**: Check for conflicting statements across pages.
3. **Knowledge Gaps**: Highlight missing concepts or entities that are frequently mentioned but lack dedicated pages.
4. **Log Results**: Record findings in `wiki/log.md`.

---

## 3. Formatting & Linking Standards

1. **Obsidian Compatibility**: Use wikilinks `[[Page Name]]` for all cross-references.
2. **Frontmatter**: Every wiki page must include YAML frontmatter:
   ```yaml
   ---
   title: Page Title
   type: entity | concept | source | synthesis
   created: YYYY-MM-DD
   updated: YYYY-MM-DD
   tags: [tag1, tag2]
   ---
   ```
3. **Immutability of `raw/`**: Never modify or overwrite files in the `raw/` directory.
