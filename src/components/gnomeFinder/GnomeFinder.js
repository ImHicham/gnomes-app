import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Bookmarks from '@material-ui/icons/Bookmarks';
import Container from '@material-ui/core/Container';
import FilteredGnomesList from './FilteredGnomesList';
import properties from '../../properties';
import Searchbar from "./Searchbar";
import ModalLayout from './Modal';
import GnomeDetail from './GnomeDetail';
import Divider from '@material-ui/core/Divider';


class GnomeFinder extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            choosenTab: 0,
            backupList: [],
            list: [],
            filteredList: [],
            bookmarkedList: [],
            isLoading: false,
            gnomeViewed: {},
            detailsViewActive: false
        };

        this.tabChange = this.tabChange.bind(this);
        this.handleBookmark = this.handleBookmark.bind(this);
        this.handleListFilters = this.handleListFilters.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onGnomeSelected = this.onGnomeSelected.bind(this);

        //list ref
        this.child = React.createRef();
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(properties.CENSUS_API)
            .then(response => response.json())
            .then(data => this.setState({ backupList: data.Brastlewark, list: data.Brastlewark, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    tabChange(e, choosenTab) {
        this.setState({choosenTab: choosenTab});
    }

    handleBookmark(entry, bookmarked) {
        console.log(entry);
        console.log(bookmarked);
        let bookmarkedList = this.state.bookmarkedList;
        if (bookmarked)
            bookmarkedList = this.state.bookmarkedList.filter(elem => elem.id != entry.id);
        else
            bookmarkedList.push(entry);

        this.setState({
            bookmarkedList: bookmarkedList
        });
    }

    handleListFilters(filters) {

        let {backupList, filteredList } = this.state;
        let {name} = filters;

        filteredList = backupList;
        if(name)
            filteredList = backupList.filter( elem => elem.name.toLowerCase().indexOf(name.toLowerCase()) > -1);

        //restart infinite scrolling when searching
        this.child.current.restartPage();
        this.setState({
            list: filteredList
        });
    }

    handleDetails(gnome) {

        //get friends data

        let {backupList} = this.state;

        let friends = backupList.filter(elem => gnome.friends.includes(elem.name));
        gnome.friends = friends;

        this.setState({
            gnomeViewed: gnome,
            detailsViewActive: true
        });
    }

    onModalClose() {
        this.setState({
            detailsViewActive: false
        });
    }

    onGnomeSelected(gnome) {
        this.handleDetails.call(this, gnome);
    }

    render() {
        let list;
        if(this.state.choosenTab == 0)
            list = <FilteredGnomesList elemsXPage={properties.ELEMENTS_X_PAGE} ref={this.child} handleDetails={this.handleDetails} handleBookmark={this.handleBookmark} list={this.state.list} bookmarkedList={this.state.bookmarkedList} handleBookmark={this.handleBookmark} isLoading={this.state.isLoading}/>;
        else
            list = <FilteredGnomesList elemsXPage={properties.ELEMENTS_X_PAGE} ref={this.child} handleDetails={this.handleDetails} handleBookmark={this.handleBookmark} list={this.state.bookmarkedList} bookmarkedList={this.state.bookmarkedList} handleBookmark={this.handleBookmark} isLoading={this.state.isLoading}/>;
        return (
                <Container maxWidth="sm">

                    <Container maxWidth="sm">
                       <Searchbar onSubmit={this.handleListFilters}/>
                    </Container>

                    <Divider />

                    <Tabs
                        value={this.state.choosenTab}
                        onChange={this.tabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab icon={<PermIdentity />} label="GNOMES" />
                        <Tab icon={<Bookmarks />} label="BOOKMARKED" />
                    </Tabs>

                    {list}

                    <ModalLayout onClose={this.onModalClose} active={this.state.detailsViewActive}>
                        <GnomeDetail gnomeViewed={this.state.gnomeViewed} onGnomeSelected={this.onGnomeSelected}/>
                    </ModalLayout>

                </Container>
        );
    }

}


export default GnomeFinder;
