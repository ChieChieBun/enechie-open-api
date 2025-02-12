
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
  imgSection.className = `imgSection`;
  body.appendChild(imgSection);
  const buttonDiv = document.createElement(`div`);
  buttonDiv.className= `buttonDiv`;
  body.appendChild(buttonDiv);
  const addButton = document.createElement(`button`);
  addButton.innerHTML= `Add Image`;
  addButton.setAttribute("type", "button");
  buttonDiv.appendChild(addButton);



  addButton.addEventListener(`click`, function() {
    //Creating an img element and div's
    const img = document.createElement(`img`);
    img.className = `img`;
    const divCon = document.createElement(`div`);
    divCon.className = `container`;
    const moreInfo = document.createElement(`div`);
    moreInfo.className =`text`;
    //Picking Random number 0-12
    const i = Math.floor(Math.random()*13);
    console.log(i);
    //if it doesn't have image_id use alt image id

       if (art.data[i].image_id == null) {
        img.src = `https://www.artic.edu/iiif/2/${art.data[i].alt_image_ids[i]}/full/843,/0/default.jpg`
       }
         else{
       img.src = `https://www.artic.edu/iiif/2/${art.data[i].image_id}/full/843,/0/default.jpg`
         }
   //Adds new img before add button
  imgSection.appendChild(divCon);
  divCon.appendChild(img);
  moreInfo.innerHTML = `Title: ${art.data[i].title}<br>Artist: ${art.data[i].artist_title}<br>Medium: ${art.data[i].medium_display}`
  divCon.appendChild(moreInfo);

  //how many img elements in document
  let imgCount = document.querySelectorAll(`img`);
  let imgArray = [].slice.call(imgCount);

   // Changes img when clicked on
   img.addEventListener(`click`, function(){
    //Picking Random number 0-12
    const i = Math.floor(Math.random()*12);
    console.log(i);

    //if it doesn't have image_id use alt image id
       if (art.data[i].image_id == null) {
        img.src = `https://www.artic.edu/iiif/2/${art.data[i].alt_image_ids[i]}/full/843,/0/default.jpg`
       }
         else{
       img.src = `https://www.artic.edu/iiif/2/${art.data[i].image_id}/full/843,/0/default.jpg`
         }
      moreInfo.innerHTML = `Title: ${art.data[i].title}<br>Artist: ${art.data[i].artist_title}<br>Medium: ${art.data[i].medium_display}`
   })
   // if img element amount is 3 or more abort (button doesn't work )
   if(imgArray.length === 3){
    addButton.style.display = `none`;
  }
  })
})
.catch(error=>{
  console.error(`An Error occurred:`, error);
});
