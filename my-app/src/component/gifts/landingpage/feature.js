import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {  Link } from 'react-router-dom'
import './design.css'

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
        <Grid item xs={12} md={12}>
                <main className={classes.card} id = "card">
                    <div className={classes.cardDetails}>
                    <Link to={`/giftsby/${post.gift_id}`}>
                            <Typography component="h2" variant="h5" id = "h2">
                                {post.title}
                            </Typography>
                            </Link>
                            <Typography variant="subtitle1" color="textSecondary" id = "date">
                             {post.created_on}
                            </Typography>
                            
                                <div id = "gifts">
            <Link to={`/giftsby/${post.gift_id}`}>
            <img id = "imgs" src = {post.image_url} alt = "Something went wrong"/>
            </Link>
    </div>
 
                           
                    </div>
                </main>
        </Grid>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};
