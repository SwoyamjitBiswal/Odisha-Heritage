document.addEventListener('DOMContentLoaded', () => {
    
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });

    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const id = params.get('id');
    const lang = params.get('lang') || 'en'; // Get lang or default to 'en'
    const contentArea = document.getElementById('detail-content');

    if (!type || !id) {
        contentArea.innerHTML = '<h1>Error: Content not found.</h1><p>Please return to the homepage and try again.</p>';
        return;
    }

    async function loadDetails() {
        try {
            const response = await fetch('assets/json/data.json');
            const data = await response.json();

            if (!data[type]) {
                 contentArea.innerHTML = '<h1>Error: Invalid category.</h1>';
                 return;
            }
            
            const item = data[type].find(d => d.id === id);

            if (!item) {
                contentArea.innerHTML = '<h1>Error: Item not found.</h1>';
                return;
            }

            const titleName = lang === 'od' && item.nameOdia ? item.nameOdia : item.name;
            document.title = `${titleName} - Utkala Gaurav`;
            renderItem(item, lang);
            scroll.update();

        } catch (error) {
            console.error('Failed to load details:', error);
            contentArea.innerHTML = '<h1>Error loading content.</h1>';
        }
    }

    function renderItem(item, lang) {
        const name = lang === 'od' && item.nameOdia ? item.nameOdia : item.name;
        const description = lang === 'od' && item.descriptionOdia ? item.descriptionOdia : item.description;
        const nameOdia = lang === 'en' && item.nameOdia ? `<h2>${item.nameOdia}</h2>` : '';


        let metaHtml = '';
        if (item.location) {
            metaHtml += `<p><strong>Location:</strong> <span>${item.location}</span></p>`;
        }
        if (item.origin) {
            metaHtml += `<p><strong>Origin:</strong> <span>${item.origin}</span></p>`;
        }
        if (item.significance) {
            metaHtml += `<p><strong>Significance:</strong> <span>${item.significance}</span></p>`;
        }
        if (item.date) {
            metaHtml += `<p><strong>Date:</strong> <span>${item.date}</span></p>`;
        }

        const html = `
            <img src="https://picsum.photos/seed/${item.id}/1200/600" alt="${item.name}">
            <h1>${name}</h1>
            ${nameOdia}
            <div class="meta-info">
                ${metaHtml}
            </div>
            <p class="description">${description}</p>
        `;
        contentArea.innerHTML = html;
    }

    loadDetails();
});
