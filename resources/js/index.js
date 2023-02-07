const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

// adding accordion for each news title
function addAccordion() {
  const numCount = ['One', 'Two', 'Three'];
  const newsTitles = ["COVID News", "India Tech", 'Sports Star Live'];

  for (let i = 0; i < newsTitles.length; i++) {
    document.getElementById("accordionFlushExample").innerHTML += `
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-heading${numCount[i]}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${numCount[i]}" aria-expanded="false" aria-controls="flush-collapse${numCount[i]}">
          ${newsTitles[i]}
        </button>
      </h2>
  
      <div id="flush-collapse${numCount[i]}" class="accordion-collapse collapse" aria-labelledby="flush-heading${numCount[i]}" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div id="carouselExampleControls${numCount[i]}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${numCount[i]}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${numCount[i]}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
  document.querySelector(".accordion-collapse").setAttribute("class", "accordion-collapse collapse show");
}

// adding carousels to accordion
async function addCarouselItem(rssLinks) {
  // const carouselItemList = document.getElementsByClassName("carousel-inner").innerHTML;
  // console.log(carouselItemList[1])

  for (let i = 0; i < rssLinks.length; i++) {
    let fetchUrl = RSS2JSON + rssLinks[i];
    let carouselInner = document.getElementsByClassName("carousel-inner")[i];

    try {
      let response = await (await fetch(fetchUrl)).json();
      response.items.forEach((item) => {
        carouselInner.innerHTML += `<div class="carousel-item">
            <a href="${item.link}" target="_blank" style="color: inherit; text-decoration: none;">
              <img src="${item["enclosure"].link}" class="d-block w-100" alt="${item["enclosure"].type}" style="height: 40vh; object-fit: cover;">
              <div class="mt-3">
                  <h4>${item.title}</h4>
                  <p>${item.author} &nbsp; &#9679; &nbsp; ${item["pubDate"]}</p>
                  <p>${item.description}</p>
              </div>
            </a>
          </div>`;
      });
    } catch (error) {
      return null;
    }

    carouselInner.querySelector(".carousel-item").setAttribute("class", "carousel-item active");
  }
}

export {addAccordion, addCarouselItem};


