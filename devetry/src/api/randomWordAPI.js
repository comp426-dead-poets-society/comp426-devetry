import axios from 'axios';

export const apiKey = 'ERLWJG93';

export const randomWordUrl = 'https://random-word-api.herokuapp.com/';

export default async function shortenURL(url) {
  let requestUrl = `${randomWordUrl}/word?key=${apiKey}&number=1`
    console.log(`The request URL ${requestUrl}`)
    let randomWord = await axios.get(requestUrl);
    return randomWord;
}
