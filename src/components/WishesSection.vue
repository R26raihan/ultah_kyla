<script setup>
import { Leaf, TrendingUp, Users, Compass, Star } from 'lucide-vue-next'
import { config } from '../config'

// Ikon dari Lucide (https://lucide.dev/icons) — urutannya mengikuti config.harapan
const icons = [Leaf, TrendingUp, Users, Compass]
</script>

<template>
  <section class="wishes">
    <div class="wrap">
      <p class="label" v-reveal>04 — Buat tahun ini</p>
      <h2 class="serif title" v-reveal="100">Doa gua<br /><em>buat.</em></h2>

      <ol class="list">
        <li v-for="(h, i) in config.harapan" :key="i" v-reveal="i * 80">
          <span class="icon"><component :is="icons[i] || Star" :size="20" :stroke-width="1.5" /></span>
          <h3 class="serif">{{ h.judul }}</h3>
          <p>{{ h.teks }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.wishes { background: #fff5dc; --accent: #a34630; padding: clamp(6rem, 14vw, 10rem) 0; border-bottom: 1px solid var(--line); }
.title { font-size: clamp(2.6rem, 6vw, 4.8rem); line-height: 1; margin: 1.5rem 0 4rem; }
.list li:nth-child(4n + 1) { --wish-color: #a52d65; --wish-bg: #ffe0eb; }
.list li:nth-child(4n + 2) { --wish-color: #6b459c; --wish-bg: #eadeff; }
.list li:nth-child(4n + 3) { --wish-color: #236c59; --wish-bg: #d6f1e5; }
.list li:nth-child(4n + 4) { --wish-color: #a34630; --wish-bg: #ffdfcd; }
.list { list-style: none; border-top: 1px solid var(--line); }
li {
  display: grid; grid-template-columns: 80px 1fr 1.2fr; gap: 2rem; align-items: center;
  padding: 2rem 0; border-bottom: 1px solid var(--line);
  transition: padding 0.5s var(--ease);
}
li:hover { padding-left: 1rem; }
li:hover h3, li:hover .icon { color: var(--accent); border-color: var(--accent); }
.icon {
  width: 48px; height: 48px; border-radius: 50%;
  border: 1px solid transparent; color: var(--wish-color); background: var(--wish-bg);
  display: grid; place-items: center;
  transition: color 0.4s, border-color 0.4s;
}
h3 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); line-height: 1; transition: color 0.4s; }
p { color: var(--ink-soft); line-height: 1.6; font-weight: 300; }
@media (max-width: 760px) {
  li { grid-template-columns: 48px 1fr; gap: 0.75rem 1rem; }
  li p { grid-column: 2; }
}
</style>
