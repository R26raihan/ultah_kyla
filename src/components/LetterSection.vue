<script setup>
import { config } from '../config'
</script>

<template>
  <section class="letter">
    <div class="wrap grid">
      <aside v-reveal>
        <p class="label">02 — Dari gua</p>
      </aside>
      <div class="body">
        <p v-for="(p, i) in config.pesan" :key="i" v-reveal :class="i === 0 ? 'lead serif' : 'para'">
          {{ p }}
        </p>
        <p class="sign" v-reveal>
          <span class="label">Dari,</span>
          <span class="serif"><em>{{ config.dari }}</em></span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.letter { background: #f1eaff; --accent: #7850a8; padding: clamp(6rem, 14vw, 10rem) 0; border-bottom: 1px solid var(--line); }
.grid { display: grid; grid-template-columns: 1fr 2.4fr; gap: 3rem; }
aside { position: sticky; top: 2rem; align-self: start; }
.lead { font-size: clamp(2.2rem, 5vw, 3.8rem); line-height: 1.05; margin-bottom: 3rem; }
.para { font-size: clamp(1.05rem, 1.6vw, 1.25rem); line-height: 1.75; color: var(--ink-soft); max-width: 58ch; margin-bottom: 1.5rem; font-weight: 300; }
.sign { margin-top: 3.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
.sign .serif { font-size: 2.4rem; }
@media (max-width: 760px) {
  .grid { grid-template-columns: 1fr; gap: 2rem; }
  aside { position: static; }
}
</style>
