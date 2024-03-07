const urlStart = "http://localhost:3000/api/";

document.addEventListener("DOMContentLoaded", function () {
  // nav bar array
  const newsHeadline = [
    "Home",
    "India",
    "World",
    "Local",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
  ];
  const navLinksContainer = document.querySelector(".navbar-nav");

  // showing data in navbar
  newsHeadline.forEach((category) => {
    const navItem = document.createElement("li");
    navItem.classList.add("nav-item");

    const navLink = document.createElement("a");
    navLink.classList.add("nav-link");
    navLink.href = "#";
    navLink.textContent = category;

    navLink.addEventListener("click", () => showData(category));

    navItem.appendChild(navLink);
    navLinksContainer.appendChild(navItem);
  });

  // search functionality started
  let searchForm = document.getElementById("searchForm");
  let searchQuery = null;

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = document.getElementById("searchInput").value;
    showData(searchQuery);
  });
  // search ended

  //show data
  let showData = async (value) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = await fetch(`${urlStart}news/${value}`, requestOptions);
    const data = await req.json();
    var navLinks = document.querySelectorAll(".nav-link");
    var cardContainer = document.querySelector(".card-container");

    if (!cardContainer) {
      cardContainer = document.createElement("div");
      cardContainer.classList.add("card-container", "rounded");
      cardContainer.setAttribute("data-bs-theme", "dark");
      document.body.appendChild(cardContainer);
    }

    cardContainer.innerHTML = "";

    for (let i = 0; i < data.articles.length; i++) {
      const element = data.articles[i];
      var card = document.createElement("div");
      card.classList.add("card", "m-5", "p-2", "text-center", "rounded-5");

      var img = document.createElement("img");
      img.src =
        element.urlToImage != null
          ? element.urlToImage
          : "assests/img/No_Image_Available.jpg";
      img.width = 200;
      img.height = 150;
      img.alt = "Card image cap";
      img.classList.add("custom-border-radius");
      var cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      var cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = element.title;

      var cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.textContent = element.description;

      const moreDetails = document.createElement("a");
      moreDetails.classList.add("card-link");
      console.log(element.url);
      moreDetails.href = element.url;
      moreDetails.target = "_blank";
      moreDetails.textContent = "Read More";

      var lastUpdatedText = document.createElement("p");
      lastUpdatedText.classList.add("card-text", "text-muted", "card-footer");
      lastUpdatedText.textContent = "Last updated - " + element.publishedAt;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(moreDetails);
      cardBody.appendChild(lastUpdatedText);

      card.appendChild(img);
      card.appendChild(cardBody);

      cardContainer.appendChild(card);
    }
  };
  //end of show data
});
