document.addEventListener('DOMContentLoaded', function () {

    // ===== BURGER MENU =====
    const burger = document.getElementById('burger');
    const navList = document.getElementById('navList');

    burger.addEventListener('click', function () {
        this.classList.toggle('open');
        navList.classList.toggle('open');
    });

    document.querySelectorAll('.nav-list a').forEach(function (link) {
        link.addEventListener('click', function () {
            burger.classList.remove('open');
            navList.classList.remove('open');
        });
    });

    // ===== SLIDER =====
    var sliderTrack = document.getElementById('sliderTrack');
    var slides = document.querySelectorAll('.slider-slide');
    var prevBtn = document.getElementById('sliderPrev');
    var nextBtn = document.getElementById('sliderNext');
    var dotsContainer = document.getElementById('sliderDots');
    var currentSlide = 0;
    var totalSlides = slides.length;

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
        sliderTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        document.querySelectorAll('.slider-dot').forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', function () {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', function () {
        goToSlide(currentSlide + 1);
    });

    createDots();

    // Keyboard navigation for slider
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // ===== VIDEO PLAYER =====
    var videoPlaceholder = document.getElementById('videoPlaceholder');
    var videoTag = document.getElementById('videoTag');

    videoPlaceholder.addEventListener('click', function () {
        videoPlaceholder.style.display = 'none';
        videoTag.style.display = 'block';
        videoTag.play();
    });

    // ===== FORM =====
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

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

});
