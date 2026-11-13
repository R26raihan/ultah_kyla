import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// v-reveal: fade-up saat elemen masuk layar
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    })
  },
  { threshold: 0.15 }
)

app.directive('reveal', {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = binding.value + 'ms'
    io.observe(el)
  },
  unmounted(el) {
    io.unobserve(el)
  },
})

app.mount('#app')
