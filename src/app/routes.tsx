import { createHashRouter } from "react-router";
import { Home } from "./pages/Home";
import { Aprender } from "./pages/Aprender";
import { Juegos } from "./pages/Juegos";
import { Trivia } from "./pages/games/Trivia";
import { RealVsFake } from "./pages/games/RealVsFake";
import { Memorama } from "./pages/games/Memorama";
import { Rompecabezas } from "./pages/games/Rompecabezas";
import { SerpientesEscaleras } from "./pages/games/SerpientesEscaleras";
import { Crucigrama } from "./pages/games/Crucigrama";
import { Admin } from "./pages/Admin";

export const router = createHashRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/aprender",
    Component: Aprender,
  },
  {
    path: "/juegos",
    Component: Juegos,
  },
  {
    path: "/juegos/trivia",
    Component: Trivia,
  },
  {
    path: "/juegos/real-vs-fake",
    Component: RealVsFake,
  },
  {
    path: "/juegos/memorama",
    Component: Memorama,
  },
  {
    path: "/juegos/rompecabezas",
    Component: Rompecabezas,
  },
  {
    path: "/juegos/serpientes-escaleras",
    Component: SerpientesEscaleras,
  },
  {
    path: "/juegos/crucigrama",
    Component: Crucigrama,
  },
  {
    path: "/admin",
    Component: Admin,
  },
]);