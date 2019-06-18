import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";

class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            search: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        this.props.onSubmit(this.state);
    }

    handleChange(e) {

        if(this.state.search)
            clearTimeout(this.state.search);

        let typingSearchHandler = setTimeout( () => {this.handleSubmit()}, 1000);

        let name = e.target.name;
        this.setState({
            [name]: e.target.value,
            search: typingSearchHandler
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="searchForm">
                    <TextField fullWidth value={this.state.name} autoFocus={true} name="name" label="TYPE A NAME" onChange={this.handleChange} />
                </div>
            </form>
        );
    }
}

export default Searchbar;
