# The Green Standard - Security, Integration & Automation Report

**Prepared for:** Ian Ymkers | The Green Standard Golf Accessories
**Date:** March 11, 2026
**Scope:** n8n Workflow Security, Shopify Authentication, n8n MCP/Skills Integration, Backend-First Architecture

---

## 1. Executive Summary

This report covers the full security audit and integration review of The Green Standard's automation stack: 4 n8n workflows, Shopify customer authentication, API credential hygiene, and the recommended integration of the n8n MCP server and n8n Skills for AI-assisted workflow management. The assessment is guided by backend-first security principles to prevent the common "vibe coding" vulnerabilities outlined in the security prompt.

**Key findings:** Your Shopify store uses passwordless authentication (the most secure consumer-grade method available). Your n8n workflows use proper credential separation via OAuth2 and Header Auth. The main risks are in credential scope and webhook hardening, both of which are addressed below.

---

## 2. Shopify Customer Accounts — Authentication & Security

### Current State (Verified)

| Setting | Status |
|---------|--------|
| Sign-in links in header & checkout | Enabled |
| Authentication method | Passwordless (email + 6-digit code) |
| Shop sign-in (via Shop app) | Enabled |
| Google social sign-in | Not connected |
| Facebook social sign-in | Not connected |
| Self-serve returns | Disabled |
| Store credit | Enabled |
| Customer account URL | `https://shopify.com/63063752767/account` |

### Security Assessment

**Passwordless authentication is excellent.** Shopify's default method sends a one-time 6-digit verification code to the customer's email. This eliminates:

- Password brute-force attacks
- Credential stuffing from breached databases
- Phishing for passwords (code expires quickly)
- Password reuse vulnerabilities

**Shop app sign-in** adds a second option that uses the Shop app's built-in authentication, which includes biometrics on supported devices.

### What Customers Can Do

When signed in, customers can: view their complete order history, check order status and tracking, manage their profile and addresses, access store credit, and auto-fill details at checkout for faster purchasing.

### Recommendations

1. **Consider enabling Google sign-in** — Many customers prefer one-tap Google authentication. This is a convenience improvement, not a security concern, since Google handles the OAuth flow securely.

2. **Self-serve returns** — Currently disabled. When your return volume grows, enabling this reduces support load while keeping the process auditable.

3. **No custom auth needed** — Since you're on Shopify (not a custom app with Supabase/Firebase), the security concerns about direct-to-DB access, RLS policies, and anon keys from the security prompt **do not apply to your storefront**. Shopify handles all authentication server-side. You never have customer credentials in your own database.

---

## 3. n8n Workflow Security Audit

### 3.1 Credentials Inventory

| Credential | Type | Status | Used In |
|-----------|------|--------|---------|
| Notion account | Notion OAuth2 API | Connected | Content Calendar Engine |
| Header Auth account 2 | Header Auth (Klaviyo) | Connected | Abandoned Cart Recovery, Product Drop Automation |
| Shopify account | Shopify OAuth2 API | Connected | Abandoned Cart Recovery, Weekly Analytics Digest |
| Telegram account | Telegram API | Connected | Content Calendar Engine, Product Drop Automation |
| Anthropic account | Anthropic API | Connected | Content Calendar Engine, Product Drop Automation |
| Gmail account | Gmail OAuth2 API | Connected | Not in current workflows |
| Google Firebase Cloud Firestore | OAuth2 API | Connected | Not in current workflows |
| Google Service Account | Service Account API | Connected | Not in current workflows |
| PostHog account | PostHog API | Connected | Not in current workflows |

### 3.2 Workflow-by-Workflow Security Review

#### Abandoned Cart Recovery
- **Auth method:** Shopify OAuth2 + Klaviyo Header Auth — Properly configured
- **Risk:** Low. Both use credential-based auth, no hardcoded keys
- **Webhooks:** Shopify sends webhook data; n8n processes it server-side
- **Recommendation:** Ensure Shopify webhook verification is enabled (Shopify signs webhooks with HMAC-SHA256)

