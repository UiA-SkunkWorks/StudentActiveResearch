
const TEMPLATE_SELECTORS = {
    navigationItemTemplate: "#navigationItemTemplate",
    navigationNestedTemplate: "#navigationNestedTemplate",
    navigationNestedItemTemplate: "#navigationNestedItemTemplate"
}

async function embedTemplatesFrom(source, target) {
    const templates = await fetch(source).then(data => data.text());
    target.insertAdjacentHTML("beforeend", templates)
}

function cloneTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.cloneNode(true);
}

export { TEMPLATE_SELECTORS, cloneTemplate, embedTemplatesFrom }