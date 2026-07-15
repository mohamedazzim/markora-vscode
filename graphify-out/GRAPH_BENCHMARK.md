# Graphify retrieval benchmark

Generated locally on 2026-07-15 from the persisted project graph.

- Naive corpus estimate: ~39,533 tokens (29,650 indexed words)
- Graph: 593 nodes, 632 edges
- Average scoped query: ~1,812 tokens
- Average reduction: 21.8x fewer tokens per query

Representative query reductions:

| Question | Reduction |
| --- | ---: |
| How does authentication work? | 80.4x |
| What is the main entry point? | 12.7x |
| What connects the data layer to the API? | 91.5x |
| What are the core abstractions? | 12.3x |

This measures Graphify's scoped graph traversal against the indexed corpus. It is a retrieval-efficiency estimate, not a claim about model quality.
