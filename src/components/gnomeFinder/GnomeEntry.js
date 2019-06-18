import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Bookmark from '@material-ui/icons/Bookmark';
import Pageview from '@material-ui/icons/Pageview';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        marginTop: 10,
        backgroundColor: "#f5f5f5",
        maxHeight: 125
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        width: 151,
        minHeight: 125
    },
    button: {
        margin: theme.spacing(1)
    }
}));

export default function GnomeEntry(props) {
    const theme = useTheme();
    const classes = useStyles(theme);

    let handleBookmark = (e) => {
        props.handleBookmark(props.values, props.bookmarked);
    }

    let handleDetails = () => {
        props.handleDetails(props.values);
    }

    return (
        <Card raised className={classes.card}>

            <Grid container>
                <Grid item xs={8}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h6" variant="h6">
                                {props.values.name}
                            </Typography>
                            <IconButton onClick={handleDetails} className={classes.button} aria-label="Detail">
                                <Pageview />
                            </IconButton>
                            <IconButton onClick={handleBookmark} className={classes.button} aria-label="Bookmark">
                                {props.bookmarked ? (<Bookmark />) : (<BookmarkBorder />)}
                            </IconButton>
                        </CardContent>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <CardMedia
                        className={classes.cover}
                        image={props.values.thumbnail}
                        title={props.values.name}
                        component="img"
                    />
                </Grid>
            </Grid>

        </Card>
    );
}
