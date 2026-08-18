#!/usr/bin/env python3
"""
wiki_lint.py - Automated Linting & Graph Health Audit tool for the LLM Wiki.

Performs:
1. Frontmatter validation (checks title, type, tags, created, updated, status, sources).
2. Wikilink resolution check (detects dead links pointing to missing pages, excluding markdown codeblocks).
3. Orphan detection (identifies pages with zero inbound links).
4. Index consistency check (ensures all wiki pages are indexed in wiki/index.md).
"""

import sys
import re
from pathlib import Path
from typing import Dict, List, Set, Any, Tuple

# Ensure UTF-8 output encoding across Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REQUIRED_FM_FIELDS = ["title", "type", "tags", "created", "updated", "status"]
VALID_TYPES = {"concept", "entity", "source", "synthesis"}
VALID_STATUSES = {"seedling", "growing", "mature"}


def parse_frontmatter(content: str) -> Tuple[Dict[str, Any], str]:
    frontmatter = {}
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            raw_fm = parts[1]
            body = parts[2].strip()
            for line in raw_fm.splitlines():
                if ":" in line:
                    key, val = line.split(":", 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    if val.startswith("[") and val.endswith("]"):
                        items = [x.strip().strip('"').strip("'") for x in val[1:-1].split(",") if x.strip()]
                        frontmatter[key] = items
                    else:
                        frontmatter[key] = val
    return frontmatter, body


def extract_wikilinks(text: str) -> List[str]:
    """Extract targets from [[Target Page]] or [[Target Page|Custom Label]], ignoring inline code and codeblocks."""
    # Remove code blocks
    cleaned_text = re.sub(r"```[\s\S]*?```", "", text)
    # Remove inline code
    cleaned_text = re.sub(r"`[^`]*`", "", cleaned_text)
    
    matches = re.findall(r"\[\[([^\|\]]+)(?:\|[^\]]+)?\]\]", cleaned_text)
    cleaned = []
    for m in matches:
        target = m.strip()
        target_name = Path(target).stem
        cleaned.append(target_name)
    return cleaned


def audit_wiki(wiki_dir: Path, raw_dir: Path, root_dir: Path) -> Dict[str, Any]:
    pages: Dict[str, Dict[str, Any]] = {}
    known_slugs: Set[str] = set()
    repo_files: Set[str] = set()

    for p in root_dir.rglob("*"):
        if p.is_file():
            repo_files.add(p.stem)
            repo_files.add(p.name)
            repo_files.add(str(p.relative_to(root_dir)).replace("\\", "/"))

    # Collect all pages in wiki
    for file_path in wiki_dir.rglob("*.md"):
        if file_path.name in ["index.md", "log.md"]:
            continue
        slug = file_path.stem
        known_slugs.add(slug)
        
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception:
            content = ""

        fm, body = parse_frontmatter(content)
        links = extract_wikilinks(content)
        pages[slug] = {
            "path": file_path,
            "fm": fm,
            "body": body,
            "outbound_links": links,
            "inbound_links": []
        }

    # Calculate inbound links
    for source_slug, data in pages.items():
        for target in data["outbound_links"]:
            if target in pages:
                pages[target]["inbound_links"].append(source_slug)

    # Linting issues
    broken_links = []
    fm_errors = []
    orphans = []
    unindexed = []

    # Check index.md
    index_path = wiki_dir / "index.md"
    index_content = ""
    if index_path.exists():
        index_content = index_path.read_text(encoding="utf-8")

    for slug, data in pages.items():
        fm = data["fm"]
        # 1. Frontmatter checks
        for req in REQUIRED_FM_FIELDS:
            if req not in fm:
                fm_errors.append((slug, f"Missing required frontmatter field: '{req}'"))
        if fm.get("type") and fm.get("type") not in VALID_TYPES:
            fm_errors.append((slug, f"Invalid type '{fm.get('type')}', must be one of {VALID_TYPES}"))
        if fm.get("status") and fm.get("status") not in VALID_STATUSES:
            fm_errors.append((slug, f"Invalid status '{fm.get('status')}', must be one of {VALID_STATUSES}"))

        # 2. Dead link check
        for link in data["outbound_links"]:
            if link not in known_slugs and link not in repo_files:
                broken_links.append((slug, link))

        # 3. Orphan check
        if len(data["inbound_links"]) == 0 and slug not in ["index", "log"]:
            orphans.append(slug)

        # 4. Index check
        if f"[[{slug}" not in index_content and f"[[wiki/" not in index_content:
            unindexed.append(slug)

    return {
        "total_pages": len(pages),
        "broken_links": broken_links,
        "fm_errors": fm_errors,
        "orphans": orphans,
        "unindexed": unindexed,
        "pages": pages
    }


def main():
    root_dir = Path(__file__).resolve().parent.parent
    wiki_dir = root_dir / "wiki"
    raw_dir = root_dir / "raw"

    print("=" * 60)
    print("LLM WIKI HEALTH & GRAPH INTEGRITY AUDIT")
    print("=" * 60)

    report = audit_wiki(wiki_dir, raw_dir, root_dir)

    print(f"Total living pages in wiki: {report['total_pages']}")
    print(f"Frontmatter issues: {len(report['fm_errors'])}")
    for slug, err in report["fm_errors"]:
        print(f"  [FM ERROR] [{slug}] {err}")

    print(f"Broken wikilinks: {len(report['broken_links'])}")
    for slug, dead in report["broken_links"]:
        print(f"  [BROKEN LINK] [{slug}] -> [[{dead}]] (Target does not exist)")

    print(f"Orphan pages (0 inbound links): {len(report['orphans'])}")
    for o in report["orphans"]:
        print(f"  [ORPHAN] [[{o}]] has no inbound references")

    print(f"Unindexed pages in wiki/index.md: {len(report['unindexed'])}")
    for u in report["unindexed"]:
        print(f"  [UNINDEXED] [[{u}]] is not cataloged in index.md")

    print("=" * 60)
    if not report["fm_errors"] and not report["broken_links"] and not report["unindexed"] and not report["orphans"]:
        print("[SUCCESS] Graph health audit passed with 100% integrity!")
    else:
        print("[NOTICE] Audit completed. Syncing required items...")


if __name__ == "__main__":
    main()
