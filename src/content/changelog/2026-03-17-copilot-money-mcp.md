---
date: 2026-03-17
---

Built a custom MCP server that gives Claude Code real-time access to all financial accounts via Copilot Money's undocumented GraphQL API. Balances, credit card utilization, net worth history, spending breakdowns — all queryable as native tools. The CLI existed but didn't expose balances, so we reverse-engineered the schema from the binary and built on top of it.
