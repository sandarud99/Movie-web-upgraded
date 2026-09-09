---
name: harness-engineering
description: "Framework and methodologies for building automated test harnesses, agentic evaluation suites, regression guardrails, and deterministic E2E assertions for software systems."
---

# Harness Engineering & Agentic Evaluation Skill

This skill guides the construction of resilient, deterministic test harnesses and evaluation suites.

## Core Pillars of Harness Engineering

### 1. Deterministic Mocking & Sandboxing
- Decouple tests from volatile third-party network APIs by providing fixture data or mock servers.
- Use environment-isolated containers or temporary directories (`scratch/`) for test runs.

### 2. The 3-Tier Test Harness Architecture
1. **Unit Test Harness**: Fast (<50ms per test), isolated component testing (e.g. slug helpers, TMDB response adapters).
2. **Integration Test Harness**: Testing component contracts, server actions, and HTTP endpoints with simulated network responses.
3. **End-to-End (E2E) Browser Harness**: Testing real user journeys via Playwright or Antigravity's `browser_subagent` (e.g. search -> click card -> verify player iframe loads -> check history recorded).

### 3. Regression Guardrails
- Automatically assert exit codes (`$? -eq 0`) and exact stdout patterns.
- Validate build output (`next build`) and linter cleanliness (`next lint`) prior to claiming task completion.
