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
    
  <div class="mb-3 container-lg mx-auto mt-5 px-5">
  <h5 class="font2 fw-bold mb-5 text-center">${recipe.title}</h5>
        <div class="text-center mt-5 mb-5">
          <img src=${recipe.image} class="" alt="..." width="700" height="400" >
        </div>
        <div class="card-body  ">
         
          <div
                  class="d-flex justify-content-between align-items-center card-title "
                >
                  <div>
                    <h5><span class="fw-bold">Chef Name : </span> ${recipe.user}</h5>
                  </div>
                  <div>
    
                    <span class="fw-bold">Creation Date :  </span>
                    <button
                      type="button"
                      class="border border-0 rounded py-1 about-box3 px-2 text-white"
                    >
                      <i class="fa-regular fa-clock"></i> ${formattedDate}
                    </button>
                  </div>
          </div>
          <p class="card-text"><h5> <span class="fw-bold">Description : </span> <small class="text-muted"> ${recipe.description}</small></p>
          <p class=""><span class="fw-bold">Ingredients: </span> <small class="text-muted"> ${recipe.ingredients}</small></p>
          <p class=""><span class="fw-bold">Instructions:</span> <small class="text-muted">Instructions:  ${recipe.instructions}</small></p>
        </div>
         </div>
          `;

  parent.appendChild(div);
};

getparams();
