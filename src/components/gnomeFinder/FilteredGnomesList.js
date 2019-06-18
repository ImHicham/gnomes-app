import React from 'react';
import Container from "@material-ui/core/Container/Container";
import GnomeEntry from "./GnomeEntry";
import Typography from "@material-ui/core/Typography/Typography";
import debounce from "lodash.debounce";

class FilteredGnomesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        }

        window.onscroll = debounce(() => {
            const {
                addPage
            } = this;

            // Checks that the page has scrolled to the bottom
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                addPage.call(this);
            }
        }, 100);
    }

    addPage() {
        let page = this.state.page;
        this.setState({
            page: page + 1
        })
    }

    restartPage() {
        this.setState({
            page: 1
        })
    }

    render() {
        if(this.props.isLoading)
            return <div>Loading...</div>;

        let elements;
        if(this.props.list.length === 0)
            elements = <Typography variant="caption" display="block" gutterBottom>List is empty!</Typography>;
        else {
            let countRenderedElements = this.state.page * this.props.elemsXPage;
            if (countRenderedElements > this.props.list.length)
                countRenderedElements = this.props.list.length;

            elements = this.props.list.slice(0, countRenderedElements).map(elem => {
                let bookmarkedList = this.props.bookmarkedList;
                let bookmarked = bookmarkedList.map( elem => elem.id).includes(elem.id);
                return <GnomeEntry bookmarked={bookmarked} handleDetails={this.props.handleDetails} handleBookmark={this.props.handleBookmark} key={elem.id} values={elem}/>
            });
        }

        return (
            <Container maxWidth="sm">
                <ul>
                    {elements}
                </ul>
            </Container>
        );
    }
}

export default FilteredGnomesList;
