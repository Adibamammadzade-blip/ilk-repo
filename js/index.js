// ==========================================================================
// LLM Wiki Explorer - Interactive Knowledge Graph & Reader Engine
// ==========================================================================

let wikiData = {
    nodes: [],
    edges: [],
    pages: {},
    stats: { totalPages: 0, totalLinks: 0 }
};

let activePageId = null;
let currentFilter = "all";
let searchQuery = "";

// Canvas & Graph State
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
let width, height;
let nodes = [];
let edges = [];
let draggedNode = null;
let hoveredNode = null;
let transform = { x: 0, y: 0, k: 1 };
let isPanning = false;
let startPan = { x: 0, y: 0 };

const TYPE_COLORS = {
    concept: "#bc8cff",
    entity: "#3fb950",
    source: "#39c5cf",
    synthesis: "#d29922",
    page: "#8b949e"
};

// ==========================================================================
// Initialization & Data Fetch
// ==========================================================================
async function init() {
    setupCanvas();
    setupEventListeners();
    await loadWikiData();
    updateUI();
    initGraphNodes();
    requestAnimationFrame(renderLoop);
}

async function loadWikiData() {
    try {
        const res = await fetch("../wiki/wiki_data.json");
        if (res.ok) {
            wikiData = await res.json();
        } else {
            console.warn("Could not load wiki_data.json directly via fetch, using fallback data.");
        }
    } catch (e) {
        console.warn("Fetch error (likely file:// protocol):", e);
    }
}

// ==========================================================================
// Graph Physics & Visualization Engine
// ==========================================================================
function setupCanvas() {
    function resize() {
        const panel = document.getElementById("graphViewPanel");
        width = canvas.width = panel.clientWidth || 800;
        height = canvas.height = panel.clientHeight || 600;
        transform.x = width / 2;
        transform.y = height / 2;
    }
    resize();
    window.addEventListener("resize", resize);
}

function initGraphNodes() {
    if (!wikiData.nodes || wikiData.nodes.length === 0) return;

    const angleStep = (Math.PI * 2) / wikiData.nodes.length;
    const radius = Math.min(width, height) * 0.32;

    nodes = wikiData.nodes.map((n, i) => {
        return {
            id: n.id,
            title: n.title || n.id,
            type: n.type || "page",
            x: Math.cos(i * angleStep) * radius + (Math.random() - 0.5) * 40,
            y: Math.sin(i * angleStep) * radius + (Math.random() - 0.5) * 40,
            vx: 0,
            vy: 0,
            radius: n.id === "ilk-repo" || n.id === "LLM Wiki Pattern" ? 18 : 13
        };
    });

    edges = wikiData.edges.map(e => ({
        sourceId: e.source,
        targetId: e.target
    }));
}

function updatePhysics() {
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    // Repulsion between all node pairs
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist < 320) {
                const force = (320 - dist) / dist * 0.08;
                a.vx -= dx * force;
                a.vy -= dy * force;
                b.vx += dx * force;
                b.vy += dy * force;
            }
        }
    }

    // Spring attraction along edges
    for (const edge of edges) {
        const src = nodeMap.get(edge.sourceId);
        const tgt = nodeMap.get(edge.targetId);
        if (src && tgt) {
            const dx = tgt.x - src.x;
            const dy = tgt.y - src.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const targetDist = 120;
            const force = (dist - targetDist) * 0.005;
            src.vx += dx * force;
            src.vy += dy * force;
            tgt.vx -= dx * force;
            tgt.vy -= dy * force;
        }
    }

    // Gravity to center & velocity damping
    for (const node of nodes) {
        if (node === draggedNode) continue;
        node.vx += (0 - node.x) * 0.001;
        node.vy += (0 - node.y) * 0.001;

        node.x += node.vx;
        node.y += node.vy;

        node.vx *= 0.88;
        node.vy *= 0.88;
    }
}

