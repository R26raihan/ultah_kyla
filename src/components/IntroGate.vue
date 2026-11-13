<script setup>
import PartyBackdrop from './PartyBackdrop.vue'
import PartyCats from './PartyCats.vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import confetti from 'canvas-confetti'
import { config } from '../config'
import { Sparkles } from 'lucide-vue-next'

const emit = defineEmits(['open'])
const attempts = ref(0)
const opened = ref(false)
const running = ref(false)
const facingLeft = ref(false)
const frame = ref(0)
let animationTimer
let stopTimer
const playground = ref(null)
const viewport = ref({ width: 0, height: 0 })
const start = ref({ x: 0, y: 0 })
function updateViewport() {
  viewport.value = { width: document.documentElement.clientWidth, height: window.innerHeight }
  const bounds = playground.value?.getBoundingClientRect()
  if (bounds) start.value = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 }
}
onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
  clearInterval(animationTimer)
  clearTimeout(stopTimer)
})
const messages = [
  'Keylong, gua bikinin sesuatu. Buka dulu.',
  'Wkwk, belum kena. Coba lagi.',
  'Sabar, Kyla. Tombolnya emang gua isengin.',
  'Sekali lagi. Abis ini gua diem.',
  'Oke, udah. Buka aja sekarang.',
]
const stops = [{ x: 50, y: 70 }, { x: 88, y: 18 }, { x: 12, y: 78 }, { x: 87, y: 78 }, { x: 50, y: 70 }]
const position = computed(() => {
  const { width, height } = viewport.value
  if (!width) return { visibility: 'hidden' }
  const target = attempts.value === 0 ? start.value : {
    x: width * stops[attempts.value].x / 100,
    y: height * stops[attempts.value].y / 100,
  }
  // Keep the whole character, label and focus ring inside the viewport.
  const padX = Math.min(78, width / 2)
  const padY = Math.min(112, height / 2)
  return {
    left: `${Math.max(padX, Math.min(width - padX, target.x))}px`,
    top: `${Math.max(padY, Math.min(height - padY, target.y))}px`,
  }
})
function catchGift() {
  if (opened.value) return
  if (attempts.value < 4) {
    facingLeft.value = stops[attempts.value + 1].x < stops[attempts.value].x
    attempts.value++
    running.value = true
    frame.value = 1
    clearInterval(animationTimer)
    clearTimeout(stopTimer)
    animationTimer = setInterval(() => { frame.value = frame.value >= 5 ? 1 : frame.value + 1 }, 85)
    stopTimer = setTimeout(() => {
      running.value = false
      frame.value = 0
      clearInterval(animationTimer)
    }, 680)
    return
  }
  opened.value = true
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    confetti({ particleCount: 110, spread: 100, origin: { y: .65 }, colors: ['#ed6b9b', '#9b78db', '#57bfa5', '#ffcd57', '#ff936c'] })
  }
  emit('open')
}
</script>

<template>
  <section class="gate">
    <PartyBackdrop />
    <PartyCats scattered />
    <div class="center">
      <h1 class="serif name fade-2"><em>{{ config.nama }}</em></h1>
      <p class="tease" aria-live="polite" aria-atomic="true">{{ messages[attempts] }}</p>
      <div ref="playground" class="playground" />
      <div class="progress" aria-label="Progres menangkap kelinci">
        <span v-for="n in 4" :key="n" :class="{ done: attempts >= n }" />
      </div>
      <p class="hint">{{ attempts === 4 ? 'Nah, ketangkep! Silakan buka, Keylong.' : 'Klik kelincinya. Eh, jangan kabur dong! ' }}</p>
    </div>
        <button class="runaway" :class="{ ready: attempts === 4, running }" :style="position" @click="catchGift" :aria-label="attempts === 4 ? 'Buka hadiah sekarang' : 'Tangkap kelinci pembawa hadiah'">
          <span class="bunny" :class="{ flipped: facingLeft }" :style="{ backgroundPositionX: `${frame * 20}%` }" aria-hidden="true" />
          <span class="catch-label">{{ attempts === 4 ? 'Buka sekarang' : attempts === 0 ? 'Tangkap aku!' : 'Hehe, sini! ' }}<Sparkles v-if="attempts === 4" :size="13" /></span>
        </button>
    <p class="label foot">{{ config.tanggal }}</p>
  </section>
</template>

<style scoped>
.gate {
  min-height: 100svh; display: grid; place-items: center;
  padding: 3rem 16px 5rem; position: relative; overflow: hidden; isolation: isolate;
  background: radial-gradient(ellipse at 15% 20%, #ffd4e1, transparent 55%), radial-gradient(ellipse at 85% 75%, #d9caff, transparent 55%), radial-gradient(ellipse at 15% 95%, #ffe4b1, transparent 50%), #fff5f8;
}
.center { width: min(100%, 640px); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.2rem; z-index: 1; }
.gift-seal { display: grid; place-items: center; width: 56px; height: 56px; background: #ffffffa6; border: 1px solid #fff; border-radius: 19px; color: var(--accent); animation: seal-bob 4s ease-in-out infinite; }
.name { font-size: clamp(5rem, 18vw, 11rem); line-height: 0.9; animation: name-in 1.4s var(--ease) both; }
.tease { color: var(--ink-soft); font-size: .9rem; line-height: 1.7; min-height: 3.4em; max-width: 38ch; }
.playground { width: 100%; height: 210px; pointer-events: none; }
.runaway { position: fixed; z-index: 5; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; width: 124px; border-radius: 24px; transition: left .68s linear, top .68s linear; -webkit-tap-highlight-color: transparent; }
.bunny { display: block; width: 110px; height: 158px; background-image: url('/characters/bunny-run.png'); background-size: 600% 220px; background-position: 0 center; background-repeat: no-repeat; filter: drop-shadow(0 7px 5px #ba326e12); transform-origin: center; }
.bunny.flipped { transform: scaleX(-1); }
.catch-label { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; padding: 8px 12px; border: 1px solid #ba326e26; border-radius: 999px; background: #fff9fc; color: var(--accent); font-size: .7rem; box-shadow: 0 4px 12px #ba326e0c; }
.ready .catch-label { background: #7952aa; color: white; border-color: transparent; box-shadow: 0 0 0 5px #7952aa19; }
.runaway:not(.running) .bunny { animation: bunny-idle 2.5s ease-in-out infinite; }
@keyframes bunny-idle { 50% { translate: 0 -4px; } }
.progress { display: flex; gap: 8px; }
.progress span { width: 9px; height: 9px; border-radius: 50%; background: #ba326e26; transition: background .3s, transform .3s; }
.progress .done { background: var(--accent); transform: scale(1.25); }
.hint { font-size: .7rem; color: var(--ink-soft); }
.foot { position: absolute; bottom: 1.5rem; left: 0; right: 0; text-align: center; }
.fade-1 { animation: name-in 1.2s var(--ease) both; }
@keyframes seal-bob { 50% { transform: translateY(-8px) rotate(10deg); } }
@keyframes name-in { from { opacity: 0; transform: translateY(24px) rotate(-3deg); } }
@media (max-width: 420px) { .runaway { width: 110px; } .catch-label { font-size: .65rem; padding: 8px; } }
@media (prefers-reduced-motion: reduce) { .bunny { background-position-x: 0% !important; } }
</style>

