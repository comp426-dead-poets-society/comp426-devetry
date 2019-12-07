import axios from 'axios';

const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});


//Returns number of poems in the database
export async function getNumPoems() {
    return (await pubRoot.get('/public/'))['data']['result'].length;
  }

//Returns poem feed
export async function getAllPublicPoems() {
    return (await pubRoot.get('/public'))['data']['result'];
}



/*===LIKE POEM===*/

export async function likePoem(id) {
    //get current like count
    let likes = (await pubRoot.get(`/public/${id}/likeCount`))['data']['result'];

    //post incremented like count
    return await pubRoot.post(`/public/${id}/likeCount`, {
        data: likes+1,
      })
}

export async function deletePoem(id) {
    return await pubRoot.delete(`/public/${id}`)
}


export async function deleteAllPublicPoems() {
    return await pubRoot.delete('')
}
