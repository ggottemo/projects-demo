import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

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
        items(first: 100) {
          nodes {
            content {
              ... on Issue {
                title
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
      <ul>
        {data.node.items.nodes.map((issue) => (
          <li key={issue.id}>
            <h2>{issue.title}</h2>
            <p>{issue.body}</p>
            <p>{issue.state}</p>
            <p>{issue.number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectView;
