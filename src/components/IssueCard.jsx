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

const IssueCard = ({ title, url, date, status, size, author, id }) => {
  const UPDATE_STATUS = gql`
    mutation {
      updateProjectV2ItemFieldValue(
        input: {
          projectId: "PVT_kwHOAPbz6M4AFgdY"
          fieldId: "PVTSSF_lAHOAPbz6M4AFgdYzgDLHRk"
          itemId: ${id.toString()}
          value: ${{
            singleSelectOptionId: status === "🆕 New" ? "d9e87506" : "48ca5fc8",
          }}})
       {
        clientMutationId
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
        <Typography>Status: {status}</Typography>
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
        <Button size="small" onClick={(e) => mutateFunction()}>
          Change Status
        </Button>
      </CardActions>
    </Card>
  );
};

export default IssueCard;
