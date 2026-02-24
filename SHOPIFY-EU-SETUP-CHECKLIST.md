# Shopify EU Market Setup Checklist

**Store:** The Green Standard
**Admin URL:** https://admin.shopify.com/store/the-green-standard-2
**Target Market:** European Union (EU/EEA)

---

## 1. Store Settings & Localization

### Currency & Payments
- [ ] Set **EUR (Euro)** as primary store currency: *Settings > General > Store currency*
- [ ] Enable **GBP** as secondary currency for UK customers
- [ ] Enable **Shopify Payments** with EU-compatible processor: *Settings > Payments*
- [ ] Add EU payment methods: **iDEAL** (Netherlands), **Bancontact** (Belgium), **SOFORT** (Germany), **Klarna** (Nordics), **Cartes Bancaires** (France)
- [ ] Enable Apple Pay and Google Pay for mobile checkout
- [ ] Ensure PCI DSS compliance (handled by Shopify Payments)

### Languages & Markets
- [ ] Set store language to **English** as primary
- [ ] Consider adding Dutch (NL), German (DE), French (FR) translations via *Settings > Languages*
- [ ] Create an **EU Market** in *Settings > Markets*: include all 27 EU member states
- [ ] Create a **UK Market** separately (post-Brexit customs rules)
- [ ] Set market-specific pricing if needed

### Domain & SEO
- [ ] Connect your custom domain (e.g., thegreenstandard.eu)
- [ ] Enable HTTPS/SSL (automatic with Shopify)
- [ ] Set up `hreflang` tags for language variants
- [ ] Submit sitemap to Google Search Console

---

## 2. Tax & VAT Configuration

### EU VAT Setup
- [ ] Go to *Settings > Taxes and duties*
- [ ] Enable **EU VAT collection**
- [ ] Register for **OSS (One-Stop Shop)** if selling B2C cross-border within EU
- [ ] Enter your VAT registration number (BTW number for NL)
- [ ] Set "All prices include tax" to **ON** (EU standard — prices shown are final)
- [ ] Configure VAT rates per country (standard rates):
  - Netherlands: 21%
  - Germany: 19%
  - France: 20%
  - Spain: 21%
  - Italy: 22%
  - Belgium: 21%

### UK VAT (Post-Brexit)
- [ ] Register for UK VAT if selling over GBP 85,000/year to UK consumers
- [ ] Enable UK duty collection at checkout for orders over GBP 135
- [ ] Display duties/import fees clearly at checkout

---

## 3. Shipping Configuration

### Shipping Zones
- [ ] Create shipping zone: **Netherlands & Belgium** (home market)
  - Standard: 2-3 business days, free over EUR 75
  - Express: next-day delivery option
- [ ] Create shipping zone: **Core EU** (DE, FR, AT, IT, ES, LU)
  - Standard: 3-5 business days, free over EUR 150
  - Express: 2-3 business days
- [ ] Create shipping zone: **Extended EU** (remaining EU states)
  - Standard: 5-7 business days, free over EUR 200
- [ ] Create shipping zone: **United Kingdom**
  - Standard: 5-10 business days (customs may add delay)
  - Note: Duties/taxes may apply

### Shipping Carriers
- [ ] Set up **PostNL** for Netherlands domestic
- [ ] Set up **DHL** or **UPS** for EU-wide shipping
- [ ] Enable order tracking for all shipments
- [ ] Set up return shipping labels (prepaid for EU returns)

---

## 4. Legal & GDPR Compliance

### Required Legal Pages (Already Created in React App)
- [x] **Privacy Policy** — GDPR-compliant, covers data controller info, legal basis, rights
- [x] **Terms of Service** — EU consumer law compliant, includes 14-day withdrawal right
- [x] **Shipping & Returns** — EU return rights, shipping zones, warranty info
- [x] **Cookie Consent Banner** — GDPR/ePrivacy compliant with opt-in/opt-out

### Shopify Admin Actions
- [ ] Go to *Settings > Legal* and add your Privacy Policy text
- [ ] Add Terms of Service text
- [ ] Add Refund Policy text (14-day EU right of withdrawal)
- [ ] Add Shipping Policy text
- [ ] Enable **cookie consent banner** in Shopify (or use the custom React one we built)
- [ ] Add company imprint (Impressum) — required in Germany:
  - Company name: The Green Standard B.V.
  - Registered address
  - KvK (Chamber of Commerce) number
  - BTW (VAT) number
  - Contact email

