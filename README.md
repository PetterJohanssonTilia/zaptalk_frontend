# ZapTalk

<p align="center">
    <img src="../zaptalk_frontend/src/assets/readme/responsive.jpeg" width=600>
</p>
<p align="center">
    Image generated using <a href="https://ui.dev/amiresponsive" target="_blank">https://ui.dev/amiresponsive</a>
</p>

## Project goals
ZapTalk is designed to be a social platform for classic movie enthusiasts, providing a virtual space for users to discover, watch, and discuss old films. The primary goals of the web app are to:

Offer a curated selection of classic movies, creating a centralized hub for vintage film appreciation. This includes a user-friendly interface to browse, search movies from various eras and genres.
Foster a community of classic movie fans by incorporating social features such as user profiles, following functionality, and a personalized feed that showcases friends' activities and recommendations.
Encourage engagement and discussion around classic films through features like commenting on movies, liking content, and sharing opinions with other users.
Deliver a simple and intuitive user experience suitable for a wide range of users, from casual viewers to dedicated cinephiles.
Implement a core set of essential features to create a functional and appealing platform, while establishing a solid foundation for future enhancements and additional social or movie-related functionalities.

# ZapTalk User Stories
<p align="center">
    <img src="../zaptalk_frontend/src/assets/readme/userstorydetailed.JPG" width=900>
    <img src="../zaptalk_frontend/src/assets/readme/userstorysmall.JPG" width=300>
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

<img src="../zaptalk_frontend/src/assets/readme/userstoryboard.JPG" width=600>

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
The initial planning phase for ZapTalk involved creating wireframes to visualize the layout and data models to help plan the functionality of the application. This process was crucial in establishing a clear direction for the project's design and user interface.

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

# Planned features

Besides improving the current feature, a major feature I had planned was a "Get random movie" functionality incase the user would get decision paralisys from the big movie list

## pages 

## components

# Frameworks, libraries and dependencies

# Testing

didn't do automatic testing and instead opted to do manual testing because page was so small
tables here

# Validator testing
### W3C CSS validator
### ESLint JavaScript validator
### WAVE web accessability testing
### Lighthouse testing


# Bugs

### Resolved bugs

### Unresolved bugs

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
Swirling hover effect youtube video

The following documentation was referenced extensively throughout the project:

React documentation
React Router Documentation

### Media
All the profile pictures and the jumbotron image were taken from pexels

### Fonts
The fonts being used were taken from google fonts
