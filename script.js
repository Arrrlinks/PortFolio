const welcomeName = document.getElementById('welcome-name'); // Get the element with the id welcome-name
const aboutMeDiv = document.querySelector('.about-me');
const lang = document.documentElement.lang; // Get the language of the page
let words = ['Antoine',/* 'looking for an internship',*/ 'motivated', 'a student at CESI']; // Set the words to display
if (lang === 'fr') { // If the language is french
    words = ['Antoine', /*'à la recherche d\'un stage',*/ 'motivé', 'étudiant à CESI']; // Set the words to display
}
let wordIndex = 0; // Set the index of the word to 0
let i = words[wordIndex].length; // Set the index of the letter to the length of the first word
let isDeleting = false; // Set the deleting state to false
let speed = 100; // Set the speed of the typing
let delay = 2000; // Set the delay between the words

function type() { // Function to type the words
    const currentWord = words[wordIndex]; // Get the current word
    welcomeName.textContent = isDeleting ? currentWord.substring(0, i - 1) : currentWord.substring(0, i); // Set the text of the element to the text to display
    if (isDeleting) { // If the deleting state is true
        i--; // Decrease the index of the letter
    } else { // If the deleting state is false
        i++; // Increase the index of the letter
    }
    if (i === currentWord.length + 1) { // If the index of the letter is equal to the length of the current word + 1
        isDeleting = true; // Set the deleting state to true
        speed = 150; // Set the speed of the typing
        delay = 2000; // Set the delay between the words
    }
    if (i === 0) { // If the index of the letter is equal to 0
        wordIndex = (wordIndex + 1) % words.length; // Increase the index of the word
        isDeleting = false; // Set the deleting state to false
        speed = 100; // Set the speed of the typing
        delay = 2000; // Set the delay between the words
    }
    if (i === currentWord.length + 1) { // If the index of the letter is equal to the length of the current word + 1
        setTimeout(type, delay); // Call the function after the delay
    } else { // If the index of the letter is not equal to the length of the current word + 1
        setTimeout(type, speed); // Call the function after the speed
    }
}

setTimeout(type, delay); // Call the function after the delay


const form = document.getElementById('form'); // Get the element with the id form
form.addEventListener('submit', (event) => { // Add an event listener on the form
    event.preventDefault(); // Prevent the default action

    const subject = encodeURIComponent(document.getElementById('subject').value); // Get the value of the element with the id subject
    const body = encodeURIComponent(document.getElementById('body').value); // Get the value of the element with the id body
    window.location.href = 'mailto:antoine.faure@viacesi.fr?subject=' + subject + '&body=' + body; // Open the mail app with the subject and the body
});

const langCheckbox = document.getElementById('lang'); // Get the element with the id lang

langCheckbox.addEventListener('change', (event) => { // Add an event listener on the lang checkbox
    const hash = window.location.hash; // Get the hash of the page
    if (event.target.checked && lang === 'fr') { // If the checkbox is checked and the language is french
        setTimeout(() => { // Set a timeout
            window.location.href = `../en${hash}`; // Redirect to the english version of the page
        }, 150); // 150ms
    }
    else if (!event.target.checked && lang === 'en') { // If the checkbox is not checked and the language is english
        setTimeout(() => { // Set a timeout
            window.location.href = `..${hash}`; // Redirect to the french version of the page
        }, 150); // 150ms
    }
});

const menuIcons = document.querySelectorAll('.menu-icon');

menuIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.classList.add('adjacent');
        const prevSibling = icon.previousElementSibling;
        const nextSibling = icon.nextElementSibling;

        if (prevSibling && prevSibling.classList.contains('menu-icon')) {
            prevSibling.classList.add('adjacent');
        }

        if (nextSibling && nextSibling.classList.contains('menu-icon')) {
            nextSibling.classList.add('adjacent');
        }
    });

    icon.addEventListener('mouseleave', () => {
        icon.classList.remove('adjacent');
        const prevSibling = icon.previousElementSibling;
        const nextSibling = icon.nextElementSibling;

        if (prevSibling && prevSibling.classList.contains('menu-icon')) {
            prevSibling.classList.remove('adjacent');
        }

        if (nextSibling && nextSibling.classList.contains('menu-icon')) {
            nextSibling.classList.remove('adjacent');
        }
    });
});

const contentDiv = document.querySelector('.content')
document.addEventListener('DOMContentLoaded', () => {
    displayThings()
    contentDiv.addEventListener('scroll', () => {
        console.log(contentDiv.scrollTop);
        displayThings()
    })
    window.addEventListener('scroll', () => {
        console.log(window.scrollY);
        displayThings()
    });
});

function displayThings(){
    if((contentDiv.scrollTop > 300 && contentDiv.scrollTop < 1300) || (window.scrollY > 300 && window.scrollY < 1300)){
        aboutMeDiv.children[0].classList.add('toUp');
        aboutMeDiv.children[1].classList.add('toUp');
        aboutMeDiv.children[2].classList.add('toUp');
    }
    if((contentDiv.scrollTop > 500 && contentDiv.scrollTop < 1300) || (window.scrollY > 500 && window.scrollY < 1300)){
        document.querySelector('.french').classList.add('langLoad');
        document.querySelector('.english').classList.add('langLoad');
        const skillElements = document.querySelectorAll(".skill");

        skillElements.forEach((element, index) => {
            const delay = 50 * index;
            addClassWithDelay(element, "toRight", delay);
        });
    }
    if ((contentDiv.scrollTop > 1200 && contentDiv.scrollTop < 2000) || (window.scrollY > 1000 && window.scrollY < 2100)) {
        const projectTiles = document.querySelectorAll('.project-tile')
        projectTiles.forEach((element, index) => {
            const delay = 150 * index;
            addClassWithDelay(element, "toUp", delay);
        });
    }
    if ((contentDiv.scrollTop > 2000 && contentDiv.scrollTop < 2800) || (window.scrollY > 1800 && window.scrollY < 2800)) {
        const timelineItems = document.querySelectorAll('.timeline-item')
        timelineItems.forEach((element, index) => {
            const delay = 150 * index;
            addClassWithDelay(element, "toUp", delay);
        });
    }
}

function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}