/**
 * LLM Wiki Interactive Visualizer & Knowledge Workbench
 * Features:
 * - Real-time filtering by category (Concepts, Syntheses, Entities, Sources)
 * - Live keyword search across titles, summaries, tags, and content
 * - Interactive SVG Associative Knowledge Graph with animated relations
 * - Slide-over inspector modal with bidirectional trail navigation
 */

// 1. Vault Knowledge Graph Data
const VAULT_DATA = [
    {
        id: "persistent-knowledge-bases",
        title: "Persistent Knowledge Bases vs Query-Time RAG",
        type: "concept",
        status: "growing",
        date: "2026-08-18",
        path: "wiki/concepts/persistent-knowledge-bases.md",
        tags: ["knowledge-architecture", "rag", "llm-wiki", "mental-models"],
        excerpt: "An evolving, pre-compiled body of structured markdown where connections and conceptual syntheses are explicitly linked and maintained over time, resolving the stateless limitation of traditional RAG.",
        links: ["llm-wiki-concept", "as-we-may-think-bush-1945", "associative-trails", "obsidian", "rag-vs-llm-wiki", "memex-to-llm-wiki-evolution", "h-lam-t-system"]
    },
    {
        id: "associative-trails",
        title: "Associative Trails",
        type: "concept",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/concepts/associative-trails.md",
        tags: ["hypertext", "mental-models", "knowledge-graphs", "associative-indexing"],
        excerpt: "Non-linear multi-hop pathways linking diverse items across a knowledge base based on conceptual relationships rather than rigid taxonomic classifications. Coined by Vannevar Bush in 1945.",
        links: ["as-we-may-think-bush-1945", "vannevar-bush", "memex", "persistent-knowledge-bases", "memex-to-llm-wiki-evolution", "h-lam-t-system"]
    },
    {
        id: "h-lam-t-system",
        title: "The H-LAM/T System",
        type: "concept",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/concepts/h-lam-t-system.md",
        tags: ["mental-models", "cognitive-architecture", "engelbart", "human-ai-symbiosis"],
        excerpt: "Douglas Engelbart's 1962 cognitive augmentation framework asserting that human problem-solving capability is an emergent property of Human + Language + Artifacts + Methodology + Training.",
        links: ["augmenting-human-intellect-engelbart-1962", "douglas-engelbart", "persistent-knowledge-bases", "associative-trails", "engelbart-bush-symbiosis-ai"]
    },
    {
        id: "obsidian",
        title: "Obsidian",
        type: "entity",
        status: "mature",
        date: "2026-08-18",
        path: "wiki/entities/obsidian.md",
        tags: ["tools", "pkm", "markdown", "graph-view", "local-first"],
        excerpt: "Local-first, extensible markdown knowledge IDE. Acts as the graphical workbench and graph visualizer for human exploration, while the LLM acts as the autonomous programmer/maintainer.",
        links: ["llm-wiki-concept", "persistent-knowledge-bases", "dataview", "marp", "obsidian-llm-wiki-guide"]
    },
    {
        id: "vannevar-bush",
        title: "Vannevar Bush",
        type: "entity",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/entities/vannevar-bush.md",
        tags: ["people", "pioneers", "memex", "hypertext", "computer-science"],
        excerpt: "American engineer and science administrator (1890–1974) who directed the OSRD and authored the 1945 vision for the Memex and associative indexing.",
        links: ["as-we-may-think-bush-1945", "memex", "associative-trails", "douglas-engelbart", "memex-to-llm-wiki-evolution", "engelbart-bush-symbiosis-ai"]
    },
    {
        id: "douglas-engelbart",
        title: "Douglas Engelbart",
        type: "entity",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/entities/douglas-engelbart.md",
        tags: ["people", "pioneers", "hci", "hypertext", "cognitive-augmentation"],
        excerpt: "Pioneer of interactive computing (1925–2013) who invented the computer mouse, collaborative real-time hypertext (NLS), and formulated the H-LAM/T cognitive augmentation framework.",
        links: ["augmenting-human-intellect-engelbart-1962", "vannevar-bush", "h-lam-t-system", "obsidian", "engelbart-bush-symbiosis-ai"]
    },
    {
        id: "memex",
        title: "Memex",
        type: "entity",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/entities/memex.md",
        tags: ["tools", "hardware-concepts", "historical-systems", "hypertext"],
        excerpt: "Conceptual electro-mechanical desk workstation conceived by Vannevar Bush to store microfilm records and create permanent associative trails between documents.",
        links: ["as-we-may-think-bush-1945", "vannevar-bush", "associative-trails", "memex-to-llm-wiki-evolution"]
    },
    {
        id: "ilk-repo",
        title: "ilk-repo Project",
        type: "entity",
        status: "mature",
        date: "2026-08-18",
        path: "wiki/entities/ilk-repo.md",
        tags: ["project", "repository", "full-stack", "python", "web"],
        excerpt: "The host repository containing full-stack starter templates (HTML/CSS/JS), Python demonstration modules, local search engine tools, and the LLM Wiki engine.",
        links: ["codebase-starter-modules", "llm-wiki-concept", "memex-to-llm-wiki-evolution", "obsidian-llm-wiki-guide"]
    },
    {
        id: "dataview",
        title: "Dataview",
        type: "entity",
        status: "mature",
        date: "2026-08-18",
        path: "wiki/entities/dataview.md",
        tags: ["tools", "obsidian-plugin", "metadata", "yaml"],
        excerpt: "Obsidian plugin executing SQL-like dynamic metadata queries against YAML frontmatter schemas across markdown vaults.",
        links: ["obsidian", "llm-wiki-concept"]
    },
    {
        id: "marp",
        title: "Marp",
        type: "entity",
        status: "mature",
        date: "2026-08-18",
        path: "wiki/entities/marp.md",
        tags: ["tools", "presentation", "slides", "markdown"],
        excerpt: "Markdown-based slide deck ecosystem used to render presentations and executive briefings directly from synthesized wiki pages.",
        links: ["obsidian", "llm-wiki-concept", "llm-wiki-architecture-slides"]
    },
    {
        id: "qmd",
        title: "qmd",
        type: "entity",
        status: "mature",
        date: "2026-08-18",
        path: "wiki/entities/qmd.md",
        tags: ["tools", "cli", "search-engine", "hybrid-search", "bm25"],
        excerpt: "Local hybrid search engine (BM25 + on-device vector re-ranking) for querying markdown vaults via CLI or native MCP server.",
        links: ["llm-wiki-concept"]
    },
    {
        id: "engelbart-bush-symbiosis-ai",
        title: "From Bush and Engelbart to LLM Agentic Co-Intelligence",
        type: "synthesis",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/syntheses/engelbart-bush-symbiosis-ai.md",
        tags: ["intellectual-augmentation", "symbiosis", "memex", "engelbart", "llm-wiki"],
        excerpt: "Synthesis detailing the 80-year evolution of cognitive augmentation from Bush's associative trails and Engelbart's H-LAM/T system to autonomous agentic wiki co-intelligence.",
        links: ["as-we-may-think-bush-1945", "augmenting-human-intellect-engelbart-1962", "vannevar-bush", "douglas-engelbart", "memex", "h-lam-t-system", "associative-trails"]
    },
    {
        id: "memex-to-llm-wiki-evolution",
        title: "From Memex to LLM Wiki: Solving the Maintenance Bottleneck",
        type: "synthesis",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/syntheses/memex-to-llm-wiki-evolution.md",
        tags: ["pkm", "memex", "zettelkasten", "llm-wiki", "cognitive-augmentation"],
        excerpt: "Deep synthesis comparing 80 years of associative memory from Bush's 1945 Memex and Luhmann's Zettelkasten to Vector RAG and LLM Wikis, articulating the dissolution of the historic Maintenance Tax.",
        links: ["as-we-may-think-bush-1945", "llm-wiki-concept", "persistent-knowledge-bases", "rag-vs-llm-wiki", "vannevar-bush", "memex", "associative-trails"]
    },
    {
        id: "rag-vs-llm-wiki",
        title: "Synthesis: RAG vs LLM-Maintained Wiki",
        type: "synthesis",
        status: "growing",
        date: "2026-08-18",
        path: "wiki/syntheses/rag-vs-llm-wiki.md",
        tags: ["architecture-comparison", "rag", "knowledge-graphs", "llm-systems"],
        excerpt: "Comparative architectural matrix analyzing differences in knowledge state, cross-referencing, multi-hop synthesis, and maintenance economics between RAG and LLM Wikis.",
        links: ["llm-wiki-concept", "persistent-knowledge-bases", "obsidian"]
    },
    {
        id: "obsidian-llm-wiki-guide",
        title: "Guide: Obsidian & The LLM Wiki Paradigm",
        type: "synthesis",
        status: "mature",
        date: "2026-08-18",
        path: "wiki/syntheses/obsidian-llm-wiki-guide.md",
        tags: ["guide", "obsidian", "workflows", "agents"],
        excerpt: "Architectural guide explaining the symbiotic workflow where Obsidian serves as the read-only visual IDE and the LLM serves as the persistent librarian and architect.",
        links: ["llm-wiki-concept", "obsidian", "ilk-repo", "persistent-knowledge-bases"]
    },
    {
        id: "llm-wiki-architecture-slides",
        title: "Slide Deck: LLM Wiki Architecture",
        type: "synthesis",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/syntheses/llm-wiki-architecture-slides.md",
        tags: ["marp", "presentation", "architecture", "slides", "llm-wiki"],
        excerpt: "6-slide Marp presentation deck summarizing the tri-layer architecture, operational workflows, and historical evolution of persistent knowledge bases.",
        links: ["llm-wiki-concept", "as-we-may-think-bush-1945", "marp"]
    },
    {
        id: "as-we-may-think-bush-1945",
        title: "As We May Think (Vannevar Bush, 1945)",
        type: "source",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/sources/as-we-may-think-bush-1945.md",
        tags: ["memex", "hypertext", "knowledge-systems", "associative-indexing", "vannevar-bush"],
        excerpt: "Structured extraction of Dr. Vannevar Bush's seminal Atlantic Monthly essay establishing the Memex, associative trails, and external cognitive augmentation.",
        links: ["vannevar-bush", "memex", "associative-trails", "persistent-knowledge-bases", "llm-wiki-concept"]
    },
    {
        id: "augmenting-human-intellect-engelbart-1962",
        title: "Augmenting Human Intellect: Framework (Engelbart, 1962)",
        type: "source",
        status: "mature",
        date: "2026-08-19",
        path: "wiki/sources/augmenting-human-intellect-engelbart-1962.md",
        tags: ["engelbart", "cognitive-augmentation", "h-lam-t", "symbiosis", "bootstrapping"],
        excerpt: "Extraction of Douglas Engelbart's 1962 foundational report formulating the H-LAM/T system, external symbol manipulation, and recursive bootstrapping for cognitive leverage.",
        links: ["douglas-engelbart", "vannevar-bush", "h-lam-t-system", "persistent-knowledge-bases", "associative-trails"]
    },
    {
        id: "llm-wiki-concept",
        title: "LLM Wiki: Pattern for Building Personal Knowledge Bases",
        type: "source",
        status: "mature",
        date: "2026-08-18",
        path: "wiki/sources/llm-wiki-concept.md",
        tags: ["knowledge-management", "llm", "obsidian", "zettelkasten", "memex"],
        excerpt: "The founding concept document defining the tri-layer architecture (Raw, Wiki, Schema) and autonomous agent workflows (Ingest, Query, Lint).",
        links: ["persistent-knowledge-bases", "obsidian", "marp", "dataview", "qmd", "rag-vs-llm-wiki", "llm-wiki-architecture-slides"]
    },
    {
        id: "codebase-starter-modules",
        title: "Source: Initial Codebase & Starter Modules",
        type: "source",
        status: "mature",
        date: "2026-08-18",
        path: "wiki/sources/codebase-starter-modules.md",
        tags: ["codebase", "python", "javascript", "html", "css", "starter-template"],
        excerpt: "Extraction of the multi-language repository foundation, including HTML5, CSS3, JS scripts, Python demonstration modules, and CLI search/lint tools.",
        links: ["ilk-repo", "persistent-knowledge-bases"]
    }
];

