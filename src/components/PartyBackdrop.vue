<script setup>
import { Balloon, Gift, CakeSlice, Candy, Flower2, Sparkles, Star } from 'lucide-vue-next'

const decorations = [
  { icon: Balloon, x: 8, y: 14, size: 48, tilt: -16 },
  { icon: Sparkles, x: 28, y: 8, size: 27, tilt: 12 },
  { icon: Gift, x: 83, y: 13, size: 43, tilt: 15 },
  { icon: Flower2, x: 94, y: 39, size: 32, tilt: -12 },
  { icon: Candy, x: 6, y: 49, size: 36, tilt: -25 },
  { icon: Star, x: 17, y: 75, size: 27, tilt: -14 },
  { icon: CakeSlice, x: 89, y: 77, size: 46, tilt: 12 },
  { icon: Star, x: 70, y: 91, size: 29, tilt: 18 },
  { icon: Flower2, x: 34, y: 92, size: 35, tilt: -10 },
  { icon: Sparkles, x: 76, y: 45, size: 23, tilt: 8 },
]
</script>

<template>
  <div class="party-backdrop" aria-hidden="true">
    <span v-for="(item, i) in decorations" :key="i" class="decoration" :style="{
      left: `${item.x}%`, top: `${item.y}%`, '--tilt': `${item.tilt}deg`,
      '--delay': `${i * -.8}s`, '--duration': `${6 + i * .35}s`,
    }">
      <component :is="item.icon" :size="item.size" :stroke-width="1.4" />
    </span>
  </div>
</template>

<style scoped>
.party-backdrop { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.decoration { position: absolute; display: grid; place-items: center; color: #d27b9e; opacity: .48; transform: translate(-50%, -50%) rotate(var(--tilt)); animation: drift var(--duration) ease-in-out infinite alternate; animation-delay: var(--delay); }
.decoration :deep(svg) { fill: #ffe5ee; filter: drop-shadow(0 3px 0 #ffffffa6); }
.decoration:nth-child(3n) { color: #aa8acb; }
.decoration:nth-child(3n) :deep(svg) { fill: #eee3fc; }
.decoration:nth-child(3n + 2) { color: #c99c53; }
.decoration:nth-child(3n + 2) :deep(svg) { fill: #fff0ce; }
@keyframes drift { to { transform: translate(-50%, calc(-50% - 14px)) rotate(calc(var(--tilt) + 12deg)); } }
@media (max-width: 480px) { .decoration :deep(svg) { width: 28px; height: 28px; } .decoration { opacity: .38; } }
@media (prefers-reduced-motion: reduce) { .decoration { animation: none; } }
</style>
