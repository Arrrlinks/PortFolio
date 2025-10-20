const socialsDiv = document.querySelector('.socials');
const socialsLinks = socialsDiv.querySelectorAll('a');
let current = 0;

// Initialize: show only the first link, set z-index
socialsLinks.forEach((a, i) => {
    a.style.display = i === 0 ? 'block' : 'none';
    a.style.position = 'absolute';
    a.style.zIndex = i === 0 ? '2' : '1';
});

// Set onclick to open current link in new tab
socialsDiv.onclick = () => {
    window.open(socialsLinks[current].href, '_blank');
};

setInterval(() => {
    socialsLinks[current].style.animation = 'disappear 0.3s ease-out';
    setTimeout(() => {
        socialsLinks[current].style.display = 'none';
        socialsLinks[current].style.animation = '';
        socialsLinks[current].style.zIndex = '1';

        current = (current + 1) % socialsLinks.length;
        socialsLinks[current].style.display = 'block';
        socialsLinks[current].style.animation = 'slideUp 0.5s ease-out';
        socialsLinks[current].style.zIndex = '2';
    }, 300);
}, 6000);

const colors = ["#6200ea", "#000", "#ffeb3b", "#ff9800", "#4caf50", "#f44336"];
const fonts = ["Arial, sans-serif", "'Courier New', monospace", "'Times New Roman', serif", "'Comic Sans MS', cursive", "'Lucida Console', monospace"];

