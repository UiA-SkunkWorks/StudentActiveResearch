
function extractCategories(source, root) {
    let categories = [... (new Set(source[root].map(resource => { return { name: resource.name, subCategory: [] } })))].reduce((acc, curr) => {
        acc[curr.name] = curr;
        return acc;
    }, {});

    source[root].forEach(resource => {
        if (resource.subCategory !== undefined) {
            categories[resource.name].subCategory.push(resource.subCategory);
        }
    });

    return categories;
}

export { extractCategories }