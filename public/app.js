const nav = document.getElementById("nav");
const links = nav.querySelectorAll("a");
for (const link of links) {
  link.addEventListener("click", function (e) {
    console.log(e);
    // link.classList.remove("active");
    // e.target.classList.add("active");
  });
}