function renderLoop() {
    updatePhysics();

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    // Draw Edges
    for (const edge of edges) {
        const src = nodeMap.get(edge.sourceId);
        const tgt = nodeMap.get(edge.targetId);
        if (!src || !tgt) continue;

        const isHighlight = activePageId && (src.id === activePageId || tgt.id === activePageId);
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = isHighlight ? "rgba(88, 166, 255, 0.7)" : "rgba(240, 246, 252, 0.12)";
        ctx.lineWidth = isHighlight ? 2 : 1;
        ctx.stroke();
    }

    // Draw Nodes
    for (const node of nodes) {
        const isSelected = node.id === activePageId;
        const isHovered = node === hoveredNode;
        const color = TYPE_COLORS[node.type] || TYPE_COLORS.page;

        // Glow ring for active / hovered node
        if (isSelected || isHovered) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
            ctx.fillStyle = isSelected ? "rgba(88, 166, 255, 0.25)" : "rgba(255, 255, 255, 0.15)";
            ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isSelected ? 12 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Title Label
        ctx.font = isSelected ? "bold 12px Outfit, sans-serif" : "11px Outfit, sans-serif";
        ctx.fillStyle = isSelected ? "#ffffff" : "#c9d1d9";
        ctx.textAlign = "center";
        ctx.fillText(node.title, node.x, node.y + node.radius + 14);
    }

    ctx.restore();
    requestAnimationFrame(renderLoop);
}

// ==========================================================================
// UI Updates & Markdown Rendering
// ==========================================================================
function updateUI() {
    const list = document.getElementById("pagesList");
    list.innerHTML = "";

    const allPages = Object.keys(wikiData.pages).map(id => ({
        id,
        ...wikiData.pages[id]
    }));

    // Counts
    document.getElementById("count-all").textContent = allPages.length;
    document.getElementById("count-concept").textContent = allPages.filter(p => p.type === "concept").length;
    document.getElementById("count-entity").textContent = allPages.filter(p => p.type === "entity").length;
    document.getElementById("count-source").textContent = allPages.filter(p => p.type === "source").length;
    document.getElementById("count-synthesis").textContent = allPages.filter(p => p.type === "synthesis").length;

    document.getElementById("statNodes").textContent = wikiData.nodes ? wikiData.nodes.length : allPages.length;
    document.getElementById("statLinks").textContent = wikiData.edges ? wikiData.edges.length : 0;

    const filtered = allPages.filter(page => {
        const matchesFilter = currentFilter === "all" || page.type === currentFilter;
        const matchesQuery = !searchQuery || 
            page.title.toLowerCase().includes(searchQuery) ||
            page.content.toLowerCase().includes(searchQuery) ||
            (page.tags && page.tags.some(t => t.toLowerCase().includes(searchQuery)));
        return matchesFilter && matchesQuery;
    });

    for (const page of filtered) {
        const card = document.createElement("div");
        card.className = `page-card ${page.id === activePageId ? "active" : ""}`;
        card.onclick = () => selectPage(page.id, true);

        const typeClass = `tag-${page.type || "page"}`;
        card.innerHTML = `
            <div class="page-card-header">
                <span class="page-card-title">${escapeHtml(page.title)}</span>
                <span class="type-tag ${typeClass}">${page.type || "page"}</span>
            </div>
            <div class="page-card-snippet">${escapeHtml(page.content.replace(/^---[\s\S]*?---/, "").slice(0, 110))}...</div>
        `;
        list.appendChild(card);
    }
}

function selectPage(pageId, openDoc = false) {
    activePageId = pageId;
    updateUI();

    const page = wikiData.pages[pageId];
    if (page) {
        document.getElementById("headerTypeIndicator").textContent = page.type || "Page";
        document.getElementById("headerTitle").textContent = page.title;
        renderDocument(page);
    }

    if (openDoc) {
        switchTab("doc");
    }
}

function switchTab(tab) {
    const tabGraph = document.getElementById("tabGraph");
    const tabDoc = document.getElementById("tabDoc");
    const panelGraph = document.getElementById("graphViewPanel");
    const panelDoc = document.getElementById("docViewPanel");

    if (tab === "graph") {
        tabGraph.classList.add("active");
        tabDoc.classList.remove("active");
        panelGraph.classList.remove("hidden");
        panelDoc.classList.add("hidden");
    } else {
        tabDoc.classList.add("active");
        tabGraph.classList.remove("active");
        panelDoc.classList.remove("hidden");
        panelGraph.classList.add("hidden");
    }
}

