# Schema.org Types Guide

This guide explains the different Schema.org types available in our Prismic configuration (`schema_org_type`) and when to use each one. Choosing the correct type helps search engines understand our content and prevents categorization errors, potentially leading to better Rich Results in search pages.

## Article vs. WebPage: The Core Distinction

### 1. WebPage (Default / Generic)

- **What it is:** The catch-all category for web content.
- **When to use:** Use this when no other specific type applies.
- **Examples:** Privacy Policy, Terms and Conditions, Cookie Policy, generic confirmation pages, or simple landing pages that don't describe a Product, Service, or Article.

### 2. Article (Generic Parent)

- **What it is:** The parent category for all textual content meant to be read independently.
- **When to use:** For "evergreen" content (content that stays relevant) that is informative but doesn't fit mostly into News or Tech.
- **Examples:** A Case Study describing a project's challenges and solutions, a general whitepaper, or a theoretical guide.

---

## Specific Article Types

Distinguishing between these is crucial for SEO:

### 3. BlogPosting

- **What it is:** Specifically a post within a blog context.
- **Key Trait:** Often has a personal or informal tone, or tells a story.
- **When to use:** For opinion pieces, company culture stories, updates, or "day in the life" content.
- **Examples:** "Our retreat in the mountains", "Why we chose remote work", "Reflections on the past year".

### 4. NewsArticle

- **What it is:** Content reporting on newsworthy events.
- **Key Trait:** Time-sensitive.
- **When to use:** For press releases, official company announcements, or coverage of a recent event. Google may treat these as "Top Stories".
- **Examples:** "Volcanic Minds announces new partnership", "We won the Best Agency Award 2025".

### 5. TechArticle

- **What it is:** Technical content intended for a specialized audience.
- **Key Trait:** Educational, specific, proficiency-oriented.
- **When to use:** **This is critical for us.** Use this for code tutorials, architectural breakdowns, developers' guides, or deep-dives into specific technologies.
- **Examples:** "How to set up Nuxt with Prismic", "A guide to clean architecture in Vue", "Implementing CI/CD pipelines".

---

## Other Structural Types

### 6. Service

- **What it is:** Represents a commercial service provided by the organization.
- **When to use:** For pages that describe what we do and sell. This connects directly to our business offering logic (`makesOffer`).
- **Examples:** "Web Development", "Cloud Strategy", "UX/UI Design".

### 7. CollectionPage

- **What it is:** A page that primarily lists other creative works.
- **When to use:** For index pages.
- **Examples:**
  - The main **Insights** page (listing all articles).
  - The **Portfolio** page (listing all case studies).

### 8. FAQPage

- **What it is:** A page presenting a list of Frequently Asked Questions.
- **When to use:** When the main content is Q&A.
- **Automation Note:** Our system automatically injects this schema if you use an `Accordion` slice on a page. You rarely need to select this manually unless the entire page is _only_ an FAQ.

### 9. AboutPage & ContactPage

- **AboutPage:** Use exclusively for the "About Us" / "Chi Siamo" page.
- **ContactPage:** Use exclusively for the "Contacts" / "Contatti" page.

### 10. Blog

- **What it is:** Represents the _whole blog_ as a section, not a single post.
- **When to use:** Rarely. Usually, `CollectionPage` is better for the list of articles.

---

## Quick Selection Cheat-Sheet

| Content Type                     | Recommended Schema                        |
| :------------------------------- | :---------------------------------------- |
| **Code Tutorial / Dev Guide**    | `TechArticle`                             |
| **Company News / Press Release** | `NewsArticle`                             |
| **Opinion / Story / Update**     | `BlogPosting`                             |
| **Project Case Study**           | `Article` (or `TechArticle` if technical) |
| **Service Description**          | `Service`                                 |
| **Portfolio (Project List)**     | `CollectionPage`                          |
| **Insights (Article List)**      | `CollectionPage`                          |
| **FAQ Page**                     | `FAQPage`                                 |
| **Contact Page**                 | `ContactPage`                             |
| **Partnerships**                 | `WebPage`                                 |
| **Policy / Terms / Misc**        | `WebPage`                                 |
