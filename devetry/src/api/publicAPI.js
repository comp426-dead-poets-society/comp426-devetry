//TODO: There seem to be a lot of bugs with a redundant /public/ path in the pubRoot.get calls (Malik)

import {getAxiosInstance} from "../config/Axios";

const pubRoot = getAxiosInstance('/public');


//Returns number of poems in the database
export async function getNumPoems() {
    return (await pubRoot.get('/'))['data']['result'].length;
  }

//Returns poem feed
//SAM: Are we worried about pagination? For like infinite scrolling and stuff. 
export async function getAllPublicPoems() {
    return (await pubRoot.get(''))['data']['result'];
}

//Returns specific poem by id
export async function getPoem(id) {
    return (await pubRoot.get(`/${id}`))['data']['result'];
}



/*===LIKE POEM===*/

export async function likePoem(id) {
    //get current like count
    let likes = (await pubRoot.get(`/${id}/likeCount`))['data']['result'];

    //post incremented like count
    return await pubRoot.post(`${id}/likeCount`, {
        data: likes+1,
      })
}

export async function getNumLikes(id) {
    let likes = (await pubRoot.get(`/${id}/likeCount`))['data']['result'];
    return likes;
}

//SAM: Shouldn't their be an unlike poem function? Should be simple enough
//SAM: Also do we want any way of keeping track of poem's users like? We could create a liked poem section or have likes be persistent for users

export async function deletePoem(id) {
    return await pubRoot.delete(`${id}`)
}

//SAM: This seems dangerous
export async function deleteAllPublicPoems() {
    return await pubRoot.delete('')
}
