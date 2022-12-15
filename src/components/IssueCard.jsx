// Display information about an issue and link to its GitHub page
import React from 'react';
import {CardActions, CardContent, Card, Typography, Button} from "@mui/material";

const IssueCard = ({title, url, date}) => {

    return (
        <Card >
            <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                    {title}
                </Typography>
                <Typography sx={{ fontSize: 14}} color="text.secondary" component="div">
                    Created at {date}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" href={url}> View Issue</Button>

            </CardActions>
        </Card>
    )
}


export default IssueCard
