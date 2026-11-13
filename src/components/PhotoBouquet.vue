<script setup>
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { config } from '../config'

const viewer = ref(null)
const selected = ref(null)
const placements = [
  [20, 18, -28], [40, 11, -10], [61, 11, 10], [81, 18, 28],
  [14, 37, -34], [36, 32, -13], [65, 32, 13], [86, 37, 34],
  [39, 49, -12], [64, 49, 12],
]
function show(photo) {
  selected.value = photo
  viewer.value.showModal()
}
</script>

<template>
  <div class="bouquet-gift">
    <p class="label bouquet-message">Surprise, Keylong!</p>
    <div class="bouquet" aria-label="Buket berisi foto-foto Kyla">
      <div class="tissue tissue-left" aria-hidden="true" />
      <div class="tissue tissue-right" aria-hidden="true" />
      <div class="stems" aria-hidden="true"><i v-for="n in 7" :key="n" :style="{ '--angle': `${(n - 4) * 9}deg` }" /></div>
      <button v-for="(photo, i) in config.kenangan" :key="photo.foto" class="photo-flower" :style="{
        left: `${placements[i][0]}%`, top: `${placements[i][1]}%`, '--rotation': `${placements[i][2]}deg`, '--delay': `${i * 65}ms`, zIndex: i + 2,
      }" :aria-label="`Lihat foto: ${photo.caption}`" @click="show(photo)">
        <img :src="photo.foto" :alt="photo.caption" />
        <span aria-hidden="true">✦</span>
      </button>
      <div class="paper paper-back" aria-hidden="true" />
      <div class="paper paper-front" aria-hidden="true" />
      <div class="ribbon" aria-hidden="true"><i /><i /><b /></div>
      <span class="gift-tag">Untuk Kyla ✦</span>
    </div>
    <p class="bouquet-hint">Buketnya isinya kamu semua wkwk.<br />Klik fotonya buat lihat lebih dekat.</p>
    <dialog ref="viewer" class="photo-viewer" @click="event => { if (event.target === viewer) viewer.close() }">
      <button class="close" aria-label="Tutup foto" @click="viewer.close()"><X :size="22" /></button>
      <img v-if="selected" :src="selected.foto" :alt="selected.caption" />
      <p>{{ selected?.caption }}</p>
    </dialog>
  </div>
</template>

<style scoped>
.bouquet-gift { width: min(100%, 480px); justify-self: center; text-align: center; animation: gift-arrive .8s var(--ease) both; }
.bouquet-message { color: #ad4775; margin-bottom: 22px; }
.bouquet { position: relative; width: 100%; aspect-ratio: .92; }
.tissue { position: absolute; top: 9%; width: 70%; height: 82%; background: #f3d8e8; border: 1px solid #fff8; clip-path: polygon(0 0, 100% 10%, 60% 100%, 36% 100%); }
.tissue-left { left: 0; rotate: -12deg; background: linear-gradient(120deg, #fff5fa, #ebc1da); }
.tissue-right { right: 0; rotate: 12deg; background: linear-gradient(-120deg, #efe5ff, #d3b9e4); }
.stems { position: absolute; left: 50%; top: 28%; height: 58%; }
.stems i { position: absolute; bottom: 0; height: 100%; width: 3px; background: #7eaa8a; transform-origin: bottom; rotate: var(--angle); }
.photo-flower { position: absolute; width: 23%; aspect-ratio: .8; padding: 5px 5px 15px; border: 1px solid #f0d9e3; border-radius: 5px; background: #fffcf8; box-shadow: 0 5px 12px #68365a26; transform: translate(-50%, -50%) rotate(var(--rotation)); animation: photo-bloom .7s var(--ease) both; animation-delay: var(--delay); transition: scale .25s, box-shadow .25s; }
.photo-flower img { width: 100%; height: 100%; display: block; object-fit: cover; border-radius: 2px; }
.photo-flower span { position: absolute; bottom: 0; left: 0; right: 0; color: #c58ba6; font-size: 11px; }
.photo-flower:hover, .photo-flower:focus-visible { scale: 1.16; z-index: 20 !important; box-shadow: 0 8px 22px #68365a40; }
.paper { position: absolute; z-index: 14; pointer-events: none; }
.paper-back { inset: 49% 12% 0; background: linear-gradient(115deg, #edbfd6, #f7dfeb 48%, #d1b4dd); clip-path: polygon(0 0, 50% 25%, 100% 0, 68% 100%, 30% 100%); }
.paper-front { inset: 55% 17% 0; background: linear-gradient(130deg, #fff3f7 2%, #e7abc8 53%, #f5d4e3 54%, #d9b6e2); clip-path: polygon(0 0, 53% 25%, 100% 0, 70% 100%, 31% 100%); }
.ribbon { position: absolute; top: 76%; left: 50%; width: 30%; height: 15%; translate: -50% 0; z-index: 15; pointer-events: none; }
.ribbon i { position: absolute; width: 55%; height: 42%; border: 6px solid #ad5e8c; border-radius: 70% 20% 50% 30%; background: #cf8bb0; rotate: 15deg; }
.ribbon i:nth-child(2) { right: 0; scale: -1 1; }
.ribbon::before, .ribbon::after { content: ''; position: absolute; top: 24%; left: 35%; width: 22%; height: 90%; background: linear-gradient(90deg, #a75a88, #cf8bb0); rotate: 22deg; clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%); }
.ribbon::after { left: 50%; rotate: -22deg; }
.ribbon b { position: absolute; top: 13%; left: 43%; width: 17%; height: 35%; background: #b86c97; border-radius: 4px; }
.gift-tag { position: absolute; z-index: 16; left: 51%; top: 87%; background: #fff9ef; padding: 6px 10px; border-radius: 3px; rotate: -12deg; color: #925570; font-family: var(--serif); font-size: clamp(12px, 2vw, 19px); box-shadow: 0 2px 4px #68365a15; pointer-events: none; }
.bouquet-hint { margin-top: 20px; color: var(--ink-soft); font-size: .75rem; line-height: 1.8; }
.photo-viewer { margin: auto; padding: 18px; width: min(92vw, 780px); max-height: 92svh; border: 1px solid #f0d9e3; border-radius: 18px; background: #fff8fb; color: var(--ink); }
.photo-viewer::backdrop { background: #302032b8; }
.photo-viewer img { display: block; max-width: 100%; max-height: 72svh; width: auto; margin: 22px auto 12px; object-fit: contain; border-radius: 8px; }
.photo-viewer p { text-align: center; font-size: .85rem; }
.close { position: absolute; right: 10px; top: 10px; display: grid; place-items: center; background: #fff8fb; border-radius: 50%; width: 36px; height: 36px; }
@keyframes gift-arrive { from { opacity: 0; transform: translateY(30px) scale(.88); } }
@keyframes photo-bloom { from { opacity: 0; transform: translate(-50%, 70%) rotate(0deg) scale(.3); } }
@media (max-width: 760px) { .bouquet-gift { order: -1; } }
@media (prefers-reduced-motion: reduce) { .bouquet-gift, .photo-flower { animation: none; } }
</style>
