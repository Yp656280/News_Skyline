const urlStart = "http://localhost:3000/api/";
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");

  var cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  navLinks.forEach(async function (link) {
    link.addEventListener("click", async function () {
      cardContainer.innerHTML = "";

      const requestOptions2 = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const req2 = await fetch(
        `${urlStart}news/${link.innerText}`,
        requestOptions2
      );
      const data = await req2.json();

      for (let i = 0; i < data.articles.length; i++) {
        const element = data.articles[i];

        var card = document.createElement("div");
        card.classList.add("card", "mb-3");

        var img = document.createElement("img");

        img.src = element.urlToImage;

        img.width = 200;
        img.height = 150;
        img.alt = "Card image cap";

        img.addEventListener("click", function () {
          // Define the URL you want to open in a new tab
          var url = element.url;

          // Open the URL in a new tab
          window.open(url, "_blank");
        });
        console.log("--42--", element.urlToImage);
        // console.log(element.url);
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        var cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = element.title;

        var cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = element.description;

        var lastUpdatedText = document.createElement("p");
        lastUpdatedText.classList.add("card-text", "text-muted");
        lastUpdatedText.textContent = "Last updated " + element.publishedAt;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(lastUpdatedText);

        card.appendChild(img);
        card.appendChild(cardBody);

        cardContainer.appendChild(card);
      }

      console.log("I am here");

      document.body.appendChild(cardContainer);
    });
  });
});
