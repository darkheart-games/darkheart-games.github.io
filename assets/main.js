const btnShowLibrary = document.getElementById("show-game-library");
const contentMain = document.getElementById("main");

btnShowLibrary.addEventListener("click", () => {
  contentMain.classList.add("show");
  setTimeout(() => {
    contentMain.classList.add("content");
  }, 1000);
});
