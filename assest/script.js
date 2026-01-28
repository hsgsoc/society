// --- CONFIGURATION & DATA ---
const translations = {
    en: {
        title: "SHREE SAMBAJI RAJE HOUSING SOCIETY",
        sub: "Excellence in Community Living",
        about: "About", member: "Member", visitor: "Visitor",
        feedback: "Feedback", complaint: "Complaint", enquiry: "Enquiry",
        infoTitle: "ABOUT THE SOCIETY",
        infoDesc: "Shree Sambhaji Raje Housing Society (HSG SOC) is a registered residential cooperative housing society located at Ganesh Nagar, Talwade...",
        readMore: "Read Our History",
        years: "Years", families: "Families", acres: "Established",
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
        years: "वर्षे", families: "कुटुंबे", acres: "स्थापित",
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
        years: "वर्ष", families: "परिवार", acres: "स्थापित",
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

/// --- CONFIGURATION & DATA --- (Keep your translations object as is)

// --- FONT & DARK MODE ---
let currentSize = 16;
function changeFontSize(n) {
    if (n === 0) currentSize = 16;
    else currentSize += n;
    currentSize = Math.min(Math.max(currentSize, 12), 24);
    document.documentElement.style.setProperty('--base-size', currentSize + 'px');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// --- TRANSLATOR ENGINE ---
function changeLanguage() {
    const langSelect = document.getElementById('lang-select');
    if (!langSelect) return;
    
    const lang = langSelect.value;
    localStorage.setItem('societyLang', lang);
    const t = translations[lang];

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

    const galleryTitle = document.getElementById('txt-gallery-title');
    if(galleryTitle) galleryTitle.innerHTML = `<span class="decorative-line"></span> ${t.galleryTitle} <span class="decorative-line"></span>`;

    document.body.className = (lang === 'en') ? '' : 'lang-sanskrit';
}

// --- PWA INSTALL LOGIC ---
let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const downloadBtn = document.getElementById('btn-download');

// Catch the install event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBanner) installBanner.classList.remove('hidden');
});

// Download button click
if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            deferredPrompt = null;
            hideBanner();
        }
    });
}

function hideBanner() {
    if (installBanner) installBanner.classList.add('hidden');
}

// --- INITIALIZE ON LOAD ---
window.onload = function() {
    // 1. Theme Persistence
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // 2. Language Persistence
    const savedLang = localStorage.getItem('societyLang') || 'en';
    const langSelect = document.getElementById('lang-select');
    if(langSelect) {
        langSelect.value = savedLang;
        changeLanguage();
    }

    // 3. iOS Detection
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIos && !isStandalone) {
        if (installBanner) installBanner.classList.remove('hidden');
        const iosText = document.getElementById('ios-text');
        const installSub = document.getElementById('install-subtitle');
        
        if (iosText) iosText.classList.remove('hidden');
        if (downloadBtn) downloadBtn.classList.add('hidden');
        if (installSub) installSub.classList.add('hidden');
    }
};