function renderDocument(page) {
    const metaCard = document.getElementById("docMetaCard");
    const tagsHtml = (page.tags || []).map(t => `<span class="tag-pill">#${escapeHtml(t)}</span>`).join(" ");

    metaCard.innerHTML = `
        <div class="meta-row">
            <span><strong>Type:</strong> ${page.type || "Page"}</span>
            <span><strong>Created:</strong> ${page.created || "N/A"}</span>
            <span><strong>Updated:</strong> ${page.updated || "N/A"}</span>
            <span><strong>Path:</strong> <code>${escapeHtml(page.path || "")}</code></span>
        </div>
        ${tagsHtml ? `<div class="meta-tags">${tagsHtml}</div>` : ""}
    `;

    const body = document.getElementById("docMarkdownBody");
    // Strip YAML frontmatter before rendering
    let content = page.content.replace(/^---[\s\S]*?---/, "").trim();
    body.innerHTML = parseMarkdownToHtml(content);
}

// Simple Client Markdown & Wikilink Parser
function parseMarkdownToHtml(md) {
    // 1. Code blocks
    md = md.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // 2. Tables
    md = md.replace(/((?:\|[^\n]+\|\n?)+)/g, match => {
        const rows = match.trim().split("\n");
        if (rows.length < 2) return match;
        let html = "<table>";
        rows.forEach((row, i) => {
            if (row.includes("---")) return;
            const cols = row.split("|").filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
            const tag = i === 0 ? "th" : "td";
            html += "<tr>" + cols.map(c => `<${tag}>${c.trim()}</${tag}>`).join("") + "</tr>";
        });
        html += "</table>";
        return html;
    });

    // 3. Headers
    md = md.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    md = md.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    md = md.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // 4. Wikilinks [[Page|Alias]] or [[Page]]
    md = md.replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, (match, target, alias) => {
        const label = alias || target;
        return `<a class="wikilink-badge" onclick="selectPage('${target}', true)">🔗 [[${escapeHtml(label)}]]</a>`;
    });

    // 5. Bold & Italic
    md = md.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    md = md.replace(/\*(.*?)\*/g, "<em>$1</em>");
    md = md.replace(/`([^`]+)`/g, "<code>$1</code>");

    // 6. Blockquotes
    md = md.replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>");

    // 7. Lists & Paragraphs
    md = md.replace(/^\- (.*$)/gim, "<li>$1</li>");
    md = md.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");
    md = md.replace(/\n\n/g, "<p></p>");

    return md;
}

function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================================================
// Mouse & Canvas Interactivity
// ==========================================================================
function setupEventListeners() {
    document.getElementById("tabGraph").onclick = () => switchTab("graph");
    document.getElementById("tabDoc").onclick = () => switchTab("doc");

    document.getElementById("btnResetGraph").onclick = () => {
        transform = { x: width / 2, y: height / 2, k: 1 };
        initGraphNodes();
    };

    // Filter pills
    const pills = document.querySelectorAll(".pill");
    pills.forEach(pill => {
        pill.onclick = () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentFilter = pill.getAttribute("data-filter");
            updateUI();
        };
    });

    // Search input
    document.getElementById("searchInput").oninput = (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        updateUI();
    };

    // Canvas Mouse Interaction
    function getNodeAt(x, y) {
        const gx = (x - transform.x) / transform.k;
        const gy = (y - transform.y) / transform.k;
        for (const node of nodes) {
            const dx = node.x - gx;
            const dy = node.y - gy;
            if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 6) {
                return node;
            }
        }
        return null;
    }

    canvas.addEventListener("mousedown", e => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const node = getNodeAt(x, y);

        if (node) {
            draggedNode = node;
            selectPage(node.id, false);
        } else {
            isPanning = true;
            startPan = { x: e.clientX - transform.x, y: e.clientY - transform.y };
        }
    });

    window.addEventListener("mousemove", e => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (draggedNode) {
            draggedNode.x = (x - transform.x) / transform.k;
            draggedNode.y = (y - transform.y) / transform.k;
            draggedNode.vx = 0;
            draggedNode.vy = 0;
        } else if (isPanning) {
            transform.x = e.clientX - startPan.x;
            transform.y = e.clientY - startPan.y;
        } else {
            hoveredNode = getNodeAt(x, y);
        }
    });

    window.addEventListener("mouseup", () => {
        draggedNode = null;
        isPanning = false;
    });

    canvas.addEventListener("dblclick", e => {
        const rect = canvas.getBoundingClientRect();
        const node = getNodeAt(e.clientX - rect.left, e.clientY - rect.top);
        if (node) {
            selectPage(node.id, true);
        }
    });

    canvas.addEventListener("wheel", e => {
        e.preventDefault();
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        transform.k = Math.max(0.3, Math.min(3.0, transform.k * zoomFactor));
    });
}

// Start
document.addEventListener("DOMContentLoaded", init);