// 2. Application State
let currentCategory = "all";
let searchQuery = "";
let currentSort = "connections";
let activeView = "catalog";

// 3. DOM Elements
const nodesGrid = document.getElementById("nodes-grid-container");
const searchInput = document.getElementById("wiki-search-input");
const categoryFilters = document.getElementById("category-filters");
const sortSelect = document.getElementById("sort-select");
const btnViewCards = document.getElementById("btn-view-cards");
const btnViewGraph = document.getElementById("btn-view-graph");
const catalogView = document.getElementById("catalog-view");
const graphView = document.getElementById("graph-view");
const nodeModal = document.getElementById("node-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModalBtn = document.getElementById("close-modal-btn");

// 4. Initialization
document.addEventListener("DOMContentLoaded", () => {
    updateCounts();
    renderCards();
    initGraph();
    setupEventListeners();
});

// Update Badge Counts
function updateCounts() {
    const counts = { all: VAULT_DATA.length, concept: 0, synthesis: 0, entity: 0, source: 0 };
    VAULT_DATA.forEach(node => {
        if (counts[node.type] !== undefined) counts[node.type]++;
    });
    
    document.getElementById("count-all").textContent = counts.all;
    document.getElementById("count-concept").textContent = counts.concept;
    document.getElementById("count-synthesis").textContent = counts.synthesis;
    document.getElementById("count-entity").textContent = counts.entity;
    document.getElementById("count-source").textContent = counts.source;
    document.getElementById("stat-total-nodes").textContent = counts.all;
    
    // Total connections count
    let totalConnections = 0;
    VAULT_DATA.forEach(n => totalConnections += n.links.length);
    document.getElementById("stat-links").textContent = totalConnections;
}

// Filter and Sort Logic
function getFilteredNodes() {
    return VAULT_DATA.filter(node => {
        const matchesCategory = currentCategory === "all" || node.type === currentCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || 
            node.title.toLowerCase().includes(q) || 
            node.excerpt.toLowerCase().includes(q) || 
            node.tags.some(t => t.toLowerCase().includes(q)) ||
            node.id.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (currentSort === "connections") return b.links.length - a.links.length;
        if (currentSort === "title") return a.title.localeCompare(b.title);
        if (currentSort === "type") return a.type.localeCompare(b.type);
        return 0;
    });
}

// Render Card Grid
function renderCards() {
    const nodes = getFilteredNodes();
    nodesGrid.innerHTML = "";

    if (nodes.length === 0) {
        nodesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <h3>No matching vault nodes found</h3>
                <p>Try searching for terms like 'memex', 'engelbart', 'rag', 'bush', or clear filters.</p>
            </div>
        `;
        return;
    }

    nodes.forEach(node => {
        const card = document.createElement("div");
        card.className = `node-card type-${node.type}`;
        card.onclick = () => openModal(node.id);

        const tagsHtml = node.tags.slice(0, 3).map(t => `<span class="tag-pill">#${t}</span>`).join("");

        card.innerHTML = `
            <div class="card-header">
                <span class="card-badge ${node.type}">${node.type}</span>
                <span class="card-status">${node.status}</span>
            </div>
            <h3>${node.title}</h3>
            <p class="card-excerpt">${node.excerpt}</p>
            <div class="card-tags">${tagsHtml}</div>
            <div class="card-footer">
                <span class="card-date">${node.date}</span>
                <span class="connections-count">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    ${node.links.length} trails
                </span>
            </div>
        `;
        nodesGrid.appendChild(card);
    });
}

