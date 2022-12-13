import React from "react";
import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
const GET_PROJECTSV2 = gql`
    query GetProjects {
        viewer {
            repositories(first: 100) {
                nodes {
                    name
                    description
                    url
                    id
                }
                totalCount
            }
        }
    }
`






const ProjectsPage =  () => {

const {loading, error, data} = useQuery(GET_PROJECTSV2);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data.viewer.repositories.nodes)
    return (
        <div>
            <h1>REPOS</h1>
            <h4>Number of Repositories: {data.viewer.repositories.totalCount}</h4>
            <ul>
                {data.viewer.repositories.nodes.map((project) => (
                    <li key={project.id}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectsPage