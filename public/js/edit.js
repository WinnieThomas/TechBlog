
const updateButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {

      const id = event.target.getAttribute('data-id');

      console.log(id);

      const title = document.querySelector('#update-post-title').value.trim();
      const body = document.querySelector('#update-postdesc').value.trim();

      console.log("titile of update post: " ,title);
      console.log("description of update post: " ,body);
  
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } 
      else 
      {
        alert('Failed to UPDATE post');
      }
    }
  };
  


document
  .querySelector('.update-post')
  .addEventListener('click', updateButtonHandler);
