import axios from 'axios';

const userRoot = new axios.create({
  baseURL: "http://localhost:3000/public/user"
});

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public/public"
  });



//TODO: add function that returns current username
function getCurrentUser() {
    return "Dan Hirst"
}

//Generates new id for the public feed of poems
async function getNewPublicId() {
    let count;
    try {
        count = (await pubRoot.get(`/counter`))['data']['result']
    } catch (error) {
        count = 0;
    }
    await pubRoot.post('/counter',{
        data: count+1
    })

    return count
}

//Generates new id for the users feed of poems
async function getNewUserId() {
    let count;
    try {
        count = (await userRoot.get(`/counter`))['data']['result']
    } catch (error) {
        count = 0;
    }
    await userRoot.post('/counter',{
        data: count+1
    })

    return count
}

//Returns the public poem id of a user's poem 
async function getPublicId(id) {
    try {
        return (await userRoot.get(`/${id}/pubId`))['data']['result']
    } catch (error) {
        return undefined
    }
}

//returns number of user poems
export async function getNumUserPoems(parentId) {
    try {
        return (await userRoot.get(`/`))['data']['result'].length;
    } catch (error) {
        return 0;
    }
  }

//Creates a new poem
export async function createPoem({title="untitled",body="",isLive=false}) {
    let createdAt = Date.now();
    let updatedAt = createdAt;
    let author = getCurrentUser();
    let id = await getNewUserId()
    let pubId;
    
    await userRoot.post(`/${id}`, {
        data: {title, body, author, createdAt,updatedAt,isLive,pubId},
      });

      if (isLive) {
        pubId = await uploadToPublic(id);
    } else {
        pubId = undefined
    }
    return true
  }

async function getIsLive(id) {
    return (await userRoot.get(`/${id}/`))['data']['result']
}

//Updates the poem title and updatedAt params
export async function updatePoemTitle(id,title) {
    let updatedAt = Date.now()
    if (await getIsLive(id)) {
        let pubId = await getPublicId(id);
        
        await pubRoot.post(`/${pubId}/title`, {
            data: title,
          });
        await pubRoot.post(`/${pubId}/updatedAt`, {
            data: updatedAt
        }) 
    }
    await userRoot.post(`/${id}/title`, {
        data: title,
      });
    
    return await userRoot.post(`/${id}/updatedAt`, {
        data: updatedAt
    })
}

//Updates the poem body and updatedAt params
export async function updatePoemBody(id,body) {
    let updatedAt = Date.now()
    if (await getIsLive(id)) {
        let pubId = await getPublicId(id);
        
        await pubRoot.post(`/${pubId}/body`, {
            data: body,
          });
        await pubRoot.post(`/${pubId}/updatedAt`, {
            data: updatedAt
        }) 
    }

    await userRoot.post(`/${id}/body`, {
        data: body,
      });
    return await userRoot.post(`/${id}/updatedAt`, {
        data: updatedAt
    })
}

//updates whether the poem is live or not, and uploads/deletes from public store
export async function updateLive(id,isLive) {
    if (isLive) {
        uploadToPublic(id);
    } else {
        try {
            deleteFromPublic(id);
        } catch (error) {
        }
    }
    return await userRoot.post(`/${id}/isLive`, {
        data: isLive,
      });
}

//Returns all user poems
export async function getAllUserPoems() {
    return (await userRoot.get(''))['data']['result'];
}

//retunrs single poem in user
async function getUserPoem(id) {
    return (await userRoot.get(`/${id}`))['data']['result']
}


//deletes user poem
export async function deleteUserPoem(id) {
    return await userRoot.delete(`/${id}`);
}


//Uploads poem to public store
async function uploadToPublic(id) {
    let poem = await getUserPoem(id);

    let newId;
    if ((await getPublicId(id))==undefined) {
        newId = await getNewPublicId();
        await userRoot.post(`/${id}/pubId`,{
            data: newId
        });
    } else {
        newId = (await getPublicId(id))
    }
    let title = poem.title;
    let body = poem.body;
    let author = poem.author;
    let createdAt = poem.createdAt;
    let updatedAt = poem.upadatedAt;
    let likeCount = 0;
    await pubRoot.post(`/${newId}`,{
        data: {title,body,author,createdAt,updatedAt,likeCount}
    })
    
    return newId
}

//Deletes poem from public store
async function deleteFromPublic(id) {
    let pubId = await getPublicId(id);
    console.log(pubId)
    try {
        return await pubRoot.delete(`/${pubId}`)
    } catch (error) {
        //console.log(error)
        return false
    }
}

export async function deleteAllUserPoems() {
    return await userRoot.delete('');
}

