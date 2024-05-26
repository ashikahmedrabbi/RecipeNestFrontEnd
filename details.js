const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("id");
  if (param) {
    loadRecipeDetails(param);
  }
};

// Function to load recipe details
const loadRecipeDetails = (id) => {
  fetch(`https://recipenest.onrender.com/api/list/${id}/`)
    .then((res) => res.json())
    .then((data) => displayDetails(data))
    .catch((err) => console.log(err));
};

// Function to display recipe details
const displayDetails = (recipe) => {
  const parent = document.getElementById("recipe-detail");
  const div = document.createElement("div");

  const creationDate = new Date(recipe.creation_date);

  // Format the date and time
  const formattedDate = creationDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = creationDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  div.innerHTML = `
    <div class="col">
    <div class="card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src=${recipe.image}
            class="img-fluid rounded-start blog-img"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <div
              class="d-flex justify-content-between align-items-center card-title px-2"
            >
              <div>
                <h5>${recipe.user}</h5>
              </div>
              <div>
                <button
                  type="button"
                  class="border border-0 rounded py-1 about-box3 px-2 text-white"
                >
                  <i class="fa-regular fa-clock"></i> ${formattedDate}
                </button>
              </div>
            </div>
            <h5 class="fw-bold">${recipe.title}</h5>
            <p class="card-text">
            ${recipe.description}
            </p>
            <p class="card-text">
            ${recipe.ingredients}
            </p>
            <p class="card-text">
            ${recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
          `;

  parent.appendChild(div);
};

getparams();
