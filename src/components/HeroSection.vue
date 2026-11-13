<script setup>
import PartyBackdrop from './PartyBackdrop.vue'
import PartyCats from './PartyCats.vue'
import { Sparkles, PartyPopper } from 'lucide-vue-next'
import { config } from '../config'
</script>

<template>
  <header class="hero">
    <PartyBackdrop />
    <div class="birthday-garland" aria-hidden="true"><i v-for="n in 15" :key="n" /></div>
    <div class="balloon-cluster" aria-hidden="true"><span v-for="n in 3" :key="n" :style="{ '--n': n }" /></div>
    <div class="birthday-confetti" aria-hidden="true"><i v-for="n in 22" :key="n" :style="{ '--n': n }" /></div>
    <div class="wrap top">
      <span class="label">Buat {{ config.nama }}</span>
      <span class="label">{{ config.tanggal }}</span>
    </div>

    <div class="wrap headline">
      <span class="birthday-badge"><Sparkles :size="14" /> It's your day, Keylong <PartyPopper :size="15" /></span>
      <h1 class="serif">
        <span class="line"><span>Happy</span></span>
        <span class="line"><span>Birthday,</span></span>
        <span class="line"><span><em>{{ config.nama }}.</em></span></span>
      </h1>
      <div class="birthday-ribbon"><span>Make a wish</span><i aria-hidden="true">✦</i><span>{{ config.tanggal }}</span></div>
    </div>

    <PartyCats />
    <div class="wrap bottom">
      <p class="intro">Selamat nambah umur, Keylong. Gua bikin ini biar ucapannya nggak cuma lewat chat.</p>
      <span class="label scroll">Scroll <i /></span>
    </div>
  </header>
</template>

<style scoped>
.hero {
  position: relative; isolation: isolate; overflow: hidden;
  background: radial-gradient(ellipse at 100% 20%, #e0d0ff, transparent 60%), radial-gradient(ellipse at 0% 90%, #ffd7b5, transparent 55%), #fff0f5;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5rem 0 2rem;
  border-bottom: 1px solid var(--line);
}
.birthday-garland { position: absolute; top: 0; left: -2%; width: 104%; display: flex; justify-content: space-around; border-top: 2px solid #c392b2; rotate: -2deg; transform-origin: left; pointer-events: none; }
.birthday-garland i { width: clamp(18px, 4vw, 52px); height: clamp(28px, 5vw, 65px); background: #eaa9c2; clip-path: polygon(0 0, 100% 0, 50% 100%); }
.birthday-garland i:nth-child(3n) { background: #bba4de; }
.birthday-garland i:nth-child(3n + 2) { background: #f0cf8b; }
.birthday-badge { display: inline-flex; align-items: center; gap: 9px; padding: 9px 15px; margin: 24px 0 30px; background: #fffaf4c9; border: 1px solid #e3c3d8; border-radius: 999px; font-size: .7rem; color: #a34f7c; letter-spacing: .07em; box-shadow: 0 4px 18px #a34f7c08; }
.birthday-ribbon { display: inline-flex; align-items: center; gap: 15px; background: #f7e4ee; border: 1px solid #e9c9dc; color: #996381; padding: 10px 24px; margin-top: 26px; font-size: .68rem; letter-spacing: .1em; clip-path: polygon(0 0, 100% 0, 97% 50%, 100% 100%, 0 100%, 3% 50%); }
.birthday-ribbon i { font-style: normal; color: #bd91c7; }
.balloon-cluster { position: absolute; right: 7%; top: 24%; width: clamp(100px, 18vw, 240px); height: 280px; pointer-events: none; z-index: 0; }
.balloon-cluster span { position: absolute; left: calc((var(--n) - 1) * 26%); top: calc(mod(var(--n), 2) * 35px); width: 45%; aspect-ratio: .8; border-radius: 49% 49% 47% 47%; background: radial-gradient(ellipse at 30% 25%, #fffb, transparent 30%), linear-gradient(120deg, #efb2cf, #d98cb4); box-shadow: inset -5px -6px 12px #9f5a8a10; animation: balloon-sway 5s ease-in-out infinite alternate; animation-delay: calc(var(--n) * -.8s); }
.balloon-cluster span:nth-child(2) { background: radial-gradient(ellipse at 30% 25%, #fffb, transparent 30%), linear-gradient(120deg, #d5c1f1, #b39bd8); }
.balloon-cluster span:nth-child(3) { background: radial-gradient(ellipse at 30% 25%, #fffb, transparent 30%), linear-gradient(120deg, #f9e4ac, #e5c882); }
.balloon-cluster span::after { content: ''; position: absolute; top: 100%; left: 50%; width: 1px; height: 140px; background: #b18ea1; rotate: calc((2 - var(--n)) * 10deg); transform-origin: top; }
.birthday-confetti { position: absolute; inset: 0; pointer-events: none; }
.birthday-confetti i { position: absolute; left: calc(mod(var(--n) * 37, 98) * 1%); top: calc(mod(var(--n) * 19, 96) * 1%); width: 5px; height: 13px; border-radius: 2px; opacity: .5; background: #c184ac; rotate: calc(var(--n) * 37deg); animation: confetti-drift 6s ease-in-out infinite alternate; animation-delay: calc(var(--n) * -.4s); }
.birthday-confetti i:nth-child(3n) { background: #b6a0d9; }
.birthday-confetti i:nth-child(3n + 2) { background: #d7b66f; }
@keyframes balloon-sway { to { transform: translateY(-15px) rotate(6deg); } }
@keyframes confetti-drift { to { translate: 6px 14px; } }
.top, .bottom { display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; }
h1 { font-size: clamp(4rem, 15vw, 13rem); line-height: 0.88; letter-spacing: -0.02em; }
.line { display: block; overflow: hidden; padding-bottom: 0.06em; }
.line > span { display: inline-block; animation: rise 1.4s var(--ease) both; }
.line:nth-child(2) > span { animation-delay: 0.12s; }
.line:nth-child(3) > span { animation-delay: 0.24s; }
.line:nth-child(1) { color: #7850a8; }
.line:nth-child(2) { padding-left: 12vw; color: #b34b32; }
.intro { max-width: 32ch; color: var(--ink-soft); font-size: 1rem; line-height: 1.6; animation: fade 1.6s 0.6s both; }
.scroll { display: flex; align-items: center; gap: 0.75rem; flex: none; }
.scroll i { display: block; width: 1px; height: 48px; background: var(--line); position: relative; overflow: hidden; }
.scroll i::after {
  content: ''; position: absolute; left: 0; top: -50%; width: 1px; height: 50%;
  background: var(--accent); animation: drip 2s var(--ease) infinite;
}
@keyframes rise { from { transform: translateY(105%); } }
@keyframes fade { from { opacity: 0; } }
@keyframes drip { to { top: 100%; } }
@media (max-width: 640px) {
  .balloon-cluster { top: 13%; right: 3%; opacity: .6; width: 95px; }
  .balloon-cluster span::after { height: 80px; }
  .birthday-ribbon { gap: 8px; padding: 10px 16px; font-size: .58rem; letter-spacing: .05em; }
  .line:nth-child(2) { padding-left: 0; }
  .scroll { display: none; }
}
@media (prefers-reduced-motion: reduce) { .balloon-cluster span, .birthday-confetti i { animation: none; } }
.wrap { position: relative; z-index: 1; }
</style>

