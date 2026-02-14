function init() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });

    let currentLang = 'en';
    let siteData;

    function firstPageAnim() {
        const tl = gsap.timeline();
        tl.from("#nav", { y: "-10", opacity: 0, duration: 1.5, ease: "expo.inOut" })
          .to(".boundingelem", { y: 0, ease: "expo.inOut", duration: 2, delay: -1, stagger: 0.2 })
          .from("#herofooter", { y: -10, opacity: 0, duration: 1.5, delay: -1, ease: "expo.inOut" });
    }
    firstPageAnim();

    async function initContent() {
        const response = await fetch('assets/json/data.json');
        siteData = await response.json();
        renderContent();
    }

    function renderContent() {
        if (!siteData) return;

        // Update section titles
        document.querySelector('#culture h2').textContent = siteData.sections.culture[currentLang];
        document.querySelector('#arts h2').textContent = siteData.sections.arts[currentLang];
        document.querySelector('#food h2').textContent = siteData.sections.food[currentLang];
        document.querySelector('#governance h2').textContent = siteData.sections.governance[currentLang];
        document.querySelector('#global h2').textContent = siteData.sections.global[currentLang];
        
        // Populate content
        populateGrid('culture-grid', siteData.temples, 'temples');
        populateScroll('arts-scroll', siteData.crafts, 'crafts');
        populateGrid('food-grid', siteData.foods, 'foods');
        populateGrid('governance-grid', siteData.governance, 'governance');
        populateGrid('global-grid', siteData.industries, 'industries');

        initScrollAnimations();
        scroll.update();
    }

    function createCard(item, type) {
        const name = currentLang === 'od' && item.nameOdia ? item.nameOdia : item.name;
        const description = currentLang === 'od' && item.descriptionOdia ? item.descriptionOdia : item.description;

        return `
            <a href="detail.html?type=${type}&id=${item.id}&lang=${currentLang}" class="card-link">
                <div class="card">
                    <img src="https://picsum.photos/seed/${item.id}/400/300" alt="${item.name}" loading="lazy">
                    <h3>${name}</h3>
                    <p>${description}</p>
                </div>
            </a>
        `;
    }

    function populateGrid(elementId, data, type) {
        const grid = document.getElementById(elementId);
        if (grid) {
            grid.innerHTML = data.map(item => createCard(item, type)).join('');
        }
    }
    
    function populateScroll(elementId, data, type) {
        const scrollContainer = document.getElementById(elementId);
        if (scrollContainer) {
            scrollContainer.innerHTML = data.map(item => createCard(item, type)).join('');
        }
    }

    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Animate cards
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });

        // Animate section titles
        document.querySelectorAll('.content-section h2').forEach(title => {
            title.style.opacity = 0;
            title.style.transform = 'translateY(30px)';
            title.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(title);
        });
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const lang = e.target.dataset.lang;
                if (lang === currentLang) return;

                langToggle.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                currentLang = lang;
                renderContent();
            }
        });
    }

    initContent();
}

init();