#### Weekly Analytics Digest
- **Auth method:** Shopify OAuth2 — Properly configured
- **Risk:** Low. Read-only data access for analytics
- **Note:** Stripe was correctly removed (you use Shopify Payments)

#### Content Calendar Engine
- **Auth method:** Notion OAuth2, Anthropic API key, Telegram Bot Token
- **Risk:** Medium. The Notion OAuth2 is properly scoped via your "TGS n8n Automation" integration
- **Fixed this session:** Replaced placeholder DB ID with real Content Calendar database ID, connected Notion OAuth2 credential, removed hardcoded Authorization header
- **Recommendation:** Ensure your Notion integration only has access to the specific pages/databases it needs (principle of least privilege)

#### Product Drop Automation
- **Auth method:** Anthropic API key, Klaviyo Header Auth, Telegram Bot Token
- **Risk:** Medium. Buffer node still has placeholder token
- **Fixed this session:** Klaviyo auth switched from placeholder to Header Auth credential
- **Outstanding:** `Schedule TikTok via Buffer` node — needs your Buffer access token

### 3.3 Security Best Practices Applied

| Principle | Status |
|-----------|--------|
| No hardcoded API keys in workflows | Fixed (was present, now removed) |
| OAuth2 used where available | Yes (Shopify, Notion, Gmail) |
| Credentials stored in n8n credential store | Yes (encrypted at rest) |
| Credential scope separation | Yes (each service has its own credential) |
| No public-facing webhook endpoints | Correct (all workflows use scheduled triggers or Shopify events) |
| Sensitive data not logged | n8n Cloud handles this by default |

---

## 4. Backend-First Security Principles — How They Apply

The security rules you shared are critical for custom apps built on Supabase/Firebase. Here's how each applies to your specific stack:

### Does Apply to You

| Rule | Relevance |
|------|-----------|
| **Never hardcode API keys** | Yes — we removed all hardcoded keys from your n8n workflows. n8n's credential store encrypts them at rest. |
| **Verify webhook signatures** | Yes — if you add Shopify webhooks that trigger n8n workflows, always verify the HMAC signature. n8n's Shopify trigger node does this automatically when using the Shopify credential. |
| **Rate limiting** | Partially — n8n Cloud has built-in execution limits on your plan. Your scheduled workflows (daily, weekly) naturally rate-limit themselves. |
| **Environment variable hygiene** | Yes — never share your n8n API key, Klaviyo private key, or Anthropic API key. These should only live in n8n's credential store. |
| **Don't trust client-side data** | Yes — your n8n workflows run server-side, which is correct. Never move this logic to the browser. |

### Does NOT Apply (Shopify handles it)

| Rule | Why It Doesn't Apply |
|------|---------------------|
| RLS policies / direct-to-DB | Shopify manages its own database. You never write SQL or RLS policies. |
| Anon key exposure | No Supabase/Firebase in your stack. |
| Storage bucket security | Shopify CDN handles all product images and assets. |
| Mobile app hot-fix delays | You don't have a custom mobile app. Shopify's web storefront updates instantly. |
| Public RPC functions | No Postgres functions in your architecture. |

---

## 5. n8n MCP Server Integration

### What Is n8n-MCP?

