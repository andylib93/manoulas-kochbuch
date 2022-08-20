import "../css/index.css";
import Navigo from "navigo";
import footer from "./components/footer.js";
import nav from "./components/nav";
import main from "./view/main.js"
import login from "./view/login";
import recipe from "./view/recipe";
import edit from "./view/edit";
import add from "./view/add";
import profile from "./view/profile";

const router = new Navigo("/");

router.on("/", () => main())
.on("/login", () => login())
.on("/add", () => add())
.on("/edit", () => window.location.href = "/")
.on("/edit/:id", () => edit())
.on("/profile", () => profile())
.on("/:id", () => recipe())
.resolve();

nav();
footer();

document.addEventListener("visibilitychange", (): void => {
    document.visibilityState === "visible"
    ? document.title = "Manoúlas Kochbuch"
    : document.title = "Happy Cooking 🧑‍🍳";
});