// Open Inspector Modal
function openModal(nodeId) {
    const node = VAULT_DATA.find(n => n.id === nodeId);
    if (!node) return;

    document.getElementById("modal-badge").textContent = node.type.toUpperCase();
    document.getElementById("modal-badge").className = `modal-type-badge ${node.type}`;
    document.getElementById("modal-title").textContent = node.title;
    document.getElementById("modal-meta").innerHTML = `
        <span>Status: <strong>${node.status}</strong></span>
        <span>Updated: <strong>${node.date}</strong></span>
    `;
    document.getElementById("modal-tags").innerHTML = node.tags.map(t => `<span class="tag-pill">#${t}</span>`).join("");
    document.getElementById("modal-summary").textContent = node.excerpt;
    document.getElementById("modal-file-path").textContent = node.path;

    const linksList = document.getElementById("modal-links");
    linksList.innerHTML = "";
    
    node.links.forEach(linkId => {
        const targetNode = VAULT_DATA.find(n => n.id === linkId);
        const li = document.createElement("li");
        li.textContent = targetNode ? `[[${targetNode.title}]]` : `[[${linkId}]]`;
        li.onclick = (e) => {
            e.stopPropagation();
            if (targetNode) openModal(targetNode.id);
        };
        linksList.appendChild(li);
    });

    nodeModal.classList.add("open");
    modalBackdrop.classList.add("open");
}

