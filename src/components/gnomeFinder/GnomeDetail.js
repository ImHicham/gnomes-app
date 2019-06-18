import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FriendsList from './FriendsList';
import ProfessionsList from './ProfessionsList';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    img: {
        width: 200,
        maxHeight: 200
    }
}));

export default function GnomeDetail(props) {
    const classes = useStyles();

    let {thumbnail, name, age, weight, height, friends, professions} = props.gnomeViewed;



    return (
        <div>
            <Typography gutterBottom variant="h6" id="modal-title">
                {name}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <img src={thumbnail} className={classes.img} />
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom variant="subtitle1" id="modal-title">
                        <b>years</b> {age}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" id="modal-title">
                        <b>weight</b> {weight}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" id="modal-title">
                        <b>height</b> {height}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" id="modal-title">
                        Friends
                    </Typography>
                   <FriendsList list={friends} onGnomeSelected={props.onGnomeSelected}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" id="modal-title">
                        Professions
                    </Typography>
                    <ProfessionsList list={professions}/>
                </Grid>
            </Grid>

        </div>
    );
}
