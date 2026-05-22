document.addEventListener('DOMContentLoaded', () => {
    const desktopContainer = document.getElementById('desktop-menu-container');
    const mobileContainer = document.getElementById('mobile-menu-container');

    if (!desktopContainer || !mobileContainer) return;

    let desktopHTML = '';
    let mobileHTML = '';

    navigationData.forEach(item => {
        // --- DIRECT LINK ---
        if (item.type === 'link') {
            desktopHTML += `<a href="${item.url}" class="hover:text-brand-gold transition-colors">${item.title}</a>`;
            mobileHTML += `<a href="${item.url}" class="py-3 font-bold text-gray-800 hover:text-brand-gold border-b border-gray-50">${item.title}</a>`;
        } 
        // --- DROPDOWN ---
        else if (item.type === 'dropdown') {
            let desktopLinksHTML = '';
            let mobileLinksHTML = '';
            
            item.links.forEach(link => {
                if (link.separator) {
                    desktopLinksHTML += `<div class="border-t my-1"></div>`;
                } else {
                    desktopLinksHTML += `<a href="${link.url}" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">${link.title}</a>`;
                    mobileLinksHTML += `<a href="${link.url}" class="text-sm text-gray-600 hover:text-brand-gold pl-2">${link.title}</a>`;
                }
            });
            
            let headerHTML = item.header ? `<div class="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">${item.header}</div>` : '';
            let mobileHeaderHTML = item.header ? `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">${item.header}</div>` : '';

            desktopHTML += `
            <div class="relative group h-full py-4 cursor-pointer">
                <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                    ${item.title} <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                </span>
                <div class="dropdown-menu absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden py-2 hidden group-hover:block">
                    ${headerHTML}
                    ${desktopLinksHTML}
                </div>
            </div>`;

            mobileHTML += `
            <details class="group border-b border-gray-50 pb-2">
                <summary class="list-none flex justify-between items-center cursor-pointer py-3 font-bold text-gray-800">
                    ${item.title}
                    <span class="transition-transform duration-300 group-open:rotate-180">
                        <i class="fa-solid fa-chevron-down text-xs text-brand-gold"></i>
                    </span>
                </summary>
                <div class="flex flex-col gap-3 pl-4 py-2 border-l-2 border-gray-100 ml-2 animate-fade-in-down">
                    ${mobileHeaderHTML}
                    ${mobileLinksHTML}
                </div>
            </details>`;
        } 
        // --- MEGA MENU ---
        else if (item.type === 'mega') {
            let desktopColumnsHTML = '';
            let mobileColumnsHTML = '';
            
            item.columns.forEach((col, index) => {
                let isLast = index === item.columns.length - 1;
                let borderRightClass = isLast ? '' : 'border-r border-gray-100 pr-6';
                
                let colHeader = col.headerUrl 
                    ? `<a href="${col.headerUrl}" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2 hover:text-brand-gold transition-colors">${col.header}</a>`
                    : `<h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">${col.header}</h3>`;
                
                let desktopColLinksHTML = '';
                let mobileColLinksHTML = '';
                
                let layoutClass = col.isGrid ? 'grid grid-cols-2 gap-x-4 gap-y-3' : 'flex flex-col gap-3';
                
                col.links.forEach(link => {
                    desktopColLinksHTML += `
                        <a href="${link.url}" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                            <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                            ${link.title}
                        </a>`;
                    mobileColLinksHTML += `<a href="${link.url}" class="text-sm text-gray-600 hover:text-brand-gold pl-2">${link.title}</a>`;
                });
                
                desktopColumnsHTML += `
                <div class="${borderRightClass}">
                    ${colHeader}
                    <div class="${layoutClass}">
                        ${desktopColLinksHTML}
                    </div>
                </div>`;
                
                mobileColumnsHTML += `
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2 border-t border-gray-50 pt-2">${col.header}</div>
                    ${mobileColLinksHTML}
                `;
            });
            
            desktopHTML += `
            <div class="relative group h-full py-4 cursor-pointer">
                <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                    ${item.title} <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                </span>
                <div class="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 ${item.widthClass} bg-white shadow-xl rounded-xl border border-gray-100 p-6 hidden group-hover:block cursor-default z-50">
                    <div class="grid ${item.gridClass} gap-8">
                        ${desktopColumnsHTML}
                    </div>
                </div>
            </div>`;
            
            mobileHTML += `
            <details class="group border-b border-gray-50 pb-2">
                <summary class="list-none flex justify-between items-center cursor-pointer py-3 font-bold text-gray-800">
                    ${item.title}
                    <span class="transition-transform duration-300 group-open:rotate-180">
                        <i class="fa-solid fa-chevron-down text-xs text-brand-gold"></i>
                    </span>
                </summary>
                <div class="flex flex-col gap-3 pl-4 py-2 border-l-2 border-gray-100 ml-2">
                    ${mobileColumnsHTML}
                </div>
            </details>`;
        }
    });

    // --- APPEND ACTIONS ---
    desktopHTML += `
        <button onclick="document.getElementById('globalSearchModal').classList.remove('hidden'); document.getElementById('globalSearchInput').focus();" class="hover:text-brand-gold transition-colors text-gray-600 ml-2" title="Search Products & Catalogues">
            <i class="fa-solid fa-magnifying-glass text-lg"></i>
        </button>
        <a href="#contact" class="px-5 py-2.5 bg-brand-black text-white rounded hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">Get Quote</a>
    `;

    mobileHTML += `
        <button onclick="document.getElementById('mobile-menu').classList.add('hidden'); document.getElementById('globalSearchModal').classList.remove('hidden'); document.getElementById('globalSearchInput').focus();" class="py-3 font-bold text-left text-gray-800 hover:text-brand-gold border-b border-gray-50 flex items-center justify-between">
            Search <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <a href="#contact" class="bg-brand-black text-white text-center py-4 rounded mt-6 font-medium shadow-lg" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Get Quote</a>
    `;

    // --- INJECT HTML ---
    desktopContainer.innerHTML = desktopHTML;
    mobileContainer.innerHTML = mobileHTML;
});