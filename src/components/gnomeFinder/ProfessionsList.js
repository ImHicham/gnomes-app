import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography/Typography";



export default class ProfessionsList extends React.Component{
    render() {

        if (this.props.list.length == 0)
            return <Typography variant="caption" display="block" gutterBottom>Professions list empty</Typography>;
        return (
            <List component="nav" dense aria-label="Secondary mailbox folders">
                {this.props.list.map(professionName => {
                    return (
                        <ListItem button>
                            <ListItemText primary={professionName}/>
                        </ListItem>
                    );
                })}
            </List>
            );
        }

}
