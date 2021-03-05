function mydelete(e){
  e=event
  let data_id = e.target.getAttribute("data-id");
  
  fetch('/product/:id', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      _id: data_id
    })
  })
    .then(res => {
      if (res.ok) return res.json()
      console.log(res.json())
      // window.location.reload(true)
    })
    .then(response => {
      if (response.status === 1) {
          alert('successful delete')
      }
  })
    .catch(console.error)
}

function myupdate(e){
  e=event
  let data_id = e.target.getAttribute("data-id");
  let data_title =document.getElementById("title_"+data_id).value;
  let data_artist =document.getElementById("artist_"+data_id).value;
  let data_genre = document.getElementById("genre_"+data_id).value;
  
  fetch('/product/:id', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      _id: data_id,
      Title : data_title,
      Artist : data_artist,
      Genre : data_genre
    })
  })
  .then(res => {
    if (res.ok) return res.json()
    // window.location.reload(true)
    console.log(res.json())
  })
  .then(response => {
    if (response.status === 1) {
        alert('successful update')
    }
})
  .catch(console.error)
}

function myFunction() {
  document.getElementById("myDIV").style.display = "block";
}