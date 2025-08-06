<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isWhite = ref(true)
const isOpen = ref(false)

const handleScroll = () => {
  isWhite.value = window.scrollY < window.innerHeight - 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isWhite
        ? 'bg-transparent'
        : 'bg-[#1a1a1a] backdrop-blur-md shadow-sm'
    ]"
  >
    <div class="navbar-container w-full max-w-screen-xl xl:max-w-screen-2xl mx-auto py-2 sm:py-1 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-32 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-start justify-start">
        <a href="#home">
        <img 
          src="/img/logo.png" 
          alt="Logo YessyPotLandscape" 
          class="h-10 sm:h-10 md:h-12 lg:h-12 xl:h-14 2xl:h-16"
        />
        </a>
      </div>

      <!-- Menu Desktop -->
      <nav class="desktop-nav hidden md:flex items-center font-semibold navbar-font-10px">
        <a
          v-for="(label, i) in ['About us', 'Galeri', 'Service', 'Rating', 'Contact']"
          :key="i"
          :href="'#' + label.toLowerCase().replace(' ', '')"
          :class="[
            isWhite ? 'text-white' : 'text-white',
            'inline-block hover:text-green-600 transition px-2 py-1'
          ]"
        >
          {{ label }}
        </a>
      </nav>

      <!-- Mobile Button -->
      <button 
        @click="toggleMenu" 
        class="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 sm:h-7 sm:w-7" 
          fill="none"
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round"
            stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isOpen" class="md:hidden flex flex-col font-semibold px-6 sm:px-8 pb-4 navbar-font-10px text-white">
      <a
        v-for="(label, i) in ['About Us', 'Galeri', 'Service', 'Rating', 'Contact']"
        :key="i"
        :href="'#' + label.toLowerCase().replace(' ', '')"
        @click="isOpen = false"
        class="block py-3 hover:text-green-600 border-b border-gray-100 last:border-none"
      >
        {{ label }}
      </a>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');



html {
  scroll-behavior: smooth;
}
body {
  font-family: 'Poppins', sans-serif;
}
</style>
