import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_PROJECTSV2 = gql`
  query {
    user(login: "ggottemo") {
      projectsV2(first: 12) {
        nodes {
          title
          url
          id
          title
        }
        totalCount
      }
    }
  }
`;

// page showing info about projects
const ProjectsPage = () => {
  const { loading, error, data } = useQuery(GET_PROJECTSV2);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error :({" "}
        {error.graphQLErrors.map((error) => (
          <div key={error.name}> {error.message}</div>
        ))}
      </p>
    );
  console.log(data.user.projectsV2.nodes);
  return (
    <div>
      <h1>PROJECTS</h1>
      <h4>Number of Projects: {data.user.projectsV2.totalCount}</h4>
      <ul>
        {data.user.projectsV2.nodes.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.id}</p>
            <Link to={`/ProjectView/${project.id}`}>View Project</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
