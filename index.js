// Process the HTML string to create an array of image URL with (cheerio)
import cheerio from 'cheerio';
// creating the request from the website ( requestify )
import requestify from 'requestify';

requestify
  .get('https://memegen-link-examples-upleveled.netlify.app/')
  .then(function (response) {
    response.getBody();
  });
// trying the code from cheerio to see if it comes back with error
const imageUrl = cheerio.load(
  '<img src="https://api.memegen.link/images/mordor/one_does_not_simply/walk_into_mordor.jpg?width=300">',
);
