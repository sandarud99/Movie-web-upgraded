---
name: scientific-research
description: "Empirical scientific research and hypothesis-testing methodology for complex debugging, algorithmic optimization, performance profiling, and machine learning/data analysis tasks."
---

# Scientific Agent & Empirical Research Skill

This skill enforces a formal scientific method for tackling non-trivial bugs, performance regressions, algorithmic challenges, and complex system behaviors.

## The 5-Phase Scientific Cycle

### 1. Observation & Baseline Measurement
- Document exact symptoms with quantitative metrics (e.g. latency in ms, frame drops, memory consumption in MB, HTTP error percentages).
- Establish an immutable baseline before altering any variables.

### 2. Hypothesis Formulation
- Formulate explicit, testable, and falsifiable hypotheses:
  * *Hypothesis*: "Card hover animations trigger layout thrashing because Framer Motion computes bounding boxes on each re-render."
  * *Null Hypothesis*: "Disabling Framer Motion transforms has no statistically significant effect on scroll FPS."

### 3. Controlled Experimentation
- Change **exactly one variable at a time** (ceteris paribus).
- Keep controls identical across trials.
- Isolate experiments in reproducible scripts or benchmarks under `scratch/`.

### 4. Data Collection & Verification
- Record outputs across multiple runs (minimum 3 trials to eliminate outliers).
- Calculate mean, median, and variance.

### 5. Conclusion & Proof
- Accept or reject the hypothesis based on evidence.
- Document the causal mechanism before applying permanent production changes.
