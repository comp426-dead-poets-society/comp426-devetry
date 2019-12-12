import axios from 'axios';

export const apiKey = 'ERLWJG93';

export default async function getRandomWord() {
  let requestUrl = `https://random-word-api.herokuapp.com/word?key=${apiKey}&number=1`
    let randomWord = await axios.get(requestUrl).then(response => {
      return response.data
    })
    return randomWord;
}
