const socialsDiv = document.querySelector('.socials');
const socialsSpan = document.querySelector('.socials span');
const linkedinSocial = document.getElementById('linkedin');
const githubSocial = document.getElementById('github');

let isClicked = false;
let timeouts = [];

function clearAnimationQueue() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
}

socialsDiv.onclick = () => {
    clearAnimationQueue();

    if (!isClicked) {
        isClicked = true;

        socialsSpan.style.animation = 'disappear 0.3s forwards';

        timeouts.push(setTimeout(() => {
            socialsDiv.style.animation = 'center 0.3s forwards';
        }, 300));

        timeouts.push(setTimeout(() => {
            linkedinSocial.style.animation = 'showLinkedin 0.3s forwards';
            githubSocial.style.animation = 'showGithub 0.3s forwards';
        }, 600));

    } else {
        isClicked = false;

        linkedinSocial.style.animation = 'hideLinkedin 0.3s forwards';
        githubSocial.style.animation = 'hideGithub 0.3s forwards';

        timeouts.push(setTimeout(() => {
            socialsDiv.style.animation = 'uncenter 0.3s forwards';
        }, 300));

        timeouts.push(setTimeout(() => {
            socialsSpan.style.animation = 'appear 0.3s forwards';
        }, 600));
    }
};

linkedinSocial.onclick = () => {
    window.open('https://www.linkedin.com/in/antoinefaure01', '_blank');
};

githubSocial.onclick = () => {
    window.open('https://github.com/Arrrlinks', '_blank');
};