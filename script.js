const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas dimensions
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

// Particle class
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight; // Affects movement speed
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.size -= 0.05; // Shrink particle
        if (this.size < 0) {
            // Reset particle when it becomes too small
            this.x = (Math.random() * canvas.width);
            this.y = (Math.random() * canvas.height);
            this.size = (Math.random() * 5) + 2; // Reset size
            this.weight = (Math.random() * 1) + 0.5; // Reset weight
        }
        this.y += this.weight; // Move particle downwards

        // Reset particle if it moves off the bottom edge
        if (this.y > canvas.height + this.size) {
             this.y = 0 - this.size;
             this.x = (Math.random() * canvas.width);
             this.size = (Math.random() * 5) + 2;
             this.weight = (Math.random() * 1) + 0.5;
        }

        this.draw();
    }
}

// Initialize particles
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000; // Adjust density based on screen size
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 2;
        let x = (Math.random() * canvas.width);
        let y = (Math.random() * canvas.height);
        let color = 'rgba(173, 216, 230, ' + (Math.random() * 0.5 + 0.2) + ')'; // Light blue with random opacity
        let weight = (Math.random() * 1) + 0.5; // Random speed
        particlesArray.push(new Particle(x, y, size, color, weight));
    }
}
init();

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    setCanvasSize();
    init(); // Reinitialize particles for new size
});

