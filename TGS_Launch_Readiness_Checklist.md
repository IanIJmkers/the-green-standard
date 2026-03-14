# The Green Standard — Production Launch Readiness Checklist

**Prepared for:** Ian Ymkers | thegreenstandardgolf.nl
**Date:** March 11, 2026
**Store:** the-green-standard-2.myshopify.com → thegreenstandardgolf.nl

---

## Launch Status: NOT YET READY

There are several critical items that must be addressed before going live. This document categorizes every finding from the full audit into action priority levels.

---

## CRITICAL — Must Fix Before Launch

These items will prevent your store from functioning properly or legally in production.

### 1. Convert from Development Store to a Paid Plan
**Current state:** Your store is a Shopify development store. Development stores cannot process real payments, and your storefront is password-protected by default.
**Action:** Go to Settings > Plan and select a Shopify plan. This will unlock real payment processing and allow you to remove the password page. This is the single most important step — everything else depends on it.

### 2. Activate Shopify Payments
**Current state:** Shopify Payments is not activated. The payments page shows "Activate Shopify Payments" with a yellow banner that dev stores can only process test payments.
**Action:** After upgrading your plan, go to Settings > Payments and click "Activate Shopify Payments." You'll need your business banking details and tax ID. Since you're targeting the Netherlands (EU), ensure you set up Shopify Payments for the EU region.

### 3. Connect Your Custom Domain (thegreenstandardgolf.nl)
**Current state:** The only domain is `the-green-standard-2.myshopify.com`. No custom domain is connected.
**Action:** Go to Settings > Domains > "Connect existing" and follow the steps to point `thegreenstandardgolf.nl` to your Shopify store. You'll need to update DNS records at your domain registrar (A record and CNAME). Shopify provides free SSL automatically.

### 4. Remove Password Protection
**Current state:** Your online store is password-protected (password: "owtsea"). Visitors see a password page instead of your store.
**Action:** After upgrading from the dev plan, go to Online Store > Preferences > Password protection and disable it. Dev stores have this locked on — it only becomes removable on a paid plan.

### 5. Create Legal Policies (EU Requirement)
**Current state:**
- Return and refund policy: **Not set**
- Terms of service: **Not set**
- Shipping policy: **Not set**
- Privacy policy: Automated (OK)
- Contact information: **Required** (marked orange)

**Action:** Go to Settings > Policies. For each missing policy, Shopify can generate a template — click into each one and use "Create from template," then customize for The Green Standard. EU law (and specifically Dutch consumer protection law) requires clear return/refund terms, terms of service, and shipping information. Contact information must include a physical address and email under EU regulations.

### 6. Activate n8n Workflows
**Current state:** All 4 TGS workflows (Abandoned Cart Recovery, Content Calendar Engine, Product Drop Automation, Weekly Analytics Digest) have 0 production executions and are not published/active.
**Action:** Open each workflow in n8n and toggle it to Active. Test each one first by clicking "Test Workflow" to verify all credential connections work end-to-end. Specifically:
- **Abandoned Cart Recovery** — Needs a Shopify webhook event to trigger. Verify after Shopify Payments is active.
- **Content Calendar Engine** — Runs on a schedule. Verify Notion database query works.
- **Product Drop Automation** — Needs the Buffer access token added before activation.
- **Weekly Analytics Digest** — Runs weekly. Verify Shopify analytics data pulls correctly.

---

## HIGH PRIORITY — Fix Before or Shortly After Launch

These items significantly impact customer experience or business operations.

### 7. Update Store Region & Localization Settings
**Current state:** Your store is configured as a US-based business with US defaults, but you're launching on a .nl domain for European customers.
**Action (Settings > General):**
- Business entity: Consider updating to Netherlands if that's where you operate
- Store address: Update to your Netherlands address
- Currency display: Change from USD ($) to EUR (€) via Settings > Markets
- Unit system: Change from Imperial/Pounds to Metric/Kilograms
- Time zone: Change from Eastern Time (US) to (GMT+01:00) Amsterdam

### 8. Set Up SEO Basics
**Current state:**
- Home page title: "the-green-standard-2.myshopify.com" (the default)
- Meta description: Empty
- Social sharing image: Not set

**Action (Online Store > Preferences):**
- Home page title: "The Green Standard | Premium Sustainable Golf Accessories"
- Meta description: Write a compelling 150-160 character description
- Social sharing image: Upload a branded 1200x628px image for link previews on social media

### 9. Enable Email Marketing Opt-in at Checkout
**Current state:** Both Email and SMS marketing checkboxes are off at checkout.
**Action:** Go to Settings > Checkout > Marketing options and enable at least the Email toggle. This shows a consent checkbox at checkout so customers can opt into your Klaviyo email list — essential for your Abandoned Cart Recovery and Product Drop Automation workflows.

