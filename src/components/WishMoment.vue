<script setup>
import { onBeforeUnmount, ref } from 'vue'
import PartyBackdrop from './PartyBackdrop.vue'
import PartyCats from './PartyCats.vue'
import PhotoBouquet from './PhotoBouquet.vue'
import confetti from 'canvas-confetti'
import { Check, Flame } from 'lucide-vue-next'

const blown = ref(false)
const bouquetVisible = ref(false)
let confettiTimer
let bouquetTimer
onBeforeUnmount(() => {
  clearTimeout(confettiTimer)
  clearTimeout(bouquetTimer)
})

function blow() {
  if (blown.value) return
  blown.value = true
  bouquetTimer = setTimeout(() => { bouquetVisible.value = true }, 1000)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const colors = ['#ed6b9b', '#9b78db', '#57bfa5', '#ffcd57', '#ff936c']
  const opts = { colors, ticks: 260, gravity: 0.7, scalar: 0.8, shapes: ['circle'] }
  confetti({ ...opts, particleCount: 90, spread: 100, startVelocity: 38, origin: { y: 0.55 } })
  confettiTimer = setTimeout(() => confetti({ ...opts, particleCount: 50, spread: 140, startVelocity: 25, origin: { y: 0.5 } }), 300)
}
</script>

<template>
  <section class="moment" :class="{ celebrating: blown }">
    <PartyBackdrop />
    <div class="bunting" aria-hidden="true"><i v-for="n in 13" :key="n" /></div>
    <div class="wrap grid">
      <div v-reveal>
        <p class="label">01 — Tiup dulu</p>
        <h2 class="serif title">
          <template v-if="!blown">Mau minta apa,<br /><em>Keylong?</em></template>
          <template v-else>Semoga kesampean.<br /><em>Ini buket buat kamu.</em></template>
        </h2>
        <button class="btn" :disabled="blown" @click="blow">
          {{ blown ? 'Udah ditiup' : 'Tiup lilinnya' }} <Check v-if="blown" class="arrow" :size="16" /><Flame v-else class="arrow" :size="16" />
        </button>
        <p class="party-note" aria-live="polite">{{ blown ? 'Meooow! Semua kucing ikut ngerayain kamu!' : 'Pikirin satu harapan… geng meong udah siap ngerayain!' }}</p>
      </div>

      <PhotoBouquet v-if="bouquetVisible" />
      <button v-else class="candle-wrap" v-reveal="150" :class="{ blown }" :aria-label="blown ? 'Lilin sudah ditiup' : 'Tiup lilin di kue kucing'" :disabled="blown" @click="blow">
        <img class="birthday-cake" src="/characters/cat-birthday-cake.png" alt="" />
        <span class="glow" />
        <span class="flame" />
        <span class="smoke" />
        <span class="wick" />
        <span class="candle" />
      </button>
    </div>
    <div class="wrap cat-celebration">
      <div class="party-trio" aria-hidden="true" />
      <div class="cat-guests"><p class="label">{{ blown ? 'Horeee, selamat ulang tahun!' : 'Tamu pestanya udah kumpul' }}</p><PartyCats /><p class="guest-hint">Psst… klik kucingnya juga!</p></div>
    </div>
  </section>
</template>

