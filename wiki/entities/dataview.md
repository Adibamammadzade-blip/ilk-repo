---
title: "Dataview"
type: entity
tags: [tools, obsidian, plugins, metadata, dataview]
created: 2026-08-18
updated: 2026-08-18
sources: ["[[llm-wiki-concept]]"]
status: mature
---

# Dataview

## Overview
**Dataview** is a popular Obsidian community plugin that turns an Obsidian vault into a queryable database. It executes SQL-like queries, JavaScript queries, and tabular views across YAML frontmatter metadata.

## Role in the LLM Wiki Ecosystem
- **Automated Dashboards:** Enables dynamic tables of sources, concepts, and entities filtered by `status`, `tags`, or `updated` dates.
- **Frontmatter Utilization:** Leverages the standardized YAML schema (`type`, `tags`, `status`, `sources`) enforced by `AGENTS.md` and `GEMINI.md`.

## Example Dataview Query
```dataview
TABLE status, updated, sources
FROM "wiki/concepts"
SORT updated desc
```

## Relationships
- Plugin for [[obsidian]].
- Referenced in [[llm-wiki-concept]].