### GDPR Data Processing
- [ ] Review *Settings > Customer privacy* settings
- [ ] Enable "Collect customer data with consent" option
- [ ] Set up data processing agreement (DPA) with any third-party apps
- [ ] Ensure marketing emails require double opt-in (EU requirement)
- [ ] Set up process for handling data subject access requests (DSARs)

---

## 5. Product Setup

### Product Listings
- [ ] Add all products with complete information:
  - Title, description, images (multiple angles)
  - Price in EUR (inclusive of VAT)
  - Weight (required for accurate shipping calculation)
  - SKU and barcode
  - Product type and tags for filtering
- [ ] Add SEO meta titles and descriptions for each product
- [ ] Set up product collections (Drivers, Irons, Putters, Bags, etc.)
- [ ] Enable inventory tracking

### Product Compliance
- [ ] Ensure product descriptions meet EU consumer information requirements
- [ ] Include material composition where applicable
- [ ] Add CE marking information if applicable to any products
- [ ] Ensure weights are in metric (kg/g) for EU market

---

## 6. Checkout Optimization

### EU Checkout Requirements
- [ ] Enable **guest checkout** (EU best practice)
- [ ] Display VAT-inclusive prices throughout checkout
- [ ] Show clear shipping costs before final confirmation
- [ ] Include 14-day withdrawal notice on order confirmation
- [ ] Add Terms of Service checkbox at checkout
- [ ] Display trusted payment badges (Visa, Mastercard, iDEAL, etc.)

### Customer Communication
- [ ] Customize order confirmation email with EU-required info
- [ ] Set up shipping confirmation with tracking link
- [ ] Create a professional refund notification template
- [ ] Set up abandoned cart recovery emails (GDPR-compliant)

---

## 7. Marketing & Analytics

### GDPR-Compliant Marketing
- [ ] Set up Shopify Email or Klaviyo for email marketing
- [ ] Enable double opt-in for newsletter signups
- [ ] Create an unsubscribe mechanism that works instantly
- [ ] Set up Google Analytics 4 with consent mode
- [ ] Configure Meta Pixel with consent-based tracking

### SEO
- [ ] Install Shopify SEO app or configure manually
- [ ] Set up Google Merchant Center for Shopping ads
- [ ] Submit product feed to Google Shopping (EUR prices)
- [ ] Set up social media profiles (Instagram, Facebook)

---

## 8. Apps & Integrations

### Recommended Shopify Apps for EU
- [ ] **Shopify Markets** (built-in) — multi-currency, multi-language
- [ ] **Langify** or **Weglot** — multi-language translation
- [ ] **Sufio** or **Order Printer** — EU-compliant invoices with VAT
- [ ] **Returns Center** — self-service EU returns portal
- [ ] **Cookie bar / GDPR app** — if not using custom React solution
- [ ] **Klaviyo** — GDPR-compliant email marketing
- [ ] **Judge.me** or **Loox** — product reviews (social proof)

---

## 9. Pre-Launch Checklist

- [ ] Test complete purchase flow (add to cart → checkout → payment → confirmation)
- [ ] Verify EUR pricing displays correctly everywhere
- [ ] Test on mobile devices (responsive checkout)
- [ ] Verify cookie consent banner appears and works
- [ ] Check all legal pages are accessible from footer
- [ ] Test shipping rate calculator for different EU countries
- [ ] Send test order confirmation email
- [ ] Verify Shopify Storefront API connection with React app
- [ ] Run Google PageSpeed test on deployed site
- [ ] Check for broken links and missing images

---

## Quick Reference: EU Consumer Rights

| Right | Requirement |
|-------|------------|
| **Right of Withdrawal** | 14 days from delivery, no reason needed |
| **Legal Guarantee** | 2 years minimum warranty |
| **Price Transparency** | All prices must include VAT |
| **Data Protection** | GDPR compliance mandatory |
| **Cookie Consent** | Opt-in required for non-essential cookies |
| **Dispute Resolution** | Link to EU ODR platform required |

---

*Generated for The Green Standard — February 2026*