### 10. Configure Return Rules
**Current state:** Self-serve returns was just enabled, but Return Rules are still off. Without return rules, customers can request returns but there's no policy governing them.
**Action:** Go to Settings > Policies > Return rules > Manage. Set your return window (e.g., 30 days), restocking fees (if any), and which items are final sale.

### 11. Add Buffer Access Token
**Current state:** The Product Drop Automation workflow's "Schedule TikTok via Buffer" node still has a placeholder token.
**Action:** Create a Buffer account at bufferapp.com, generate an access token, and add it to the Buffer node in n8n.

---

## MEDIUM PRIORITY — Recommended Improvements

### 12. Google Sign-in for Customer Accounts
**Current state:** Not connected. Passwordless email authentication is already secure and functional.
**Action:** Requires creating OAuth2 credentials in Google Cloud Console:
1. Go to console.cloud.google.com
2. Create a project, configure the OAuth consent screen
3. Create OAuth2 Client ID credentials
4. Enter the Client ID and Client Secret in Shopify (Settings > Customer accounts > Authentication > Google)

Shopify provides the required redirect URIs on the setup page.

### 13. Enable Estimated Delivery Dates
**Current state:** Off in Shipping and delivery settings.
**Action:** Settings > Shipping and delivery > Delivery expectations > Estimated delivery dates. This builds customer trust by showing expected delivery windows at checkout.

### 14. Review Shipping Zone Coverage
**Current state:** Only Europe/Netherlands is configured with free Express International (1-5 business days). 235 countries/regions are not in any market.
**Action:** If you plan to sell outside Europe, go to Settings > Markets to add additional shipping zones and rates.

### 15. Verify Fulfillment Location
**Current state:** Fulfillment location is set to "Shop location — United States."
**Action:** If you're shipping from the Netherlands, update your fulfillment location to your actual shipping address. Go to Settings > Locations to update.

### 16. Install n8n Skills for Claude Code
**Current state:** The n8n MCP server is configured in `.mcp.json`. The n8n Skills (7 Claude Code skills for workflow building) have not been installed yet.
**Action:**
```bash
git clone https://github.com/czlonkowski/n8n-skills.git
cp -r n8n-skills/skills/* ~/.claude/skills/
```

### 17. Set Up EU Tax Collection
**Current state:** Shopify Tax services are active, but the "Collecting" column shows dashes for all regions. Tax regions are defined but not actively collecting.
**Action:** After upgrading to a paid plan, go to Settings > Taxes and duties > European Union, and ensure VAT collection is enabled. As a Netherlands-based business selling to EU consumers, you need to charge Dutch VAT (21%) at minimum, and potentially register for OSS (One-Stop Shop) if selling cross-border within the EU.

---

## ALREADY COMPLETED

| Item | Status |
|------|--------|
| Passwordless customer authentication | Active (email + 6-digit code) |
| Shop app sign-in | Enabled |
| Self-serve returns toggle | Enabled (this session) |
| Store credit | Enabled |
| Sign-in links in header & checkout | Enabled |
| Privacy policy | Automated |
| Shopify checkout configuration | Live |
| Abandoned checkout emails | Enabled (sends to all) |
| n8n credential security audit | Completed — all hardcoded keys removed |
| n8n MCP server configuration | Configured in .mcp.json with API key |
| Notion OAuth2 integration | Connected to Content Calendar Engine |
| Klaviyo Header Auth | Connected to Abandoned Cart & Product Drop workflows |
| Anthropic AI integration | Connected to Content Calendar & Product Drop workflows |
| Telegram bot | Connected with real chat ID |
| Comprehensive security report | Generated (TGS_Security_Integration_Report.md) |

---

## Quick Launch Sequence

Once you're ready to go live, follow this order:

1. **Upgrade Shopify plan** (Settings > Plan)
2. **Activate Shopify Payments** (Settings > Payments)
3. **Create legal policies** (Settings > Policies — all 4)
4. **Update store region/localization** (Settings > General)
5. **Update SEO settings** (Online Store > Preferences)
6. **Connect domain** (Settings > Domains > thegreenstandardgolf.nl)
7. **Enable checkout email marketing** (Settings > Checkout)
8. **Configure return rules** (Settings > Policies > Return rules)
9. **Test all n8n workflows** (run each one manually)
10. **Activate all n8n workflows** (toggle to Active)
11. **Remove password protection** (Online Store > Preferences)
12. **Verify live site** — visit thegreenstandardgolf.nl, test checkout flow

---

*Launch readiness audit generated by Claude for The Green Standard — March 11, 2026*
