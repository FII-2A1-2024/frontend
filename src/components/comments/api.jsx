import axios from "axios";

/*TODO: fiecare getComments tre sa primeasca id-ul postarii*/
export const getComments = async (postId) => {
  try {
    console.log(`Trying to get data from the http://localhost:3000/comments?post_id=${postId}`);
    const response = await axios.get(`http://localhost:3000/comments?post_id=${postId}`);
   // console.log('Trying to get data from the ' , response);
    const { post } = response.data;
    return post;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addComment = async(text, parentId, post_id, author_id) => {
  try {
    const response = await axios.post(`http://localhost:3000/comments?post_id=${post_id}`, {
      post_id: post_id,
      parent_id: parentId,
      author_id: author_id,
      description: text,
      votes: 1 //<--------------- SERVERUL NU ACCEPTA VOTES=0 ??????????
    });
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

/*export const deleteComment = async(commentId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/comments?id=${commentId}`);
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}*/

export const createComment = async (text,parentId, post_id, author_id ) => {
  await addComment(text, parentId, post_id, author_id);

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
