import { TEMPLATE_SELECTORS, cloneTemplate } from "./templates.mjs";

function createNavigation(navItems, targetSelector = ".navbar-nav") {
    const container = document.querySelector(targetSelector);

    for (const [category, data] of Object.entries(navItems)) {

        const isDroppDown = data.subCategory.length > 0;
        const navigation = cloneTemplate(isDroppDown ? TEMPLATE_SELECTORS.navigationNestedTemplate : TEMPLATE_SELECTORS.navigationItemTemplate);
        navigation.querySelector("a").textContent = category;
        navigation.querySelector("a").href = `#${category}`;


        if (isDroppDown) {
            const dropDownMenu = navigation.querySelector("ul");
            data.subCategory.forEach(subCat => {
                const subNav = cloneTemplate(TEMPLATE_SELECTORS.navigationNestedItemTemplate);
                subNav.querySelector("a").textContent = subCat;
                subNav.querySelector("a").href = `#${subCat}`;
                dropDownMenu.appendChild(subNav);
            });

        }

        container.appendChild(navigation);

    }
}


export default createNavigation;