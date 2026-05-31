// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio copy.
// Edit here to re-skin / reorder without touching layout or animation code.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Surya Prakash Kahar',
  role: 'Backend Architect',
  tagline: 'Backend Architect · Distributed Systems',
  blurb:
    'CS undergrad at IIIT Bhagalpur who enjoys building reliable backend systems and solving hard concurrency problems. Hands-on with Raft consensus and ACID ledgers, and a contributor to open source serving 850k+ users. LeetCode 1704 in Go & C++.',
  location: 'Bhilwara, India · Open to remote / relocation',
  phone: '+91 89551 70674',
  email: 'surya.230101143@iiitbh.ac.in',
  avatar: '/surya.png',
  availability: 'Open to SDE / Backend roles',
  links: {
    github: 'https://github.com/suryaprakash0010',
    linkedin: 'https://linkedin.com/in/suryaprakashkahar',
    resume: '/resume.pdf',
  },
}

// Headline stats for the "3-second rule" scanned before anything is read.
export const stats = [
  { value: '850k+', label: 'users reached (OSS)' },
  { value: '1704', label: 'LeetCode ' },
  { value: '99.9%', label: 'cluster uptime' },
  { value: '550+', label: 'DSA problems' },
]

// "Technical DNA" grouped so the section reads as a system, not a word cloud.
// `tier` maps to the columns rendered in TechnicalDNA.jsx.
export const stackGroups = [
  { tier: 'lang', label: 'Languages' },
  { tier: 'backend', label: 'Backend & Systems' },
  { tier: 'infra', label: 'Infra & DevOps' },
  { tier: 'frontend', label: 'Frontend' },
]

export const stack = [
  // Languages
  { name: 'Go (Golang)', glyph: 'Go', tier: 'lang', blurb: 'Concurrency, Raft, gRPC' },
  { name: 'C++', glyph: 'C++', tier: 'lang', blurb: 'Systems & competitive DSA' },
  { name: 'C', glyph: 'C', tier: 'lang', blurb: 'Low-level fundamentals' },
  { name: 'Python', glyph: 'Py', tier: 'lang', blurb: 'Scripting & AI pipelines' },
  { name: 'SQL', glyph: 'SQL', tier: 'lang', blurb: 'MySQL · Relational data' },

  // Backend & Systems
  { name: 'Node.js', glyph: 'JS', tier: 'backend', blurb: 'Express REST APIs' },
  { name: 'MongoDB', glyph: 'DB', tier: 'backend', blurb: 'NoSQL document store (MERN)' },
  { name: 'gRPC', glyph: 'gR', tier: 'backend', blurb: 'TCP/RPC service comms' },
  { name: 'Raft', glyph: '⇄', tier: 'backend', blurb: 'Consensus & replication' },
  { name: 'Redis', glyph: 'RD', tier: 'backend', blurb: 'Rate-limiting & caching' },
  { name: 'Socket.io', glyph: '⚡', tier: 'backend', blurb: 'Realtime channels' },

  // Infra & DevOps
  { name: 'Docker', glyph: '🐳', tier: 'infra', blurb: 'Compose, multi-node clusters' },
  { name: 'AWS', glyph: 'AWS', tier: 'infra', blurb: 'EC2 · S3 deployment' },
  { name: 'CI/CD', glyph: '⟳', tier: 'infra', blurb: 'Automated pipelines' },
  { name: 'Linux', glyph: '>_', tier: 'infra', blurb: 'Bash & server ops' },

  // Frontend
  { name: 'React.js', glyph: '⚛', tier: 'frontend', blurb: 'Component-driven UIs' },
  { name: 'Redux', glyph: 'Rx', tier: 'frontend', blurb: 'Predictable state' },
  { name: 'Framer Motion', glyph: '◆', tier: 'frontend', blurb: 'Production motion' },
  { name: 'Tailwind', glyph: '~', tier: 'frontend', blurb: 'Utility-first styling' },
]

