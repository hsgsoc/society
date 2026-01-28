/**
 * --- CONFIGURATION & TRANSLATIONS ---
 */
const translations = {
    en: {
        title: "SHREE SAMBAJI RAJE HOUSING SOCIETY",
        sub: "Excellence in Community Living",
        about: "About", member: "Member", visitor: "Visitor",
        feedback: "Feedback", complaint: "Complaint", enquiry: "Enquiry",
        infoTitle: "ABOUT THE SOCIETY",
        infoDesc: "Shree Sambhaji Raje Housing Society (HSG SOC) is a registered residential cooperative housing society located at Ganesh Nagar, Talwade...",
        readMore: "Read Our History",
        years: "Years", families: "Families", established: "Established",
        infraTitle: "Society Infrastructure",
        soc1Title: "Society Wing A",
        soc1Desc: "Main residential complex with premium amenities and garden view.",
        soc2Title: "Society Wing B",
        soc2Desc: "Commercial shops and community hall complex.",
        galleryTitle: "Society Gallery",
        locationTitle: "Our Prime Location",
        locationLabel: "Sambhaji Raje Soc, Ganesh Nagar, Talwade"
    },
    mr: {
        title: "श्री संभाजी राजे हाऊसिंग सोसायटी",
        sub: "सामुदायिक जीवनातील उत्कृष्टता",
        about: "परिचय", member: "सदस्य", visitor: "पाहुणे",
        feedback: "अभिप्राय", complaint: "तक्रार", enquiry: "चौकशी",
        infoTitle: "संस्थेबद्दल",
        infoDesc: "श्री संभाजी राजे गृहनिर्माण संस्था ही पुणे, महाराष्ट्र येथील पिंपरी-चिंचवड महानगरपालिकेच्या हद्दीतील, गणेश नगर येथे स्थित आहे...",
        readMore: "इतिहास वाचा",
        years: "वर्षे", families: "कुटुंबे", established: "स्थापित",
        infraTitle: "पायाभूत सुविधा",
        soc1Title: "विंग ए",
        soc1Desc: "मुख्य निवासी संकुल.",
        soc2Title: "विंग बी",
        soc2Desc: "व्यावसायिक दुकाने.",
        galleryTitle: "चित्रदालन",
        locationTitle: "स्थान",
        locationLabel: "गणेश नगर, तळवडे"
    },
    hi: {
        title: "श्री संभाजी राजे हाउसिंग सोसाइटी",
        sub: "सामुदायिक जीवन में उत्कृष्टता",
        about: "परिचय", member: "सदस्य", visitor: "आगंतुक",
        feedback: "प्रतिक्रिया", complaint: "शिकायत", enquiry: "पूछताछ",
        infoTitle: "सोसाइटी के बारे में",
        infoDesc: "श्री संभाजी राजे हाउसिंग सोसाइटी गणेश नगर, तलवडे में स्थित है...",
        readMore: "इतिहास पढ़ें",
        years: "वर्ष", families: "परिवार", established: "स्थापित",
        infraTitle: "बुनियादी सुविधाएं",
        soc1Title: "विंग ए",
        soc1Desc: "मुख्य आवासीय परिसर।",
        soc2Title: "विंग बी",
        soc2Desc: "वाणिज्यिक दुकानें।",
        galleryTitle: "गैलरी",
        locationTitle: "स्थान",
        locationLabel: "गणेश नगर, तलवडे"
    }
};

/**
 * --- UI & ACCESSIBILITY ---
 */
let currentSize = 16;

function changeFontSize(n) {
    if (n === 0) currentSize = 16;
    else currentSize += n;
    currentSize = Math.min(Math.max(currentSize, 12), 24);
    document.documentElement.style.setProperty('--base-size', currentSize + 'px');
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * --- TRANSLATION ENGINE ---
 */
function changeLanguage() {
    const langSelect = document.getElementById('lang-select');
    if (!langSelect) return;
    
    const lang = langSelect.value;
    localStorage.setItem('societyLang', lang);
    const t = translations[lang];

    // Update Text Elements
    const elMap = {
        'txt-title': t.title,
        'txt-subtitle': t.sub,
        'btn-about': t.about,
        'btn-member': t.member,
        'btn-visitor': t.visitor,
        'btn-feedback': t.feedback,
        'btn-complaint': t.complaint,
        'btn-enquiry': t.enquiry,
        'txt-info-title': t.infoTitle,
        'txt-info-desc': t.infoDesc,
        'btn-readmore': t.readMore,
        'txt-stat-years': t.years,
        'txt-stat-families': t.families,
        'txt-stat-acres': t.established, // Map to established span
        'txt-infra-title': t.infraTitle,
        'txt-soc1-title': t.soc1Title,
        'txt-soc1-desc': t.soc1Desc,
        'txt-soc2-title': t.soc2Title,
        'txt-soc2-desc': t.soc2Desc,
        'txt-location-title': t.locationTitle,
        'txt-location-label': t.locationLabel
    };

    for (let id in elMap) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = elMap[id];
    }

    // Special handling for Gallery Title with spans
    const galleryTitle = document.getElementById('txt-gallery-title');
    if(galleryTitle) {
        galleryTitle.innerHTML = `<span class="decorative-line"></span> ${t.galleryTitle} <span class="decorative-line"></span>`;
    }

    // Change font family class
    document.body.className = (lang === 'en') ? 
        (localStorage.getItem('theme') === 'dark' ? 'dark-mode' : '') : 
        `lang-sanskrit ${localStorage.getItem('theme') === 'dark' ? 'dark-mode' : ''}`;
}

/**
 * --- APP INSTALLATION (PWA) LOGIC ---
 */
let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const downloadBtn = document.getElementById('btn-download');

// Capture the install prompt for Android
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show banner after 3 seconds of browsing
    setTimeout(() => {
        if (installBanner) installBanner.classList.remove('hidden');
    }, 3000);
});

// Hide Banner Helper
function hideBanner() {
    if (installBanner) installBanner.classList.add('hidden');
}

// Download/Install Button Handler
if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
        const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
        
        if (isIos) {
            // iOS doesn't support direct prompts; show instruction modal if you created one
            alert("To Install: Tap the 'Share' icon and then 'Add to Home Screen'.");
        } else if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Install outcome: ${outcome}`);
            deferredPrompt = null;
            hideBanner();
        } else {
            // Fallback for browsers that already installed it or don't support it
            alert("This app is ready to use from your browser or already installed.");
        }
    });
}

/**
 * --- INITIALIZATION ---
 */
window.onload = function() {
    // 1. Apply Theme
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // 2. Apply Language
    const savedLang = localStorage.getItem('societyLang') || 'en';
    const langSelect = document.getElementById('lang-select');
    if(langSelect) {
        langSelect.value = savedLang;
        changeLanguage();
    }

    // 3. Handle iOS Banner Display
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIos && !isStandalone) {
        setTimeout(() => {
            if (installBanner) installBanner.classList.remove('hidden');
        }, 4000);
    }
};