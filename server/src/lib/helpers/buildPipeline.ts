import { query } from "express";
import mongoose from "mongoose";

type PipelineStage = mongoose.PipelineStage;

interface Query {
  [key: string]: any;
}

const buildSearchMatchStage = (query: Query): PipelineStage[] => {
  const searchQuery = query["globalFilter"];
  console.log("searchFilter inside buildpipline: ", searchQuery);

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

const buildCurrencyFilterStage = (query: Query): PipelineStage[] => {
  const currencyFilter = query["currencyFilter"];
  console.log("currencyFilter inside buildpipline: ", currencyFilter);

  if (currencyFilter) {
    return [{ $match: { currencyName: `${currencyFilter}` } }];
  }
  return [];
};

const buildAccountNameFilterStage = (query: Query): PipelineStage[] => {
  const accountName = query["accountNameFilter"];
  console.log("accountNameFilter inside buildpipline: ", accountName);

  if (accountName) {
    return [{ $match: { accountName: `${accountName}` } }];
  }
  return [];
};

const buildSortSkipStage = (query: Query): PipelineStage[] => {
  const sortBy = query["sortBy"];
  const sortDirection = query["sortDirection"] === "asc" ? 1 : -1;

  const stages: PipelineStage[] = [];

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

export const buildPipeline = (query: Query): PipelineStage[] => {
  let pipeline: PipelineStage[] = [];

  pipeline = pipeline.concat(buildSearchMatchStage(query));
  pipeline = pipeline.concat(buildCurrencyFilterStage(query));
  pipeline = pipeline.concat(buildAccountNameFilterStage(query));

  pipeline.push({
    $facet: {
      searchResults: buildSortSkipStage(query) as any, // something may go wrong here
      countResults: [{ $count: "totalDocuments" }],
    },
  });

  return pipeline;
};
