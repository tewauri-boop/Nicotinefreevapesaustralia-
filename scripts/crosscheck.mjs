// scripts/crosscheck.mjs
// Pre-ship technical, SEO, agent-ready, compliance crosscheck

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const siteConfigPath = path.join(rootDir, 'src/config/site.js');
const { SITE, COMPLIANCE, PRODUCTS, CATEGORIES } = await import(
  `file://${siteConfigPath}`
);

console.log('=== RUNNING PRE-SHIP CROSSCHECK ===');

let failures = [];
let warnings = [];

// Check Agent files
const requiredAgentFiles = [
  'public/robots.txt',
  'public/llms.txt',
  'public/auth.md',
  'public/.well-known/api-catalog',
  'public/.well-known/agent-skills/index.json',
  'public/.well-known/mcp/server-card.json',
  'public/.well-known/oauth-protected-resource',
  'public/.well-known/oauth-authorization-server',
  'public/.well-known/openid-configuration',
  'public/.well-known/acp.json',
  'public/.well-known/ucp',
  'public/js/webmcp.js',
  'vercel.json'
];

requiredAgentFiles.forEach((file) => {
  const p = path.join(rootDir, file);
  if (!fs.existsSync(p)) {
    failures.push(`[B6] Missing required agent file: ${file}`);
  }
});

// Check auth.md starts with # Auth.md
const authPath = path.join(rootDir, 'public/auth.md');
if (fs.existsSync(authPath)) {
  const content = fs.readFileSync(authPath, 'utf8');
  if (!content.startsWith('# Auth.md')) {
    failures.push('[B6] public/auth.md does not start with exact "# Auth.md"');
  }
}

// Check ucp has "ucp": "1.0"
const ucpPath = path.join(rootDir, 'public/.well-known/ucp');
if (fs.existsSync(ucpPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(ucpPath, 'utf8'));
    if (data.ucp !== '1.0') {
      failures.push('[B6] .well-known/ucp missing mandatory "ucp": "1.0" field');
    }
  } catch (e) {
    failures.push(`[B6] .well-known/ucp is not valid JSON: ${e.message}`);
  }
}

// Check server-card.json tools match
const mcpCardPath = path.join(rootDir, 'public/.well-known/mcp/server-card.json');
if (fs.existsSync(mcpCardPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(mcpCardPath, 'utf8'));
    const toolNames = (data.capabilities?.tools || []).map((t) => t.name);
    const expected = [
      'search_products',
      'get_product',
      'list_categories',
      'get_policies',
      'create_order_draft'
    ];
    for (const exp of expected) {
      if (!toolNames.includes(exp)) {
        failures.push(`[B8] Tool ${exp} missing in server-card.json`);
      }
    }
  } catch (e) {
    failures.push(`[B8] server-card.json invalid: ${e.message}`);
  }
}

// Compliance check for banned terms
const bannedTerms = COMPLIANCE.bannedTerms || [];
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (
      file === 'node_modules' ||
      file === '.next' ||
      file === '.git' ||
      file === 'crosscheck.mjs' ||
      file === 'site.js'
    )
      continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(jsx|js|tsx|ts|json|txt|md)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8').toLowerCase();
      for (const term of bannedTerms) {
        if (content.includes(term.toLowerCase())) {
          failures.push(`[B7] Banned term "${term}" found in ${fullPath}`);
        }
      }
    }
  }
}

if (bannedTerms.length > 0) {
  scanDir(path.join(rootDir, 'public'));
  scanDir(path.join(rootDir, 'src'));
}

// Product images check
for (const p of PRODUCTS) {
  if (!p.images || p.images.length === 0) {
    failures.push(`Product ${p.slug} missing images array`);
  }
}

// Summary
if (warnings.length > 0) {
  console.log('\n--- Warnings ---');
  warnings.forEach((w) => console.log('⚠️  ' + w));
}

if (failures.length > 0) {
  console.error('\n--- Failures ---');
  failures.forEach((f) => console.error('❌ ' + f));
  console.error('\nPre-ship crosscheck FAILED.');
  process.exit(1);
} else {
  console.log('\n✅ All pre-ship crosscheck tests PASSED with zero blocking errors.');
  process.exit(0);
}
