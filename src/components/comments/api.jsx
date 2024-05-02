import axios from "axios";
export const getComments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/comments?post_id=1');
    const { post } = response.data;
    return post;
  } catch (error) {
    console.log(error);
    return [];
  }
  };



const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

export const createComment = async (text,parentId, post_id, author_id ) => {
  const newComment = {
    detaliiComentariu: {
      id: 50, 
      post_id: post_id,
      parent_id: parentId,
      author_id:author_id,
      description: text,
      votes: 0
    }
  };
  return newComment;
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};