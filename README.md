# ZapTalk

<p align="center">
    <img src="../zaptalk_frontend/src/assets/readme/responsive.jpeg" width=600>
</p>
<p align="center">
    Image generated using <a href="https://ui.dev/amiresponsive" target="_blank">https://ui.dev/amiresponsive</a>
</p>
# ZapTalk README - Table of Contents

1. [Project Goals](#project-goals)
2. [User Stories](#user-stories)
   - [Board Structure](#board-structure)
   - [Story Sizing](#story-sizing)
   - [Categories](#categories)
3. [Agile Development Methodology](#agile-development-methodology)
4. [Planning](#planning)
   - [Wireframes](#wireframes)
   - [Data Models](#data-models)
5. [Design](#design)
   - [Colors](#colors)
   - [Fonts](#fonts)
6. [Features](#features)
7. [Pages](#pages)
8. [Frameworks, Libraries, and Dependencies](#frameworks-libraries-and-dependencies)
9. [Testing](#testing)
   - [Manual Testing](#manual-testing)
   - [Validator Testing](#validator-testing)
10. [Bugs](#bugs)
    - [Resolved Bugs](#resolved-bugs)
    - [Unresolved Bugs](#unresolved-bugs)
11. [Future Improvements](#future-improvements)
12. [Deployment](#deployment)
13. [Credits](#credits)
    - [Media](#media)
    - [Fonts](#fonts)

## Project goals
ZapTalk is designed to be a social platform for classic movie enthusiasts, providing a virtual space for users to discover, watch, and discuss old films. The primary goals of the web app are to:

Offer a curated selection of classic movies, creating a centralized hub for vintage film appreciation. This includes a user-friendly interface to browse, search movies from various eras and genres.
Foster a community of classic movie fans by incorporating social features such as user profiles, following functionality, and a personalized feed that showcases friends' activities and recommendations.
Encourage engagement and discussion around classic films through features like commenting on movies, liking content, and sharing opinions with other users.
Deliver a simple and intuitive user experience suitable for a wide range of users, from casual viewers to dedicated cinephiles.
Implement a core set of essential features to create a functional and appealing platform, while establishing a solid foundation for future enhancements and additional social or movie-related functionalities.

# ZapTalk User Stories
<p align="center">
    <img src="../zaptalk_frontend/src/assets/readme/userstorydetailed1.jpg" 
    width=900>
    <img src="../zaptalk_frontend/src/assets/readme/userstorysmall1.jpg" width=300>
</p>

## Board Structure
Our user stories are organized on a board with the following columns:
- Backlog
- To Do
- In Progress
- Review
- Complete

## Story Sizing
Each user story is labeled with a size estimate:
- S (Small)
- M (Medium)
- L (Large)
- XL (Extra Large)

Additionally, stories essential for the Minimum Viable Product (MVP) are labeled as such.

## Categories
User stories are grouped into the following categories:

### 1. Auth
Auth stories cover all aspects of user authentication and account management. This includes:

- User registration
- Login/logout functionality
- Delete user
- Password reset
- Edit profile
- see users follows/comments/likes

### 2. Movie
Movie stories relate to the core functionality of browsing, searching, reading about movies and liking/commenting on movies. This category includes:

- Movie listing and details
- Search and filter capabilities
- Comment on movies
- Like movies and comments

### 3. Interact
Interact stories focus on user engagement with other users. This encompasses:

- Search users
- Follow/Unfollow users
- View user profile

### 4. Feed
Feed stories deal with the social aspects of the platform and how users see content from others. This includes:

- Personalized activity feed
- Acces movies from feed
- Recieve notifications from other users activity

### 5. Admin
Admin stories cover the management of the platform. This category includes:
- Ban/Unban users
- View banned users
- Let users submit a ban appeal
- See the ban appeals and be able to unban users
- Deleting users comments

These categories ensure that all aspects of the ZapTalk platform are addressed in our user stories, from core movie functionality to social features and administrative tasks.

## Agile development methodology

<img src="../zaptalk_frontend/src/assets/readme/userstoryboard1.jpg" width=600>

Development Methodology
We employ a flexible development approach using GitHub issues and projects. Our process includes:

### User Stories as GitHub Issues:
Each user story is created as a GitHub issue.

### Story Labeling:
Size estimates are applied as labels: S (Small), M (Medium), L (Large), XL (Extra Large).
Stories essential for the Minimum Viable Product (MVP) are labeled as such.

### Product Backlog:
The product backlog is represented by all open issues in the project.
New user stories are added to this backlog as they are identified.

### GitHub Project Board:
We use GitHub's standard project board functionality.
The board contains columns for: Backlog, To Do, In Progress, Review, and Complete.
User stories move through these columns as work progresses.

### Progress Tracking:

When work is ready to begin on a story, it's moved from the Backlog to the To Do column.
As active work begins on a story, it's moved to In Progress.
While inside In Progress the checkers were being filled in as the story was getting completed.
Completed work moves to Review for checking.
Once approved, stories are moved to the Complete column.

### Continuous Review:
The project board is reviewed regularly to monitor progress and adjust priorities as needed.
This flexible approach allows for ongoing assessment and adaptation of the project's direction.

This methodology provides a structured yet flexible approach to developing ZapTalk. It allows for continuous progress and adjustment of priorities, while maintaining a clear overview of the project status using GitHub's built-in tools.

# Planning
The initial planning phase for ZapTalk involved creating wireframes to visualize the layout looking at the data models to help plan the functionality of the application. This process was crucial in establishing a clear direction for the project's design and user interface.

## Wireframes
### Home
<img src="../zaptalk_frontend/src/assets/readme/wireframehome.jpg" width=400>

### Movies list
<img src="../zaptalk_frontend/src/assets/readme/wireframemovies.jpg" width=400>

### Movie detail
<img src="../zaptalk_frontend/src/assets/readme/wireframemoviedetail.jpg" width=400>

### Feed
<img src="../zaptalk_frontend/src/assets/readme/wireframefeed.jpg" width=400>

### Profiles
<img src="../zaptalk_frontend/src/assets/readme/wireframeprofiles.jpg" width=400>

### Profile detail
<img src="../zaptalk_frontend/src/assets/readme/wireframeprofiledetail.jpg" width=400>

### Profile edit
<img src="../zaptalk_frontend/src/assets/readme/wireframeeditprofile.jpg" width=400>

### Data models

Datamodels can be found in the Zaptalk api readme

# Design

The design philosophy was about making the website as simple and intuiative as possible with clear navigation and definition around the buttons/objects that can be interacted with

### Colors
The colors were centered around creating an old school cinema feeling, which is why the black and white colors were used a lot.

| Colour                                                                   |  |
|--------------------------------------------------------------------------|------------------|
| Primary text color - used buttons and most ui elements                   | bootstraps text-white|
| Secondary text color - used for headers, and inside objects              | #fff          |
| Background - a dark grey                                                 | #181818          |
| Object backgrounds - a lighter grey                                      | bootstraps bg-dark         |




### Fonts

The fonts being used on the buttons, and text were the standard system fonts

* Helvetica on macOS
* Arial on Windows
* Roboto on Android

I thought this looked clean and simple and I didn't feel that a font change was needed

For the h1 heading I used the font Merriweather for it's older and more elegant look

# Features

### Landing page with jumbotron and trending movies
The landing page features an image and a problem this website solves for the user along with a trending section to entice the user to dig deeper into the site

<img src="../zaptalk_frontend/src/assets/readme/featurejumbotron1.jpg" width=400>
<img src="../zaptalk_frontend/src/assets/readme/featuretrendingnow1.jpg" 
width=400>

### Registration form
User story AUTH-1

The registration form enables a user to open a new account, by entering username, password and email. with validation on the input fields.

<img src="../zaptalk_frontend/src/assets/readme/featureregister1.jpg" width=400>

### Login form
User story AUTH-2

The login form enables users to login while also getting access to the registration form and ban appeals form

<img src="../zaptalk_frontend/src/assets/readme/featurelogin1.jpg" width=400>

### Ban appeal form
Userstory AUTH-9

From the login you can find the ban appeal form which lets the user appeal for an un-ban to the superusers

<img src="../zaptalk_frontend/src/assets/readme/featurebanappeal1.jpg" width=400>

### Ban page

User story ADMIN-1 ADMIN-2 ADMIN-3

Inside the superusers ban link you can find a form to ban users, view a list of banned users and a list of all the ban appeals

<img src="../zaptalk_frontend/src/assets/readme/featurebanusers1.jpg" width=400>
<img src="../zaptalk_frontend/src/assets/readme/featureactivebans1.jpg" width=400>
<img src="../zaptalk_frontend/src/assets/readme/featurebanappeals1.jpg" width=400>

### Edit profile page

Userstory AUTH-3 AUTH-4 AUTH-5 INTERACT-2 INTERACT-3

In the edit profile page the user can find a way to edit their profile, delete their profile, and see their following list

<img src="../zaptalk_frontend/src/assets/readme/featureeditprofile1.jpg" width=400>
<img src="../zaptalk_frontend/src/assets/readme/featurefollowinglist1.jpg" width=400>

### Navbar

The navbar component contains links to Movies, Profiles, Feed. A notification bell and the users profile

<img src="../zaptalk_frontend/src/assets/readme/featurenavbar1.jpg" width=400>

### Notification dropdown
User story FEED-3

The notification bell turns red and shows the numbers of new notifications that are unread. The dropdown shows which users have followed or liked your comments

<img src="../zaptalk_frontend/src/assets/readme/featurenotifications1.jpg" width=400>

### User dropdown
User story AUTH-2

The user dropdown contains links to the users profile page, logout and for superusers the access to bans

<img src="../zaptalk_frontend/src/assets/readme/featureprofiledropdown1.jpg" width=400>

### Movie list page

User story MOIVE-1 

The movielist page has a search and filter feature and displays all the movies in a grid with an added hover effect to easier navigate

<img src="../zaptalk_frontend/src/assets/readme/featuremovielist1.jpg" width=400>
<img src="../zaptalk_frontend/src/assets/readme/featuremoviefilters1.jpg" width=400>

### Movie detail page

User stories MOVIE-2, MOVIE-3, MOVIE-4, MOVIE-5, MOVIE-6
The movie detail page features the thumbnail of the movie along with a text description. It features the like functionality, along with a comment field and likes for comments
 
<img src="../zaptalk_frontend/src/assets/readme/featuremoviethumbnail.jpg" width=400>

### Like 

User stories MOVIE-3, MOVIE-6

The like feature can be found in the movie detail and when viewing comments

<img src="../zaptalk_frontend/src/assets/readme/featurelike1.jpg" width=400>

### Comments

User stories MOVIE-4, MOVIE-5, MOVIE-6

The comment section is found inside a movie detail view and lets you write a comment, edit and delete your own comment, the superuser can delete everyones comments and you can also find and like other users comments

<img src="../zaptalk_frontend/src/assets/readme/featurecomment1.jpg" width=400>
<img src="../zaptalk_frontend/src/assets/readme/featureeditcomment1.jpg" width=400>

### Profile list

Userstory INTERACT-1

The profile list can be found from the navbar and shows a list of all profiles and has a search functionality

<img src="../zaptalk_frontend/src/assets/readme/featureprofiles1.jpg" width=400>

### Profile detail

Userstories INTERACT-2 

The profile view lets you see a users avatar,bio, their number of followers and their karma, which is how many likes their comments have recieved, here you can follow/unfollow the profile and superusers can also delete a profile from this view.

<img src="../zaptalk_frontend/src/assets/readme/featureprofiledetail1.jpg" width=400>

### Feed

Userstories FEED-1, FEED-2

In the feed page you'll find a feed from the users you follow, you'll see a list of movies they have either liked or commented on

<img src="../zaptalk_frontend/src/assets/readme/featurefeed1.jpg" width=400>

## Planned features

- Allow users fill out a form to upload new movies to the site
- "Get random movie" functionality incase the user would get decision paralisys from the big movie list
- A way for the user to change username, password and reset password with email functionality
- Validation on ban appeals - currently anyone can make a ban appeal for anyone
- Superuser should be able to comminucate better with people when adressing ban appeals
- Liked movies and users followed should be clickable to be displayed on a users profile
- A list of "Users top 10 movies" to be added on their profile page

# Pages

Here's the pages on a desktop view for you to get a quick overview on where the features are placed

### Homepage containing jumbotron and trending
<img src="../zaptalk_frontend/src/assets/readme/homepage2.jpg" width=900>

### Movielist page with search filters
<img src="../zaptalk_frontend/src/assets/readme/movielistpage1.jpg" width=900>

### Moviedetail page like/comments
<img src="../zaptalk_frontend/src/assets/readme/moviedetailpage1.jpg" width=900>

### Profilelistpage with search
<img src="../zaptalk_frontend/src/assets/readme/profilelistpage1.jpg" width=900>

### Feedpage
<img src="../zaptalk_frontend/src/assets/readme/feedpage1.jpg" width=900>



# Frameworks, libraries and dependencies


## React
* react (v18.3.1) and react-dom (v18.3.1) - These are the core libraries for building the user interface of the application. React allows for the creation of reusable UI components, while react-dom provides DOM-specific methods for rendering these components in the browser.

## React Router DOM
* react-router-dom (v6.26.1) - This library enables client-side routing in React applications. It's used to implement navigation between different views or pages within the single-page application, enhancing the user experience by allowing for seamless transitions without full page reloads.

## Axios
* axios (v1.7.7) - Axios is a popular HTTP client for making API requests. It simplifies the process of sending asynchronous HTTP requests to REST endpoints and handling responses. Its features include automatic request and response transformations, request cancellation, and better error handling compared to native fetch.

## Bootstrap and React Bootstrap
* bootstrap (v5.3.3) and react-bootstrap (v2.10.4) - These libraries provide a comprehensive set of pre-styled components and a responsive grid system. React Bootstrap offers React-specific implementations of Bootstrap components, allowing for easier integration with React applications and providing additional features like accessibility and React-friendly APIs.

## Lucide React
* lucide-react (v0.445.0) - This is a library of simply beautiful open-source icons. It provides a wide range of customizable SVG icons that can be easily integrated into React components, enhancing the visual appeal and user experience of the application.

## Date-fns
* date-fns (v4.1.0) - This modern JavaScript date utility library provides comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js. It's particularly useful for any date-related operations in your application, such as formatting, parsing, or calculating time differences.

## Testing Libraries
* @testing-library/react (v13.4.0), @testing-library/jest-dom (v5.17.0), and @testing-library/user-event (v13.5.0) - These libraries are part of the Testing Library family, which provides simple and complete testing utilities that encourage good testing practices. They're used for writing unit and integration tests for React components, ensuring the reliability and correctness of the application's UI.

## Additional Utilities
* react-bootstrap-icons (v1.11.4) - This library provides a set of free, high-quality SVG icons from the Bootstrap Icons library, specifically packaged for easy use in React applications.

* web-vitals (v2.1.4) - This library is used to measure the real-world performance of your app. It helps in tracking and visualizing the Core Web Vitals, which are important metrics for ensuring a good user experience.

* react-scripts (5.0.1) - This package includes scripts and configuration used by Create React App. It provides a set of scripts for developing, testing, and building React applications, abstracting away the complexity of configuring tools like webpack and Babel.

These libraries and frameworks work together to provide a robust foundation for building a modern, responsive, and user-friendly React application. They cover essential aspects such as UI components, routing, HTTP requests, date handling, icons, and testing, enabling efficient development and maintenance of the application.

# Testing

I've opted for manual testing since the project is still fairly small making it feasable. This way I can get more reliable testing.

## Navbar
| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Logo | Clicking takes user to homepage | Takes user to homepage |
| Profiles link | Clicking takes user to profile list | Takes user to profile list |
| Feed link | Clicking takes user to user feed | Takes user to user feed |
| Notification icon | Clicking opens notification dropdown | Opens notification dropdown |
| Notification in dropdown | Clicking marks notification as read | Marks notification as read |
| Avatar in notification | Clicking takes user to that profile | Takes user to that profile |
| Profile icon | Clicking opens profile dropdown | Opens profile dropdown |
| Profile link in dropdown | Clicking takes user to their profile | Takes user to their profile |
| Bans link in dropdown (superusers only) | Clicking takes superuser to bans page | Takes superuser to bans page |
| Logout button in dropdown | Clicking logs out the user | Logs out the user |

## Movie list
| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Search movies input field | Filters movies based on search term | Filters movies based on search term |
| Genre dropdown | Displays list of genres; selecting a genre filters movies | Displays genres and filters movies when selected |
| Most liked filter button | Filters movies by most likes | Filters movies by most likes |
| Most commented filter button | Filters movies by most comments | Filters movies by most comments |
| Friends favorites filter | Filters movies by likes from followed users | Filters movies by likes from followed users |
| Combined filters | All filter combinations work together | All filter combinations work together as expected |
| Movie card grid | Displays movie cards with thumbnail, title, number of likes and comments | Displays movie cards with all required information |
| Movie card hover effect | Shows a visual effect when hovering over a movie card | Displays hover effect on movie cards |
| Movie card click | Clicking a movie card navigates to that movie's detailed page | Navigates to the movie's detailed page when clicked |

## Movie detail

| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Like button | Updates number of likes and reflects change to user | Updates number of likes and reflects change to user |
| Comment section | Allows user to write and post comments | Allows user to write and post comments |
| Posting empty comment | Displays error: "Can't write an empty comment" | Displays error: "Can't write an empty comment" |
| Successful comment post | Displays message: "Comment posted" | Displays message: "Comment posted" |
| Edit own comment | User can edit their own comments | User can edit their own comments |
| Delete own comment | User can delete their own comments | User can delete their own comments |
| Superuser comment deletion | Superuser can delete any user's comments | Superuser can delete any user's comments |
| Like comments | User can like comments, number of likes updates | User can like comments, number of likes updates |

## Profile list

| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| User search | Allows searching for users by name | Allows searching for users by name |
| User display | Shows list of users with their names, followers, and karma | Shows list of users with their names, followers, and karma |
| User profile link | Clicking on a user navigates to their profile page | Clicking on a user navigates to their profile page |

## Profile Detail

| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Profile information display | Shows avatar, followers count, karma, and about me | Shows avatar, followers count, karma, and about me |
| Follow button | Clicking increases follower count and changes to Unfollow button | Clicking increases follower count and changes to Unfollow button |
| Unfollow button | Clicking decreases follower count and changes to Follow button | Clicking decreases follower count and changes to Follow button |
| Delete button (superuser only) | Visible to superusers; clicking deletes the user | Visible to superusers; clicking deletes the user |

## Feed page
| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Feed objects display | Shows all feed objects | Shows all feed objects |
| Movie thumbnail link | Clicking on movie thumbnail navigates to movie detail page | Clicking on movie thumbnail navigates to movie detail page |
| Movie title link | Clicking on movie title navigates to movie detail page | Clicking on movie title navigates to movie detail page |
| User avatar link | Clicking on user avatar navigates to user's profile page | Clicking on user avatar navigates to user's profile page |
| Username link | Clicking on username navigates to user's profile page | Clicking on username navigates to user's profile page |

## Edit profile page
| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Change email | Allows user to update email address | Allows user to update email address |
| Change bio | Allows user to update bio information | Allows user to update bio information |
| Upload avatar | Allows user to choose and upload a new avatar image | Allows user to choose and upload a new avatar image |
| Update profile button | Saves changes and displays "Profile updated" message | Saves changes and displays "Profile updated" message |
| Delete account button | Shows warning: "Are you sure you want to delete your account?" | Shows warning: "Are you sure you want to delete your account?" |
| Account deletion confirmation | Deletes the user account when confirmed | Deletes the user account when confirmed |
| Following list display | Shows list of users being followed | Shows list of users being followed |
| Following user name link | Clicking navigates to the followed user's profile | Clicking navigates to the followed user's profile |
| Following user avatar link | Clicking navigates to the followed user's profile | Clicking navigates to the followed user's profile |
| Unfollow button | Allows user to unfollow a profile from the list | Allows user to unfollow a profile from the list |

## Ban page
| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Ban user form | Allows entering username and reason for ban | Allows entering username and reason for ban |
| Ban user button | Submits ban request for specified user | Submits ban request for specified user |
| Active bans list | Displays list of currently banned users | Displays list of currently banned users |
| Unban user button (active bans) | Allows unbanning a user from the active bans list | Allows unbanning a user from the active bans list |
| Ban appeals list | Displays list of users who have appealed their bans | Displays list of users who have appealed their bans |
| Unban user button (appeals) | Allows unbanning a user from the ban appeals list | Allows unbanning a user from the ban appeals list |

## Ban appeal form
| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Username field | Allows entry; cannot be empty | Allows entry; cannot be empty |
| Email field | Allows entry; cannot be empty | Allows entry; cannot be empty |
| Ban appeal text field | Allows entry; cannot be empty | Allows entry; cannot be empty |
| Submit appeal button | Submits form if all fields are filled | Submits form if all fields are filled |
| "Click here to login" link | Navigates to the login page | Navigates to the login page |

## Registration form
| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Username field | Allows entry; cannot be empty | Allows entry; cannot be empty |
| Email field | Allows entry; cannot be empty | Allows entry; cannot be empty |
| Password field | Allows entry; cannot be empty | Allows entry; cannot be empty |
| Confirm password field | Allows entry; cannot be empty | Allows entry; cannot be empty |
| Register button | Submits form if all fields are filled and valid | Submits form if all fields are filled and valid |
| "Click here to login" link | Navigates to the login page | Navigates to the login page |

## Login form
| Feature | Expected Outcome | Actual Outcome |
| --- | --- | --- |
| Username field | Allows entry with validation | Allows entry with validation |
| Email field | Allows entry with validation | Allows entry with validation |
| Password field | Allows entry with validation | Allows entry with validation |
| Confirm password field | Allows entry with validation | Allows entry with validation |
| Registration button | Submits form and creates new account if all fields are valid | Submits form and creates new account if all fields are valid |
| "Click here to login" link | Navigates to the login page | Navigates to the login page |

# Validator testing
### W3C CSS validator
https://jigsaw.w3.org/css-validator/

All pages have been looked at with wc3 css validator

<img src="../zaptalk_frontend/src/assets/readme/w3ccssvalidator.jpg" width=900>

### ESLint JavaScript validator
https://validatejavascript.com/

All JavaScript files were validated using the ESLint JavaScript validator. 

<img src="../zaptalk_frontend/src/assets/readme/eslintnoerror1.jpg" width=900>

The following issues were identified and corrected:

Moved functions to the top to be defined before being used
Unescaped apostrophies in HTML text in some components.
Added missing commas, linebreaks, button types, tabindexes.
Added keydown for keyboard event handling
Changed error to be errorMessage to avoid shadowing
Nested my inputs inside of labels to fix the formcontrol
Removed unused functions and imports
Added a cust confirmation box isntead of using alert window

<img src="../zaptalk_frontend/src/assets/readme/eslinterror.jpg" width=900>

ESLint errors still showing is because the checker can't see that I've added linebreaks on the longer lines


### WAVE web accessability testing

All the pages have been looked through with WAVE.
<img src="../zaptalk_frontend/src/assets/readme/wavemovies.jpg" width=900>

The following issues were identified and corrected:
Inputfields missing labels

<img src="../zaptalk_frontend/src/assets/readme/wavealerts.jpg" width=900> 
Most of the alerts are from Wave thinking I'm inputing the same lines mutiple times when I'm rendering moviecard.title for example.

I've also got a noscript element alert, but decided to keep that to import the users they need to use Javascript to run the app

Alerts that still needing fixing:
Skipped heading level - Since I'm wrongly using headers for styling I have skipped a lot of heading levels

### Page-speed-insights 

https://pagespeed.web.dev/
The pages have been looked through with Pagespeedinsight and the largest contentful pain element is
the use of PNG for my movies and homepage big images.

<img src="../zaptalk_frontend/src/assets/readme/pagespeedinsights.jpg" width=900> 

In my movielist, since my api is using wikipedia links to display the images they're also displayed as .PNG

# Bugs

- This isn't a bug but a design flaw that should be addressed. I'm filtering for movies with thumbnails on the frontend instead of the backend, that should be changed
- I'm using wikipedia urls to display the thumbnails and when wikipedia changes their thumbnail urls the filtering still think the object has a thumbnail, but since the url is changed it's a broken image.


### Resolved bugs
No movies found - https://github.com/PetterJohanssonTilia/zaptalk_frontend/issues/36
Can't click filter buttons when pagination is loading - https://github.com/PetterJohanssonTilia/zaptalk_frontend/issues/35
Failed to fetch trending movies - https://github.com/PetterJohanssonTilia/zaptalk_frontend/issues/34
Movielist cant be seen when logged out - https://github.com/PetterJohanssonTilia/zaptalk_frontend/issues/33 
Genre filter - https://github.com/PetterJohanssonTilia/zaptalk_frontend/issues/2
Pagination - https://github.com/PetterJohanssonTilia/zaptalk_frontend/issues/3

### Unresolved bugs
When the user is loged out from losing its token the page doesn't refresh so it still appears as you're logged in.

The search field in the movielist doesn't search if you type to fast so the user has to add or remove a character to update the search

# Future improvements
Making a more robust fetching of movies and other api calls. Currently the homepages trending section is fetching all 7500 movies to display 3 movies. the Movie page is also trying to fetch all the movies at once but is saved by the pagination.

# Deployment
To deploy to Heroku, follow these steps:

Fork or clone this repository in GitHub.
If you have also cloned and deployed your own version of the TribeHub Django Rest Framework API, you will need to ensure the value of axios.defaults.baseURL in src/api/axiosDefaults.js is set to the base URL for your API. Pull to your local development environment and push back to GitHub if necessary; otherwise, leave as is to use the original TribeHub API.
Log in to Heroku.
Select 'Create new app' from the 'New' menu at the top right.
Enter a name for the app and select the appropriate region.
Select 'Create app'.
Select the 'Deploy' tab at the top.
Select 'GitHub' from the deployment method options to confirm you wish to deploy using GitHub. You may be asked to enter your GitHub password.
Find the 'Connect to GitHub' section and use the search box to locate your repo.
Select 'Connect' when found.
Optionally choose the main branch under 'Automatic Deploys' and select 'Enable Automatic Deploys' if you wish your deployed site to be automatically redeployed every time you push changes to GitHub.
Find the 'Manual Deploy' section, choose 'main' as the branch to deploy and select 'Deploy Branch'.
When deployment is complete, you will be given a link to the deployed site.

# Credits
The swirling hover effect on the movies came from:
https://www.youtube.com/watch?v=ezP4kbOvs_E

The following documentation was referenced extensively throughout the project:

React documentation
React Router Documentation
Code-institutes Moments walkthrough project

### Media
All the images were taken from pexels.com

### Fonts
The fonts being used were taken from google fonts
