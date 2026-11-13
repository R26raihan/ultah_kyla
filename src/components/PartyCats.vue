<script setup>
import { onBeforeUnmount, ref } from 'vue'
import confetti from 'canvas-confetti'
defineProps({ scattered: Boolean })
const cats = ['dance', 'balloon', 'cake']
const labels = { dance: 'Ajak kucing oren joget', balloon: 'Sapa kucing pembawa balon', cake: 'Sapa kucing pembawa kue' }
const lines = { dance: ['Meow! Joget yuk!', 'Goyang terus, Kyla!'], balloon: ['Horeee, pesta!', 'Balonnya buat kamu!'], cake: ['Make a wish, Kyla!', 'Ku eh… kue buat kamu!'] }
const reactions = ref({})
const counts = {}
const timers = {}
function react(cat, event) {
  if (reactions.value[cat]) return
  const count = counts[cat] || 0
  reactions.value[cat] = lines[cat][count % 2]
  counts[cat] = count + 1
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const rect = event.currentTarget.getBoundingClientRect()
    confetti({ particleCount: 22, spread: 65, startVelocity: 16, ticks: 70, scalar: .65,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 3) / window.innerHeight },
      colors: ['#d49ac0', '#b8a1df', '#f3cf82', '#a2cdb9'], disableForReducedMotion: true })
  }
  timers[cat] = setTimeout(() => { delete reactions.value[cat] }, 1800)
}
onBeforeUnmount(() => Object.values(timers).forEach(clearTimeout))
</script>

<template>
  <div class="party-cats" :class="{ scattered }">
    <button v-for="cat in cats" :key="cat" class="cat-button" :class="[cat, { excited: reactions[cat] }]" :aria-label="labels[cat]" @click="react(cat, $event)">
      <span class="cat" :style="{ backgroundImage: `url('/characters/cat-${cat}.png')` }" aria-hidden="true" />
      <span class="bubble" role="status">{{ reactions[cat] || '' }}</span>
    </button>
  </div>
</template>

<style scoped>
.party-cats { display: flex; justify-content: center; align-items: flex-end; gap: clamp(12px, 4vw, 60px); padding: 20px 0; pointer-events: none; }
.cat-button { position: relative; flex: none; pointer-events: auto; border-radius: 24px; touch-action: manipulation; }
.cat-button:hover .cat { filter: drop-shadow(0 5px 7px #ba326e35); }
.cat-button.excited { animation: cat-hop .45s ease-in-out 2; z-index: 3; }
.bubble { position: absolute; bottom: 100%; left: 50%; translate: -50% 0; width: max-content; max-width: 150px; padding: 8px 10px; background: #fff9fc; border: 1px solid #e9cbdc; border-radius: 14px; color: var(--accent); font-size: .7rem; line-height: 1.4; box-shadow: 0 4px 12px #745d7c12; }
.bubble:empty { display: none; }
.scattered .dance .bubble { left: 0; translate: 0; }
.scattered .cake .bubble, .scattered .balloon .bubble { left: auto; right: 0; translate: 0; }
@keyframes cat-hop { 50% { transform: translateY(-18px) rotate(-6deg); } }
.cat { display: block; flex: none; width: clamp(82px, 12vw, 144px); aspect-ratio: 3 / 4; background-size: 400% 100%; background-repeat: no-repeat; animation: cat-frames 1.2s steps(1, end) infinite; filter: drop-shadow(0 5px 5px #745d7c12); }
.balloon .cat { animation-duration: 1.6s; animation-delay: -.4s; }
.cake .cat { animation-duration: 2s; animation-delay: -.5s; }
.scattered { position: absolute; inset: 0; z-index: 2; padding: 0; overflow: hidden; }
.scattered .cat-button { position: absolute; }
.scattered .dance { left: 3%; bottom: 5%; }
.scattered .balloon { right: 3%; top: 5%; }
.scattered .cake { right: 3%; bottom: 5%; }
@keyframes cat-frames {
  0% { background-position-x: 0%; }
  25% { background-position-x: 33.333333%; }
  50% { background-position-x: 66.666667%; }
  75% { background-position-x: 100%; }
  100% { background-position-x: 0%; }
}
@media (max-width: 480px) { .scattered .cat { width: 72px; } .scattered .dance, .scattered .cake { bottom: 4%; } }
@media (prefers-reduced-motion: reduce) { .cat { animation: none; } }
</style>
