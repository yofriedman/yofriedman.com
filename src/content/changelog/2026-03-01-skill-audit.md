---
date: 2026-03-01
---

Audited all 29 Claude Code skills against Anthropic's official skill-building guide. Applied progressive disclosure — extracted sub-agent prompts and templates from the three largest skills into `references/` folders, cutting token load by 40-60% per invocation. Improved description fields with trigger phrases and negative triggers to reduce skill collisions. Then analyzed actual usage across 167 sessions — 14 skills had never been invoked. Cut 8 that were either dead weight or thin wrappers around behavior already in CLAUDE.md. Down from 29 to 21 skills with no lost capability.
