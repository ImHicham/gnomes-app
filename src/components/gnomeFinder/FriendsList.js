import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';



export default class FriendsList extends React.Component{

    constructor(props) {
        super(props);
        this.onGnomeSelected = this.onGnomeSelected.bind(this);
    }

    onGnomeSelected (gnome) {
        this.props.onGnomeSelected(gnome);
    }

    render() {
        if (this.props.list.length == 0)
            return <Typography variant="caption" display="block" gutterBottom>Friends list empty</Typography>;

        return(
            <List dense>
                {this.props.list.map(gnome => {
                    const labelId = `checkbox-list-secondary-label-${gnome.name}`;
                    return (
                        <ListItem key={gnome.id} button onClick={this.onGnomeSelected.bind(null, gnome)}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={gnome.name}
                                    src={gnome.thumbnail}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={gnome.name} />
                        </ListItem>
                    );
                })}
            </List>
        )
    }
}
