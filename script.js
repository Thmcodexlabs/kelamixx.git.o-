
    /* Menü Açma */
    const openBtn = document.getElementById("openMenu");
    const closeBtn = document.getElementById("closeMenu");
    const panel = document.getElementById("menuPanel");
    const menuItems = document.querySelectorAll(".menu-item"); // DEĞİŞTİRİLDİ
    const nums = document.querySelectorAll(".menu-num");
    const social = document.getElementById("socialArea");

    openBtn.addEventListener("click", () => {
      gsap.to(panel, { right: 0, duration: .8, ease: "power3.out" });

      gsap.fromTo(menuItems, { opacity: 0, y: 40 },  // DEĞİŞTİRİLDİ
        { opacity: 1, y: 0, stagger: .12, duration: .6, delay: .2 });

      gsap.fromTo(nums, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: .12, duration: .6, delay: .3 });

      gsap.fromTo(social, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: .6, delay: .7 });

      document.querySelector(".menu-plus").style.transform = "rotate(45deg)";
    });

    /* MENU KAPATMA */
    closeBtn.addEventListener("click", () => {
      gsap.to(panel, { right: "-100%", duration: .7, ease: "power3.inOut" });
      document.querySelector(".menu-plus").style.transform = "rotate(0deg)";
    });

    /* PARALLAX */
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll("[data-parallax-layers]").forEach((trigger) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "0% 0%",
          end: "100% 0%",
          scrub: true
        }
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((obj) => {
        tl.to(trigger.querySelector(`[data-parallax-layer="${obj.layer}"]`),
          { yPercent: obj.yPercent, ease: "none" }, "<");
      });
    });

    /* SAAT */
    const CONFIG = {
      timeZone: "Europe/Zagreb",
      timeUpdateInterval: 1000
    };

    class TimeDisplay {
      constructor(elementId) {
        this.element = document.getElementById(elementId);
      }
      start() {
        this.updateDisplay();
        setInterval(() => this.updateDisplay(), CONFIG.timeUpdateInterval);
      }
      updateDisplay() {
        const { hours, minutes, dayPeriod } = this.getCurrentTime();
        this.element.innerHTML = `${hours}<span class="time-blink">:</span>${minutes} ${dayPeriod}`;
      }
      getCurrentTime() {
        const now = new Date();
        const options = {
          timeZone: CONFIG.timeZone,
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const parts = formatter.formatToParts(now);

        return {
          hours: parts.find((p) => p.type === "hour").value,
          minutes: parts.find((p) => p.type === "minute").value,
          dayPeriod: parts.find((p) => p.type === "dayPeriod").value
        };
      }
    }








    const textEl = document.getElementById("kelamixText");
    const text = textEl.innerText.trim();
    textEl.innerHTML = "";

    // Harfleri span yap
    text.split("").forEach((ch) => {
      const span = document.createElement("span");
      span.classList.add("blur-letter");
      span.textContent = ch;
      textEl.appendChild(span);
    });

    const letters = document.querySelectorAll(".blur-letter");

    // Ekrana gelince animasyon çalışsın
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateLetters();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(textEl);

    // Animasyon fonksiyonu
    function animateLetters() {
      letters.forEach((letter, index) => {
        const delay = index * 120;

        setTimeout(() => {
          letter.animate(
            [
              { opacity: 0, filter: "blur(10px)", transform: "translateY(-40px)" },
              { opacity: 0.5, filter: "blur(5px)", transform: "translateY(5px)" },
              { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }
            ],
            {
              duration: 700,
              easing: "ease-out",
              fill: "forwards"
            }
          );
        }, delay);
      });
    }






    // 1. AÇILIR KAPANIR HİKAYE FONKSİYONU
    function toggleStory() {
      const story = document.getElementById('story');
      const btn = document.getElementById('toggleBtn');
      const btnText = btn.querySelector('span');
      const btnIcon = btn.querySelector('svg');

      if (story.classList.contains('open')) {
        story.classList.remove('open');
        btnText.innerText = "Daha Fazlasını Gör";
        btnIcon.style.transform = "rotate(0deg)";
      } else {
        story.classList.add('open');
        btnText.innerText = "Küçült";
        btnIcon.style.transform = "rotate(180deg)";
      }
    }

    // 2. PARALAKS EFEKTİ (MOUSE TRACKING)
    const section = document.getElementById('visualSection');
    const wrapper = document.getElementById('circleWrapper');
    const image = document.getElementById('heroImage');

    section.addEventListener('mousemove', (e) => {
      const { width, height } = section.getBoundingClientRect();
      const mouseX = (e.clientX - section.offsetLeft) / width - 0.5;
      const mouseY = (e.clientY - section.offsetTop) / height - 0.5;

      // Çember hafif hareket eder
      wrapper.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;

      // Resim zıt yöne daha fazla hareket ederek derinlik verir
      image.style.transform = `scale(1.35) translate(${mouseX * -50}px, ${mouseY * -20}px)`;
    });

    // Mouse çıkınca resetleme
    section.addEventListener('mouseleave', () => {
      wrapper.style.transform = `translate(0, 0)`;
      image.style.transform = `scale(1.35) translateY(10px)`;
    });




    function createScrollVelocity(scrollerId, baseVelocityInitial) {
      const scroller = document.getElementById(scrollerId);

      // Sonsuz döngü için içerik ikiye katlanır
      scroller.innerHTML += scroller.innerHTML;

      let baseVelocity = baseVelocityInitial;
      let baseX = 0;
      let lastScrollY = window.scrollY;
      let velocityFactor = 0;
      let direction = baseVelocity > 0 ? 1 : -1;

      function wrap(min, max, v) {
        const range = max - min;
        return ((v - min) % range + range) % range + min;
      }

      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        const diff = currentScroll - lastScrollY;

        velocityFactor = diff * 0.02;
        lastScrollY = currentScroll;

        if (velocityFactor > 0) direction = 1;
        else if (velocityFactor < 0) direction = -1;
      });

      function animate() {
        let moveBy = direction * baseVelocity * 0.016;
        moveBy += direction * (Math.abs(velocityFactor) * 50);

        baseX += moveBy;

        const width = scroller.scrollWidth / 2;
        const x = wrap(-width, 0, baseX);

        scroller.style.transform = `translateX(${x}px)`;

        requestAnimationFrame(animate);
      }

      animate();
    }

    // 1. satır normal hız → sağa doğru
    createScrollVelocity("scrollVel1", 100);

    // 2. satır ters yönde → sola doğru
    createScrollVelocity("scrollVel2", -100);




    const left = document.querySelector(".left-image");
    const img = document.querySelector(".left-image img");
    const circle = document.querySelector(".circle-bg");

    left.addEventListener("mousemove", (e) => {
      const rect = left.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const moveX = (x - rect.width / 2) / 20;
      const moveY = (y - rect.height / 2) / 20;

      img.style.transform = `translate(${moveX}px, ${moveY}px)`;
      circle.style.transform = `translate(calc(-50% + ${moveX / 2}px), calc(-50% + ${moveY / 2}px))`;
    });

    left.addEventListener("mouseleave", () => {
      img.style.transform = "translate(0, 0)";
      circle.style.transform = "translate(-50%, -50%)";
    });