The [n8n-MCP server](https://github.com/czlonkowski/n8n-mcp) by Romuald Czlonkowski is a Model Context Protocol server that gives AI assistants deep knowledge about n8n's 1,236+ workflow automation nodes. It enables AI tools like Claude Code, Cursor, and VS Code Copilot to build and manage n8n workflows programmatically.

### Key Capabilities

- Access documentation for 1,084 n8n nodes with 99% property coverage
- 265 AI-capable tool variants with 2,646 pre-extracted template configurations
- Reduces workflow creation time from ~45 minutes to ~3 minutes
- Can read, create, update, and manage workflows via the n8n API

### How to Install

#### Step 1: Generate an n8n API Key

1. Go to your n8n instance: `https://ianijmkers.app.n8n.cloud`
2. Navigate to **Settings** > **API** (or **Admin Panel** > **API**)
3. Create a new API key
4. Save it securely — never commit it to any repository

#### Step 2: Configure the MCP Server

For **Claude Code CLI**, add to your MCP configuration:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["-y", "n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "N8N_API_URL": "https://ianijmkers.app.n8n.cloud",
        "N8N_API_KEY": "your-n8n-api-key-here",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
    }
  }
}
```

**Security note:** The `N8N_API_KEY` gives full access to your n8n instance. Store it only in environment variables or the MCP config file. Never hardcode it in scripts or commit it to Git.

---

## 6. n8n Skills Integration

### What Are n8n Skills?

The [n8n-skills](https://github.com/czlonkowski/n8n-skills) repository contains 7 complementary Claude Code skills that teach AI to build production-ready n8n workflows:

1. **n8n Expression Syntax** — Correct `{{ }}` syntax, `$json`/`$node` variables
2. **n8n MCP Tools Expert** — Efficient use of the MCP server
3. **n8n Workflow Patterns** — 5 proven architectural patterns
4. **n8n Validation Expert** — Interprets and fixes validation errors
5. **n8n Node Configuration** — Property dependencies and setup
6. **n8n Code JavaScript** — JavaScript in Code nodes
7. **n8n Code Python** — Python in Code nodes with limitation awareness

### How to Install

```bash
# Clone the repository
git clone https://github.com/czlonkowski/n8n-skills.git

# Copy skills to Claude Code's skills directory
cp -r n8n-skills/skills/* ~/.claude/skills/

# Reload Claude Code
```

Skills activate automatically when relevant contexts are detected (e.g., writing n8n expressions, configuring nodes, debugging workflows).

---

## 7. Remaining Action Items

### You Need to Do (Manual Steps)

| Priority | Action | Details |
|----------|--------|---------|
| High | Generate n8n API key | Settings > API in your n8n instance. Required for MCP integration. |
| High | Add Buffer access token | Product Drop Automation > Schedule TikTok via Buffer node. Create a Buffer account and generate an access token at `https://bufferapp.com`. |
| Medium | Install n8n-MCP | Follow Section 5 above. Requires Node.js and npx. |
| Medium | Install n8n Skills | Follow Section 6 above. Requires Claude Code CLI. |
| Low | Connect Google sign-in | Shopify Admin > Settings > Customer accounts > Authentication > Google > Connect |
| Low | Review Notion integration scope | In Notion settings, ensure the "TGS n8n Automation" integration only has access to the Content Calendar database and related pages. |

### Already Completed (This Session + Previous Sessions)

| Workflow | What Was Fixed |
|----------|---------------|
| Abandoned Cart Recovery | All 3 Klaviyo nodes: switched from placeholder keys to Header Auth credential |
| Weekly Analytics Digest | Removed Stripe dependency, configured Shopify-only revenue data |
| Content Calendar Engine | Polish Caption with AI: switched to Anthropic. Query Notion Calendar: connected Notion OAuth2, replaced placeholder DB ID with real ID, removed hardcoded Authorization header. Telegram nodes: Chat IDs filled in, credentials working. |
| Product Drop Automation | Generate AI Content: switched to Anthropic. Trigger Klaviyo Drop Email: switched to Header Auth credential, removed placeholder. Telegram nodes: credentials working. |

---

## 8. Security Checklist

Use this as an ongoing reference:

- [ ] n8n API key generated and stored securely (not in Git)
- [ ] Buffer access token added to Product Drop Automation
- [ ] Notion integration scope reviewed (least privilege)
- [ ] All n8n workflows tested end-to-end after credential changes
- [ ] Shopify webhook HMAC verification confirmed (if adding webhook triggers)
- [ ] No API keys hardcoded anywhere in workflow JSON
- [ ] n8n Cloud plan execution limits reviewed
- [ ] Telegram bot token not shared publicly
- [ ] Klaviyo API key scoped to necessary permissions only
- [ ] Regular credential rotation schedule established (quarterly recommended)

---

*Report generated by Claude for The Green Standard automation stack audit.*
