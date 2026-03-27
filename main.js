lucide.createIcons();

// Relógio do Sistema
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// --- SISTEMA DE IDIOMAS ---
const translations = {
    pt: {
        "icon-about": "/sobre",
        "icon-projects": "/projetos",
        "icon-skills": "/stack",
        "icon-contact": "/contato",
        "icon-resume": "/curriculo",
        
        "win-title-resume": "Document Viewer: /curriculo.pdf",
        "resume-desc": "Faça o download do meu currículo em PDF para ver mais detalhes sobre minha trajetória e experiências.",
        "resume-btn": "Baixar PDF",

        "win-title-about": "System Information: /sobre mim",
        "about-desc": "Tenho 20 anos, sou apaixonado por música, tecnologia e viagens. Meu principal foco é o desenvolvimento back-end e, nos últimos tempos, também tenho me dedicado bastante à leitura.",
        "about-edu": "<strong>Formação:</strong>",
        "about-edu-1": "<strong>•</strong> Técnico em Informática (2020 - 2023) IFPB - Campus Itaporanga",
        "about-edu-2": "<strong>•</strong> Cursando Análise e Desenvolvimento de Sistemas (2024 - 2027) IFPB - Campus Monteiro",
        "about-quote": '"Código limpo nasce da paciência e de várias xícaras de café."',
        
        "win-title-projects": "Executable Files: /projetos",
        "proj-desc-0": "Gestão de treinos inteligente com Django e Machine Learning.",
        "proj-desc-1": "Gerenciador de tarefas com árvore Heap",
        "proj-desc-1-d": "Sistema que gerencia tarefas utilizando algoritmo HeapfyUp e HeapfyDown.",
        "proj-btn": "acessar",
        
        "win-title-skills": "Core Modules: /habilidades",
        "skills-lang": "Linguagens",
        "skills-frameworks": "Frameworks",
        "skills-infra": "Infra",
        
        "win-title-contact": "Network Interface: /contato",

        "win-title-resume": "Document Viewer: /curriculo.pdf",
        "resume-text": "Faça o download do meu currículo em PDF para ver mais detalhes sobre minha trajetória e experiências.",
        "resume-btn": "Baixar PDF"
    },
    en: {
        "icon-about": "/about",
        "icon-projects": "/projects",
        "icon-skills": "/stack",
        "icon-contact": "/contact",
        "icon-resume": "/resume",
        
        "win-title-resume": "Document Viewer: /resume.pdf",
        "resume-desc": "Download my PDF resume to see more details about my career and experiences.",
        "resume-btn": "Download PDF",

        "win-title-about": "System Information: /about me",
        "about-desc": "I am 20 years old, passionate about music, technology, and traveling. My main focus is back-end development, and lately, I've also been dedicating a lot of time to reading.",
        "about-edu": "<strong>Education:</strong>",
        "about-edu-1": "<strong>•</strong> IT Technician (2020 - 2023) IFPB - Itaporanga Campus",
        "about-edu-2": "<strong>•</strong> Studying Systems Analysis and Development (2024 - 2027) IFPB - Monteiro Campus",
        "about-quote": '"Clean code is born from patience and several cups of coffee."',
        
        "win-title-projects": "Executable Files: /projects",
        "proj-desc-0": "Intelligent training management with Django and Machine Learning.",
        "proj-desc-1": "Task Manager with Heap Tree",
        "proj-desc-1-d": "System that manages tasks using the HeapfyUp and HeapfyDown algorithms.",
        "proj-btn": "access",
        
        "win-title-skills": "Core Modules: /skills",
        "skills-lang": "Languages",
        "skills-frameworks": "Frameworks",
        "skills-infra": "Infrastructure",
        
        "win-title-contact": "Network Interface: /contact me",

        "win-title-resume": "Document Viewer: /resume.pdf",
        "resume-text": "Download my resume in PDF format to see more details about my career path and experiences.",
        "resume-btn": "Download PDF"
    }
};

let currentLang = "pt";

function toggleLanguage() {
    // 1. Alternar a variável de idioma
    currentLang = (currentLang === "pt") ? "en" : "pt";
    
    // 2. Elementos da Animação
    const slider = document.getElementById('lang-slider');
    const labelPt = document.getElementById('label-pt');
    const labelEn = document.getElementById('label-en');
    
    // NOVO: Elemento do link do currículo
    const resumeLink = document.getElementById('resume-link');

    // 3. Executar a Animação Visual e Troca de Arquivo
    if (currentLang === "en") {
        slider.style.transform = "translateX(38px)";
        labelEn.classList.add('active-lang');
        labelPt.classList.remove('active-lang');
        
        // Troca para o currículo em Inglês
        if(resumeLink) {
            resumeLink.href = "/curriculo_enBR.pdf";
            resumeLink.download = "Resume_Gabriel_Tertuliano.pdf";
        }
    } else {
        slider.style.transform = "translateX(0px)";
        labelPt.classList.add('active-lang');
        labelEn.classList.remove('active-lang');
        
        // Volta para o currículo em Português
        if(resumeLink) {
            resumeLink.href = "/curriculo_ptBR.pdf";
            resumeLink.download = "Curriculo_Gabriel_Tertuliano.pdf";
        }
    }

    // 4. Traduzir os textos
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });
}


let zIndexCounter = 100;

function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
}


function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Tornar janelas clicáveis para trazer para frente
document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => {
        zIndexCounter++;
        win.style.zIndex = zIndexCounter;
    });
});

// Script simples de "Drag and Drop" para as janelas
document.querySelectorAll('.win-header').forEach(header => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const win = header.parentElement;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === header || e.target.parentElement === header) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, win);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
});
