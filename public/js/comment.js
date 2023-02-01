const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_body = document.querySelector('#comment-desc').value.trim();
    const post_id = window.location.toString().split('/')[4];
    //console.log("location =",window.location.toString());
   // console.log("value entered id= ", id);
  
    if (comment_body) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({comment_body,post_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      if (response.ok) {
        //const res = await response.json();
        //console.log(res);
        document.location.replace(`/post/${post_id}`);
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newCommentFormHandler);
