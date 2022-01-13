import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

axios
  .get('https://memegen-link-examples-upleveled.netlify.app/')
  .then((response) => {
    let $ = cheerio.load(response.data);
    let articles = [];

    $('.data-new-gr-c-s-check-loaded').each((index, element) => {
      articles.push({
        title: $(element).find('img').text().trim(),
      });
    });
    // saving the picture in the memes file
    fs.writeFile('./memes', JSON.stringify(articles), (error) => {
      if (error) throw error;
    });
  })
  .catch((error) => {
    console.log(error);
  });
