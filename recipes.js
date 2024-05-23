const loadRecipes = () => {
  fetch("https://recipenest.onrender.com/api/list/")
    .then((res) => res.json())
    .then((data) => displayRecipes(data))
    .catch((err) => console.log(err));
};

const displayRecipes = (recipes) => {
  recipes?.forEach((recipe) => {
    const parent = document.getElementById("recipes");
    const div = document.createElement("div");
    // div.classList.add("doc-card");
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
                  class="border border-0 rounded py-1 about-box3 px-2   text-white"
                >
                  <i class="fa-regular fa-clock"></i>${recipe.creation_date}
                </button>
              </div>
            </div>
            <h5 class="fw-bold">${recipe.title}</h5>
            <p class="card-text">
            ${recipe.description}
            </p>
            <button type="button" class="text-black btn btn-light">
              <a class="text-decoration-none" 
              target="_blank" href="details.html?id=${recipe.id}">View Details <i class="fa-solid fa-arrow-right"></i
              ></a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
           
  
     
  
          `;

    parent.appendChild(div);
  });
};

loadRecipes();
