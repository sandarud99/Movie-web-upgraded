---
name: cybersecurity-audit
description: "Comprehensive cybersecurity audit and hardening skill based on OWASP Top 10 and Anthropic red-team guidelines. Use when reviewing code security, auditing third-party iframes/APIs, preventing secret leakage, validating input sanitization, or checking CSP and HTTP headers."
---

# Cybersecurity Audit & Hardening Skill

This skill provides a rigorous security checklist and automated audit workflow for modern web applications and API services.

## Audit Checklist

### 1. Secrets & Credentials Management
- [ ] No hardcoded API keys, bearer tokens, or database passwords in source code.
- [ ] `.env*` files properly excluded in `.gitignore` and `.dockerignore`.
- [ ] Client-side environment variables prefixed strictly with public scope (e.g. `NEXT_PUBLIC_`) and never contain private credentials.
- [ ] Git commit history checked for accidental credential commits (`git log -S "api_key"`).

### 2. Third-Party Embeds & Iframe Security
- [ ] Third-party iframes (e.g. streaming embeds) explicitly restricted with sandbox flags where appropriate:
  - `allow-scripts allow-same-origin allow-presentation allow-fullscreen`
  - Avoid unrestricted `allow-top-navigation` or `allow-popups-to-escape-sandbox` unless strictly required.
- [ ] Iframe URLs strictly validated against trusted domain patterns (regex or allowlist) before rendering.
- [ ] `referrerPolicy="no-referrer"` or `strict-origin-when-cross-origin` applied to embeds.

### 3. Injection & Input Sanitization
- [ ] Search queries and URL parameters escaped to prevent Cross-Site Scripting (XSS).
- [ ] SQL / NoSQL queries parameterized; zero concatenated queries.
- [ ] Dangerous React patterns audited: `dangerouslySetInnerHTML` only used with strict JSON-LD schemas or DOMPurify.

### 4. HTTP Headers & Transport Security
- [ ] `X-Frame-Options` or CSP `frame-ancestors` configured to prevent clickjacking of your own site.
- [ ] `X-Content-Type-Options: nosniff` enabled.
- [ ] Strict Transport Security (HSTS) active on production domains.
- [ ] Robots & metadata headers verified (`X-Robots-Tag: noindex, nofollow` on non-public / sensitive routes).

### 5. Dependency Vulnerability Audits
Run verification commands:
```bash
npm audit
```
Flag high and critical CVEs immediately.
