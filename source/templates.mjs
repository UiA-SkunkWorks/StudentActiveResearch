
const TEMPLATE_SELECTORS = {
    navigationItemTemplate: "#navigationItemTemplate",
    navigationNestedTemplate: "#navigationNestedTemplate",
    navigationNestedItemTemplate: "#navigationNestedItemTemplate",
    topLevelMethodTemplate:"#topLevelCategoryTemplate",
    subLevelCategoryTemplate:"#subLevelCategoryTemplate",
    referenceArticleTemplate:"#referenceArticleTemplate"
}

async function embedTemplatesFrom(source, target) {
    const templates = await fetch(source).then(data => data.text());
    target.insertAdjacentHTML("beforeend", templates)
}

function cloneTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.cloneNode(true);
}

function templateContent(templateSelector){
    let template = document.querySelector(templateSelector);
    return template.innerHTML;
}

export { TEMPLATE_SELECTORS, cloneTemplate, embedTemplatesFrom, templateContent }