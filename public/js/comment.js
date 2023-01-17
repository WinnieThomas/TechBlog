const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();

    console.log("value entered");
  
    if (comment) {
      const response = await fetch(`api/posts/:id/comments`, {
        method: 'POST',
        body: JSON.stringify({comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentFormHandler);