// "Systems Thinking" the backend / system-design topics I obsess over.
// `icon` resolves through data/icons.jsx; `accent` tints the card glow.
export const focusAreas = [
  {
    title: 'Consensus & Replication',
    icon: 'Raft',
    accent: '#a855f7',
    blurb:
      'Leader election, log replication, and quorum commits keeping a cluster agreeing on one truth through node failure.',
  },
  {
    title: 'ACID & Transactions',
    icon: 'MongoDB',
    accent: '#4169E1',
    blurb:
      'Serializable isolation, idempotent writes, and no lost updates under the concurrent load tested.',
  },
  {
    title: 'Caching & Rate Limiting',
    icon: 'Redis',
    accent: '#FF4438',
    blurb:
      'Redis on the hot path for sub-ms reads, plus token-bucket limiting to shield services from abuse.',
  },
  {
    title: 'Service Communication',
    icon: 'gRPC',
    accent: '#22d3ee',
    blurb:
      'gRPC and TCP/RPC contracts between services typed, binary, and fast where REST is too chatty.',
  },
  {
    title: 'Fault Tolerance',
    icon: 'Fault Tolerance',
    accent: '#22d3ee',
    blurb:
      'Retries, timeouts, graceful degradation, and safety invariants designed to prevent split-brain and stale reads.',
  },
  {
    title: 'Scalability',
    icon: 'Scalability',
    accent: '#a855f7',
    blurb:
      'Horizontal scaling, strategic indexing, and throughput tuning designing for the next order of magnitude.',
  },
]

// Reference architecture rendered live in ArchitectureDiagram.jsx.
// Layered top→bottom; edges carry animated "data flow".
export const referenceArchitecture = {
  nodes: [
    { id: 'client', label: 'Client', x: 360, y: 16, w: 160, h: 46, tone: 'cyan' },
    { id: 'lb', label: 'Load Balancer', x: 360, y: 96, w: 160, h: 46, tone: 'blue' },
    { id: 'api', label: 'API Gateway · gRPC', x: 330, y: 176, w: 220, h: 46, tone: 'blue' },
    { id: 'svcA', label: 'Auth Service', x: 150, y: 262, w: 180, h: 46, tone: 'purple' },
    { id: 'svcB', label: 'Txn Service', x: 550, y: 262, w: 180, h: 46, tone: 'purple' },
    { id: 'redis', label: 'Redis · Cache', x: 70, y: 360, w: 170, h: 46, tone: 'red' },
    { id: 'pg', label: 'MongoDB · ACID', x: 355, y: 360, w: 190, h: 46, tone: 'cyan' },
    { id: 'raft', label: 'Raft KV Store', x: 630, y: 360, w: 170, h: 46, tone: 'cyan' },
  ],
  edges: [
    ['client', 'lb'],
    ['lb', 'api'],
    ['api', 'svcA'],
    ['api', 'svcB'],
    ['svcA', 'redis'],
    ['svcA', 'pg'],
    ['svcB', 'pg'],
    ['svcB', 'raft'],
  ],
}

// Experience rendered as a vertical timeline.
export const experience = [
  {
    id: 'RECRIVIO ',
    role: 'Software Development Engineer Intern',
    org: 'RECRIVIO ',
    location: 'Bengaluru',
    period: 'Apr 2026 – Present',
    points: [
      'Built and integrated RESTful APIs in Node.js / Express, improving data-retrieval efficiency by 20% for core services.',
      'Implemented responsive React.js UI components with the frontend team, raising reusability and UX quality.',
      'Drove Agile sprints and peer code reviews to enforce maintainability, security, and engineering best practices.',
    ],
    tags: ['Node.js', 'Express', 'React', 'Agile'],
  },
  {
    id: 'codecharity',
    role: 'Open Source Contributor',
    org: 'CodeCharity · ImprovedTube',
    location: 'Remote',
    period: '2025 – Present',
    points: [
      'Optimized client-side performance for a browser extension serving 850,000+ active users, cutting content-script memory overhead.',
      'Engineered a context-aware Smart Speed engine using video metadata for adaptive playback control.',
      'Resolved deep-link & UI regressions across YouTube Shorts/Playlists and external embeds; patched security issues via GitHub Agile reviews.',
    ],
    tags: ['JavaScript', 'Web Extensions', 'Performance', 'Git'],
  },
]

