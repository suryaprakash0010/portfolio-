// ─────────────────────────────────────────────────────────────────────────────
// Tech → real brand SVG (react-icons) + brand hex colour.
// Keyed by the display names used in content.js. Anything not found falls back
// to a neutral generic glyph so the UI never breaks on an unknown tech.
// ─────────────────────────────────────────────────────────────────────────────
import {
  SiGo,
  SiCplusplus,
  SiC,
  SiPython,
  SiMysql,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiRedis,
  SiSocketdotio,
  SiDocker,
  SiLinux,
  SiReact,
  SiRedux,
  SiFramer,
  SiTailwindcss,
  SiJavascript,
  SiGit,
  SiJsonwebtokens,
  SiGooglechrome,
  SiMeta,
  SiGithub,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
import { GoogleLogo, MicrosoftLogo, GmailLogo } from '../components/ui/BrandLogos'
import {
  FiShare2,
  FiGitBranch,
  FiRefreshCw,
  FiServer,
  FiBox,
  FiDatabase,
  FiShield,
  FiZap,
  FiFileText,
} from 'react-icons/fi'

// name → { Icon, color }
const MAP = {
  // languages
  'Go (Golang)': { Icon: SiGo, color: '#00ADD8' },
  Go: { Icon: SiGo, color: '#00ADD8' },
  'C++': { Icon: SiCplusplus, color: '#00599C' },
  C: { Icon: SiC, color: '#A8B9CC' },
  Python: { Icon: SiPython, color: '#3776AB' },
  SQL: { Icon: SiMysql, color: '#4479A1' },
  MySQL: { Icon: SiMysql, color: '#4479A1' },
  MongoDB: { Icon: SiMongodb, color: '#47A248' },
  'MongoDB TX': { Icon: SiMongodb, color: '#47A248' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },

  // backend & systems
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  Express: { Icon: SiExpress, color: '#cccccc' },
  gRPC: { Icon: FiShare2, color: '#22d3ee' },
  'TCP/RPC': { Icon: FiShare2, color: '#22d3ee' },
  Raft: { Icon: FiGitBranch, color: '#a855f7' },
  'Fault Tolerance': { Icon: FiShield, color: '#22d3ee' },
  Scalability: { Icon: FiZap, color: '#a855f7' },
  Redis: { Icon: SiRedis, color: '#FF4438' },
  'Redis Limiter': { Icon: SiRedis, color: '#FF4438' },
  'Socket.io': { Icon: SiSocketdotio, color: '#ffffff' },
  JWT: { Icon: SiJsonwebtokens, color: '#d63aff' },
  BoltDB: { Icon: FiDatabase, color: '#38bdf8' },
  Ledger: { Icon: FiShield, color: '#22d3ee' },

  // infra & devops
  Docker: { Icon: SiDocker, color: '#2496ED' },
  AWS: { Icon: FaAws, color: '#FF9900' },
  'CI/CD': { Icon: FiRefreshCw, color: '#22d3ee' },
  Linux: { Icon: SiLinux, color: '#FCC624' },
  Git: { Icon: SiGit, color: '#F05032' },

  // frontend
  'React.js': { Icon: SiReact, color: '#61DAFB' },
  React: { Icon: SiReact, color: '#61DAFB' },
  Redux: { Icon: SiRedux, color: '#764ABC' },
  'Framer Motion': { Icon: SiFramer, color: '#0055FF' },
  Tailwind: { Icon: SiTailwindcss, color: '#06B6D4' },

  // misc / project chips
  'Web Extensions': { Icon: SiGooglechrome, color: '#4285F4' },
  'Chrome API': { Icon: SiGooglechrome, color: '#4285F4' },
  API: { Icon: FiServer, color: '#22d3ee' },

  // certification issuers
  Microsoft: { Icon: MicrosoftLogo, color: '#ffffff' },
  Meta: { Icon: SiMeta, color: '#0467DF' },
  Google: { Icon: GoogleLogo, color: '#ffffff' },

  // socials
  GitHub: { Icon: SiGithub, color: '#e6e6e6' },
  LinkedIn: { Icon: FaLinkedin, color: '#0A66C2' },
  Resume: { Icon: FiFileText, color: '#22d3ee' },
  Email: { Icon: GmailLogo, color: '#ffffff' },
}

const FALLBACK = { Icon: FiBox, color: '#a1a1aa' }

export function getIcon(name) {
  return MAP[name] || FALLBACK
}
