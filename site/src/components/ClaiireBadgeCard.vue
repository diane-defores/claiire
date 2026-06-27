<script setup lang="ts">
import type { Badge } from '@diane-winflowz/gamification'

defineProps<{
  badge: Badge
  earned: boolean
}>()
</script>

<template>
  <div class="badge-card" :class="{ earned, locked: !earned }">
    <div class="badge-icon-wrap">
      <span class="badge-icon">{{ badge.icon }}</span>
    </div>
    <div class="badge-info">
      <span class="badge-name">{{ badge.name }}</span>
      <span v-if="earned" class="badge-desc">{{ badge.description }}</span>
      <span v-else class="badge-locked">???</span>
    </div>
  </div>
</template>

<style scoped>
.badge-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 0.5rem;
  background: var(--sl-color-bg);
  transition: transform 0.2s, box-shadow 0.2s;
}

.badge-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}

.badge-card.locked {
  opacity: 0.5;
}

.badge-card.earned {
  border-color: var(--sl-color-accent);
  background: var(--sl-color-accent-low);
}

.badge-icon-wrap {
  font-size: 2rem;
  flex-shrink: 0;
}

.badge-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.badge-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--sl-color-text);
}

.badge-desc {
  font-size: 0.8125rem;
  color: var(--sl-color-text);
  opacity: 0.8;
}

.badge-locked {
  font-size: 0.8125rem;
  opacity: 0.5;
  font-style: italic;
  color: var(--sl-color-gray-3);
}
</style>
