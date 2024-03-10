import * as React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const CommentBox = (props) => {
    return (
        <div>
            <Grid item xs={12} md={6}>

                <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1, width:'100%'}}>
                    
                    <Typography component="h2" variant="h5">
                        {props.author}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        {props.content}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
        </div>
    )
}

export default CommentBox;