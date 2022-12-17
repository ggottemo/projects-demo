/** @jsxImportSource @emotion/react */

// Display information about an issue and link to its GitHub page
import React from "react";
import {
  CardActions,
  CardContent,
  Card,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { css } from "@emotion/react";
import { gql, useMutation } from "@apollo/client";
import {useState} from "react";

const OPTIONS = [
  {
    name: "🆕 New",
    id: "48ca5fc8",
  },
  {
    name: "📋 Backlog",
    id: "d9e87506",
  },
  {
    name: "🔖 Ready",
    id: "2432108a",
  },
  {
    name: "🏗 In progress",
    id: "03ca87ed",
  },
  {
    name: "👀 In review",
    id: "3853b61a",
  },
  {
    name: "✅ Done",
    id: "b2e2f57b",
  },
];

const IssueCard = ({ title, url, date, status, size, author, id }) => {
    const [statusState, setStatusState] = useState(status.map((stat) => stat.name !== "" ? stat.name : ""));
  const UPDATE_STATUS = gql`
    mutation {
      updateProjectV2ItemFieldValue(
        input: {
          projectId: "PVT_kwHOAPbz6M4AFgdY"
          fieldId: "PVTSSF_lAHOAPbz6M4AFgdYzgDLHRk"
          itemId: "${id}"
          value: { singleSelectOptionId: "${ OPTIONS[Math.floor(Math.random() * OPTIONS.length)].id }" }
        }
      ) {
        projectV2Item {
          fieldValueByName(name: "Status") {
            ... on ProjectV2ItemFieldSingleSelectValue {
                name
            }
          }
          
        }
      }
    }
  `;
  const [mutateFunction, { data, loading, error, reset }] =
    useMutation(UPDATE_STATUS);

  return (
    <Card
      css={css`
        margin: 2em auto;
        width: 400px;
      `}
    >
      <CardContent>
        {error && (
          <Alert
            severity="error"
            onClose={() => {
              reset();
            }}
          >
            {" "}
            Error: {error.message}
          </Alert>
        )}
        {data && (
          <Alert severity="success" onClose={() => {}}>
            {" "}
            Status Changed
          </Alert>
        )}
        <Typography variant="h5" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography
          css={css`
            color: peachpuff;
          `}
          color="text.secondary"
          component="div"
        >
          Created at {date}
        </Typography>
        {/*TODO Why are there so many status objects */}
        <Typography>Status: {statusState}</Typography>
        <Typography>Size: {size}</Typography>
        <Typography
          css={css`
            font-family: Roboto;
          `}
        >
          Opened by: {author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={url}>
          View Issue
        </Button>
        <Button
          size="small"
          onClick={(e) => {
            mutateFunction()
              .then((value) => {
                console.log( value.data.updateProjectV2ItemFieldValue.projectV2Item.fieldValueByName.name)

                if(value) {
                    setStatusState(value.data.updateProjectV2ItemFieldValue.projectV2Item.fieldValueByName.name)
                }
                reset();
                console.log("Status Changed");
                console.log("id: ", id);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Change Status
        </Button>
      </CardActions>
    </Card>
  );
};

export default IssueCard;
