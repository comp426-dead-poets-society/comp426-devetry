import React, { useEffect, useState } from 'react';
import { Transition } from "react-spring/renderprops-universal";
import { config } from 'react-spring'
import Comment from './Comment';
import {getComments, getComment} from '../api/privateAPI';
import '../App.scss';

function ShowComments(props) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    (async () => {
      setComments(Object.keys(await getComments(props.poemId)));
    }
    )();
  }, []);

  if (!comments) return <div>Comments are loading</div>;

  console.log(`${comments}`)

  return (
    <div className="field">
      {
        comments.map((comment) => (
          <Comment commentId={comment} poemId={props.poemId}/>
        ))
      }
    </div>
  );
}

export default ShowComments;