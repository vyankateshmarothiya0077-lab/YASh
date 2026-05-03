# Graph Report - .  (2026-04-30)

## Corpus Check
- 1 files · ~1,143,048 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 16 nodes · 29 edges · 3 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `initPage()` - 11 edges
2. `__agentDebugLog()` - 5 edges
3. `__agentAuditImageVisibility()` - 3 edges
4. `__agentAuditLayoutOverlap()` - 3 edges
5. `__agentAuditInteractiveVisibility()` - 3 edges
6. `injectNav()` - 3 edges
7. `getNavEmblem()` - 2 edges
8. `injectFooter()` - 2 edges
9. `initNavScroll()` - 2 edges
10. `initScrollReveal()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `initPage()` --calls--> `__agentDebugLog()`  [EXTRACTED]
  assets/js/main.js → assets/js/main.js  _Bridges community 2 → community 1_
- `initPage()` --calls--> `injectNav()`  [EXTRACTED]
  assets/js/main.js → assets/js/main.js  _Bridges community 0 → community 1_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.33
Nodes (3): getNavEmblem(), initScrollReveal(), injectNav()

### Community 1 - "Community 1"
Cohesion: 0.4
Nodes (5): initCardTilt(), initCountUp(), initNavScroll(), initPage(), injectFooter()

### Community 2 - "Community 2"
Cohesion: 0.5
Nodes (4): __agentAuditImageVisibility(), __agentAuditInteractiveVisibility(), __agentAuditLayoutOverlap(), __agentDebugLog()

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initPage()` connect `Community 1` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **Why does `__agentDebugLog()` connect `Community 2` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `injectNav()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._