<script setup>
import PartyBackdrop from './PartyBackdrop.vue'
import PartyCats from './PartyCats.vue'
import confetti from 'canvas-confetti'
import { Sparkles } from 'lucide-vue-next'
import { config } from '../config'


function celebrate() {
  const colors = ['#ed6b9b', '#9b78db', '#57bfa5', '#ffcd57', '#ff936c']
  const end = Date.now() + 1200
  const frame = () => {
    const opts = { colors, particleCount: 3, spread: 55, scalar: 0.8, shapes: ['circle'] }
    confetti({ ...opts, angle: 60, origin: { x: 0, y: 0.8 } })
    confetti({ ...opts, angle: 120, origin: { x: 1, y: 0.8 } })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
</script>

<template>
  <footer class="closing">
    <PartyBackdrop />
    <div class="wrap">
      <p class="label" v-reveal>Udah, segitu dulu</p>
      <h2 class="serif big" v-reveal="100">Selamat ultah,<br /><em>{{ config.nama }}.</em></h2>
      <div class="actions" v-reveal="200">
        <button class="btn" @click="celebrate">Ramein lagi <Sparkles class="arrow" :size="16" /></button>
      </div>
    </div>
    <PartyCats />
    <div class="wrap meta">
      <span class="label">Dibikinin {{ config.dari }} buat {{ config.nama }}</span>
      <span class="label">{{ config.tanggal }}</span>
    </div>
  </footer>
</template>

<style scoped>
.closing {
  position: relative; isolation: isolate;
  min-height: 100svh;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: clamp(6rem, 14vw, 10rem) 0 2rem;
  background: radial-gradient(ellipse at 15% 85%, #ffd8a9, transparent 55%), radial-gradient(ellipse at 90% 20%, #e1d3ff, transparent 60%), #ffe6ed;
}
.big { font-size: clamp(4rem, 13vw, 11rem); line-height: 0.9; letter-spacing: -0.02em; margin: 1.5rem 0 3rem; }
.actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.meta { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-top: 4rem; }
.wrap { position: relative; z-index: 1; }
</style>

