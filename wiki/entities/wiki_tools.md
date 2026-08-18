---
title: "wiki_tools"
type: entity
created: 2026-08-19
updated: 2026-08-19
tags: [tool, cli, python, automation, linter]
---

# wiki_tools

**wiki_tools** (`python/wiki_tools.py`) is the official maintenance and graph intelligence CLI for the [[LLM Wiki Pattern]] implementation in [[ilk-repo]].

## Capabilities
- **`lint`**: Validates 100% resolution of all `[[Wikilinks]]`, flags orphan pages (0 incoming references), and checks YAML frontmatter compliance.
- **`search <query>`**: Fast hybrid relevance search across page titles, headers, and document bodies.
- **`stats`**: Analyzes the knowledge graph topology, calculates average connectivity (edges/node), and identifies the highest-ranking core hubs.

## Usage
```bash
# Health check
python3 python/wiki_tools.py lint

# Search
python3 python/wiki_tools.py search "Python"

# Graph statistics
python3 python/wiki_tools.py stats
```

## Related Links
- [[ilk-repo]]
- [[LLM Wiki Pattern]]
- [[Python Starter Architecture]]
