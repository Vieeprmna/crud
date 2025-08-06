<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const isVisibleTestimonial = ref(false)
const testimonialTitle = ref(null)

onMounted(async () => {
  await nextTick()

  new Swiper('.testimonialSwiper', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    loop: true,
    speed: 2000, // makin kecil makin cepat
    autoplay: {
      delay: 1500, // biar langsung jalan terus
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    breakpoints: {
      640: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
      1536: { slidesPerView: 5 },
    }
  })

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisibleTestimonial.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )

  if (testimonialTitle.value) {
    observer.observe(testimonialTitle.value)
  }
})
</script>

<template>
  <section
    id="rating"
    class="min-h-screen flex items-center py-16 bg-cover bg-center text-white font-[Poppins]"
    style="background-image: url('/img/poto1 (1).jpg');"
  >
    <div class="w-full max-w-[1600px] mx-auto px-4">
      <div class="text-center mb-12">
        <h2
          ref="testimonialTitle"
          :class="[
            'text-3xl',
            'xl:text-5xl',
            'font-bold',
            isVisibleTestimonial ? 'animate-fadeInLeft' : 'opacity-0'
          ]"
        >
          Kata Mereka Yang Udah Coba
        </h2>
      </div>

      <div class="swiper testimonialSwiper">
        <div class="swiper-wrapper">
          <div
            v-for="(item, i) in [
              { rate: 5, text: 'Saya sangat ramah dan hasilnya sangat memuaskan. Rekomended untuk yang ingin taman rumah rapi.', name: 'Taman Cipaganti' },
              { rate: 4, text: 'Saya bahkan dapat bonus perapihan taman belakang rumah secara gratis, mantap banget pelayanannya!', name: 'Taman UjungBerung' },
              { rate: 4, text: 'Pelayanan cepat banget dan hasilnya memuaskan. Saya benar-benar puas dengan konsep taman tropisnya.', name: 'Taman Cipaku Bandung' },
              { rate: 5, text: 'Pelayanan cepat, ramah, dan hasilnya rapi. Bersih dan terstruktur, sangat direkomendasikan.', name: 'Taman Cipaganti' },
              { rate: 5, text: 'Pelayanan cepat, ramah, dan hasilnya rapi. Bersih dan terstruktur, sangat direkomendasikan.', name: 'Taman Dago' },
              { rate: 5, text: 'Pelayanan cepat, ramah, dan hasilnya rapi. Bersih dan terstruktur, sangat direkomendasikan.', name: 'Taman Cibeunying' },
              { rate: 4, text: 'Pekerjaan cepat dan ramah, hasil rapi. Keluarga senang banget bisa punya taman belakang dengan gaya modern.', name: 'Taman Cipaku Bandung' }
            ]"
            :key="i"
            class="swiper-slide bg-black/40 p-6 rounded-xl backdrop-blur-sm flex flex-col items-center text-center h-auto mx-2 justify-between max-w-xs"
          >
            <div class="flex text-black text-base md:text-xl 2xl:text-2xl gap-1 mb-3">
              {{ '★'.repeat(item.rate) + '☆'.repeat(5 - item.rate) }}
            </div>
            <p class="text-sm md:text-base 2xl:text-lg italic mb-3">{{ item.text }}</p>
            <p class="text-xs md:text-sm 2xl:text-base font-semibold">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-80px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeInLeft {
  animation: fadeInLeft 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
}

.testimonialSwiper::-webkit-scrollbar {
  display: none;
}
</style>
