function initGlobalSearch() {
    // 1. Inject the Global Search Modal HTML if it doesn't already exist on the page
    if (!document.getElementById('globalSearchModal')) {
        const modalHTML = `
        <div id="globalSearchModal" class="fixed inset-0 z-[100] hidden bg-gray-900/95 backdrop-blur-sm pt-20 px-4 sm:px-6">
            <div class="max-w-4xl w-full mx-auto relative flex flex-col h-[80vh]">
                <button onclick="document.getElementById('globalSearchModal').classList.add('hidden')" class="absolute -top-12 right-0 text-white hover:text-brand-gold transition">
                    <i class="fa-solid fa-xmark text-3xl"></i>
                </button>
                <div class="relative shrink-0 flex flex-col sm:flex-row gap-3">
                    <div class="relative flex-1">
                        <i class="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-2xl"></i>
                        <input type="text" id="globalSearchInput" placeholder="Search products..." 
                            class="w-full pl-16 pr-6 py-4 sm:py-5 bg-white rounded-xl text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-brand-gold shadow-xl transition-all">
                    </div>
                    <select id="globalSearchFilter" class="w-full sm:w-56 px-4 py-4 sm:py-5 bg-white rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-4 focus:ring-brand-gold shadow-xl transition-all cursor-pointer outline-none border-r-[16px] border-transparent text-lg">
                        <option value="all">All Brands</option>
                        <option value="pare">Pare</option>
                        <option value="welspun">Welspun</option>
                        <option value="bekker">Bekker</option>
                        <option value="myk laticrete">MYK Laticrete</option>
                    </select>
                </div>
                
                <div class="mt-4 bg-white rounded-xl shadow-2xl flex-1 overflow-y-auto hidden border border-gray-100" id="globalSearchResultsContainer">
                    <ul id="globalSearchResults" class="divide-y divide-gray-100"></ul>
                    <div id="globalSearchNoResults" class="hidden flex-col items-center justify-center h-full p-12 text-center text-gray-500">
                        <i class="fa-regular fa-face-frown-open text-5xl mb-4 text-gray-300"></i>
                        <p class="text-xl">No products found matching your search.</p>
                        <p class="text-sm mt-2">Try a different product code or name.</p>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 2. Search Logic setup
    const globalSearchInput = document.getElementById('globalSearchInput');
    const globalSearchResultsContainer = document.getElementById('globalSearchResultsContainer');
    const globalSearchResults = document.getElementById('globalSearchResults');
    const globalSearchNoResults = document.getElementById('globalSearchNoResults');
    const globalSearchModal = document.getElementById('globalSearchModal');

    // Close modal when clicking outside of the search container
    if (globalSearchModal) {
        globalSearchModal.addEventListener('click', (e) => {
            if (e.target === globalSearchModal) {
                globalSearchModal.classList.add('hidden');
            }
        });
    }

    // Fallback data ensures search works even if search-data.js is missing or fails to load
    const fallbackData = [
        { code: "140-G11", name: "Natural Oak", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "https://via.placeholder.com/100x100.png/f3f4f6/9ca3af?text=Pare" },
        { code: "140-G12", name: "Glow Maple", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html" },
        { code: "141-G11", name: "Breeze Oak", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html" },
        { code: "139-G21", name: "Statuario", catalogue: "Pare", category: "LVT Vista Tile", url: "/pare/lvt-flooring.html" },
        { code: "BKL376", name: "Walnut Euforia", catalogue: "Bekker", category: "Laminate", url: "/bekker/laminate-flooring.html", image: "https://via.placeholder.com/100x100.png/f3f4f6/9ca3af?text=Bekker" },
        { code: "BKL370", name: "Walnut Blackburn", catalogue: "Bekker", category: "Laminate", url: "/bekker/laminate-flooring.html" },
        { code: "BKL235", name: "Hickory Cielo", catalogue: "Bekker", category: "Laminate WV4", url: "/bekker/laminate-flooring.html" },
        { code: "L315", name: "Laticrete 315 Plus", catalogue: "MYK Laticrete", category: "Adhesives", url: "/myk-laticrete/index.html" },
        { code: "L335", name: "Laticrete 335 Super Flex", catalogue: "MYK Laticrete", category: "Adhesives", url: "/myk-laticrete/index.html" },
        { code: "HF001578", name: "Whisker Oak", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/whisker-oak1.jpg" },
        { code: "HF001579", name: "Cinnamon", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/cinnamon1.jpg" },
        { code: "HF001580", name: "Yellow Clay Oak", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/yellow-clay-oak1.jpg" },
        { code: "HF001581", name: "Brunette Wood", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/brunette-wood1.jpg" },
        { code: "HF001582", name: "Evening Barley", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/evening-barley1.jpg" },
        { code: "HF001583", name: "Sun Baked Oak", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/sun-baked-oak1.jpg" },
        { code: "HF001584", name: "Dark Walnut", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/dark-walnut1.jpg" },
        { code: "HF001585", name: "Aged Oak", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/aged-oak1.jpg" },
        { code: "HF001586", name: "Tawny Hickory", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/tawny-hickory1.jpg" },
        { code: "HF001587", name: "Java Wood", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/java-wood1.jpg" },
        { code: "HF001588", name: "Serenity Sunflower", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/serenity-sunflower1.jpg" },
        { code: "HF001589", name: "Harbour Grey", catalogue: "Welspun", category: "MultiStile Allure", url: "/welspun/multistile/index.html", image: "/welspun/multistile/assets/allure/harbour-grey1.jpg" },
        { code: "HF000809", name: "Coastal Sand Oak", catalogue: "Welspun", category: "Click-N-Lock Bliss", url: "/welspun/welspun-click-n-lock/index.html", image: "/welspun/welspun-click-n-lock/assets/bliss/coastal-sand-oak1.jpg" },
        { code: "HF000812", name: "Shaker Oak", catalogue: "Welspun", category: "Click-N-Lock Bliss", url: "/welspun/welspun-click-n-lock/index.html", image: "/welspun/welspun-click-n-lock/assets/bliss/shaker-oak1.jpg" },
        { code: "HF000821", name: "Teak Brown", catalogue: "Welspun", category: "Click-N-Lock Bliss", url: "/welspun/welspun-click-n-lock/index.html", image: "/welspun/welspun-click-n-lock/assets/bliss/teak-brown1.jpg" },
        { code: "HF000822", name: "Natural Teak", catalogue: "Welspun", category: "Click-N-Lock Bliss", url: "/welspun/welspun-click-n-lock/index.html", image: "/welspun/welspun-click-n-lock/assets/bliss/natural-teak1.jpg" },
        { code: "CTY00283", name: "Dublin", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/dublin1.jpg" },
        { code: "CTY00278", name: "Twinge (Yellow)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/twinge1.jpg" },
        { code: "CTY00279", name: "Subtle (Beige)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/subtle1.jpg" },
        { code: "CTY00281", name: "Course (Green)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/course1.jpg" },
        { code: "CTY00277", name: "Converge (Grey)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/converge1.jpg" },
        { code: "CTY00280", name: "Trackway (Dark)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/trackway1.jpg" },
        { code: "CTY00289", name: "Ember (Blue)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/ember1.jpg" },
        { code: "CTY00291", name: "Sand (Beige)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/sand1.jpg" },
        { code: "CTY00290", name: "Platform (Brown)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/platform1.jpg" },
        { code: "CTY00288", name: "Route (Grey Mix)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/route1.jpg" },
        { code: "CTY00287", name: "Channel (Grey)", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/channel3.jpg" },
        { code: "CTY00292", name: "Aerglo", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/aerglo1.jpg" },
        { code: "CTY00293", name: "Alya", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/alya1.jpg" },
        { code: "CTY00294", name: "Antlia", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/antlia1.jpg" },
        { code: "CTY00295", name: "Apus", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/apus1.jpg" },
        { code: "CTY00296", name: "Aquarius", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/aquarius1.jpg" },
        { code: "CTY00297", name: "Aquila", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/aquila1.jpg" },
        { code: "CTY00298", name: "Ara", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/ara1.jpg" },
        { code: "CTY00299", name: "Archer", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/archer1.jpg" },
        { code: "CTY00300", name: "Ariel", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/ariel1.jpg" },
        { code: "CTY00301", name: "Astrid", catalogue: "Welspun", category: "Carpet Tiles Celestial", url: "/welspun/carpet-tiles/celestial.html", image: "/welspun/carpet-tiles/assets/celestial/astrid1.jpg" },
        { code: "CTY00252", name: "Ruby", catalogue: "Welspun", category: "Carpet Tiles Earthy Woods", url: "/welspun/carpet-tiles/earthy-woods.html", image: "/welspun/carpet-tiles/assets/earthywoods/ruby1.png" },
        { code: "CTY00250", name: "Celadon", catalogue: "Welspun", category: "Carpet Tiles Earthy Woods", url: "/welspun/carpet-tiles/earthy-woods.html", image: "/welspun/carpet-tiles/assets/earthywoods/celadon1.png" },
        { code: "CTY00251", name: "Sunlit Yellow", catalogue: "Welspun", category: "Carpet Tiles Earthy Woods", url: "/welspun/carpet-tiles/earthy-woods.html", image: "/welspun/carpet-tiles/assets/earthywoods/sunlit-yellow1.png" },
        { code: "CTY00253", name: "Cobalt", catalogue: "Welspun", category: "Carpet Tiles Earthy Woods", url: "/welspun/carpet-tiles/earthy-woods.html", image: "/welspun/carpet-tiles/assets/earthywoods/cobalt1.png" },
        { code: "CTY00255", name: "Mocha", catalogue: "Welspun", category: "Carpet Tiles Earthy Woods", url: "/welspun/carpet-tiles/earthy-woods.html", image: "/welspun/carpet-tiles/assets/earthywoods/mocha1.png" },
        { code: "CTY00254", name: "Graphite", catalogue: "Welspun", category: "Carpet Tiles Earthy Woods", url: "/welspun/carpet-tiles/earthy-woods.html", image: "/welspun/carpet-tiles/assets/earthywoods/graphite1.png" },
        { code: "CTY00249", name: "Steel Gray", catalogue: "Welspun", category: "Carpet Tiles Earthy Woods", url: "/welspun/carpet-tiles/earthy-woods.html", image: "/welspun/carpet-tiles/assets/earthywoods/steel-gray1.png" },
        { code: "CTY00256", name: "Buff", catalogue: "Welspun", category: "Carpet Tiles Earthy Woods", url: "/welspun/carpet-tiles/earthy-woods.html", image: "/welspun/carpet-tiles/assets/earthywoods/buff1.png" },
        { code: "CTY00210", name: "wellow accent (Trek)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/trek1.jpg" },
        { code: "CTY00212", name: "red accent (Stroll)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/stroll1.jpg" },
        { code: "CTY00209", name: "purpel accent (Ramble)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/ramble1.jpg" },
        { code: "CTY00213", name: "violet accent (Eggplant)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/eggplant1.jpg" },
        { code: "CTY00211", name: "blue accent (Roam)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/roam1.jpg" },
        { code: "CTY00208", name: "green accent (Wander)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/wander1.jpg" },
        { code: "CTY00207", name: "drak brown (Hazel)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/hazel1.jpg" },
        { code: "CTY00216", name: "wellow transition (Rowe Trek)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/rowe-trek1.jpg" },
        { code: "CTY00218", name: "red transition (Relic Stroll)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/relic-stroll1.jpg" },
        { code: "CTY00215", name: "purpel transition (Rowe Ramble)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/rowe-ramble1.jpg" },
        { code: "CTY00219", name: "violet transition (Relic Eggplant)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/relic-eggplant1.jpg" },
        { code: "CTY00217", name: "blue transition (Rowe Roam)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/rowe-roam1.jpg" },
        { code: "CTY00214", name: "green transition (Rowe wander)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/rowe-wander1.jpg" },
        { code: "CTY00204", name: "medium grey (Relic Gray)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/relic-gray1.jpg" },
        { code: "CTY00203", name: "light grey (Rowe Gray)", catalogue: "Welspun", category: "Carpet Tiles Meander", url: "/welspun/carpet-tiles/meander.html", image: "/welspun/carpet-tiles/assets/meander/rowe-gray1.jpg" },
        { code: "CTY00231", name: "Forest Green", catalogue: "Welspun", category: "Carpet Tiles Savy Street", url: "/welspun/carpet-tiles/savy-street.html", image: "/welspun/carpet-tiles/assets/savy-street/forest-green1.jpg" },
        { code: "CTY00229", name: "Brown", catalogue: "Welspun", category: "Carpet Tiles Savy Street", url: "/welspun/carpet-tiles/savy-street.html", image: "/welspun/carpet-tiles/assets/savy-street/brown1.jpg" },
        { code: "CTY00225", name: "Dark Grey Blue", catalogue: "Welspun", category: "Carpet Tiles Savy Street", url: "/welspun/carpet-tiles/savy-street.html", image: "/welspun/carpet-tiles/assets/savy-street/dark-grey-blue1.jpg" },
        { code: "CTY00228", name: "Dark Grey Brown", catalogue: "Welspun", category: "Carpet Tiles Savy Street", url: "/welspun/carpet-tiles/savy-street.html", image: "/welspun/carpet-tiles/assets/savy-street/dark-grey-brown1.jpg" },
        { code: "CTY00226", name: "Navy Blue", catalogue: "Welspun", category: "Carpet Tiles Savy Street", url: "/welspun/carpet-tiles/savy-street.html", image: "/welspun/carpet-tiles/assets/savy-street/navy-blue1.jpg" },
        { code: "CTY00227", name: "Dove Grey", catalogue: "Welspun", category: "Carpet Tiles Savy Street", url: "/welspun/carpet-tiles/savy-street.html", image: "/welspun/carpet-tiles/assets/savy-street/dove-grey1.jpg" },
        { code: "CTY00230", name: "Mustard Yellow", catalogue: "Welspun", category: "Carpet Tiles Savy Street", url: "/welspun/carpet-tiles/savy-street.html", image: "/welspun/carpet-tiles/assets/savy-street/mustard-yellow1.jpg" },
        { code: "CTY00232", name: "Dark Grey", catalogue: "Welspun", category: "Carpet Tiles Savy Street", url: "/welspun/carpet-tiles/savy-street.html", image: "/welspun/carpet-tiles/assets/savy-street/dark-grey1.jpg" },
        { code: "CTY00220", name: "Matrix", catalogue: "Welspun", category: "Carpet Tiles Pinstripes", url: "/welspun/carpet-tiles/pinstripes.html", image: "/welspun/carpet-tiles/assets/pinstripes/matrix1.jpg" },
        { code: "CTY00221", name: "RockNBlue", catalogue: "Welspun", category: "Carpet Tiles Pinstripes", url: "/welspun/carpet-tiles/pinstripes.html", image: "/welspun/carpet-tiles/assets/pinstripes/rocknblue1.jpg" },
        { code: "CTY00222", name: "Wintercherry", catalogue: "Welspun", category: "Carpet Tiles Pinstripes", url: "/welspun/carpet-tiles/pinstripes.html", image: "/welspun/carpet-tiles/assets/pinstripes/wintercherry1.jpg" },
        { code: "CTY00223", name: "Salient", catalogue: "Welspun", category: "Carpet Tiles Pinstripes", url: "/welspun/carpet-tiles/pinstripes.html", image: "/welspun/carpet-tiles/assets/pinstripes/salient1.jpg" },
        { code: "CTY00224", name: "Grey", catalogue: "Welspun", category: "Carpet Tiles Pinstripes", url: "/welspun/carpet-tiles/pinstripes.html", image: "/welspun/carpet-tiles/assets/pinstripes/grey1.jpg" },
        { code: "CTY00272", name: "Draco", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/draco1.png" },
        { code: "CTY00276", name: "Dorado", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/dorado1.png" },
        { code: "CTY00275", name: "Crater", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/crater1.png" },
        { code: "CTY00274", name: "Cordelia", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/cordelia1.png" },
        { code: "CTY00273", name: "Columba", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/columba1.png" },
        { code: "CTY00262", name: "Aurora", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/aurora1.png" },
        { code: "CTY00263", name: "Bianca", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/bianca1.png" },
        { code: "CTY00264", name: "Caelum", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/caelum1.png" },
        { code: "CTY00265", name: "Callisto", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/callisto1.png" },
        { code: "CTY00266", name: "Calypso", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/calypso1.png" },
        { code: "CTY00271", name: "Cetus", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/cetus1.png" },
        { code: "CTY00270", name: "Cephus", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/cephus1.png" },
        { code: "CTY00269", name: "Centaurus", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/centaurus1.png" },
        { code: "CTY00268", name: "Castor", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/castor1.png" },
        { code: "CTY00267", name: "Carina", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/carina1.png" },
        { code: "CTY00257", name: "Palermo", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/palermo1.png" },
        { code: "CTY00258", name: "Cairo", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/cairo1.png" },
        { code: "CTY00259", name: "Ushuaia", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/ushuaia1.png" },
        { code: "CTY00260", name: "Lane", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/lane1.png" },
        { code: "CTY00261", name: "Triton", catalogue: "Welspun", category: "Carpet Tiles Urban Streaks", url: "/welspun/carpet-tiles/urban-streaks.html", image: "/welspun/carpet-tiles/assets/urbanstreaks/triton1.png" },
        { code: "137-S1", name: "Arctic Grey", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/arctic-grey1.jpg" },
        { code: "137-S2", name: "Canyon Oak", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/canyon-oak1.jpg" },
        { code: "137-S3", name: "Desert Amber", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/desert-amber1.jpg" },
        { code: "137-S4", name: "Desert Maple", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/desert-maple1.jpg" },
        { code: "137-S", name: "Glacier Grey", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/glacier-grey1.jpg" },
        { code: "137-S6", name: "Heritage Oak", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/heritage-oak1.jpg" },
        { code: "137-S7", name: "Sahara Oak", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/sahara-oak1.jpg" },
        { code: "137-S8", name: "Sand Oak", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/sand-oak1.jpg" },
        { code: "137-S9", name: "Sunset Timber", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/sunset-timber1.jpg" },
        { code: "137-S10", name: "Timber Brown", catalogue: "Pare", category: "Core SPC", url: "/pare/spc-flooring.html", image: "/pare/assets/spc/timber-brown1.jpg" },
        { code: "136-H1", name: "Classic Chestnut", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/classic-chestnut1.jpg" },
        { code: "136-H2", name: "Truffle Wood", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/truffle-wood1.jpg" },
        { code: "136-H3", name: "Autumn Flame", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/autumn-flame1.jpg" },
        { code: "136-H4", name: "Wild Oak Knots", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/wild-oak-knots1.jpg" },
        { code: "136-H5", name: "Golden Dune", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/golden-dune1.jpg" },
        { code: "136-H6", name: "Desert Wood", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/desert-wood1.jpg" },
        { code: "136-H7", name: "Espresso Teak", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/espresso-teak1.jpg" },
        { code: "136-H8", name: "Shadow Wood", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/shadow-wood1.jpg" },
        { code: "136-H9", name: "Natural Birch", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/natural-birch1.jpg" },
        { code: "136-H10", name: "Rosso Walnut", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/rosso-walnut1.jpg" },
        { code: "136-H11", name: "Royal Mahogany", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/royal-mahogany1.jpg" },
        { code: "136-H12", name: "Cask Wood", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/cask-wood1.jpg" },
        { code: "136-H13", name: "Autumn Mahogany", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/autumn-mahogany1.jpg" },
        { code: "136-H14", name: "Morning Mist", catalogue: "Pare", category: "HDF TOUGH", url: "/pare/hdf-flooring.html", image: "/pare/assets/hdf/morning-mist1.jpg" },
        { code: "135-F-01", name: "Blonde Maple", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/blonde-maple1.jpg" },
        { code: "135-F-02", name: "Golden Pecan Teak", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/golden-pecan-teak1.jpg" },
        { code: "135-F-03", name: "Arctic Pine", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/arctic-pine1.jpg" },
        { code: "135-F-04", name: "Natural Greywood", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/natural-greywood1.jpg" },
        { code: "135-F-05", name: "Driftwood Beige", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/driftwood-beige1.jpg" },
        { code: "135-F-06", name: "Amber Teak", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/amber-teak1.jpg" },
        { code: "135-F-07", name: "Toffee Walnut", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/toffee-walnut1.jpg" },
        { code: "135-F-08", name: "Elegant Oak", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/elegant-oak1.jpg" },
        { code: "135-F-09", name: "Prime Oak", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/prime-oak1.jpg" },
        { code: "135-F-10", name: "Chocolate Oak", catalogue: "Pare", category: "LVT Comfort", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/chocolate-oak1.jpg" },
        { code: "140-G11", name: "Natural Oak", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/natural-oak1.jpg" },
        { code: "140-G12", name: "Glow Maple", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/glow-maple1.jpg" },
        { code: "140-G13", name: "Golden Teak", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/golden-teak1.jpg" },
        { code: "140-G14", name: "Raw Oak", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/raw-oak1.jpg" },
        { code: "140-G15", name: "Morning Oak", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/morning-oak1.jpg" },
        { code: "140-G16", name: "Midnight Walnut", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/midnight-walnut1.jpg" },
        { code: "140-G17", name: "Arctic Ash", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/arctic-ash1.jpg" },
        { code: "140-G03", name: "Weathered Oak", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/weathered-oak1.jpg" },
        { code: "140-G07", name: "Breeze Oak", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/breeze-oak1.jpg" },
        { code: "140-G08", name: "Deep Walnut", catalogue: "Pare", category: "LVT Prime", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/deep-walnut1.jpg" },
        { code: "141-G11", name: "Breeze Oak", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/breeze-oak1.jpg" },
        { code: "141-G12", name: "Carbon Oak", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/carbon-oak1.jpg" },
        { code: "141-G03", name: "Oakfield", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/oakfield1.jpg" },
        { code: "141-G18", name: "Deep Walnut", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/deep-walnut1.jpg" },
        { code: "141-G19", name: "Sandalwood", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/sandalwood1.jpg" },
        { code: "141-G15", name: "Golden Mist", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/golden-mist1.jpg" },
        { code: "141-G09", name: "Raw Oak", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/raw-oak1.jpg" },
        { code: "141-G17", name: "Arctic Ash", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/arctic-ash1.jpg" },
        { code: "141-G20", name: "Weathered Oak", catalogue: "Pare", category: "LVT Grip", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/weathered-oak1.jpg" },
        { code: "139-G21", name: "Statuario", catalogue: "Pare", category: "LVT Vista Tile", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/statuario1.jpg" },
        { code: "139-G22", name: "Modena Mist", catalogue: "Pare", category: "LVT Vista Tile", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/modena-mist1.jpg" },
        { code: "139-G23", name: "Cresta", catalogue: "Pare", category: "LVT Vista Tile", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/cresta1.jpg" },
        { code: "138-G01", name: "Maple Breeze", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/maple-breeze1.jpg" },
        { code: "138-G02", name: "Polar Birch", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/polar-birch1.jpg" },
        { code: "138-G03", name: "Weathered Oak", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/weathered-oak1.jpg" },
        { code: "138-G04", name: "Ashwood Beige", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/ashwood-beige1.jpg" },
        { code: "138-G05", name: "Timber Tan", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/timber-tan1.jpg" },
        { code: "138-G06", name: "Natural Teak", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/natural-teak1.jpg" },
        { code: "138-G07", name: "Midnight Walnut", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/midnight-walnut1.jpg" },
        { code: "138-G08", name: "Golden Teak", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/golden-teak1.jpg" },
        { code: "138-G09", name: "Golden Mist", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/golden-mist1.jpg" },
        { code: "138-G10", name: "Canyon Brown", catalogue: "Pare", category: "LVT Vista", url: "/pare/lvt-flooring.html", image: "/pare/assets/lvt/canyon-brown1.jpg" },
        { code: "EVO-NV", name: "Nova Profile", catalogue: "Pare", category: "EVOLV+", url: "/pare/wpc/evolv-plus.html", image: "/pare/assets/wall/nova-profile1.jpg" },
        { code: "EVO-DL", name: "Delta Profile", catalogue: "Pare", category: "EVOLV+", url: "/pare/wpc/evolv-plus.html", image: "/pare/assets/wall/delta-profile1.jpg" },
        { code: "EVO-RH", name: "Rhythm Profile", catalogue: "Pare", category: "EVOLV+", url: "/pare/wpc/evolv-plus.html", image: "/pare/assets/wall/rhythm-profile1.jpg" },
        { code: "EVO-AO", name: "Artisan Oak", catalogue: "Pare", category: "EVOLV+", url: "/pare/wpc/evolv-plus.html", image: "/pare/assets/wall/artisan-oak1.jpg" },
        { code: "EVO-RN", name: "Royal Nut", catalogue: "Pare", category: "EVOLV+", url: "/pare/wpc/evolv-plus.html", image: "/pare/assets/wall/royal-nut1.jpg" }
    ];

    if (globalSearchInput) {
        const performSearch = () => {
            const query = globalSearchInput.value.toLowerCase().trim();
            const brandFilter = document.getElementById('globalSearchFilter')?.value.toLowerCase() || 'all';
            
            // Always use the managed fallbackData array as the primary database
            const productData = fallbackData;

            if (!query && brandFilter === 'all') {
                globalSearchResultsContainer.classList.add('hidden');
                return;
            }

            globalSearchResultsContainer.classList.remove('hidden');
            
            const matchedProducts = productData.filter(p => {
                const matchesQuery = !query || 
                    (p.code && p.code.toLowerCase().includes(query)) || 
                    (p.name && p.name.toLowerCase().includes(query)) ||
                    (p.catalogue && p.catalogue.toLowerCase().includes(query)) || 
                    (p.category && p.category.toLowerCase().includes(query));
                
                const matchesBrand = brandFilter === 'all' || (p.catalogue && p.catalogue.toLowerCase().includes(brandFilter));
                return matchesQuery && matchesBrand;
            });

            globalSearchResults.innerHTML = '';
            if (matchedProducts.length === 0) {
                globalSearchNoResults.classList.remove('hidden');
                globalSearchNoResults.classList.add('flex');
            } else {
                globalSearchNoResults.classList.add('hidden');
                globalSearchNoResults.classList.remove('flex');
                
                matchedProducts.forEach(p => {
                    globalSearchResults.insertAdjacentHTML('beforeend', `
                        <li>
                            <a href="${p.url}" class="flex items-center justify-between p-4 hover:bg-brand-gold/5 transition-colors duration-200 group">
                                <div class="flex items-center gap-4 min-w-0">
                                    ${p.image 
                                        ? `<img src="${p.image}" alt="${p.name}" class="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-200" onerror="this.onerror=null; this.src='https://via.placeholder.com/100x100.png/f3f4f6/9ca3af?text=Error';">`
                                        : `<div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-brand-gold group-hover:text-white transition-all duration-200 shrink-0">
                                            <i class="fa-solid fa-layer-group text-xl"></i>
                                           </div>`
                                    }
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center gap-2 mb-1 flex-wrap">
                                            <h4 class="font-bold text-gray-800 text-base group-hover:text-brand-gold transition-colors truncate" title="${p.name}">${p.name}</h4>
                                            <span class="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wider uppercase shrink-0">${p.catalogue}</span>
                                        </div>
                                        <div class="flex items-center gap-3 text-xs text-gray-500 truncate">
                                            <span>${p.category}</span>
                                            ${p.code ? `<span class="flex items-center gap-1.5"><i class="fa-solid fa-barcode text-gray-400"></i>${p.code}</span>` : ''}
                                        </div>
                                    </div>
                                </div>
                                <div class="ml-4 flex items-center gap-3">
                                    ${window.location.pathname.includes('admin') ? `<button onclick="event.preventDefault(); if(window.openEditProductModal) window.openEditProductModal('${p.code || ''}');" class="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-bold rounded hover:bg-brand-gold hover:text-white transition-colors shadow-sm"><i class="fa-solid fa-pencil mr-1"></i> Edit</button>` : ''}
                                    <i class="fa-solid fa-chevron-right text-gray-300 group-hover:text-brand-gold transition-colors transform group-hover:translate-x-1"></i>
                                </div>
                            </a>
                        </li>
                    `);
                });
            }
        };
        
        globalSearchInput.addEventListener('input', performSearch);
        document.getElementById('globalSearchFilter')?.addEventListener('change', performSearch);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalSearch);
} else {
    initGlobalSearch();
}