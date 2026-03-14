# Quick Setup Guide - The Green Standard n8n Workflows

## Step-by-Step Import & Activation

### 1. Prepare Your Credentials
Before importing, gather these:
- Shopify API token
- OpenAI API key
- Klaviyo API key
- Telegram bot token & chat IDs
- Buffer API token
- Notion integration token
- Stripe API key
- Instagram Business Account credentials
- TikTok API credentials

### 2. Import All 4 Workflows
In n8n Cloud:
```
1. Click "Workflows" → "Import from File"
2. Select: product-drop-automation.json
3. Repeat for: content-calendar-engine.json, abandoned-cart-recovery.json, weekly-analytics-digest.json
```

### 3. Configure Credentials (Per Workflow)

#### All Workflows Need:
- Telegram API (Bot token)

#### Product Drop & Content Calendar Need:
- OpenAI API key
- Telegram API (Chat IDs)
- Klaviyo API key
- Buffer API token

#### Abandoned Cart Needs:
- Shopify API token
- Klaviyo API key

#### Analytics Digest Needs:
- Shopify API token
- Stripe API key
- Instagram API credentials
- TikTok API credentials
- Telegram API

### 4. Set Up Shopify Webhooks (For Event-Driven Workflows)

**For Product Drop Automation:**
```
Shopify Admin → Settings → Apps and Integrations → Webhooks
Event: Product Updated (or Created)
URL: Copy from n8n webhook → Shopify Product Webhook node
Topic: products/create, products/update
```

**For Abandoned Cart Recovery:**
```
Event: Cart Updated
URL: Copy from n8n webhook → Shopify Cart Update Webhook node
Topic: carts/update
```

### 5. Create Telegram Bot & Chat

1. Message @BotFather on Telegram
2. `/newbot` → Follow prompts → Get bot token
3. Add bot to your channel/group
4. Get chat ID:
   - Send message: `/start`
   - Check n8n execution logs or use: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`

### 6. Set Up Notion Content Calendar (Optional but Recommended)

**Create database with these properties:**
- Title (Text)
- PublishDate (Date)
- ContentBrief (Rich Text)
- Platform (Select: Instagram, TikTok, LinkedIn, Facebook)
- Tone (Select: Professional, Casual, Energetic, Humorous)
- Status (Select: Scheduled, Published, Rejected, Paused)

### 7. First Test Run

**Product Drop:**
- Create a Shopify product with tag: `drop-ready`
- Check Telegram for approval request
- Reply with ✅ to approve
- Verify email sent in Klaviyo, posts scheduled in Buffer

**Content Calendar:**
- Add item to Notion with today's date
- Workflow runs at 9 AM CET next morning
- (Or manually trigger for testing)

**Abandoned Cart:**
- Add items to Shopify cart but don't checkout
- Wait 1 hour → First email triggers
- Check Klaviyo for event
- (If order placed anytime, flow stops)

**Analytics Digest:**
- Manually trigger Monday morning
- Check Telegram for formatted report
- Verify data from Shopify, Stripe, Instagram, TikTok

### 8. Enable Workflows

After testing each one:
```
Click workflow name → Toggle "Active" to ON
```

---

## Troubleshooting

### Webhook Not Triggering
- Verify webhook URL in n8n matches Shopify setting
- Check Shopify webhook delivery logs
- Ensure webhook is marked "Active" in n8n

### Telegram Messages Not Sending
- Verify bot token is correct
- Check chat ID is valid (should be negative number for groups)
- Ensure bot has permission to send messages to chat

### OpenAI API Errors
- Verify API key starts with `sk-`
- Check OpenAI account has available credits
- Ensure API calls aren't exceeding rate limits

### Missing Notion Data
- Verify database ID in workflow
- Check query filters match your page properties
- Ensure Notion integration token has database access

### Credential Errors
- n8n shows "Missing Credentials" → Click link to create
- For OAuth (Instagram/TikTok) → Complete auth flow
- For API keys → Copy-paste entire key (no spaces)

---

## Regular Maintenance Checklist

- [ ] Monthly: Verify API tokens haven't expired
- [ ] Monthly: Check n8n execution logs for errors
- [ ] Quarterly: Update OpenAI prompts seasonally
- [ ] Quarterly: Review Buffer scheduling efficiency
- [ ] Before major campaigns: Do test run of each workflow
- [ ] As needed: Update Notion template structure

---

## Customization Examples

### Change Approval Chat
Edit each node named "Send to Telegram for Approval" → Change `chatId`

### Adjust Content Calendar Schedule
Edit "Daily Cron 9 AM CET" node:
- Change `triggerAtHour: 9` → your preferred hour
- Change `triggerAtMinute: 0` → your preferred minute
- Change `timezone: "Europe/Berlin"` → your timezone

### Add New Platform to Product Drop
1. Duplicate "Schedule TikTok via Buffer" node
2. Change profile_ids to your platform ID
3. Connect "Approved?" → new node
4. Update node name

### Change Abandoned Cart Email Delays
Edit the "Wait" nodes:
- First: Change `waitTime: 3600` (1 hour in seconds)
- Second: Change `waitTime: 86400` (24 hours)
- Third: Change `waitTime: 172800` (48 hours)

---

## Support Contacts

- **n8n Issues:** n8n Documentation or Community Forum
- **Shopify Webhooks:** Shopify Help Center
- **Telegram Bot Errors:** @BotFather or check API limits
- **API Rate Limits:** Check respective service's dashboard

---

## File Manifest

- `product-drop-automation.json` - 12 KB - Shopify webhook to content distribution
- `content-calendar-engine.json` - 11 KB - Daily Notion sync to Buffer
- `abandoned-cart-recovery.json` - 14 KB - Automated recovery emails (3-stage)
- `weekly-analytics-digest.json` - 9 KB - Monday morning analytics summary
- `README.md` - Comprehensive documentation
- `QUICK_SETUP.md` - This file

---

**Setup Time: ~30 minutes (with credentials ready)**
**Active Automation: 4 complete workflows**
**Monthly Execution Est.: 1000+ runs (varies by traffic)**

Ready? Start importing! 🚀
