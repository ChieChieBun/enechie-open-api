
fetch(`https://api.artic.edu/api/v1/artworks`)
.then(response => {
  if (response.ok) {
    return response.text()
  }
  else{
    throw new Error (`Failed to fetch repositories`)
  }
})
.then (data =>{
  const art = JSON.parse(data);
  console.log(art.data);
  const body = document.querySelector(`body`)
  const imgSection = document.createElement(`div`);
  body.appendChild(imgSection);
  const buttonDiv = document.createElement(`div`);
  body.appendChild(buttonDiv);
  const addButton = document.createElement(`button`);
  addButton.innerHTML= `Add Image`;
  addButton.setAttribute("type", "button");
  buttonDiv.appendChild(addButton);

  addButton.addEventListener(`click`, function() {
    //Creating an img element
    const img = document.createElement(`img`);
    //Picking Random number 0-12
    const i = Math.floor(Math.random()*13);
    //if it doesn't have image_id use alt image id
       if (art.data[i].image_id == null) {
        img.src = `https://www.artic.edu/iiif/2/${art.data[i].alt_image_ids[i]}/full/843,/0/default.jpg`
       }
         else{
       img.src = `https://www.artic.edu/iiif/2/${art.data[i].image_id}/full/843,/0/default.jpg`
         }
   //Adds new img before add button
  imgSection.appendChild(img);
  //how many img elements in document
  let imgCount = document.querySelectorAll(`img`);
  let imgArray = [].slice.call(imgCount);

   // Removes img
   img.addEventListener(`click`, function(){
    img.remove();
    imgArray.pop();
   })
   // if img element amount is 3 or more abort (button doesn't work )
   if(imgArray.length === 3){
    addButton.disabled = true;
  }
console.log(imgArray);
  })

})
