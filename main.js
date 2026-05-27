document.addEventListener("DOMContentLoaded", () => {
            let currentPath = window.location.pathname;
            if (currentPath === "/" || currentPath === "") {
                currentPath = "/index.html";
            }
            const navLinks = document.querySelectorAll('#navbar a');
            navLinks.forEach(link => {
                // Handle absolute and relative URLs properly
                const linkPath = new url(link.href,-window.location.origin).pathname;
                if (linkPath === currentPath) {
                    link.classList.add('text-brand-gold', 'font-bold');
                    link.classList.remove('text-gray-600');
                    
                    const parentDropdown = link.closest('.group');
                    if (parentDropdown) {
                        const parentSpan = parentDropdown.querySelector('span');
                        if (parentSpan) {
                            parentSpan.classList.add('text-brand-gold');
                            parentSpan.classList.remove('text-gray-600');
                        }
                    }
                }
            });
        });
    