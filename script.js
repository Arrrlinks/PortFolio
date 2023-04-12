const welcomeName = document.getElementById('welcome-name');
const lang = document.documentElement.lang
let words = ['Antoine', 'looking for an internship', 'motivated', 'a student at CESI'];
if (lang === 'fr') {
    words = ['Antoine', 'à la recherche d\'un stage', 'motivé', 'étudiant à CESI'];
}
let wordIndex = 0;
let i = words[wordIndex].length;
let isDeleting = false;
let speed = 100; // vitesse de suppression et d'ajout des lettres
let delay = 2000; // délai avant de commencer à effacer le mot

function type() {
    const currentWord = words[wordIndex];
    const text = isDeleting ? currentWord.substring(0, i - 1) : currentWord.substring(0, i);
    welcomeName.textContent = text;
    if (isDeleting) {
        i--;
    } else {
        i++;
    }
    if (i == currentWord.length + 1) {
        isDeleting = true;
        speed = 150;
        delay = 2000;
    }
    if (i == 0) {
        wordIndex = (wordIndex + 1) % words.length;
        isDeleting = false;
        speed = 100;
        delay = 2000;
    }
    if (i === currentWord.length + 1) {
        setTimeout(type, delay);
    } else {
        setTimeout(type, speed);
    }
}

setTimeout(type, delay);


const form = document.getElementById('form');
const submitButton = document.getElementById('submit');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche l'action de formulaire par défaut

    const subject = encodeURIComponent(document.getElementById('subject').value);
    const body = encodeURIComponent(document.getElementById('body').value);
    window.location.href = 'mailto:antoine.faure@viacesi.fr?subject=' + subject + '&body=' + body; // Ouvre le client de messagerie avec les données formatées
});
