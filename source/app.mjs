import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {createNavigation} from "./navigation.mjs";
import { extractCategories } from "./utils.mjs";
import { embedTemplatesFrom } from "./templates.mjs"
import buildContentStructure from "./content.mjs";

embedTemplatesFrom("templates.html", document.body);
const sourceData = await fetch("./data/data.json").then(response => response.json());
const categories = extractCategories(sourceData, "asl")

createNavigation(categories);
buildContentStructure(sourceData, "asl");


const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
