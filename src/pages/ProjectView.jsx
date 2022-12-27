/** @jsxImportSource @emotion/react */

import react from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import IssueCard from "../components/IssueCard.jsx";
import { css } from "@emotion/react";

const getProjectData = gql`
  query GetProjectData($projectID: ID!) {
    node(id: $projectID) {
      ... on Project {
        name
        description
        url
        id
      }
    }
  }
`;

const getProjectIssues = gql`
  query GetProjectIssues($projectID: ID!) {
    node(id: $projectID) {
      ... on ProjectV2 {
        url
        id
        items(last: 5) {
          nodes {
            id
            databaseId
            fieldValues(first: 10) {
              nodes {
                ... on ProjectV2ItemFieldValueCommon {
                  id
                  __typename
                  createdAt
                }
                ... on ProjectV2ItemFieldLabelValue {
                  labels(first: 10) {
                    nodes {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  __typename
                  optionId
                  id
                  databaseId
                  field {
                    ... on ProjectV2SingleSelectField {
                      name
                      id
                    }
                  }
                }
              }
            }
            content {
              ... on Issue {
                id
                body
                title
                url
                closed
                createdAt
                databaseId
                author {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ProjectView = () => {
  const { projectID } = useParams();
  const { loading, error, data } = useQuery(getProjectIssues, {
    variables: { projectID },
  });

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error :(
        {error.graphQLErrors.map((error) => (
          <div key={error.name}> {error.message}</div>
        ))}
      </p>
    );
  console.log(data.node);
  return (
    <div>
      <h1>Project: {data.node.name}</h1>
      <h4>Number of Issues: {data.node.items.nodes.length}</h4>
      <ul id="issueList">
        {data.node.items.nodes.map((issue) => (
          <IssueCard
            key={issue.id}
            id={issue.id}
            author={issue.content.author.login}
            date={issue.content.createdAt}
            title={issue.content.title}
            url={issue.content.url}
            status={issue.fieldValues.nodes.map((node) =>
              node.__typename === "ProjectV2ItemFieldSingleSelectValue" &&
              node.field.id === "PVTSSF_lAHOAPbz6M4AFgdYzgDLHRk"
                ? { name: node.name, id: node.optionId }
                : ""
            )}
            size={issue.fieldValues.nodes.map((node) =>
              node.__typename === "ProjectV2ItemFieldSingleSelectValue" &&
              node.field.id === "PVTSSF_lAHOAPbz6M4AFgdYzgDLHTU"
                ? node.name
                : ""
            )}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectView;
