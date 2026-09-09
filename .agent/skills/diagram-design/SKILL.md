---
name: diagram-design
description: "Expert guide for designing visual architecture diagrams, sequence flows, ERDs, state machines, and data pipelines using Mermaid.js and clean ASCII art. Use whenever illustrating system architectures, designing complex features, or communicating structural workflows."
---

# Diagram Design & Visual Modeling Skill

This skill guides the design, construction, and embedding of technical diagrams in documentation, plans, and walkthroughs.

## When to Use
- Designing new features or modules before implementation.
- Explaining data pipelines, microservices, or API integrations.
- Documenting database schemas (Entity-Relationship models).
- Modeling asynchronous state transitions or user authentication flows.

## Core Principles
1. **Clarity Over Clutter**: Maximum 7-10 nodes per diagram. If more are needed, break into sub-diagrams.
2. **Standard Orientations**:
   - Left-to-Right (`flowchart LR`) for pipelines, data feeds, and timeline steps.
   - Top-to-Bottom (`flowchart TD`) for hierarchies, tier architectures, and decision trees.
3. **Escaping & Labels**:
   - Always quote labels containing special characters: `client["Client (Next.js)"]`.
   - Never use raw HTML tags inside node text.
4. **Style Consistency**:
   - Group related components with `subgraph`.
   - Use standardized accent colors for external services, databases, and client boundaries.

## Common Diagram Templates

### 1. Web Architecture (Frontend / API / Backend / Storage)
```mermaid
flowchart TD
    subgraph Client["Client Tier"]
        UI["Next.js App Router"]
        Store["State / LocalStorage"]
    end

    subgraph API["API & Middlewares"]
        Edge["Edge Middleware (Robots / Auth)"]
        ServerActions["Server Actions / Route Handlers"]
    end

    subgraph External["External Services"]
        TMDB["TMDB API"]
        StreamSrc["Streaming Server / CDN"]
    end

    UI --> Edge --> ServerActions
    ServerActions --> TMDB
    UI --> StreamSrc
```

### 2. Sequence Diagram (Async Request / Auth Flow)
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant App as Next.js Client
    participant Server as Server Action
    participant Ext as Third-Party API

    User->>App: Clicks Watch Now
    App->>Server: Request Movie Metadata & Source
    Server->>Ext: Fetch TMDB details & streams
    Ext-->>Server: JSON (Details, Videos)
    Server-->>App: Sanitized embed URL & cast
    App->>User: Render player & stream playback
```

### 3. State Transition (Media Player Lifecycle)
```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Loading: Select Title
    Loading --> Playing: Stream Ready
    Loading --> Error: Source Blocked / 404
    Error --> Loading: Try Fallback Server
    Playing --> Paused: User Pause
    Paused --> Playing: Resume
    Playing --> Finished: End of Media
    Finished --> [*]
```