// Each project is a case study: problem → architecture → what was hard.
export const projects = [
  {
    id: 'raft',
    title: 'Distributed Raft Consensus Engine',
    kind: 'Distributed Systems',
    year: '2026',
    summary:
      'A fault-tolerant distributed key-value store in Go implementing the Raft algorithm for strict consistency and 99.9% availability across a multi-node cluster.',
    challenge:
      'Built an async TCP/RPC networking layer handling leader election, log replication, and safety invariants guarding against split-brain and stale-leader scenarios while keeping writes linearizable under tested failure modes. A React visualizer maps live state transitions and RPC heartbeats.',
    impact: ['99.9% cluster uptime', 'Linearizable writes', 'No split-brain (tested)'],
    stack: ['Go', 'TCP/RPC', 'BoltDB', 'Docker', 'React'],
    flow: {
      nodes: ['Client', 'Leader', 'Follower A', 'Follower B'],
      edges: [
        ['Client', 'Leader'],
        ['Leader', 'Follower A'],
        ['Leader', 'Follower B'],
      ],
      caption: 'Append-entries replicated to a quorum before commit',
    },
    links: { repo: 'https://github.com/suryaprakash0010/Distributed-Raft-Key-Value-Store', live: null },
    accent: 'from-neon-cyan to-neon-blue',
    accentHex: '#22d3ee',
  },
  {
    id: 'bank',
    title: 'Scalable Bank Transaction Engine',
    kind: 'Backend Architecture',
    year: '2026',
    summary:
      'A secure financial backend using MongoDB multi-document transactions for ACID compliance preventing race conditions in concurrent fund transfers, load-tested with 1,000+ simulated users.',
    challenge:
      'Improved throughput by ~30% via strategic indexing and added Redis-based rate limiting to defend against brute-force and abusive traffic. JWT-secured middleware guards every money-moving path.',
    impact: ['~30% throughput', 'No race conditions (tested)', '1,000+ simulated users'],
    stack: ['Node.js', 'MongoDB', 'Redis', 'JWT'],
    flow: {
      nodes: ['API', 'Redis Limiter', 'MongoDB TX', 'Ledger'],
      edges: [
        ['API', 'Redis Limiter'],
        ['Redis Limiter', 'MongoDB TX'],
        ['MongoDB TX', 'Ledger'],
      ],
      caption: 'Redis throttles · MongoDB transactions guarantee the commit',
    },
    links: { repo: 'https://github.com/suryaprakash0010/Bank-Transaction-System', live: null },
    accent: 'from-neon-blue to-neon-purple',
    accentHex: '#3b82f6',
  },
  {
    id: 'improvedtube',
    title: 'ImprovedTube',
    kind: 'Open Source · Scale',
    year: '2025',
    summary:
      'Contributions to ImprovedTube, a YouTube-enhancing browser extension used by a community of 850k+ active users.',
    challenge:
      'Shipping performance-critical changes inside a third-party DOM at massive scale, where one inefficient observer or leak multiplies across hundreds of thousands of sessions. Built a metadata-driven Smart Speed engine and fixed cross-platform deep-link bugs.',
    impact: ['850k+ active users', 'Smart Speed engine', 'Cross-platform stability'],
    stack: ['JavaScript', 'Web Extensions', 'Chrome API'],
    flow: {
      nodes: ['Extension', 'Content Script', 'YouTube DOM', '850k users'],
      edges: [
        ['Extension', 'Content Script'],
        ['Content Script', 'YouTube DOM'],
        ['YouTube DOM', '850k users'],
      ],
      caption: 'Lightweight content scripts injected at global scale',
    },
    links: { repo: 'https://github.com/code-charity/youtube', live: 'https://improvedtube.com' },
    accent: 'from-neon-purple to-neon-violet',
    accentHex: '#a855f7',
  },
]

// Education compact card in the credentials section.
export const education = {
  school: 'Indian Institute of Information Technology (IIIT) Bhagalpur',
  degree: 'B.Tech, Computer Science & Engineering',
  detail: 'CGPA 8.0 / 10.0',
  period: 'Jul 2023 – Jul 2027',
  location: 'Bhagalpur, Bihar',
  coursework: [
    'Operating Systems',
    'DBMS',
    'Distributed Systems',
    'Computer Networks',
    'OOP',
    'Data Structures & Algorithms',
  ],
}

// Achievements + certifications credibility signals.
export const achievements = [
  { value: '1704', label: 'LeetCode ', note: 'Max rating · 550+ solved' },
  { value: '3★', label: 'CodeChef Coder', note: 'Top 5% in multiple contests' },
]

export const certifications = [
  { name: 'AI & Machine Learning Algorithms', issuer: 'Microsoft' },
  { name: 'Full Stack Professional Certificate', issuer: 'Meta' },
  { name: 'Generative AI for Expert Partners', issuer: 'Google' },
]

export const nav = [
  { id: 'hero', label: 'Home' },
  { id: 'dna', label: 'Stack' },
  { id: 'systems', label: 'Systems' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]
