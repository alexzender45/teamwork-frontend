import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment'

import {  Link } from 'react-router-dom'

 const MAX_LENGTH = 250;
const max = 50;
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
                            {moment(`${post.created_on}`).format('MMMM Do YYYY')}
                            </Typography>
 
                           
                    </div>
                </main>
            <CardActionArea>
                <Card className={classes.card} id = "maincard">
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5" id = "card">
                               {post.title}
                            </Typography>
                            <Typography style={topo} variant="subtitle1" color="textSecondary">
                            {moment(`${post.created_on}`).format('MMMM Do YYYY')}
                            </Typography>
                            <div>
                            {post.article.length > max ?
        (
            <Typography variant="subtitle1" paragraph id = "article">
            {`${post.article.substring(0, max)}...`} <Link to={`/articlesby/${post.article_id}`}>
                         Continue reading...

            </Link>
          </Typography>
        ) :
        <p>{post.article}</p>
      }
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};

const topo = {
    color: 'white'
}
