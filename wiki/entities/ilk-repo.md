---
title: "ilk-repo"
type: entity
tags: [project, repository, full-stack, python, web, search, lint]
created: 2026-08-18
updated: 2026-08-19
sources: ["[[codebase-starter-modules]]"]
status: mature
---

# ilk-repo

## Overview
**ilk-repo** is a multi-language repository designed as a personal development sandbox and knowledge system. It incorporates standard web technologies (HTML, CSS, JavaScript), Python demonstration modules, and a persistent [[persistent-knowledge-bases|LLM-maintained Wiki]] knowledge base.

## Project Structure & Architecture
- **Frontend Stack:**
  - HTML5 (`html/index.html`)
  - CSS3 (`css/index.css`)
  - Vanilla JavaScript (`js/index.js`)
- **Backend & Demonstration:**
  - Python 3.x Fundamentals (`python/main.py`)
- **Wiki Automation & Tooling:**
  - `python/wiki_search.py`: Local zero-dependency keyword & metadata search tool.
  - `python/wiki_lint.py`: Automated link resolution, frontmatter, and graph integrity linter.
- **Knowledge Base Layer:**
  - Living Wiki vault (`wiki/`)
  - Immutable raw sources (`raw/`)
  - Operating schemas (`AGENTS.md` / `GEMINI.md`)

## Sources & Mentions
- [[codebase-starter-modules|Initial Codebase & Starter Modules]]
- [[llm-wiki-concept|LLM Wiki Concept]]
- [[memex-to-llm-wiki-evolution]]
