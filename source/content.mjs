import { TEMPLATE_SELECTORS, cloneTemplate, templateContent } from "./templates.mjs";
import { createNavigationSafeID } from "./navigation.mjs";

function buildContentStructure(content, root, targetSelector = "#content") {
    const container = document.querySelector(targetSelector);
    let currentCategoryName = null;
    let currentCategory = null;
    let target = null;

    let totalSaS = 0;
    let totalLaS = 0;
    let totalSources = 0;

    for (const [category, data] of Object.entries(content[root])) {

        if (currentCategoryName != data.name) {

            if(target){
                totalSaS = totalSaS/totalSources;
                totalLaS = totalLaS/totalSources;

                totalSaS = (totalSaS && totalSaS != NaN) ? totalSaS.toFixed(2) : "-"
                totalLaS = (totalLaS && totalLaS != NaN) ? totalLaS.toFixed(2) : "-"

                document.querySelector(`#${createNavigationSafeID(currentCategoryName)} span[data-role="sps"]`).textContent = `avg. SAS: ${totalSaS}`;
                document.querySelector(`#${createNavigationSafeID(currentCategoryName)} span[data-role="tps"]`).textContent = `avg. LAS: ${totalLaS}`;                
                totalSaS = 0;
            totalLaS = 0;
            totalSources = 0;
            }

            currentCategoryName = data.name;
            currentCategory = cloneTemplate(TEMPLATE_SELECTORS.topLevelMethodTemplate);
            currentCategory.querySelector("h2").textContent = data.name;
            currentCategory.querySelector("section").id = createNavigationSafeID(data.name);
            currentCategory.querySelector("p").textContent = data.description;
           

            container.appendChild(currentCategory);
            target = document.querySelector(`#${createNavigationSafeID(data.name)}`)

            let query = `#${createNavigationSafeID(data.name)} details > ul`;
            
            let { sps, tps } = appendReferences(data.sources, document.querySelector(query));

            sps = (sps && sps != NaN) ? sps.toFixed(2) : "-"
            tps = (tps && tps != NaN) ? tps.toFixed(2) : "-"

            if(!isNaN(sps) && !isNaN(tps)){
                totalLaS += tps * 1;
                totalSaS += sps * 1;
                totalSources++;
            }
           

            

        } else {
            const subCatDisplay = cloneTemplate(TEMPLATE_SELECTORS.subLevelCategoryTemplate);
            subCatDisplay.querySelector("article").id = createNavigationSafeID(data.subCategory);
            subCatDisplay.querySelector("h2").textContent = data.subCategory;
            subCatDisplay.querySelector("p").textContent = data.description;

            target.appendChild(subCatDisplay);

            let query = `#${createNavigationSafeID(data.subCategory)} > details > ul`;
            let refDisplay = document.querySelector(query);
            let { sps, tps } = appendReferences(data.sources, refDisplay);

        
            sps = (sps && sps != NaN) ? sps.toFixed(2) : "-"
            tps = (tps && tps != NaN) ? tps.toFixed(2) : "-"

            if(!isNaN(sps) && !isNaN(tps)){
                totalLaS += tps * 1;
                totalSaS += sps * 1;
                totalSources++;
            }

            document.querySelector(`#${createNavigationSafeID(data.subCategory)} span[data-role="sps"]`).textContent = `avg. SAS: ${sps}`;
            document.querySelector(`#${createNavigationSafeID(data.subCategory)} span[data-role="tps"]`).textContent = `avg. LAS: ${tps}`;


        }
    }
}

const SOURCE_TYPES = {
    article: "article",
    conference: "conference",
    book: "book"
}

function appendReferences(sources, target) {

    let sps = 0;
    let tps = 0;
    let numSources = 0;

    sources.forEach(source => {

        let citation = source.citation;

        let authors = citation.authors.reduce((prev, cur) => {
            let author = `${cur.lastName} ${cur.firstName}`
            if (prev.length > 0) {
                prev = `${prev}, ${author}`;
            } else {
                prev = author;
            }
            return prev;
        }, "");

        const item = document.createElement("li");
        item.classList.add("list-group-item");
        target.appendChild(item);

        if (citation.type == SOURCE_TYPES.article) {
            let refrence = templateContent(TEMPLATE_SELECTORS.referenceArticleTemplate);
            refrence = refrence.replaceAll("{title}", citation.title);
            refrence = refrence.replaceAll("{year}", citation.year || "");
            refrence = refrence.replaceAll("{volume}", citation.volume || "");
            refrence = refrence.replaceAll("{journal}", citation.journal || "");
            refrence = refrence.replaceAll("{issue}", citation.issue || "");
            refrence = refrence.replaceAll("{doi}", (citation.doi != undefined ? `https://doi.org/${citation.doi}` : null) || citation.url || "");
            refrence = refrence.replaceAll("{summary}", source.summary);
            refrence = refrence.replaceAll("{authors}", authors);
            refrence = refrence.replaceAll("{SPS}", source.studentActivityScore || "-");
            refrence = refrence.replaceAll("{TPS}", source.lecturerActivityScore || "-");

            item.innerHTML = refrence
        } else {
            item.innerHTML = `<strong>${citation.title}</strong><p>${source.summary}</p><p>Missing refrences style for <span class="text-danger">${citation.type}</span> </p>`
        }

        if (source.studentActivityScore && source.lecturerActivityScore) {
            sps += source.studentActivityScore;
            tps += source.studentActivityScore;
            numSources++;
        }



    });

    sps = sps / numSources;
    tps = tps / numSources;

    return { sps, tps }

}





export default buildContentStructure;