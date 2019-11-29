import axios from 'axios';
import * as pub from './publicAPI.js';
import * as priv from './privateAPI.js';
import * as user from './userAPI.js';

(async () => {

  //await user.updateLive(23,true)
  //await priv.createComment({parentId:4,body:"Hello bolly"})

  console.log((await user.getAllUserPoems()))
  console.log(await pub.getAllPoems())
})();

