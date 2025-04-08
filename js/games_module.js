import { Details } from "./details_module.js";
import { Ui } from "./ui_module.js";

export class Games {
   constructor() {
      this.getGames("mmorpg");
      document.querySelectorAll(".menu a").forEach((menuItem) => {
         menuItem.addEventListener("click", (e) => {
            document.querySelector(".menu .active").classList.remove("active");
            e.target.classList.add("active");
            this.getGames(e.target.dataset.category);
         });
      });
      this.ui = new Ui();
   }

   // Show Games Category Based On Menubar
   async getGames(category) {
      const loading = document.querySelector(".loading");
      loading.classList.remove("d-none");
      const options = {
         method: "GET",
         headers: {
            "X-RapidAPI-Key": "0ef26446damsh21a1896edd0dd48p176590jsnd08e57f30c25",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
         },
      };
      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
      const response = await api.json();
      this.ui.displayGames(response);
      this.startEvent();
      loading.classList.add("d-none");
   }

   // Show Detail Click Event
   startEvent() {
      document.querySelectorAll(".card").forEach((item) => {
         item.addEventListener("click", () => {
            const id = item.dataset.id;
            this.showDetails(id);
         });
      });
   }

   // Switch Between Showing Master Or Detail
   showDetails(gameId) {
      const details = new Details(gameId);
      document.querySelector(".games").classList.add("d-none");
      document.querySelector(".details").classList.remove("d-none");
   }
}
