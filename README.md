# CloudNotes

Check out the [deployed](https://intense-sea-86093.herokuapp.com/) web page on Heroku 
# Get started 

You can clone or fork the repository in the upper right hand corner. Once you get a local copy downloaded into your machine, cd into the frontend folder and run 'npm install'. This should install all of the dependancies used in this project. Then, run 'npm start' to run the web page. 

## Technologies Used 

For the frontend, I used the ReactJS framework. I also used the command line tool Create React App to get started with this project. 

The dependancies I used: 
* Axios to make the API calls to Flickr 
* React-Router-Dom for routing 
* ECMAScript 6

## Challenges I faced while developing this challenge 

Personally, I haven't used iframe in my projects since it requires manipulating the DOM, which could be dangerous when working with React's virtual DOM. The first issue I ran into was rendering the Embedded page of the project into the iframe. With enough digging through stackover flow, I found the solution [here](https://stackoverflow.com/questions/45135861/react-js-iframe-src).  

The second issue I ran into was lack of documentation on the Flickr site. They did not document how to construct the source url to render images. I found extended documentation [here](https://idratherbewriting.com/learnapidoc/docapis_flickr_example.html). I decided to opt out of using an NPM module for the carousel. I created the carousel components from scratch (my first time doing that). 

The final issue I ran into was passing the information from the Embedding page into the Embedded page. I had to do extensive detective work to finally find a solution. The solution was inspired from a combination of sources: [this](https://stackoverflow.com/questions/25098021/securityerror-blocked-a-frame-with-origin-from-accessing-a-cross-origin-frame) stackoverflow question, [this](https://medium.com/@ariel.salem1989/communicating-with-iframes-712fdc2b4d14) Medium article, and [this](http://blog.lotp.xyz/2016/12/01/How-to-Use-Postmessage-to-Communicate-with-iframe-in-React/) blog post. 

## Working the application 

So, since I used the [postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method to pass along information from the iframe to the page it's being embedded in, there are specific instructions on using this webpage. 

For testing purposes, I used this gallery ID: 66911286-72157647277042064

Once the images render, you have to click twice to render the meta data. The data passed in by the postMessage method is one click behind. 

To change the information rendered on the Embedding page, you switch over to a new image and repeat; two clicks on the new image and the data should re-render. 

## Color Scheme 
I used this color pallet which was inspired from the good old fashioned American Express credit card. 

![enter image description here](https://lh3.googleusercontent.com/v-g8i5piMOjwVbvpskFa4hTk4KwQCuACBjfrwsWJ-o_tNcp8bqV_VSOHn5x7NKQJWleWzEJjNQ)