<style scoped>
.moment { position: relative; isolation: isolate; overflow: hidden; background: radial-gradient(ellipse at 80% 30%, #f3dcff, transparent 55%), radial-gradient(ellipse at 10% 85%, #ffe1c1, transparent 55%), #fff0e9; --accent: #b44b30; padding: clamp(6rem, 14vw, 10rem) 0 3rem; border-bottom: 1px solid var(--line); }
.wrap { position: relative; z-index: 1; }
.party-note { max-width: 33ch; color: var(--ink-soft); font-size: .8rem; line-height: 1.8; margin-top: 18px; }
.bunting { position: absolute; top: 0; left: -2%; width: 104%; display: flex; justify-content: space-around; border-top: 2px solid #cba6be; transform: rotate(-3deg); transform-origin: left; }
.bunting i { width: clamp(20px, 4vw, 54px); height: clamp(30px, 5vw, 65px); background: #efb0c9; clip-path: polygon(0 0, 100% 0, 50% 100%); }
.bunting i:nth-child(3n) { background: #c8b5e8; }
.bunting i:nth-child(3n + 2) { background: #b7d8c5; }
.cat-celebration { display: flex; align-items: center; justify-content: center; gap: clamp(12px, 4vw, 64px); margin-top: 2rem; }
.party-trio { width: clamp(220px, 32vw, 350px); height: 260px; flex: none; background: url('/characters/cat-party-trio.png') 0 center / 400% auto no-repeat; animation: trio-frames 1.8s steps(1, end) infinite; }
.cat-guests { text-align: center; }
.guest-hint { color: var(--ink-soft); font-size: .7rem; }
.celebrating .party-trio { animation-duration: .8s; }
@keyframes trio-frames { 0%, 100% { background-position-x: 0%; } 25% { background-position-x: 33.333333%; } 50% { background-position-x: 66.666667%; } 75% { background-position-x: 100%; } }
.grid { display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; gap: 3rem; }
.title { font-size: clamp(2.6rem, 6vw, 4.8rem); line-height: 1; margin: 1.5rem 0 2.5rem; }
.btn:disabled { cursor: default; color: var(--accent); border-color: var(--accent); background: none; }

.candle-wrap { position: relative; width: min(100%, 440px); aspect-ratio: 1; justify-self: center; margin-top: 40px; }
.birthday-cake { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
.candle {
  position: absolute; bottom: 70%; left: calc(50% - 9px); width: 18px; height: 64px; border-radius: 3px;
  background: repeating-linear-gradient(155deg, transparent 0 20px, #ffffffa6 20px 33px), linear-gradient(90deg, #c34f87, #ff9bc6 45%, #de6caa); box-shadow: 0 16px 35px #c34f872e;
}
.wick { position: absolute; left: calc(50% - 1px); bottom: calc(70% + 64px); width: 2px; height: 8px; background: #2a2420; }
.flame {
  position: absolute; bottom: calc(70% + 70px); left: 50%;
  width: 22px; height: 54px; margin-left: -11px;
  border-radius: 50% 50% 50% 50% / 65% 65% 35% 35%;
  background: radial-gradient(ellipse at 50% 80%, #fff 0 18%, #ffe6a8 35%, #f3b45b 65%, transparent 72%);
  transform-origin: 50% 90%;
  animation: flicker 2.2s ease-in-out infinite;
  transition: opacity 0.4s, transform 0.5s var(--ease);
}
.glow {
  position: absolute; bottom: 55%; left: 50%; width: 320px; height: 320px; margin-left: -160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(243, 180, 91, 0.28), transparent 65%);
  animation: breathe 3s ease-in-out infinite;
  transition: opacity 1.2s;
}
.smoke {
  position: absolute; bottom: calc(70% + 74px); left: 50%; width: 3px; height: 3px; margin-left: -1.5px;
  border-radius: 50%; box-shadow: 0 0 12px 6px rgba(116, 93, 124, 0.3); opacity: 0;
}
.blown .flame { opacity: 0; transform: scale(0.3) translateY(10px); }
.blown .glow { opacity: 0; }
.blown .smoke { animation: smoke 2.4s ease-out forwards; }

@keyframes flicker {
  0%, 100% { transform: rotate(-1.5deg) scaleY(1); }
  30% { transform: rotate(1.5deg) scaleY(1.05); }
  60% { transform: rotate(-0.5deg) scaleY(0.97); }
}
@keyframes breathe { 50% { transform: scale(1.08); opacity: 0.8; } }
@keyframes smoke {
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(14px, -120px) scale(6); }
}
@media (max-width: 760px) {
  .grid { grid-template-columns: 1fr; text-align: center; }
  .candle-wrap { width: min(100%, 360px); order: -1; }
  .party-note { margin-left: auto; margin-right: auto; }
  .cat-celebration { flex-direction: column; gap: 0; }
  .party-trio { width: 280px; height: 210px; }
}
@media (prefers-reduced-motion: reduce) { .party-trio { animation: none; } }
</style>
