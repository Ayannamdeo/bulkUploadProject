"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPipeline = void 0;
const buildSearchMatchStage = (query) => {
    const searchQuery = query["globalFilter"];
    // console.log("searchFilter inside buildpipline: ", searchQuery);
    return searchQuery.trim() !== ""
        ? [
            {
                $match: {
                    $text: { $search: `"${searchQuery}"`, $caseSensitive: false },
                },
            },
        ]
        : [];
};
const buildCurrencyFilterStage = (query) => {
    const currencyFilter = query["currencyFilter"];
    // console.log("currencyFilter inside buildpipline: ", currencyFilter);
    if (currencyFilter) {
        return [{ $match: { currencyName: `${currencyFilter}` } }];
    }
    return [];
};
const buildAccountNameFilterStage = (query) => {
    const accountName = query["accountNameFilter"];
    // console.log("accountNameFilter inside buildpipline: ", accountName);
    if (accountName) {
        return [{ $match: { accountName: `${accountName}` } }];
    }
    return [];
};
const buildSortSkipStage = (query) => {
    const sortBy = query["sortBy"];
    const sortDirection = query["sortDirection"] === "asc" ? 1 : -1;
    const stages = [];
    if (sortBy) {
        stages.push({ $sort: { [sortBy]: sortDirection } });
    }
    const page = Number(query["page"]) || 1;
    const size = Number(query["size"]) || 10;
    const skip = (page - 1) * size;
    stages.push({ $skip: skip });
    stages.push({ $limit: size });
    return stages;
};
const buildPipeline = (query) => {
    let pipeline = [];
    pipeline = pipeline.concat(buildSearchMatchStage(query));
    pipeline = pipeline.concat(buildCurrencyFilterStage(query));
    pipeline = pipeline.concat(buildAccountNameFilterStage(query));
    pipeline.push({
        $facet: {
            searchResults: buildSortSkipStage(query), // something may go wrong here
            countResults: [{ $count: "totalDocuments" }],
        },
    });
    return pipeline;
};
exports.buildPipeline = buildPipeline;
