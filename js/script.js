document.addEventListener('DOMContentLoaded', function () {

    // ===== BURGER MENU =====
    var burger = document.getElementById('burger');
    var navList = document.getElementById('navList');

    burger.addEventListener('click', function () {
        this.classList.toggle('open');
        navList.classList.toggle('open');
    });

    document.querySelectorAll('.nav-list > li > a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                var parent = this.parentElement;
                if (parent.classList.contains('dropdown')) {
                    parent.classList.toggle('open');
                } else {
                    burger.classList.remove('open');
                    navList.classList.remove('open');
                }
            }
        });
    });

    document.querySelectorAll('.dropdown-menu a').forEach(function (link) {
        link.addEventListener('click', function () {
            burger.classList.remove('open');
            navList.classList.remove('open');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav') && !e.target.closest('.burger')) {
            navList.classList.remove('open');
            burger.classList.remove('open');
        }
    });

    // ===== SLIDER =====
    var sliderTrack = document.getElementById('sliderTrack');
    var slides = document.querySelectorAll('.slider-slide');
    var prevBtn = document.getElementById('sliderPrev');
    var nextBtn = document.getElementById('sliderNext');
    var dotsContainer = document.getElementById('sliderDots');
    var currentSlide = 0;
    var totalSlides = slides.length;
    var isDragging = false;
    var startPos = 0;
    var currentTranslate = 0;
    var prevTranslate = 0;

    function createDots() {
        for (var i = 0; i < totalSlides; i++) {
            var dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.dataset.index = i;
            dot.addEventListener('click', function () {
                goToSlide(parseInt(this.dataset.index));
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;
        var offset = -currentSlide * 100;
        sliderTrack.style.transform = 'translateX(' + offset + '%)';
        currentTranslate = offset;
        prevTranslate = offset;
        document.querySelectorAll('.slider-dot').forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
    nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // Touch / swipe support
    sliderTrack.addEventListener('mousedown', startDrag);
    sliderTrack.addEventListener('touchstart', startDrag);
    sliderTrack.addEventListener('mouseup', endDrag);
    sliderTrack.addEventListener('touchend', endDrag);
    sliderTrack.addEventListener('mouseleave', endDrag);
    sliderTrack.addEventListener('mousemove', drag);
    sliderTrack.addEventListener('touchmove', drag);

    function startDrag(e) {
        isDragging = true;
        sliderTrack.style.transition = 'none';
        startPos = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        prevTranslate = -currentSlide * (sliderTrack.offsetWidth || 900);
        currentTranslate = prevTranslate;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        var currentPos = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        var diff = currentPos - startPos;
        currentTranslate = prevTranslate + diff;
        var slideWidth = sliderTrack.offsetWidth || 900;
        var percent = (currentTranslate / slideWidth) * 100;
        sliderTrack.style.transform = 'translateX(' + percent + '%)';
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        sliderTrack.style.transition = 'transform 0.5s ease';
        var slideWidth = sliderTrack.offsetWidth || 900;
        var movedBy = currentTranslate - prevTranslate;
        var threshold = slideWidth * 0.2;

        if (movedBy < -threshold) {
            goToSlide(currentSlide + 1);
        } else if (movedBy > threshold) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(currentSlide);
        }
    }

    createDots();

    // ===== VIDEO PLAYER =====
    var videoPlaceholder = document.getElementById('videoPlaceholder');
    var videoTag = document.getElementById('videoTag');
    var videoLogoOverlay = document.getElementById('videoLogoOverlay');

    videoPlaceholder.addEventListener('click', function () {
        videoPlaceholder.style.display = 'none';
        videoTag.style.display = 'block';
        if (videoLogoOverlay) videoLogoOverlay.style.display = 'block';
        videoTag.play();
    });

    // ===== MODAL =====
    var modalOverlay = document.getElementById('modalOverlay');
    var modalClose = document.getElementById('modalClose');
    var modalTriggers = document.querySelectorAll('.open-modal-btn');

    function openModal() { modalOverlay.classList.add('open'); }
    function closeModal() { modalOverlay.classList.remove('open'); }

    modalTriggers.forEach(function (btn) { btn.addEventListener('click', openModal); });
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    });

    // ===== FORM =====
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    // Form hints
    document.querySelectorAll('.form-hint').forEach(function (hint) {
        hint.addEventListener('click', function () {
            var isVisible = this.classList.toggle('hint-visible');
            if (isVisible) {
                this.style.opacity = '1';
            }
        });
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('name').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var message = document.getElementById('message').value.trim();

        if (!name || !phone || !message) {
            alert('Пожалуйста, заполните обязательные поля: Имя, Телефон и Сообщение.');
            return;
        }

        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
    });

    // ===== SCROLL ANIMATIONS =====
    var animElements = document.querySelectorAll('.scroll-anim');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        animElements.forEach(function (el) { observer.observe(el); });
    } else {
        animElements.forEach(function (el) { el.classList.add('visible'); });
    }

});
