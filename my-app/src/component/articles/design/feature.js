import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {  Link } from 'react-router-dom'

 const MAX_LENGTH = 250;
const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

export default function FeaturedPost(props) {
    const classes = useStyles();
    const { post } = props;

    return (
        <Grid item xs={12} md={6}>
                <main className={classes.card} id = "card">
                    <div className={classes.cardDetails}>
                    <Link to={`/articlesby/${post.article_id}`}>
                            <Typography component="h2" variant="h5" id = "h2">
                                {post.title}
                            </Typography>
                            </Link>
                            <Typography variant="subtitle1" color="textSecondary" id = "date">
                             {post.created_on}
                            </Typography>
                            
                                <div>
      {post.article.length > MAX_LENGTH ?
        (
            <Typography variant="subtitle1" paragraph id = "article">
            {`${post.article.substring(0, MAX_LENGTH)}...`}
            <Link to={`/articlesby/${post.article_id}`}>Read more</Link>
            </Typography>
            
        ) :
        <p>{post.article}</p>
      }
      
    </div>
 
                           
                    </div>
                </main>
        </Grid>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};