import axios from 'axios';

export const apiKey = 'a1dc86e1fe9fa71e73a5a120caa0cb72cce959cc';

export const bitlyURL = 'https://api-ssl.bitly.com/v3/shorten';

/*export const bitlyAxiosInstance = function () {
  return axios.create({
    baseURL: `${bitlyURL}?access_token=${apiKey}&longUrl=`
  });
};*/

//export const bitlyRoot = bitlyAxiosInstance();

export default async function shortenURL(url) {
  let encodedUrl = encodeURIComponent(url);
  let requestUrl = `${bitlyURL}?access_token=${apiKey}&longUrl=${encodedUrl}&format=txt`
    console.log(`The request URL ${requestUrl}`)
    let shortUrl = await axios.get(requestUrl);
    return shortUrl;

}
