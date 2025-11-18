const socialsDiv = document.querySelector('.socials');
const socialsSpan = document.querySelector('.socials span');

const linkedinSocial = document.getElementById('linkedin');
const githubSocial = document.getElementById('github');

let isClicked = false;

socialsDiv.onclick = () => {
    if (!isClicked) {
        isClicked = true;
        socialsSpan.style.animation = 'disappear 0.3s forwards';
        socialsDiv.style.animation = 'center 0.3s forwards';
        linkedinSocial.style.animation = 'showLinkedin 0.3s forwards';
        githubSocial.style.animation = 'showGithub 0.3s forwards';
    } else {
        isClicked = false;
        socialsSpan.style.animation = 'appear 0.3s forwards';
        socialsDiv.style.animation = 'uncenter 0.3s forwards';
        linkedinSocial.style.animation = 'hideLinkedin 0.3s forwards';
        githubSocial.style.animation = 'hideGithub 0.3s forwards';
    }
};

linkedinSocial.onclick = () => {
    window.open('https://www.linkedin.com/in/antoinefaure01', '_blank');
}

githubSocial.onclick = () => {
    window.open('https://github.com/Arrrlinks', '_blank');
}