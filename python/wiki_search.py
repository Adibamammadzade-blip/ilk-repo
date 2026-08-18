#!/usr/bin/env python3
"""
wiki_search.py - Local-first CLI search engine for the LLM Wiki.

Features:
- Zero external dependencies (uses standard library).
- Scans frontmatter (title, tags, type, status) and body content.
- Term-frequency matching and snippet extraction with highlight indicators.
- Optional filtering by --type and --tag.
"""

import os
import re
import sys
import argparse
from pathlib import Path
from typing import Dict, List, Any, Optional


def parse_frontmatter(content: str) -> tuple[Dict[str, Any], str]:
    """Extract YAML frontmatter and body from markdown text."""
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
                        # parse simple list
                        items = [x.strip().strip('"').strip("'") for x in val[1:-1].split(",") if x.strip()]
                        frontmatter[key] = items
                    else:
                        frontmatter[key] = val
    return frontmatter, body


def search_wiki(wiki_dir: Path, query: str, page_type: Optional[str] = None, tag_filter: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search through markdown files and rank results."""
    query_terms = [t.lower() for t in query.split() if len(t) > 1]
    results = []
    
    for file_path in wiki_dir.rglob("*.md"):
        if file_path.name in ["index.md", "log.md"]:
            continue
            
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception:
            continue
            
        fm, body = parse_frontmatter(content)
        
        # Apply filters
        if page_type and fm.get("type", "").lower() != page_type.lower():
            continue
        if tag_filter:
            tags = [t.lower() for t in fm.get("tags", [])] if isinstance(fm.get("tags"), list) else [str(fm.get("tags")).lower()]
            if tag_filter.lower() not in tags:
                continue
                
        # Calculate score
        score = 0
        title = fm.get("title", file_path.stem)
        lower_title = title.lower()
        lower_body = body.lower()
        matched_snippets = []
        
        for term in query_terms:
            # Title matches weigh 10 points
            if term in lower_title:
                score += 10
            # Tag matches weigh 5 points
            tags_str = " ".join(fm.get("tags", [])) if isinstance(fm.get("tags"), list) else str(fm.get("tags", ""))
            if term in tags_str.lower():
                score += 5
            # Body frequency
            count = lower_body.count(term)
            score += min(count, 15)
            
            # Find snippet
            pos = lower_body.find(term)
            if pos != -1:
                start = max(0, pos - 40)
                end = min(len(body), pos + len(term) + 40)
                snippet = body[start:end].replace("\n", " ").strip()
                matched_snippets.append(f"...{snippet}...")
                
        if score > 0 or not query_terms:
            results.append({
                "path": str(file_path.relative_to(wiki_dir.parent)),
                "title": title,
                "type": fm.get("type", "unknown"),
                "tags": fm.get("tags", []),
                "status": fm.get("status", "unspecified"),
                "score": score,
                "snippets": matched_snippets[:2]
            })
            
    results.sort(key=lambda x: x["score"], reverse=True)
    return results


def main():
    parser = argparse.ArgumentParser(description="LLM Wiki Local CLI Search")
    parser.add_argument("query", nargs="?", default="", help="Keywords to search for")
    parser.add_argument("--type", help="Filter by page type (concept, entity, source, synthesis)")
    parser.add_argument("--tag", help="Filter by tag")
    parser.add_argument("--dir", default="wiki", help="Path to wiki directory (default: wiki)")
    
    args = parser.parse_args()
    
    wiki_path = Path(args.dir)
    if not wiki_path.exists():
        # Look relative to script directory
        script_dir = Path(__file__).resolve().parent.parent
        wiki_path = script_dir / args.dir
        if not wiki_path.exists():
            print(f"Error: Wiki directory '{args.dir}' not found.", file=sys.stderr)
            sys.exit(1)
            
    results = search_wiki(wiki_path, args.query, page_type=args.type, tag_filter=args.tag)
    
    print(f"\nFound {len(results)} matches for '{args.query}':\n" + "=" * 60)
    for idx, res in enumerate(results, 1):
        print(f"[{idx}] {res['title']} ({res['type'].upper()} | {res['status']})")
        print(f"    File: {res['path']}")
        if res["tags"]:
            tags_display = ", ".join(res["tags"]) if isinstance(res["tags"], list) else res["tags"]
            print(f"    Tags: #{tags_display.replace(', ', ' #')}")
        if res["snippets"]:
            for snip in res["snippets"]:
                print(f"    Snippet: {snip}")
        print("-" * 60)


if __name__ == "__main__":
    main()
