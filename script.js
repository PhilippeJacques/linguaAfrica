gsap.registerPlugin(ScrollTrigger);

let currentLang = 'fr';

// --- 1. TRADUCTIONS INTERFACE ---
const translations = {
    fr: {
        navLang: "Langues", navApp: "L'App", navBtn: "Installer",
        heroH1: "APPRENEZ LES LANGUES <br><span class='text-[#d4af37]'>AFRICAINES.</span>",
        heroP: "Plus qu'une langue, une immersion. Connectez-vous à vos racines avec l'expérience d'apprentissage la plus moderne du continent.",
        secLangTitle: "Explorez nos Langues",
        secAppTitle: "L'Afrique dans votre poche."
    },
    en: {
        navLang: "Languages", navApp: "App", navBtn: "Install",
        heroH1: "LEARN AFRICAN <br><span class='text-[#d4af37]'>LANGUAGES.</span>",
        heroP: "More than a language, an immersion. Connect to your roots with the most modern learning experience on the continent.",
        secLangTitle: "Explore our Languages",
        secAppTitle: "Africa in your pocket."
    }
};

// --- 2. CONFIG SANITY ---
// REMPLACER 'votre_project_id' par votre ID réel pour activer la base de données
const client = window.sanityClient ? window.sanityClient.createClient({
    projectId: 'votre_project_id',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-01-01'
}) : null;

// --- 3. LOGIQUE CURSEUR ---
const cursor = document.querySelector('.cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
}

// --- 4. CHANGEMENT DE LANGUE ---
function changeLang(lang) {
    currentLang = lang;
    
    // Mise à jour visuelle des boutons
    const btnFr = document.getElementById('btn-fr');
    const btnEn = document.getElementById('btn-en');
    if (btnFr) btnFr.className = lang === 'fr' ? 'px-3 py-1 rounded-full bg-[#d4af37] text-black transition-all' : 'px-3 py-1 rounded-full transition-all';
    if (btnEn) btnEn.className = lang === 'en' ? 'px-3 py-1 rounded-full bg-[#d4af37] text-black transition-all' : 'px-3 py-1 rounded-full transition-all';

    // Mise à jour des textes avec data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Mise à jour Hero
    const h1 = document.querySelector('.hero-content h1');
    const p = document.querySelector('.hero-content p');
    if (h1) h1.innerHTML = translations[lang].heroH1;
    if (p) p.innerText = translations[lang].heroP;

    loadLanguages();
}

