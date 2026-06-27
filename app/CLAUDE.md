# Claiire — Mobile Wellness Companion

## What Is This

Claiire (formerly TMV / Transforme Ma Vie) is a mobile wellness app with an on-device AI companion that helps users overcome addictions, manage mental health, and build positive habits through gamification and predictive intervention.

**Core Philosophy:** Not a tracking app — a combat system disguised as a game. Users fight their demons with real weapons (data, AI, interventions), earn victories (streaks, insights), and level up their lives.

**Key Differentiator:** 100% on-device LLM (llama.rn) = zero API cost, total privacy. This is the cost moat — competitors pay per API call, Claiire doesn't.

## PRD & Specs

- **PRD (source of truth):** `shipflow_data/technical/CLAUDE.md` and `shipflow_data/workflow/` trackers — full product requirements, features, architecture decisions
- **Architecture:** `shipflow_data/technical/CLAUDE.md`
- **Original specs:** `shipflow_data/technical/CLAUDE.md` (historical reference)
- **Project brief:** `shipflow_data/business/` and `shipflow_data/technical/` (historical)

Always refer to the PRD for feature requirements, XP values, architecture decisions (AD-1 through AD-13), and implementation order.

## Quick Reference

**5 Companions (3 at MVP):** Lumo (strategist), Papillon (hype man), Étoile (healer) | Phase 2: Sage (analyst), Aurore (motivator)

**Dual Mode:** Warrior (missions, battles, arsenal, War Room) / Zen (habits, journal, tools, dashboard) — same system, two UI skins

**4 Tabs:** Accueil (Companion) | Missions | War Room | Profil

**Stack:** Expo 55 + TypeScript strict, Expo Router, Rive, Reanimated, Convex, Clerk, llama.rn, Zustand, MMKV, RevenueCat, Sentry

**Critical Constraints:**
- Expo Go incompatible — EAS Dev Build required (rive, llama.rn, mmkv = native modules)
- Zero `any` in TypeScript
- Convex = data source of truth, Zustand = UI only
- Features isolated: never import between feature folders
- Centralized XP engine (AD-4): single `awardXP()` mutation, no feature calculates XP independently
- GDPR deletion day-1 (AD-6): `deleteAllUserData()` tested in CI
- Safe vocabulary only — never use: traitement, thérapie, soigner, diagnostic, sevrage, trouble, maladie, patient

## Implementation Order

1. `convex/schema.ts` + Clerk auth (blocking)
2. `app/_layout.tsx` — providers
3. `app/(auth)/` — login + onboarding
4. `app/(tabs)/_layout.tsx` — navigation
5. `features/tracking/` — core loop
6. `features/gamification/engine/xpEngine.ts`
7. `features/companion/` — Rive + llama.rn
8. `features/analytics/`
9. RevenueCat

## Reference Docs

- `shipflow_data/business/` — project brief and positioning history
- `shipflow_data/technical/` — historical technical reference docs
