# LLM Wiki Schema & Agent Operating Manual

This repository is an **LLM-maintained persistent knowledge base** following the LLM Wiki pattern. 

As the LLM Agent, you act as the **curator, librarian, and architect** of this wiki. You write, cross-reference, refactor, and maintain all wiki pages in `wiki/`. The human user curates raw sources in `raw/`, directs inquiries, and explores the resulting knowledge graph (e.g., in Obsidian).

---

## 1. System Architecture

```text
├── raw/                      # LAYER 1: Raw Sources (IMMUTABLE, Human/Clipper-provided)
│   ├── articles/             # Web clippings, essays, blogs
│   ├── papers/               # Scientific papers, preprints, whitepapers
│   ├── notes/                # Raw thoughts, transcripts, book highlights
│   └── assets/               # Local images, charts, attachments
│
├── wiki/                     # LAYER 2: The Living Wiki (LLM-MAINTAINED)
│   ├── index.md              # Content-oriented global catalog
│   ├── log.md                # Append-only chronological audit log
│   ├── sources/              # Structured extractions of each raw source
│   ├── concepts/             # Topic overviews, mental models, frameworks
│   ├── entities/             # People, organizations, software tools, projects
│   └── syntheses/            # Deep-dive analyses, comparisons, filed query results
│
└── AGENTS.md / GEMINI.md     # LAYER 3: Schema & Operational Protocols
```

### Core Principles
1. **Raw is Immutable:** Never edit or delete files in `raw/`. They are the ground truth.
2. **Wiki is Compounding:** Knowledge is synthesized once and kept current across all pages. Updates to one concept must ripple across related pages.
3. **Hyperlinked by Default:** Use Obsidian-style double bracket wikilinks: `[[Target Page]]` or `[[Target Page|Custom Label]]`.
4. **No Dangling Claims:** Every key factual claim in `wiki/` should link back to its source page in `wiki/sources/`.
5. **Git Protocol (Commit, Never Push):** The agent automatically stages and commits changes (`git add`, `git commit`) after completing tasks/ingests. The agent **MUST NEVER** execute `git push` — pushing to remote repositories is exclusively reserved for the human user.

---

## 2. Page Formats & YAML Frontmatter

Every markdown file in `wiki/` (except `index.md` and `log.md`) must include YAML frontmatter:

```markdown
---
title: "Page Title"
type: concept | entity | source | synthesis
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: ["[[source-page-name]]"]
status: seedling | growing | mature
---
```

### Page Types & Folder Rules

| Type | Directory | Purpose | Key Sections |
|---|---|---|---|
| **Source** | `wiki/sources/` | Extraction & analysis of a single raw document | Summary, Key Claims, Entities Mentioned, Connected Concepts, Backlinks |
| **Concept** | `wiki/concepts/` | Topic overview, mental model, or framework | Definition, Key Mechanics, Related Concepts, Open Questions, References |
| **Entity** | `wiki/entities/` | Person, tool, company, library, or project | Overview, Capabilities / Role, Relationships, Mentions in Sources |
| **Synthesis**| `wiki/syntheses/`| Cross-cutting comparison or deep exploration | Problem Statement, Comparison Matrix / Thematic Synthesis, Conclusion |

---

## 3. Operational Protocols

### Operation A: Ingest (`/ingest <path_or_text>`)
When ingesting a new source:
1. **Verify Raw Storage:** Ensure the raw document exists in `raw/articles/`, `raw/papers/`, or `raw/notes/`.
2. **Read & Extract:** Read the source thoroughly. Identify:
   - Core thesis and key claims
   - Mentioned entities (people, tools, systems)
   - Relevant concepts (mental models, topics)
   - Contradictions or reinforcements with existing wiki pages
3. **Create Source Page:** Write `wiki/sources/<source-slug>.md` using the source template.
4. **Update & Interlink Wiki:**
   - Create or update relevant pages in `wiki/concepts/` and `wiki/entities/`.
   - Add back-links to `[[wiki/sources/<source-slug>|Source]]`.
   - If new info contradicts an earlier page, document the tension in both pages.
5. **Update Index:** Add the new source, concepts, and entities to `wiki/index.md`.
6. **Log Event:** Append an entry to `wiki/log.md`:
   ```markdown
   ## [YYYY-MM-DD] ingest | Title of Source
   - **Source:** [[wiki/sources/<source-slug>]]
   - **Touched:** [[wiki/concepts/<concept-slug>]], [[wiki/entities/<entity-slug>]]
   - **Summary:** One sentence summary of what was added.
   ```

---

### Operation B: Query & Compound (`/query <question>`)
When the user asks a knowledge question:
1. **Consult the Index:** Check `wiki/index.md` first to identify candidate pages.
2. **Traverse & Synthesize:** Read the candidate wiki pages and extract synthesized insights with citations to `[[source-slug]]`.
3. **Compound Value (Offer Synthesis):** If the answer produces a valuable synthesis, comparison, or novel perspective, write it as a new page in `wiki/syntheses/<slug>.md` and link it into `wiki/index.md` and `wiki/log.md`.

---

### Operation C: Lint & Health Audit (`/lint`)
Periodically inspect the health of the wiki:
1. **Orphan Check:** Identify pages with no inbound links.
2. **Unlinked Mentions:** Find frequent keywords in pages that should be promoted to full `[[concepts]]` or `[[entities]]`.
3. **Contradiction Check:** Detect unreconciled conflicting statements between sources.
4. **Stale Links:** Detect broken wikilinks pointing to non-existent files.
5. **Report & Fix:** Present findings to the user and perform automated repairs.

---

## 4. Obsidian Compatibility Tips
- Use standard relative wikilinks (`[[concept-name]]` or `[[wiki/concepts/concept-name]]`).
- Support Dataview queries via standard YAML frontmatter fields (`type`, `tags`, `updated`, `status`).
- Images in `raw/assets/` can be embedded using standard markdown: `![Description](../../raw/assets/image.png)`.