// --- 5. CHARGEMENT DES LANGUES ---
async function loadLanguages() {
    const grid = document.getElementById('languages-grid');
    if (!grid) return;
    
    grid.innerHTML = '<p class="col-span-full text-center opacity-50">Chargement des cultures...</p>';

    try {
        // Tentative de récupération via Sanity
        if (!client || client.config().projectId === 'votre_project_id') throw new Error("Sanity non configuré");
        
        const query = `*[_type == "language"]{ 
            "name": name.${currentLang}, 
            "region": region.${currentLang}, 
            "desc": description.${currentLang}, 
            flag 
        }`;
        const data = await client.fetch(query);
        renderCards(data);
    } catch (e) {
        // DONNÉES DE SECOURS (FALLBACKS)
        const fallbacks = {
            fr: [
                { name: "Wolof", region: "Sénégal", desc: "La langue de la Teranga et du commerce.", flag: "sn" },
                { name: "Lingala", region: "Congo (RDC)", desc: "L'âme musicale et vibrante de l'Afrique Centrale.", flag: "cd" },
                { name: "Swahili", region: "Afrique de l'Est", desc: "Le pont culturel entre l'Océan Indien et les Grands Lacs.", flag: "tz" },
                { name: "Yoruba", region: "Nigéria", desc: "Une langue riche en poésie et en traditions ancestrales.", flag: "ng" },
                { name: "Bambara", region: "Mali", desc: "La clé pour comprendre l'histoire de l'Empire Mandingue.", flag: "ml" },
                { name: "Peul (Fula)", region: "Sénégal / Guinée", desc: "La langue nomade voyageant à travers le Sahel.", flag: "gn" },
                { name: "Baoulé", region: "Côte d'Ivoire", desc: "L'élégance linguistique du peuple Akan au cœur de la CI.", flag: "ci" },
                { name: "Amharique", region: "Éthiopie", desc: "Une langue royale avec son propre alphabet unique.", flag: "et" },
                { name: "Zulu", region: "Afrique du Sud", desc: "La langue des guerriers, puissante et percutante.", flag: "za" },
                { name: "Twi", region: "Ghana", desc: "Le dialecte vibrant des Ashantis, riche en proverbes.", flag: "gh" },
                { name: "Tamazight", region: "Maroc / Algérie", desc: "La langue ancestrale des Berbères.", flag: "ma" },
                { name: "Soussou", region: "Guinée", desc: "La mélodie côtière de la Guinée-Conakry.", flag: "gn" },
                { name: "Shona", region: "Zimbabwe", desc: "La langue des bâtisseurs du Grand Zimbabwe.", flag: "zw" },
                { name: "Fon", region: "Bénin", desc: "La langue historique du puissant royaume du Dahomey.", flag: "bj" },
                { name: "Hausa", region: "Nigéria / Niger", desc: "La grande langue commerciale du Sahel.", flag: "ne" },
                { name: "Ewe", region: "Togo", desc: "Une langue tonale d'une grande finesse spirituelle.", flag: "tg" }
            ],
            en: [
                { name: "Wolof", region: "Senegal", desc: "The language of Teranga and regional trade.", flag: "sn" },
                { name: "Lingala", region: "Congo (DRC)", desc: "The musical and vibrant soul of Central Africa.", flag: "cd" },
                { name: "Swahili", region: "East Africa", desc: "The cultural bridge between the Indian Ocean and Great Lakes.", flag: "tz" },
                { name: "Yoruba", region: "Nigeria", desc: "A language rich in poetry and ancestral traditions.", flag: "ng" },
                { name: "Bambara", region: "Mali", desc: "The key to understanding the history of the Mandinka Empire.", flag: "ml" },
                { name: "Fula (Pulaar)", region: "Senegal / Guinea", desc: "The nomadic language traveling through the Sahel.", flag: "gn" },
                { name: "Baoulé", region: "Ivory Coast", desc: "The linguistic elegance of the Akan people.", flag: "ci" },
                { name: "Amharic", region: "Ethiopia", desc: "A royal language with its own unique alphabet.", flag: "et" },
                { name: "Zulu", region: "South Africa", desc: "The language of warriors, powerful and distinct.", flag: "za" },
                { name: "Twi", region: "Ghana", desc: "The vibrant dialect of the Ashantis, rich in proverbs.", flag: "gh" },
                { name: "Tamazight", region: "Morocco / Algeria", desc: "The ancestral Berber language.", flag: "ma" },
                { name: "Soussou", region: "Guinea", desc: "The coastal melody of Guinea-Conakry.", flag: "gn" },
                { name: "Shona", region: "Zimbabwe", desc: "The language of the Great Zimbabwe builders.", flag: "zw" },
                { name: "Fon", region: "Benin", desc: "The historical language of the powerful Dahomey Kingdom.", flag: "bj" },
                { name: "Hausa", region: "Nigeria / Niger", desc: "The major commercial language of the Sahel.", flag: "ne" },
                { name: "Ewe", region: "Togo", desc: "A tonal language with great spiritual depth.", flag: "tg" }
            ]
        };
        renderCards(fallbacks[currentLang]);
    }
}

// --- 6. RENDU DES CARTES ---
function renderCards(data) {
    const grid = document.getElementById('languages-grid');
    if (!grid) return;

    grid.innerHTML = data.map(l => {
        // Sécurité pour l'icône (Drapeau via FlagCDN)
        const flagCode = l.flag ? l.flag.toLowerCase() : 'un'; // 'un' pour drapeau inconnu
        const iconHtml = `<img src="https://flagcdn.com/w160/${flagCode}.png" 
                              alt="${l.region}" 
                              class="w-16 h-10 object-cover rounded-md shadow-md">`;

        return `
            <div class="lang-card group p-10 bg-[#1f2115] rounded-[2rem] border border-white/5 opacity-0 translate-y-10">
                <div class="mb-6 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                    ${iconHtml}
                </div>
                <h3 class="text-2xl font-bold mb-2">${l.name}</h3>
                <p class="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em] mb-4">${l.region}</p>
                <p class="text-gray-400 leading-relaxed text-sm">${l.desc}</p>
            </div>
        `;
    }).join('');

    // Animation GSAP pour l'apparition des cartes
    gsap.to(".lang-card", {
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power4.out",
        scrollTrigger: { 
            trigger: "#languages-grid", 
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
}

// --- 7. ANIMATIONS INITIALES (Lancement au chargement) ---
window.addEventListener('load', () => {
    // Animation Hero
    gsap.from(".hero-content > *", {
        y: 60, opacity: 0, stagger: 0.2, duration: 1.5, ease: "expo.out"
    });

    // Animation Scroll du téléphone
    if (document.querySelector(".mockup-phone")) {
        gsap.to(".mockup-phone", {
            scrollTrigger: {
                trigger: ".phone-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            rotateY: 25,
            y: -50
        });
    }
});

// Lancement initial
loadLanguages();
