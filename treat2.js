// This file (treat.js) remains the same as previously corrected.
// No changes are required here for the card overlapping/hover effect.

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Initial canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let particleCount = calculateParticleCount();


// Get modal elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// When user clicks close button, hide modal
modalClose.onclick = () => {
  modal.style.display = 'none';
};

// When user clicks outside modal content, hide modal
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Add click event to each card to open modal
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    // Get card title and bar content for modal
    const title = card.querySelector('.title').textContent;
    
    // Clone the bar content (you can customize what you want to show)
    const barContent = card.querySelector('.bar').innerHTML;

    modalTitle.textContent = title;
    modalBody.innerHTML = barContent;

    // Show modal
    modal.style.display = 'block';
  });
});




class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.reset();
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
            this.fadingOut = true;
        }

        if (this.fadingOut) {
            this.opacity -= 0.008;
            if (this.opacity <= 0) {
                this.reset();
            }
        }
    }

    draw() {
        // CORRECTED LINE: Ensure this is how it looks in your treat.js
        ctx.fillStyle = `rgba(255, ${255 - (Math.random() * 255 / 2)}, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

function calculateParticleCount() {
    return Math.floor((canvas.width * canvas.height) / 6000);
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particleCount = calculateParticleCount();
    initParticles();
}

window.addEventListener('resize', onResize);

initParticles();
animate();

function processAnswers() {
    const form = document.getElementById('questionnaire');
    if (!form) {
        console.error("Form with ID 'questionnaire' not found.");
        return;
    }

    const answers = form.elements;
    let yesCount = 0;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].type === 'radio' && answers[i].checked && answers[i].value === 'yes') {
            yesCount++;
        }
    }

    if (yesCount >= 0 && yesCount <= 5) {
        window.location.href = 'https://www.youtube.com/watch?v=0';
    } else if (yesCount >= 6 && yesCount <= 10) {
        window.location.href = 'treat.html';
    } else if (yesCount >= 11 && yesCount <= 15) {
        window.location.href = 'treat.html';
    } else if (yesCount >= 16 && yesCount <= 21) {
        window.location.href = 'treat.html';
    }
}















