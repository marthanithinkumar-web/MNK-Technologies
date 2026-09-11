# MNK Technologies — Company Foundation

This document is the operating source of truth for the identity, portfolio and public positioning of MNK Technologies.

## Company identity

- **Name:** MNK Technologies
- **Legal form:** Udyam-registered proprietorship
- **Country:** India
- **Official website:** https://mnktechnologies.onrender.com/
- Do **not** describe the business as “MNK Technologies Pvt. Ltd.”, “MNK Technologies Limited”, an incorporated company, or any other legal form that has not actually been established.

## Mission

Build practical digital tools and intelligent technology that make useful tasks simpler, clearer and more accessible for ordinary people.

## Official product portfolio

### Public Online Service Provider (POSP)
- **Status:** Live
- **Official URL:** https://pospindia.onrender.com
- **Brand relationship:** “Public Online Service Provider — A product of MNK Technologies”
- Independent public-service assistance product. It must not imply that MNK Technologies or POSP is a government department or government website.

### FileWeave
- **Status:** Live
- **Official URL:** https://file-weave.vercel.app
- **Brand relationship:** “FileWeave — A product of MNK Technologies”
- The live release covers the verified browser-first image and PDF workflows described in the FileWeave repository. Office, spreadsheet, presentation, audio and video processing remain future expansion areas until separately released.

### Max
- **Status:** In development
- **Brand relationship while in development:** “Max — by MNK Technologies”
- Do not present Max as generally available until its release status is explicitly changed.

## Portfolio governance

Only products explicitly listed in `company.json` are part of the official MNK Technologies portfolio. Other experiments, repositories, academic work, prototypes or unrelated projects must not automatically be represented as MNK Technologies products.

A product status must use one of these meanings:

- **Live:** publicly released and intended for real users.
- **Testing:** usable for testing/pre-launch validation but not represented as fully finished.
- **In development:** actively being built and not represented as publicly released.
- **Paused:** intentionally not under active development.
- **Retired:** no longer offered as an active product.

Changing a product’s status should update `company.json`, the company website and relevant product branding together.

## Branding rules

- Use **MNK Technologies** as the parent/umbrella brand.
- Keep each product’s own name and identity.
- Do not rename products merely to force the MNK name into the product title.
- Use the approved relationship lines above where applicable.
- Do not use unsupported company suffixes or imply registrations, certifications, partnerships or government affiliations that do not exist.

## Product principles

MNK Technologies products should prioritize:

1. Practical usefulness over feature count.
2. Clear language and obvious next steps.
3. Security and privacy appropriate to the sensitivity of the product.
4. Accessibility and mobile usability.
5. Honest product-status communication.
6. Testing before public-release claims.
7. Minimal collection and exposure of personal data.

## Release standard

Before a product is described as **Live** under MNK Technologies, it should have:

- a stable production URL;
- successful build/test checks appropriate to that product;
- working primary user flows;
- basic security and privacy review;
- clear ownership/branding;
- accurate public status on the MNK Technologies website;
- no known release-blocking defects.

Routine maintenance, future improvements and feature expansion do not prevent a product from being considered Live once these release conditions are met.

## Source-of-truth hierarchy

1. `company.json` — machine-readable company identity and official product portfolio.
2. `COMPANY_FOUNDATION.md` — company rules, positioning and governance.
3. Company website — public-facing representation of the same information.
4. Individual product repositories — product-specific implementation and documentation.

If these disagree, correct the inconsistency rather than allowing multiple competing versions of the company identity or portfolio.
