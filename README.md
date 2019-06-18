## gnomes-app

gnomes-app is a single page app that allows you to browse gnome census data through a simple form, navigate between gnome profiles easily, and bookmark them for easy retrieving.

All the functionality is self-contained under the ***GnomeFinder*** component whose hierarchical structure looks like this:

- GnomeFinder
    - FilteredGnomesList
        - GnomeEntry
    - Searchbar
    - ModalLayout
        - GnomeDetail
            - FriendsList
            - ProfessionalsList
            
    

### build app

In the project directory, run to install dependencies:

### `npm install`

### run app

run app in development mode:

### `npm start`

Time to open your [browser](http://localhost:3000/) to know gnome people!

###requirements

- ***image caching:*** Implicit image caching didn't seem like a priority since census data is loaded only once summed with the fact that
 browsers already cache non-changed images, and the infinite scrolling mitigates long rendering lists. 
