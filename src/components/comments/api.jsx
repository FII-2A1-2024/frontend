import axios from "axios";

export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/comments?post_id=${postId}`);
    const { post } = response.data;
    return post;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addComment = async(text, parentId, post_id, author_id) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/comments`, {
      post_id: post_id,
      parent_id: parentId,
      username: localStorage.getItem("UserName"),
      author_id: author_id,
      description: text,
      votes: 0 
    }, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
  });
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    return "Comment could not be added, it may contain slurs";
  }
}

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