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