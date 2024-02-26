import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import createNavigation from "./navigation.mjs";
import { extractCategories } from "./utils.mjs";
import { embedTemplatesFrom } from "./templates.mjs"

embedTemplatesFrom("templates.html", document.body);
const sourceData = await fetch("../data/data.json").then(response => response.json());
const categories = extractCategories(sourceData, "asl")

createNavigation(categories);


