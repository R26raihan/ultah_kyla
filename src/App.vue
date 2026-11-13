<script setup>
import { ref } from 'vue'
import { Volume2, VolumeX } from 'lucide-vue-next'
import IntroGate from './components/IntroGate.vue'
import HeroSection from './components/HeroSection.vue'
import WishMoment from './components/WishMoment.vue'
import LetterSection from './components/LetterSection.vue'
import GallerySection from './components/GallerySection.vue'
import WishesSection from './components/WishesSection.vue'
import ClosingSection from './components/ClosingSection.vue'

const opened = ref(false)
const soundtrack = ref(null)
const musicPlaying = ref(false)
const musicError = ref(false)
const musicStart = 103

function prepareMusic() {
  const audio = soundtrack.value
  if (!audio) return
  audio.volume = .45
  audio.currentTime = musicStart
}

async function playMusic() {
  const audio = soundtrack.value
  if (!audio) return
  musicError.value = false
  try {
    if (audio.readyState >= 1 && audio.currentTime < musicStart) audio.currentTime = musicStart
    await audio.play()
  } catch {
    musicPlaying.value = false
    musicError.value = true
  }
}

function openGift() {
  opened.value = true
  playMusic()
}

function toggleMusic() {
  if (musicPlaying.value) soundtrack.value?.pause()
  else playMusic()
}

function repeatMusic() {
  prepareMusic()
  playMusic()
}
</script>

<template>
  <audio ref="soundtrack" src="/audio/adrian-khalif-2001x.mp3#t=103" preload="metadata" @loadedmetadata="prepareMusic" @play="musicPlaying = true" @pause="musicPlaying = false" @ended="repeatMusic" @error="musicError = true; musicPlaying = false" />
  <Transition name="fade" mode="out-in">
    <IntroGate v-if="!opened" @open="openGift" />
    <main v-else>
      <HeroSection />
      <WishMoment />
      <LetterSection />
      <GallerySection />
      <WishesSection />
      <ClosingSection />
    </main>
  </Transition>
  <button v-if="opened" class="music-toggle" :aria-label="musicPlaying ? 'Jeda musik' : 'Putar musik'" :aria-pressed="musicPlaying" @click="toggleMusic">
    <Volume2 v-if="musicPlaying" :size="18" /><VolumeX v-else :size="18" />
    <span>{{ musicError ? 'Coba putar musik' : musicPlaying ? '2001x ♪' : 'Putar musik' }}</span>
  </button>
</template>

<style scoped>
.music-toggle { position: fixed; right: max(16px, env(safe-area-inset-right)); bottom: max(16px, env(safe-area-inset-bottom)); z-index: 30; display: flex; align-items: center; gap: 8px; padding: 12px 15px; border: 1px solid #e4bfd3; border-radius: 999px; background: #fff8f4ed; color: #a34f7c; box-shadow: 0 5px 20px #68365a18; backdrop-filter: blur(10px); font-size: .72rem; }
.music-toggle:hover { background: #f8e4ee; }
</style>
