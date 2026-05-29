const fs = require('fs');
const path = require('path');

// Naya navbar code yahan daalein (Template Literal use karein)
const newNavbar = `
    
    <nav class="sticky top-0 z-50 bg-white shadow-md py-4 transition-all" id="navbar">
        <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <a href="/index" class="flex items-center gap-2 group z-50">
                <div class="w-10 h-10 bg-brand-black text-brand-gold flex items-center justify-center font-bold text-xl rounded transition-transform group-hover:scale-105">FE</div>
                <div class="flex flex-col">
                    <h1 class="font-heading font-bold text-xl text-gray-900 leading-none">Flooring Expert</h1>
                    <span class="text-xs text-gray-500 uppercase tracking-wide">Surface Solutions</span>
                </div>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-6 font-medium text-sm text-gray-600">
               
                <div class="relative group h-full py-4 cursor-pointer">
                    <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                        Architectural Surfaces <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </span>
                    <div class="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-xl rounded-xl border border-gray-100 p-6 hidden group-hover:block cursor-default z-50">
                        <div class="grid grid-cols-3 gap-8">
                            
                            <div class="border-r border-gray-100 pr-6">
                                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Innovative Surfaces</h3>
                                <div class="flex flex-col gap-3">
                                    <a href="/surfaces/aluminum-foam" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Aluminum Foam
                                    </a>
                                    <a href="/surfaces/crystal-bricks" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Crystal Bricks
                                    </a>
                                    <a href="/surfaces/transparent-stone" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Transparent Stone
                                    </a>
                                    <a href="/surfaces/stainless-sheet" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Stainless Sheet
                                    </a>
                                </div>
                            </div>

                            <div class="border-r border-gray-100 pr-6">
                                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Refined Facades</h3>
                                <div class="flex flex-col gap-3">
                                    <a href="/surfaces/flexible-stone" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Flexible Stone
                                    </a>
                                    <a href="/surfaces/cement-board" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Cement Board
                                    </a>
                                    <a href="/surfaces/modified-clay" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Modified Clay
                                    </a>
                                    <a href="/surfaces/aluminium-profile" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Aluminium Profile
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Designer Interiors</h3>
                                <div class="flex flex-col gap-3">
                                    <a href="/surfaces/resin-panels" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Resin Panels
                                    </a>
                                    <a href="/surfaces/japanese-paper" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Japanese Paper
                                    </a>
                                    <a href="/surfaces/ceramic-foam" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        Ceramic Foam
                                    </a>
                                    <a href="/surfaces/3d-flexible-stone" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        3D Flexible Stone
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                  <div class="relative group h-full py-4 cursor-pointer">
                    <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                        Carpet tiles <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </span>
                    <div class="dropdown-menu absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden py-2 hidden group-hover:block">
                         <div class="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">carpet tiles</div>
                        <a href="/welspun/carpet-tiles/celestial" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Celestial</a>
                        <a href="/welspun/carpet-tiles/earthy-woods" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Earthy Woods</a>
                        <a href="/welspun/carpet-tiles/meander" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Meander</a>
                        <a href="/welspun/carpet-tiles/savy-street" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Savy Street</a>
                        <a href="/welspun/carpet-tiles/urban-streaks" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Urban Streaks</a>
                    </div>
                </div>

                <div class="relative group h-full py-4 cursor-pointer">
                    <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                        Welspun <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </span>
                    <div class="dropdown-menu absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden py-2 hidden group-hover:block">
                        <div class="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Flooring</div>

                        <a href="/welspun/welspun-lick-n-lock/index" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Click-N-Lock</a>
                        <a href="/welspun/multistile/index" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Multistile</a>
                         <div class="border-t my-1"></div>
                        <a href="/welspun/carpet-tiles/index" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Carpet Tiles</a>
                    </div>
                </div>

                <div class="relative group h-full py-4 cursor-pointer">
                    <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                        Pare <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </span>
                    <!-- Mega Menu Dropdown -->
                    <div class="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-xl rounded-xl border border-gray-100 p-6 hidden group-hover:block cursor-default z-50">
                        <div class="grid grid-cols-2 gap-8">
                            <!-- Column 1: Flooring -->
                            <div class="border-r border-gray-100 pr-6">
                                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Flooring</h3>
                                <div class="flex flex-col gap-3">
                                    <a href="/pare/lvt-flooring" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        LVT Flooring
                                    </a>
                                    <a href="/pare/spc-flooring" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        SPC Flooring
                                    </a>
                                    <a href="/pare/hdf-flooring" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        HDF Flooring
                                    </a>
                                </div>
                            </div>

                            <!-- Column 2: Wall & Ceiling -->
                            <div>
                                <a href="/pare/wall-and-ceiling" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2 hover:text-brand-gold transition-colors">Wall & Ceiling</a>
                                <div class="grid grid-cols-2 gap-x-4 gap-y-3">
                                    <a href="/pare/wpc/innov-plus" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        INNOV+
                                    </a>
                                    <a href="/pare/wpc/innov2-plus" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        INNOV2+
                                    </a>
                                    <a href="/pare/wpc/easy-plus" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        EASY+
                                    </a>
                                    
                                    <a href="/pare/wpc/acoustic" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        ACOUSTIC
                                    </a>
                                    <a href="/pare/wpc/luxe" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        LUXE
                                    </a>
                                    <a href="/pare/wpc/evolv-plus" class="flex items-center text-gray-600 hover:text-brand-gold transition-colors duration-200 font-medium group/link">
                                        <i class="fa-solid fa-caret-right text-[10px] mr-2 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0 text-brand-gold"></i>
                                        EVOLV+
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative group h-full py-4 cursor-pointer">
                    <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                        Bekker <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </span>
                    <div class="dropdown-menu absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden py-2 hidden group-hover:block">
                         <div class="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Flooring</div>
                        <a href="/bekker/engineered-wood" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Engineered Wood</a>
                        <a href="/bekker/laminate-flooring" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Laminate Flooring</a>
                        <a href="/bekker/spc-flooring" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">SPC Flooring</a>
                    </div>
                </div>
<!-- 
                <div class="relative group h-full py-4 cursor-pointer">
                    <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                        Cera <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </span>
                    <div class="dropdown-menu absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden py-2 hidden group-hover:block">
                        <a href="/cera/sanitaryware" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Sanitaryware</a>
                        <a href="/cera/faucets" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Faucets</a>
                    </div>
                </div> -->
                <a href="/cera/index" class="hover:text-brand-gold transition-colors">Cera</a>
                

<!-- 
                <div class="relative group h-full py-4 cursor-pointer">
                    <span class="hover:text-brand-gold transition-colors flex items-center gap-1">
                        Tiles <i class="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </span>
                    <div class="dropdown-menu absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden py-2 hidden group-hover:block">
                        <a href="/tiles/floor-tiles" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Floor Tiles</a>
                        <a href="/tiles/kitchen-tiles" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Kitchen Tiles</a>
                        <a href="/tiles/bathroom-tiles" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Bathroom Tiles</a>
                        <a href="/tiles/digital-wall-tiles" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Digital Wall Tiles</a>
                        <a href="/tiles/parking-tiles" class="block px-4 py-2 hover:bg-gray-50 hover:text-brand-gold">Parking Tiles</a>
                    </div>
                </div> -->

                <a href="/myk-laticrete/index" class="hover:text-brand-gold transition-colors">MYK Laticrete</a>
                <!-- <a href="/blog/index" class="hover:text-brand-gold transition-colors">Blog</a>
                <a href="/brochure" class="hover:text-brand-gold transition-colors">Brochure</a>
                 -->
                <button onclick="document.getElementById('globalSearchModal').classList.remove('hidden'); document.getElementById('globalSearchInput').focus();" class="hover:text-brand-gold transition-colors text-gray-600 ml-2" title="Search Products & Catalogues">
                    <i class="fa-solid fa-magnifying-glass text-lg"></i>
                </button>
                

                <a href="#contact" class="px-5 py-2.5 bg-brand-black text-white rounded hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">Get Quote</a>
            </div>
<!-- Mobile Right Icons (Search + Hamburger Menu) -->
<div class="lg:hidden flex items-center gap-5">
    <!-- Mobile Search Icon -->
    <button onclick="document.getElementById('globalSearchModal').classList.remove('hidden'); document.getElementById('globalSearchInput').focus();" class="text-gray-800 focus:outline-none hover:text-brand-gold transition-colors">
        <i class="fa-solid fa-magnifying-glass text-xl"></i>
    </button>

    <!-- Mobile Hamburger Icon -->
    <button class="text-gray-800 focus:outline-none hover:text-brand-gold transition-colors" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
        <i class="fa-solid fa-bars text-xl"></i>
    </button>
</div>
        </div>
      
        <!-- Mobile Menu with Accordion Dropdowns -->
        <div id="mobile-menu" class="hidden bg-white border-t border-gray-100 absolute w-full shadow-lg h-screen overflow-y-auto pb-32 z-40 left-0">
            <div class="flex flex-col p-6 gap-2">
                
                <!-- Architectural Surfaces Accordion -->
                <details class="group border-b border-gray-50 pb-2">
                    <summary class="list-none flex justify-between items-center cursor-pointer py-3 font-bold text-gray-800">
                        Architectural Surfaces
                        <span class="transition-transform duration-300 group-open:rotate-180">
                            <i class="fa-solid fa-chevron-down text-xs text-brand-gold"></i>
                        </span>
                    </summary>
                    <div class="flex flex-col gap-3 pl-4 py-2 border-l-2 border-gray-100 ml-2 animate-fade-in-down">
                        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Innovative Surfaces</div>
                        <a href="/surfaces/aluminum-foam" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Aluminum Foam</a>
                        <a href="/surfaces/crystal-bricks" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Crystal Bricks</a>
                        <a href="/surfaces/transparent-stone" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Transparent Stone</a>
                        <a href="/surfaces/stainless-sheet" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Stainless Sheet</a>
                        
                        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2 border-t border-gray-50 pt-2">Refined Facades</div>
                        <a href="/surfaces/flexible-stone" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Flexible Stone</a>
                        <a href="/surfaces/cement-board" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Cement Board</a>
                        <a href="/surfaces/modified-clay" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Modified Clay</a>
                        <a href="/surfaces/aluminium-profile" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Aluminium Profile</a>

                        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2 border-t border-gray-50 pt-2">Designer Interiors</div>
                        <a href="/surfaces/resin-panels" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Resin Panels</a>
                        <a href="/surfaces/japanese-paper" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Japanese Paper</a>
                        <a href="/surfaces/ceramic-foam" class="text-sm text-gray-600 hover:text-brand-gold pl-2">Ceramic Foam</a>
                        <a href="/surfaces/3d-flexible-stone" class="text-sm text-gray-600 hover:text-brand-gold pl-2">3D Flexible Stone</a>
                    </div>
                </details>

                <!-- Carpet Tiles Accordion -->
                <details class="group border-b border-gray-50 pb-2">
                    <summary class="list-none flex justify-between items-center cursor-pointer py-3 font-bold text-gray-800">
                        Carpet Tiles
                        <span class="transition-transform duration-300 group-open:rotate-180">
                            <i class="fa-solid fa-chevron-down text-xs text-brand-gold"></i>
                        </span>
                    </summary>
                    <div class="flex flex-col gap-3 pl-4 py-2 border-l-2 border-gray-100 ml-2 animate-fade-in-down">
                         <a href="/welspun/carpet-tiles/celestial" class="text-sm text-gray-600 hover:text-brand-gold">Celestial</a>
                         <a href="/welspun/carpet-tiles/earthy-woods" class="text-sm text-gray-600 hover:text-brand-gold">Earthy Woods</a>
                         <a href="/welspun/carpet-tiles/meander" class="text-sm text-gray-600 hover:text-brand-gold">Meander</a>
                         <a href="/welspun/carpet-tiles/savy-street" class="text-sm text-gray-600 hover:text-brand-gold">Savy Street</a>
                         <a href="/welspun/carpet-tiles/urban-streaks" class="text-sm text-gray-600 hover:text-brand-gold">Urban Streaks</a>
                    </div>
                </details>

                <!-- Welspun Accordion -->
                <details class="group border-b border-gray-50 pb-2">
                    <summary class="list-none flex justify-between items-center cursor-pointer py-3 font-bold text-gray-800">
                        Welspun
                        <span class="transition-transform duration-300 group-open:rotate-180">
                            <i class="fa-solid fa-chevron-down text-xs text-brand-gold"></i>
                        </span>
                    </summary>
                     <div class="flex flex-col gap-3 pl-4 py-2 border-l-2 border-gray-100 ml-2">
                        <a href="/welspun/welspun-lick-n-lock/index" class="text-sm text-gray-600 hover:text-brand-gold">Click-N-Lock</a>
                        <a href="/welspun/multistile/index" class="text-sm text-gray-600 hover:text-brand-gold">Multistile</a>
                        <a href="/welspun/carpet-tiles/index" class="text-sm text-gray-600 hover:text-brand-gold">Carpet Tiles</a>
                    </div>
                </details><!-- Pare Accordion (Fixed for Mobile) -->
                <details class="group border-b border-gray-50 pb-2">
                    <summary class="list-none flex justify-between items-center cursor-pointer py-3 font-bold text-gray-800">
                        Pare
                        <span class="transition-transform duration-300 group-open:rotate-180">
                            <i class="fa-solid fa-chevron-down text-xs text-brand-gold"></i>
                        </span>
                    </summary>
                    <div class="flex flex-col gap-3 pl-4 py-2 border-l-2 border-gray-100 ml-2 animate-fade-in-down">
                        
                        <!-- Flooring Section -->
                        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Flooring</div>
                        <a href="/pare/lvt-flooring" class="text-sm text-gray-600 hover:text-brand-gold pl-2">LVT Flooring</a>
                        <a href="/pare/spc-flooring" class="text-sm text-gray-600 hover:text-brand-gold pl-2">SPC Flooring</a>
                        <a href="/pare/hdf-flooring" class="text-sm text-gray-600 hover:text-brand-gold pl-2">HDF Flooring</a>

                        <!-- Wall & Ceiling Section -->
                        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2 border-t border-gray-50 pt-3 mb-1">
                            <a href="/pare/wall-and-ceiling" class="hover:text-brand-gold transition-colors">Wall & Ceiling</a>
                        </div>
                        <a href="/pare/wpc/innov-plus" class="text-sm text-gray-600 hover:text-brand-gold pl-2">INNOV+</a>
                        <a href="/pare/wpc/innov2-plus" class="text-sm text-gray-600 hover:text-brand-gold pl-2">INNOV2+</a>
                        <a href="/pare/wpc/easy-plus" class="text-sm text-gray-600 hover:text-brand-gold pl-2">EASY+</a>
                        <a href="/pare/wpc/baffle" class="text-sm text-gray-600 hover:text-brand-gold pl-2">BAFFLE</a>
                        <a href="/pare/wpc/acoustic" class="text-sm text-gray-600 hover:text-brand-gold pl-2">ACOUSTIC</a>
                        <a href="/pare/wpc/luxe" class="text-sm text-gray-600 hover:text-brand-gold pl-2">LUXE</a>
                        <a href="/pare/wpc/evolv-plus" class="text-sm text-gray-600 hover:text-brand-gold pl-2">EVOLV+</a>
                    </div>
                </details>
                <!-- Bekker Accordion -->
                 <details class="group border-b border-gray-50 pb-2">
                     <summary class="list-none flex justify-between items-center cursor-pointer py-3 font-bold text-gray-800">
                        Bekker
                        <span class="transition-transform duration-300 group-open:rotate-180">
                            <i class="fa-solid fa-chevron-down text-xs text-brand-gold"></i>
                        </span>
                    </summary>
                    <div class="flex flex-col gap-3 pl-4 py-2 border-l-2 border-gray-100 ml-2">
                        <a href="/bekker/engineered-wood" class="text-sm text-gray-600 hover:text-brand-gold">Engineered Wood</a>
                        <a href="/bekker/laminate-flooring" class="text-sm text-gray-600 hover:text-brand-gold">Laminate Flooring</a>
                        <a href="/bekker/spc-flooring" class="text-sm text-gray-600 hover:text-brand-gold">SPC Flooring</a>
                    </div>
                </details>

                <a href="/cera/index" class="py-3 font-bold text-gray-800 hover:text-brand-gold border-b border-gray-50">Cera</a>
                <a href="/myk-laticrete/index" class="py-3 font-bold text-gray-800 hover:text-brand-gold border-b border-gray-50">MYK Laticrete</a>
                <a href="/brochure" class="py-3 font-bold text-gray-800 hover:text-brand-gold border-b border-gray-50">Brochure</a>
              
                <button onclick="document.getElementById('mobile-menu').classList.add('hidden'); document.getElementById('globalSearchModal').classList.remove('hidden'); document.getElementById('globalSearchInput').focus();" class="py-3 font-bold text-left text-gray-800 hover:text-brand-gold border-b border-gray-50 flex items-center justify-between">
                    Search <i class="fa-solid fa-magnifying-glass"></i>
                </button>

                <a href="/index.html#contact" class="bg-brand-black text-white text-center py-4 rounded mt-6 font-medium shadow-lg" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Get Quote</a>
            </div>
        </div>
    </nav>
`;

// Wo directory jahan aapke saare HTML files hain (current folder ke liye './' use karein)
const directoryToScan = './'; 

function updateNavbarInFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(dir, file);
            
            // Check agar directory hai toh recursive call karo
            if (fs.statSync(filePath).isDirectory()) {
                // node_modules ya .git folders ko ignore karne ke liye
                if (file !== 'node_modules' && file !== '.git') {
                    updateNavbarInFiles(filePath);
                }
            } else if (path.extname(filePath) === '.html') {
                // HTML file read karo
                let content = fs.readFileSync(filePath, 'utf8');

                // Regex jo <nav id="navbar"> se lekar </nav> tak sab select karega
                const navRegex = /<nav[^>]*id="navbar"[^>]*>[\s\S]*?<\/nav>/i;

                if (navRegex.test(content)) {
                    content = content.replace(navRegex, newNavbar.trim());
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Updated: ${filePath}`);
                }
            }
        });
    });
}

updateNavbarInFiles(directoryToScan);