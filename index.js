import * as fs from 'fs';
import got from 'got';
import htmlUrls from 'html-urls';
import fetch from 'node-fetch';

// create the request or connect to the website
async function memescraper() {
  const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
  const { body: html } = await got(websiteUrl);
  const links = htmlUrls({ html, websiteUrl });

  const allWebsiteUrl = [];

  links.forEach((element) => {
    allWebsiteUrl.push(element.websiteUrl);
  });

  // Process the HTML string to create an array of image URLs
  const imageUrl = allWebsiteUrl.filter(
    (element) => element.startsWith('https://api.memegen.link/images'), // narrow down to the the image Url
  );

  // Loop over the array of image URLs
  for (let i = 0; i < 10; i++) {
    fs.open(`./memes/0${i + 1}.jpg`, 'w', (err) => {
      // Save the image data in folder memes with file names 01.jpg, etc
      if (err) {
        throw err;
      }
    });

    // Downloading the image and creating a file
    const savedImageUrl = imageUrl[i];

    fetch(savedImageUrl)
      .then((res) =>
        res.body.pipe(fs.createWriteStream(`./memes/0${i + 1}.jpg`)),
      )
      .catch((error) => {
        console.log(error);
      });
  }
}

// Test the program by running node index.js multiple times
memescraper().catch((error) => {
  console.log(error);
});
