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

    document.addEventListener('DOMContentLoaded', () => {
    // 1. URL se 'searchcode' parameter nikaalein (e.g., ?searchcode=CTY00232)
    const urlParams = new URLSearchParams(window.location.search);
    const targetCode = urlParams.get('searchcode');

    if (targetCode) {
        // 2. Page ke saare swatch items select karein
        const swatchItems = document.querySelectorAll('.swatch-item');
        
        for (let item of swatchItems) {
            const onclickAttr = item.getAttribute('onclick') || '';
            const itemText = item.textContent || '';
            
            // 3. Agar item ke onclick function ya text me wo code match hota hai
            if (onclickAttr.includes(targetCode) || itemText.includes(targetCode)) {
                
                // Thoda sa delay taaki page completely render aur display ho sake
                setTimeout(() => {
                    // A. Smooth Scroll karke item ko screen ke bilkul center me laayein
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // B. Beautiful Highlight Ring (Tailwind Gold Ring effect)
                    item.style.outline = "none";
                    item.classList.add('ring-4', 'ring-[#C5A059]', 'ring-offset-4', 'rounded-lg', 'transition-all', 'duration-500');
                    
                    // C. Auto-Click karke Modal Popup open karein (Scroll poora hote hi)
                    setTimeout(() => {
                        item.click();
                    }, 500);
                    
                    // D. 4 second baad ring highlight effect smoothly hata dein
                    setTimeout(() => {
                        item.classList.remove('ring-4', 'ring-[#C5A059]', 'ring-offset-4', 'rounded-lg');
                    }, 4000);
                    
                }, 400);

                // Ek baar target item milte hi loop stop karein
                break;
            }
        }
    }
});
