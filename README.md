# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](.\public\images\screenshot.jpeg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Axios
- [ReactTimeAgo](https://www.npmjs.com/package/react-time-ago) - for more user-friendly time stamp
- [React](https://reactjs.org/) - JS library
- [RESTful API](https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm) - Json File
- [CreateReactApp](https://github.com/facebook/create-react-app) - React Framework
- [Material UI](https://mui.com/) - For Button and Textfield Style
- [My JSON Server](https://my-json-server.typicode.com/) - Fake Online REST server

### Continued development

- Override Material UI TextField - for some reason MUI doesn't respond to styling in css through className, for now border of :focus() and :hover() is not uniformed to the theme given by the requirement.

- Smooth transition of ScrollIntoView - I used scrollIntoView but it is not smooth as the other website, for now its default is center, which positions the div of the comment at the center of the screen, whether you click at the top or bottom.

- Delete Animation/Notice - When I delete comment at the middle screen, it just disappear with no notice or no trace or too smooth to notice, you'll ask yourself "Did it get deleted?". 

### Useful resources

- [Interactive comments section](https://www.youtube.com/watch?v=T56dfxGHkKE) - This is the visualization I used in starting the project.
- [React Axios CRUD with JSON SERVER](https://www.youtube.com/watch?v=59z1_3-vTOk&t=701s) - This guy gave me an idea on how can I build the server-side, in which you can add, edit and delete, and the structure of the program.

## Author

- Github - [Claudde](https://github.com/Claudde)
- Frontend Mentor - [@Claudde](https://www.frontendmentor.io/profile/Claudde)
- Instagram - [@clauddeprizmo](https://www.instagram.com/clauddeprizmo/)
