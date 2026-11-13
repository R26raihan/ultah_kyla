<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { Calendar, PawPrint, Sparkles } from 'lucide-vue-next'
import { config } from '../config'
const pad = (n) => String(n).padStart(2, '0')
const stolen = ref({})
const visits = ref({})
const timers = new Set()
function steal(i) {
  if (stolen.value[i]) return
  stolen.value[i] = true
  visits.value[i] = (visits.value[i] || 0) + 1
  const timer = setTimeout(() => {
    delete stolen.value[i]
    timers.delete(timer)
  }, 2300)
  timers.add(timer)
}
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <section class="gallery">
    <div class="wrap head">
      <p class="label" v-reveal>03 — Galeri</p>
      <span class="gallery-kicker"><Sparkles :size="16" /> Little moments, all you.</span>
      <h2 class="serif title" v-reveal="100">Kalau jadi bunga,<br /><em>kamu satu buket.</em></h2>
      <p class="gallery-note">Gua simpen senyum-senyum kamu di sini.<br />Klik fotonya, tapi awas… ada meong yang ikut naksir.</p>
    </div>

    <div class="wrap masonry">
      <figure v-for="(k, i) in config.kenangan" :key="k.foto" v-reveal="(i % 3) * 120" :class="{ stolen: stolen[i] }" :style="{ '--tilt': `${[-2, 1.5, -1, 2][i % 4]}deg`, '--peek-delay': `${i * -1.7}s` }">
        <div class="polaroid">
        <span class="tape" aria-hidden="true" />
        <button class="frame" :aria-label="`Ajak kucing main dengan foto ${k.caption}`" @click="steal(i)">
          <img :src="k.foto" :alt="k.caption" loading="lazy" />
          <span class="paw-arm" aria-hidden="true"><i class="toe toe-one" /><i class="toe toe-two" /><i class="toe toe-three" /><i class="paw-pad" /></span>
          <span class="cat-thief" aria-hidden="true"><span class="thief-sprite" /><span class="mini-photo"><img :src="k.foto" alt="" loading="lazy" /></span></span>
          <span class="photo-invite"><PawPrint :size="14" /> Psst… klik aku</span>
        </button>
        <figcaption>
          <span class="label">{{ pad(i + 1) }}</span>
          <span class="cap">{{ k.caption }}</span>
          <span v-if="k.tahun" class="label year"><Calendar :size="12" :stroke-width="1.5" />{{ k.tahun }}</span>
        </figcaption>
        <p class="cat-whisper" role="status">{{ stolen[i] ? 'Meow! Gua pinjem fotonya dulu~' : visits[i] ? 'Nih dibalikin. Lucu banget soalnya.' : 'Satu foto, satu senyum kecil.' }}</p>
        </div>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.gallery { position: relative; background: radial-gradient(ellipse at 0 20%, #f7d8e8, transparent 45%), radial-gradient(ellipse at 100% 75%, #e8dffc, transparent 50%), #fff6f2; --accent: #ad527a; padding: clamp(6rem, 14vw, 10rem) 0; border-bottom: 1px solid var(--line); }
.head { margin-bottom: 4rem; }
.gallery-kicker { display: inline-flex; align-items: center; gap: 8px; color: #af7993; font-size: .72rem; letter-spacing: .1em; margin-top: 24px; }
.gallery-note { color: var(--ink-soft); line-height: 1.9; font-size: .85rem; margin-top: 24px; }
.title { font-size: clamp(2.6rem, 6vw, 4.8rem); line-height: 1; margin-top: 1.5rem; }
.masonry { columns: 3 280px; column-gap: 1.5rem; }
figure { break-inside: avoid; margin-bottom: 2.5rem; padding: 12px 5px; }
.polaroid { position: relative; padding: 13px 13px 18px; border: 1px solid #efdee6; background: #fffdfa; border-radius: 5px; box-shadow: 0 9px 24px #80506d10; rotate: var(--tilt); transition: rotate .35s, box-shadow .35s; }
figure:hover .polaroid, figure:focus-within .polaroid { rotate: 0deg; box-shadow: 0 15px 30px #80506d20; }
.tape { position: absolute; z-index: 2; top: -12px; left: 35%; width: 31%; height: 26px; rotate: -5deg; background: repeating-linear-gradient(90deg, #edc4d68c 0 4px, #f1d5e099 4px 8px); clip-path: polygon(2% 0, 98% 3%, 100% 96%, 0 100%); pointer-events: none; }
.frame { position: relative; display: block; width: 100%; overflow: hidden; background: var(--bg-2); border-radius: 3px; isolation: isolate; }
.frame > img {
  display: block; width: 100%; height: auto;
  transition: transform 1.2s var(--ease), filter 0.8s;
}
figure:hover .frame > img { transform: scale(1.025); }
.photo-invite { position: absolute; bottom: 10px; left: 10px; display: inline-flex; align-items: center; gap: 5px; padding: 6px 9px; background: #fff9f0e8; color: #925771; font-size: .62rem; border-radius: 999px; }
.cat-whisper { font-family: var(--serif); font-style: italic; color: #a16e88; font-size: .95rem; text-align: center; padding-top: 14px; min-height: 2em; }
.paw-arm { position: absolute; right: -110px; top: 35%; width: 125px; height: 54px; border-radius: 45% 20% 20% 45%; background: linear-gradient(#fff2dc, #f2d8b3); border: 2px solid #e9c99f; box-shadow: 0 5px 10px #68365a18; rotate: -15deg; animation: paw-peek 12s ease-in-out infinite; animation-delay: var(--peek-delay); pointer-events: none; }
.toe { position: absolute; width: 13px; height: 15px; border-radius: 50%; background: #e7a8b0; left: 10px; top: 5px; }
.toe-two { left: 25px; top: 1px; }
.toe-three { left: 40px; top: 7px; }
.paw-pad { position: absolute; width: 28px; height: 22px; background: #e7a8b0; border-radius: 45% 45% 50% 50%; left: 20px; top: 23px; }
.cat-thief { position: absolute; bottom: 14%; left: 0; width: 110px; height: 145px; translate: -150% 0; pointer-events: none; }
.thief-sprite { position: absolute; inset: 0; background: url('/characters/cat-dance.png') 0 center / 400% 100% no-repeat; }
.mini-photo { position: absolute; top: 48%; left: 43%; width: 48px; height: 59px; padding: 3px 3px 8px; background: #fffdfa; rotate: 12deg; box-shadow: 0 2px 4px #68365a30; }
.mini-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.stolen .cat-thief { animation: cat-dash 2.3s linear both; }
.stolen .thief-sprite { animation: thief-frames .48s steps(1, end) infinite; }
.stolen .frame > img { animation: photo-tug 2.3s ease-in-out; }
.stolen .paw-arm { animation: none; translate: 120px 0; }
@keyframes paw-peek { 0%, 68%, 100% { translate: 0; } 77%, 88% { translate: -75px 0; } 82% { translate: -65px 5px; } }
@keyframes cat-dash { 0% { left: 0; translate: -150% 0; } 28% { left: 40%; translate: -50% -8px; } 45% { left: 40%; translate: -50% 0; } 100% { left: 100%; translate: 150% -7px; } }
@keyframes thief-frames { 0%, 100% { background-position-x: 0%; } 25% { background-position-x: 33.333333%; } 50% { background-position-x: 66.666667%; } 75% { background-position-x: 100%; } }
@keyframes photo-tug { 25%, 40% { transform: rotate(-3deg) scale(.95); } 55% { transform: rotate(2deg) scale(.98); } }
figcaption {
  display: grid; grid-template-columns: auto 1fr auto; gap: 1rem; align-items: baseline;
  padding-top: 0.9rem; border-top: 1px solid var(--line); margin-top: 0.9rem;
}
.cap { font-size: 0.95rem; }
.year { display: inline-flex; align-items: center; gap: 0.4rem; }
@media (prefers-reduced-motion: reduce) { .paw-arm, .stolen .cat-thief, .stolen .thief-sprite, .stolen .frame > img { animation: none; } .stolen .cat-thief { left: 50%; translate: -50% 0; } }
</style>
