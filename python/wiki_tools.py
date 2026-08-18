#!/usr/bin/env python3
"""
wiki_tools.py - Utility CLI for LLM Wiki maintenance, search, linting, and graph analytics.
"""

import os
import re
import sys
import argparse
from pathlib import Path
from typing import Dict, List, Set, Tuple

WIKI_DIR = Path(__file__).resolve().parent.parent / "wiki"


def extract_frontmatter(content: str) -> Tuple[Dict[str, str], str]:
    """Extract YAML frontmatter and body from markdown content."""
    frontmatter = {}
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1]
            body = parts[2]
            for line in fm_text.strip().split("\n"):
                if ":" in line:
                    k, v = line.split(":", 1)
                    frontmatter[k.strip()] = v.strip()
    return frontmatter, body


def extract_wikilinks(content: str) -> List[str]:
    """Extract all [[Wikilinks]] from markdown content, ignoring code blocks and inline code."""
    # Strip multi-line code blocks
    cleaned_content = re.sub(r"```[\s\S]*?```", "", content)
    # Strip inline code spans
    cleaned_content = re.sub(r"`[^`]*?`", "", cleaned_content)
    
    pattern = r"\[\[(.*?)\]\]"
    matches = re.findall(pattern, cleaned_content)
    cleaned = []
    for m in matches:
        # Handle [[target|alias]]
        target = m.split("|")[0].strip()
        # Handle [[target#section]]
        target = target.split("#")[0].strip()
        # If target has .md extension, normalize it
        if target.endswith(".md"):
            target = target[:-3]
        if target:
            cleaned.append(target)
    return cleaned


def get_all_wiki_pages() -> Dict[str, Path]:
    """Return a mapping of page name to Path for all markdown files in wiki/."""
    pages = {}
    if not WIKI_DIR.exists():
        return pages
    for path in WIKI_DIR.rglob("*.md"):
        # Page name is filename without extension (or with spaces)
        page_name = path.stem
        pages[page_name] = path
    return pages


def run_lint():
    """Perform health checks on the wiki."""
    print("========================================")
    print("       LLM Wiki Lint Health Check       ")
    print("========================================")
    
    pages = get_all_wiki_pages()
    print(f"Total Wiki Pages Detected: {len(pages)}")
    
    incoming_links: Dict[str, Set[str]] = {p: set() for p in pages}
    broken_links: List[Tuple[str, str]] = []
    missing_frontmatter: List[str] = []
    
    for page_name, path in pages.items():
        content = path.read_text(encoding="utf-8")
        fm, body = extract_frontmatter(content)
        
        if not fm and path.name not in ["index.md", "log.md"]:
            missing_frontmatter.append(page_name)
            
        links = extract_wikilinks(content)
        for link in links:
            if link in pages:
                incoming_links[link].add(page_name)
            else:
                broken_links.append((page_name, link))
                
    # Report Broken Links
    print(f"\n[1] Broken Links: {len(broken_links)}")
    if broken_links:
        for source, target in broken_links:
            print(f"  ❌ [[{source}]] -> [[{target}]] (Page not found)")
    else:
        print("  ✅ All wikilinks resolve successfully.")
        
    # Report Orphan Pages (pages with 0 incoming links, excluding index.md & log.md)
    orphans = [
        p for p, callers in incoming_links.items() 
        if len(callers) == 0 and p not in ["index", "log"]
    ]
    print(f"\n[2] Orphan Pages: {len(orphans)}")
    if orphans:
        for o in orphans:
            print(f"  ⚠️ [[{o}]] has 0 incoming wikilinks.")
    else:
        print("  ✅ No orphan pages detected.")
        
    # Report Frontmatter compliance
    print(f"\n[3] Missing Frontmatter: {len(missing_frontmatter)}")
    if missing_frontmatter:
        for m in missing_frontmatter:
            print(f"  ⚠️ [[{m}]] missing YAML frontmatter.")
    else:
        print("  ✅ All pages comply with YAML frontmatter standards.")
        
    print("\n========================================")
    if not broken_links and not orphans and not missing_frontmatter:
        print("🎉 Result: WIKI IS 100% HEALTHY!")
    else:
        print("⚠️ Result: Some items need attention.")
    print("========================================")


def run_search(query: str):
    """Simple relevance search across wiki markdown files."""
    print(f"Searching Wiki for: '{query}'...")
    pages = get_all_wiki_pages()
    query_lower = query.lower()
    results = []
    
    for page_name, path in pages.items():
        content = path.read_text(encoding="utf-8")
        score = 0
        
        # Title match (high weight)
        if query_lower in page_name.lower():
            score += 10
            
        # Matches in body
        occurrences = content.lower().count(query_lower)
        score += occurrences
        
        if score > 0:
            results.append((score, page_name, path))
            
    results.sort(key=lambda x: x[0], reverse=True)
    
    print(f"Found {len(results)} matching page(s):\n")
    for score, page_name, path in results:
        rel_path = path.relative_to(WIKI_DIR.parent)
        print(f"  • [[{page_name}]] (Score: {score}) -> {rel_path}")


def run_stats():
    """Print knowledge graph connectivity statistics."""
    pages = get_all_wiki_pages()
    print("========================================")
    print("      LLM Wiki Graph & Analytics        ")
    print("========================================")
    
    total_links = 0
    link_counts: Dict[str, int] = {}
    
    for page_name, path in pages.items():
        content = path.read_text(encoding="utf-8")
        links = extract_wikilinks(content)
        total_links += len(links)
        for link in links:
            link_counts[link] = link_counts.get(link, 0) + 1
            
    print(f"Total Nodes (Pages): {len(pages)}")
    print(f"Total Edges (Wikilinks): {total_links}")
    if pages:
        print(f"Average Outgoing Links/Node: {total_links / len(pages):.2f}")
        
    print("\nMost Linked Core Hubs:")
    sorted_hubs = sorted(link_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    for name, count in sorted_hubs:
        print(f"  🔗 [[{name}]]: {count} incoming links")
    print("========================================")


def main():
    parser = argparse.ArgumentParser(description="LLM Wiki Maintenance & Search CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Lint command
    subparsers.add_parser("lint", help="Run health check on wiki links and metadata")
    
    # Stats command
    subparsers.add_parser("stats", help="Show knowledge graph stats and hubs")
    
    # Search command
    search_parser = subparsers.add_parser("search", help="Search the wiki for keywords")
    search_parser.add_argument("query", type=str, help="Search query")
    
    args = parser.parse_args()
    
    if args.command == "lint":
        run_lint()
    elif args.command == "stats":
        run_stats()
    elif args.command == "search":
        run_search(args.query)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
