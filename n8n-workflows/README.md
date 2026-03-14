# The Green Standard - n8n Workflows

Complete n8n workflow automation suite for a premium golf accessories dropship brand using Shopify, Stripe, Klaviyo, ElevenLabs, Notion, Telegram, and Buffer.

## Workflows Overview

### 1. Product Drop Automation (`product-drop-automation.json`)
**Trigger:** Shopify webhook (product/create or product/update with tag "drop-ready")

**Flow:**
- Receives Shopify product webhook
- Calls OpenAI/Claude API to generate:
  - Professional product description
  - Email subject line
  - 3 social media captions (TikTok, Instagram, Telegram)
- Sends generated content to Telegram bot for approval
- Waits for team approval (manual intervention)
- Upon approval:
  - Triggers Klaviyo email launch event
  - Posts to Telegram channel
  - Schedules Buffer posts for TikTok and Instagram
- If rejected: Sends rejection notice for revision

**Key Nodes:** Webhook, HTTP Request (OpenAI), Code Parser, Telegram Bot, Wait, If Condition, Klaviyo API, Buffer API

**Configuration Required:**
- Shopify webhook path and credentials
- OpenAI API key
- Telegram chat ID and bot token
- Klaviyo API credentials
- Buffer API token and profile IDs

---

### 2. Content Calendar Engine (`content-calendar-engine.json`)
**Trigger:** Daily cron schedule at 9:00 AM CET

**Flow:**
- Triggers daily at 9 AM CET
- Queries Notion database for today's scheduled posts (status = "Scheduled")
- For each post found:
  - Calls OpenAI/Claude to generate final caption based on Notion content brief
  - Filters by platform (Instagram, TikTok, LinkedIn, etc.)
  - Applies tone from Notion database
- Sends generated content to Telegram for team review (30-minute window)
- If approved:
  - Posts to Buffer API for platform-specific scheduling
  - Updates Notion page status to "Published"
- If rejected: Sends rejection message for revision

**Key Nodes:** Cron Trigger, Notion Query, Code Parser, Split in Batches (loop), OpenAI API, Telegram Bot, Wait, If Condition, Buffer API, Notion Update

**Configuration Required:**
- Notion integration token and database ID
- OpenAI API key
- Telegram chat ID and bot token
- Buffer API token and profile IDs (per platform)

---

### 3. Abandoned Cart Recovery (`abandoned-cart-recovery.json`)
**Trigger:** Shopify webhook (carts/update)

**Flow:**
- Receives abandoned cart webhook from Shopify
- Extracts cart details (ID, token, email, total, items count)
- **Stage 1 (1 hour):**
  - Wait 1 hour
  - Check Shopify orders API to see if cart converted
  - If NOT converted: Trigger first Klaviyo email
- **Stage 2 (24 hours):**
  - Wait 24 hours from initial trigger
  - Check orders again
  - If still not converted: Trigger second email (with social proof)
- **Stage 3 (48 hours):**
  - Wait 48 hours from stage 2
  - Check orders one final time
  - If still not converted:
    - Generate 10% discount code via Shopify API
    - Trigger final Klaviyo email with discount incentive

**Key Nodes:** Webhook, Code Parser, Wait (multiple), If Conditions, Shopify API (orders check), Shopify API (price rule), Klaviyo API (3 events)

**Configuration Required:**
- Shopify webhook path and API credentials
- Shopify API access token
- Klaviyo API credentials

---

### 4. Weekly Analytics Digest (`weekly-analytics-digest.json`)
**Trigger:** Every Monday at 8:00 AM CET

**Flow:**
- Triggers every Monday at 8 AM CET
- Fetches data from multiple sources in parallel:
  - **Shopify API:** Orders from last 7 days (count, revenue, top products)
  - **Stripe API:** Revenue summary from paid charges
  - **Instagram API:** Impressions, reach, profile views
  - **TikTok API:** Views and follower count
- Compiles all data into a structured format:
  - Total revenue (Shopify + Stripe)
  - Order count
  - Top 5 products by units sold
  - Instagram performance metrics
  - TikTok engagement metrics
- Sends formatted digest to Telegram channel with markdown formatting and emojis

**Key Nodes:** Cron Trigger, Shopify API, Stripe API, Instagram API, TikTok API, Code Compiler, Telegram Bot

