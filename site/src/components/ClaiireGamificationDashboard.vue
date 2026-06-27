<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGamification, fireBadgeConfetti } from '@diane-winflowz/gamification'
import type { Badge } from '@diane-winflowz/gamification'
import { createClaiireConfig } from '../gamification/config'
import ClaiireBadgeCard from './ClaiireBadgeCard.vue'

const mounted = ref(false)

const config = createClaiireConfig()
config.onBadgeEarned = (badge: Badge) => {
  fireBadgeConfetti()
}

const { reader, streak, badges, progress } = useGamification(config)

const allBadges = computed(() => [...badges.earned.value, ...badges.unearned.value])

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <div v-if="mounted" class="dashboard">
    <!-- Streak -->
    <section class="dashboard-section">
      <h3 class="section-title">Série de lecture</h3>
      <div class="streak-card">
        <span class="streak-fire" :class="{ active: streak.isActive.value }">🔥</span>
        <div class="streak-info">
          <span class="streak-current">{{ streak.currentStreak.value }} jour{{ streak.currentStreak.value > 1 ? 's' : '' }}</span>
          <span class="streak-best">Record : {{ streak.longestStreak.value }} jour{{ streak.longestStreak.value > 1 ? 's' : '' }}</span>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="dashboard-section">
      <h3 class="section-title">Statistiques</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{{ reader.totalRead.value }}</span>
          <span class="stat-label">Pages lues</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ badges.earned.value.length }}</span>
          <span class="stat-label">Badges</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ progress.overall.value.percent }}%</span>
          <span class="stat-label">Progression</span>
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="dashboard-section">
      <h3 class="section-title">
        Badges ({{ badges.earned.value.length }} / {{ allBadges.length }})
      </h3>
      <div class="badges-grid">
        <ClaiireBadgeCard
          v-for="badge in allBadges"
          :key="badge.id"
          :badge="badge"
          :earned="badges.earned.value.some((b) => b.id === badge.id)"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-section {
  padding: 1.25rem;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 0.5rem;
  background: var(--sl-color-bg);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--sl-color-gray-6);
  color: var(--sl-color-text);
}

/* Streak */
.streak-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.streak-fire {
  font-size: 2.5rem;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.streak-fire.active {
  opacity: 1;
}

.streak-info {
  display: flex;
  flex-direction: column;
}

.streak-current {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--sl-color-text);
}

.streak-best {
  font-size: 0.8125rem;
  color: var(--sl-color-gray-3);
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 0.375rem;
  background: var(--sl-color-accent-low);
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--sl-color-accent);
}

.stat-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  color: var(--sl-color-gray-3);
}

/* Badges */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
</style>