function closeModal() {
    nodeModal.classList.remove("open");
    modalBackdrop.classList.remove("open");
}

// Interactive SVG Knowledge Graph
function initGraph() {
    const svg = document.getElementById("knowledge-graph-svg");
    const container = document.getElementById("graph-container");
    const width = container.clientWidth || 850;
    const height = 600;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.innerHTML = ""; // Clear

    const typeColors = {
        concept: "#bc8cff",
        synthesis: "#f0883e",
        entity: "#58a6ff",
        source: "#3fb950"
    };

    // Calculate dynamic node positions (radial clustered layout)
    const nodes = VAULT_DATA.map((node, i) => {
        const angle = (i / VAULT_DATA.length) * 2 * Math.PI;
        const radius = 190 + (i % 3) * 45;
        return {
            ...node,
            x: width / 2 + Math.cos(angle) * radius,
            y: height / 2 + Math.sin(angle) * radius
        };
    });

    // Create Edges Group
    const edgesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    edgesGroup.setAttribute("class", "edges-layer");

    // Draw lines between connected nodes
    nodes.forEach(source => {
        source.links.forEach(targetId => {
            const target = nodes.find(n => n.id === targetId);
            if (target) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", source.x);
                line.setAttribute("y1", source.y);
                line.setAttribute("x2", target.x);
                line.setAttribute("y2", target.y);
                line.setAttribute("class", "graph-edge");
                line.setAttribute("id", `edge-${source.id}-${target.id}`);
                edgesGroup.appendChild(line);
            }
        });
    });
    svg.appendChild(edgesGroup);

    // Create Nodes Group
    const nodesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    nodesGroup.setAttribute("class", "nodes-layer");

    nodes.forEach(node => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "graph-node");
        g.setAttribute("transform", `translate(${node.x}, ${node.y})`);
        g.style.color = typeColors[node.type];

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const radius = 11 + Math.min(node.links.length * 2, 16);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", "#161b22");
        circle.setAttribute("stroke", typeColors[node.type]);
        circle.setAttribute("stroke-width", "2.5");

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("dx", radius + 6);
        text.setAttribute("dy", "4");
        text.textContent = node.title.length > 22 ? node.title.substring(0, 20) + "..." : node.title;

        g.appendChild(circle);
        g.appendChild(text);

        // Interactive Graph Node Events
        g.onclick = () => openModal(node.id);
        g.onmouseenter = () => {
            // Highlight connected edges
            document.querySelectorAll(".graph-edge").forEach(edge => {
                if (edge.id.includes(node.id)) edge.classList.add("active");
            });
        };
        g.onmouseleave = () => {
            document.querySelectorAll(".graph-edge").forEach(edge => edge.classList.remove("active"));
        };

        nodesGroup.appendChild(g);
    });

    svg.appendChild(nodesGroup);
}

// Event Listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderCards();
    });

    // Keyboard shortcut '/' to search, 'Escape' to close modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === "Escape") {
            closeModal();
        }
    });

    // Category filter tabs
    categoryFilters.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.type;
        renderCards();
    });

    // Sort select
    sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        renderCards();
    });

    // View toggle buttons
    btnViewCards.addEventListener("click", () => {
        btnViewCards.classList.add("active");
        btnViewGraph.classList.remove("active");
        catalogView.classList.add("active");
        graphView.classList.remove("active");
    });

    btnViewGraph.addEventListener("click", () => {
        btnViewGraph.classList.add("active");
        btnViewCards.classList.remove("active");
        graphView.classList.add("active");
        catalogView.classList.remove("active");
        setTimeout(initGraph, 50); // Re-calculate SVG dimensions on visible render
    });

    // Modal close triggers
    closeModalBtn.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", closeModal);
}