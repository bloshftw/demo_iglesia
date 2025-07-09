// Import Swiper from CDN or npm
// Assuming Swiper is loaded via CDN, no import statement is needed

// Inicializar Swiper (funciona tanto con npm como con CDN)
document.addEventListener("DOMContentLoaded", () => {
  // Verificar si Swiper está disponible
  if (window.Swiper) {
    const campaignSwiper = new window.Swiper(".campaign-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    })
  } else {
    console.error("Swiper no está disponible. Asegúrate de que esté correctamente instalado.")
  }

  // Initialize Hero Background Swiper
  if (window.Swiper) {
    const heroSwiper = new window.Swiper(".hero-swiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 2000,
    })
  }

  // Initialize Meetings Swiper with panoramic effect
  if (window.Swiper) {
    const meetingsSwiper = new window.Swiper(".meetings-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: "coverflow",
      coverflowEffect: {
        rotate: 15,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: ".meetings-next",
        prevEl: ".meetings-prev",
      },
      pagination: {
        el: ".meetings-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          effect: "slide",
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          },
        },
        1024: {
          slidesPerView: 3,
          effect: "slide",
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          },
        },
      },
    })
  }

  // Initialize Community Swiper
  if (window.Swiper) {
    const communitySwiper = new window.Swiper(".community-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".community-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      },
    })
  }

  // Audio Control
  const backgroundMusic = document.getElementById("backgroundMusic")
  const audioToggle = document.getElementById("audioToggle")
  const playIcon = audioToggle.querySelector(".play-icon")
  const pauseIcon = audioToggle.querySelector(".pause-icon")

  let isPlaying = false

  // Auto-play music when page loads (with user interaction)
  document.addEventListener(
    "click",
    () => {
      if (!isPlaying) {
        playMusic()
      }
    },
    { once: true },
  )

  audioToggle.addEventListener("click", () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  })

  function playMusic() {
    backgroundMusic
      .play()
      .then(() => {
        isPlaying = true
        playIcon.classList.add("hidden")
        pauseIcon.classList.remove("hidden")
      })
      .catch((error) => {
        console.log("Error playing audio:", error)
      })
  }

  function pauseMusic() {
    backgroundMusic.pause()
    isPlaying = false
    pauseIcon.classList.add("hidden")
    playIcon.classList.remove("hidden")
  }

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
      }
    })
  }, observerOptions)

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })

  // Form Submission
  const registrationForm = document.getElementById("registrationForm")
  const successModal = document.getElementById("successModal")

  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(registrationForm)
    const data = {}

    // Process regular fields
    for (const [key, value] of formData.entries()) {
      if (key !== "days") {
        data[key] = value
      }
    }

    // Process checkbox group for days
    const selectedDays = []
    const dayCheckboxes = document.querySelectorAll('input[name="days"]:checked')
    dayCheckboxes.forEach((checkbox) => {
      selectedDays.push(checkbox.value)
    })
    data.days = selectedDays

    // Simulate form submission
    console.log("Datos del formulario:", data)

    // Show success modal
    showModal()

    // Reset form
    registrationForm.reset()
  })

  function showModal() {
    successModal.style.display = "block"
    document.body.style.overflow = "hidden"
  }

  // Función global para cerrar modal (necesaria para el onclick en HTML)
  window.closeModal = () => {
    successModal.style.display = "none"
    document.body.style.overflow = "auto"
  }

  // Close modal when clicking outside
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      window.closeModal()
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    const heroBackground = document.querySelector(".hero-background")

    if (hero && heroBackground) {
      const rate = scrolled * -0.5
      heroBackground.style.transform = `translateY(${rate}px)`
    }
  })

  // Add floating animation to floating elements
  function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll(".floating-cross, .floating-dove, .floating-light")

    floatingElements.forEach((element, index) => {
      const randomDelay = Math.random() * 2
      const randomDuration = 4 + Math.random() * 4

      element.style.animationDelay = `${randomDelay}s`
      element.style.animationDuration = `${randomDuration}s`
    })
  }

  // Initialize floating animations
  addFloatingAnimation()

  // Add sparkle effect on hover for cards
  document.querySelectorAll(".campaign-card, .detail-card, .community-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      createSparkles(this)
    })
  })

  function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div")
      sparkle.className = "sparkle"
      sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-gold);
                border-radius: 50%;
                pointer-events: none;
                animation: sparkleAnimation 1s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `

      element.style.position = "relative"
      element.appendChild(sparkle)

      setTimeout(() => {
        sparkle.remove()
      }, 1000)
    }
  }

  // Add sparkle animation CSS
  const sparkleStyle = document.createElement("style")
  sparkleStyle.textContent = `
        @keyframes sparkleAnimation {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
    `
  document.head.appendChild(sparkleStyle)

  // Preload audio
  backgroundMusic.preload = "auto"
  backgroundMusic.volume = 0.3 // Set volume to 30%
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
