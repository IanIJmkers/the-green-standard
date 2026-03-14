# The Green Standard — Klaviyo Abandoned Cart Series

## Flow Trigger
Shopify checkout started but not completed

---

## Email 1: Gentle Reminder (Sent 1 hour after abandonment)

**Subject:** you left something on the course
**Preview:** your cart is still waiting.

---

Hey,

Looks like you were checking something out but didn't finish.

No pressure — just wanted to make sure nothing went wrong on our end.

Your cart is still saved:

[DYNAMIC CART CONTENTS BLOCK]

If you had any questions about sizing, shipping, or anything else — just reply to this email. I read every one.

Ian
The Green Standard

**CTA Button:** Complete Your Order →

---

## Email 2: Social Proof (Sent 24 hours after abandonment)

**Subject:** other golfers are loving this
**Preview:** here's why they chose the green standard.

---

Still thinking it over? Fair enough.

Here's what other customers have said:

*"The leather quality is unreal for the price. My carry bag looks better after 3 months than it did new."*

*"Finally, golf gear that doesn't look like it belongs in a corporate tournament."*

*"Simple, clean, exactly what I was looking for. The valuables bag hasn't left my golf bag since it arrived."*

Your cart is still here whenever you're ready:

[DYNAMIC CART CONTENTS BLOCK]

Ian

**CTA Button:** Back to Your Cart →

---

## Email 3: Final Nudge + Discount (Sent 72 hours after abandonment)

**Subject:** 10% off — just this once
**Preview:** we don't do this often.

---

Last email about this, I promise.

We don't run discounts often — the whole point is keeping prices fair from day one. But since you've been thinking about it, here's 10% off your cart. Just this once.

Use code: **STANDARD10**

[DYNAMIC CART CONTENTS BLOCK]

This code expires in 48 hours.

Whatever you decide — thanks for checking us out. The course will be there whenever you're ready.

Ian

**CTA Button:** Use Code & Complete Order →

---

## Setup Notes for Klaviyo

- **Flow type:** Abandoned Cart
- **Trigger:** Shopify Started Checkout (Klaviyo built-in)
- **Exit condition:** Order placed
- **Smart Sending:** ON
- **Discount code:** Generate dynamic single-use codes via Shopify (or use n8n workflow to create codes via Shopify API)
- **Design:** Same template as welcome series — cream background, Inter font, minimal
- **From name:** Ian from The Green Standard
- **UTM tags:** utm_source=klaviyo&utm_medium=email&utm_campaign=abandoned-cart
