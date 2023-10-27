// Search input
// Récupération data
try {
  fetch("/api/passengers")
    .then((res) => res.json())
    .then((data) => {
      const passengers = data.passengers;
      let searchArray = [];
      const input = document.querySelector(".searchInput");
      const submitInput = document.querySelector(".submitInput");
      submitInput.addEventListener("click", (e) => {
        e.preventDefault();
        for (const passenger of passengers) {
          if (
            passenger.Name.toLowerCase().includes(input.value.toLowerCase())
          ) {
            searchArray.push(passenger);
          } else {
            searchArray.map((passenger) => {
              if (
                !passenger.Name.toLowerCase().includes(
                  input.value.toLowerCase()
                )
              ) {
                searchArray.splice(searchArray.indexOf(passenger), 1);
              }
            });
          }
        }
        let result = [
          ...new Map(searchArray.map((item) => [item["Name"], item])).values(),
        ];
        const searchResults = document.querySelector(".grid-container");
        searchResults.innerHTML = "";
        for (const res of result) {
          res.Sex = res.Sex === "male" ? "Homme" : "Femme";
          if (res.Age > 1 && res.Age !== null) {
            res.Age = `${res.Age.toFixed(0)} ans`;
          } else if (res.Age <= 1 && res.Age !== null) {
            res.Age = `${res.Age.toFixed(0)} an`;
          } else {
            res.Age = "Age inconnu";
          }
          if (res.Survived === "0") {
            res.Survived = "N'a pas survécu";
          } else {
            res.Survived = "A survécu";
          }
          if (res.Pclass === "1") {
            res.Pclass = "1ère classe";
          } else if (res.Pclass === "2") {
            res.Pclass = "2ème classe";
          } else {
            res.Pclass = "3ème classe";
          }
          searchResults.innerHTML += `
              <div class="passengerCard text-center">
              <img src="http://localhost:8000/assets/anonymous.jpg" class="passengerImg">
              <p>${res.Name}</p>
              <p>${res.Sex}</p>
              <p>${res.Age}</p>
              <p>${res.Survived}</p>
              <p>${res.Pclass}</p>
              `;
        }
      });
      //   input.addEventListener("keydown", (e) => {
      //     for (const passenger of passengers) {
      //       if (
      //         passenger.Name.toLowerCase().includes(e.target.value.toLowerCase())
      //       ) {
      //         searchArray.push(passenger);
      //       } else {
      //         searchArray.map((passenger) => {
      //           if (
      //             !passenger.Name.toLowerCase().includes(
      //               e.target.value.toLowerCase()
      //             )
      //           ) {
      //             searchArray.splice(searchArray.indexOf(passenger), 1);
      //           }
      //         });
      //       }
      //     }
      //     let result = [
      //       ...new Map(searchArray.map((item) => [item["Name"], item])).values(),
      //     ];
      //     const searchResults = document.querySelector(".grid-container");
      //     searchResults.innerHTML = "";
      //     for (const res of result) {
      //       res.Sex = res.Sex === "male" ? "Homme" : "Femme";
      //       if (res.Age > 1 && res.Age !== null) {
      //         res.Age = `${res.Age.toFixed(0)} ans`;
      //       } else if (res.Age <= 1 && res.Age !== null) {
      //         res.Age = `${res.Age.toFixed(0)} an`;
      //       } else {
      //         res.Age = "Age inconnu";
      //       }
      //       if (res.Survived === "0") {
      //         res.Survived = "N'a pas survécu";
      //       } else {
      //         res.Survived = "A survécu";
      //       }
      //       if (res.Pclass === "1") {
      //         res.Pclass = "1ère classe";
      //       } else if (res.Pclass === "2") {
      //         res.Pclass = "2ème classe";
      //       } else {
      //         res.Pclass = "3ème classe";
      //       }
      //       searchResults.innerHTML += `
      //         <div class="passengerCard text-center">
      //         <img src="http://localhost:8000/assets/anonymous.jpg" class="passengerImg">
      //         <p>${res.Name}</p>
      //         <p>${res.Sex}</p>
      //         <p>${res.Age}</p>
      //         <p>${res.Survived}</p>
      //         <p>${res.Pclass}</p>
      //         `;
      //     }
      //   });
    });
} catch (err) {
  console.log(err);
}
// Show/hide filters mobile
const showFilters = document.getElementById("showFilters");
showFilters.addEventListener("click", () => {
  const filters = document.querySelector(".filtersDiv");
  if (filters.classList.contains("f-none")) {
    filters.classList.remove("f-none");
    filters.classList.add("grid-filters");
    showFilters.innerHTML = "Hide filters";
  } else {
    filters.classList.toggle("hidden");
    filters.classList.toggle("grid-filters");
    if (showFilters.innerHTML === "Hide filters") {
      showFilters.innerHTML = "Show filters";
    } else if (showFilters.innerHTML === "Show filters") {
      showFilters.innerHTML = "Hide filters";
    }
  }
});
