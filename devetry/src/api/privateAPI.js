import {getAxiosInstance} from "../config/Axios";

const privRoot = getAxiosInstance('/private');

const pubRoot = getAxiosInstance('/public');

//returns number of comments for a particular poem. Used for creating new ids
export async function getNumComments(parentId) {
    try {
        return (await privRoot.get(`/${parentId}/`))['data']['result'].length;
    } catch (error) {
        return 0;
    }
  }

async function getNewCommentId(parentId) {
    let count;
    try {
        count = (await privRoot.get(`/${parentId}/counter`))['data']['result']
    } catch (error) {
        count = 0;
    }
    await privRoot.post(`/${parentId}/counter`,{
        data: count+1
    })

    return count
}  
//creates a new comment for a specific poem
export async function createComment({parentId,body="",user}) {

    let createdAt = Date.now();
    let author = user;
    let commentId = await getNewCommentId(parentId)
    return await privRoot.post(`/${parentId}/${commentId}`, {
        data: {author, body, createdAt},
        });
}

//returns all comments (for debugging)
export async function getAllComments() {
    return (await privRoot.get(''))['data']['result'];
  }

//returns all comments for particular poem
export async function getComments(parentId) {
    try {
        return (await privRoot.get(`/${parentId}`))['data']['result'];
    } catch {
        return []
    }
}

//returns single comment
export async function getComment(parentId,commentId) {
    try {
        return (await privRoot.get(`${parentId}/${commentId}`))['data']['result'];
    } catch {
        return []
    }
}

//deletes comment
export async function deleteComment(parentId,commentId) {
    try {
        return await privRoot.delete(`/${parentId}/${commentId}`);
    } catch (error) {
        console.log("Couldn't find the right comment to delete")
        return false
    }
}
  
//deletes all comment for particular poem
export async function deleteAllCommentsFromPoem(parentId) {
    return await privRoot.delete(`/${parentId}`);
}
  
export async function deleteAllComments() {
    return await privRoot.delete('');
}
