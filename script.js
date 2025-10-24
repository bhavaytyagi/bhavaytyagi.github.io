// Shared scripts across all pages
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Terminal typewriter effect
    const terminalLines = document.querySelectorAll('.terminal-body p');
    let delay = 0;
    
    terminalLines.forEach(line => {
        line.style.opacity = '0';
        line.style.animation = `fadeIn 0.5s ${delay}s forwards`;
        delay += 0.3;
    });
});

// Contact form handler
document.getElementById('btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // In a real implementation, you would send this data to a server
        alert('Message sent successfully!');
        document.querySelector('form').reset();
    } else {
        alert('Please fill all fields');
    }
});