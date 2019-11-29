import axios from 'axios';
import likePoem from './publicAPI';

const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});



async function createAuthors() {
    return await pubRoot.post('/authors/',{
        "data": {
          "Pierce Brown": {},
          "Brandon Sanderson": {},
          "Michael J. Sullivan": {}
        }
      })
}

async function createAuthors2() {
  await pubRoot.post('/authors/',{
    "data": {"author":"Pierce Brown"},
    "type": "merge"
  })
  await pubRoot.post('/authors/',{
    "data": {"author":"Brandon Sanderson"},
    "type": "merge"
  })
  await pubRoot.post('/authors/',{
    "data": {"author":"Mike Wazowski"},
    "type": "merge"
  })
}

async function addTolkein() {
    return await pubRoot.post('/authors/Pierce Brown/blocks',{
        "data": 
          "Updated"
      })
}

async function getAllPoems() {
  return await pubRoot.get('/authors');
}

async function updateAuthor(id) {
  return await pubRoot.post(`/poems/5/jeff`, {
    data: {id},
    type: "merge"
  });
}

(async () => {
  
  await createAuthors2();
  //await addTolkein();

  let {data} = await getAllPoems();
  console.log(data)
})();