**Configuration Required:**
- Shopify domain and API token
- Stripe API key
- Instagram Business Account ID and access token
- TikTok API credentials
- Telegram channel ID and bot token

---

## Setup Instructions

### Prerequisites
1. n8n Cloud account
2. Shopify store with API access
3. Klaviyo account with API credentials
4. OpenAI account with API key
5. Telegram bot (create via @BotFather)
6. Buffer account with API token
7. Notion workspace with integration permissions
8. Stripe account (for payment processing)
9. Instagram Business Account with Graph API access
10. TikTok for Business account

### Import Workflow Steps
1. Log in to n8n Cloud
2. Click "Workflows" → "Import from File"
3. Select one of the JSON files
4. n8n will auto-detect missing credentials
5. Fill in your API keys and tokens in the credentials section
6. Test webhook URLs (for product-drop-automation and abandoned-cart-recovery)
7. Enable the workflow when ready

### Testing & Activation
- **Product Drop:** Create/update a Shopify product with tag "drop-ready"
- **Content Calendar:** Add items to Notion with PublishDate = today and Status = "Scheduled"
- **Abandoned Cart:** Add items to cart but don't checkout (wait for webhook)
- **Analytics Digest:** Trigger manually first Monday after setup, then runs automatically

---

## Credential Placeholders

Replace these placeholders in the workflows:

- `YOUR_OPENAI_API_KEY` → Your OpenAI API key (sk-...)
- `YOUR_KLAVIYO_API_KEY` → Your Klaviyo API key (pk-...)
- `YOUR_SHOPIFY_DOMAIN` → Your Shopify domain (mystore.myshopify.com)
- `YOUR_SHOPIFY_API_TOKEN` → Your Shopify API token
- `YOUR_TELEGRAM_CHAT_ID` → Your Telegram chat ID (for approvals)
- `YOUR_TELEGRAM_CHANNEL_ID` → Your Telegram channel ID (for posts)
- `YOUR_TELEGRAM_BOT_TOKEN` → Your Telegram bot token
- `YOUR_BUFFER_API_TOKEN` → Your Buffer API token
- `YOUR_BUFFER_PROFILE_ID_*` → Buffer profile IDs per platform
- `YOUR_NOTION_INTEGRATION_TOKEN` → Notion integration token
- `YOUR_NOTION_DATABASE_ID` → Notion database ID
- `YOUR_STRIPE_API_KEY` → Your Stripe secret API key
- `YOUR_INSTAGRAM_BUSINESS_ACCOUNT_ID` → Instagram Business Account ID
- `YOUR_INSTAGRAM_ACCESS_TOKEN` → Instagram Graph API access token
- `YOUR_TIKTOK_ACCESS_TOKEN` → TikTok API access token

---

## Error Handling & Notes

### Approval Workflows
- Product Drop and Content Calendar workflows pause for manual approval
- Team members approve via Telegram bot replies
- Set appropriate wait timeouts based on team response time

### Error Logging
- Check n8n execution logs for API failures
- Common issues:
  - Invalid API tokens (regenerate and update)
  - Webhook URLs not configured in Shopify
  - Notion database filters not matching
  - Rate limiting on OpenAI API

### Notifications
- All critical steps send Telegram notifications
- Approvals required for content going live
- Rejections allow for revision before retry

---

## Customization Guide

### Modify Approval Workflows
Edit the "Wait" node duration and Telegram messages for your team's needs

### Change Schedule Times
- Content Calendar: Edit "Daily Cron 9 AM CET" → adjust `triggerAtHour` and `triggerAtMinute`
- Analytics Digest: Edit "Weekly Cron Monday 8 AM CET" → adjust day and time

### Customize AI Prompts
Edit the "messages" parameter in OpenAI API calls for different copywriting styles

### Add More Platforms
Content Calendar and Product Drop can post to additional platforms by:
1. Adding more HTTP Request nodes to Buffer
2. Adding additional social API calls in Analytics Digest

### Change Email Triggers
Modify Klaviyo event names and properties in the API calls to match your email flow setup

---

## Support & Maintenance

- Test workflows regularly after Shopify/API updates
- Monitor n8n execution dashboard for failures
- Keep API tokens and credentials secure (use n8n credential manager)
- Update OpenAI prompts seasonally for product drops
- Review Notion template structure when modifying Content Calendar

---

**Created for:** The Green Standard (Golf Accessories Dropship Brand)
**Last Updated:** March 2026
