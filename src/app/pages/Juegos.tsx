import { useNavigate } from "react-router";
import { ArrowLeft, HelpCircle, Grid3x3, Puzzle, CheckCheck, Dices, Grid2x2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { PageFooter } from "../components/PageFooter";

const juegos = [
  {
    id: "trivia",
    icon: HelpCircle,
    titulo: "Trivia",
    descripcion: "Responde preguntas sobre alfabetización mediática",
    color: "purple",
    ruta: "/juegos/trivia",
  },
  {
    id: "memorama",
    icon: Grid3x3,
    titulo: "Memorama",
    descripcion: "Encuentra las parejas de conceptos relacionados",
    color: "pink",
    ruta: "/juegos/memorama",
  },
  {
    id: "rompecabezas",
    icon: Puzzle,
    titulo: "Rompecabezas",
    descripcion: "Arma el rompecabezas de información mediática",
    color: "indigo",
    ruta: "/juegos/rompecabezas",
  },
  {
    id: "real-vs-fake",
    icon: CheckCheck,
    titulo: "Real vs Fake",
    descripcion: "Identifica noticias reales de las falsas",
    color: "teal",
    ruta: "/juegos/real-vs-fake",
  },
  {
    id: "serpientes-escaleras",
    icon: Dices,
    titulo: "Serpientes y Escaleras",
    descripcion: "Avanza respondiendo preguntas correctamente",
    color: "orange",
    ruta: "/juegos/serpientes-escaleras",
  },
  {
    id: "crucigrama",
    icon: Grid2x2,
    titulo: "Crucigrama",
    descripcion: "Completa el crucigrama de alfabetización mediática",
    color: "emerald",
    ruta: "/juegos/crucigrama",
  },
];

export function Juegos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="absolute top-6 left-6">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Elige un juego
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Pon a prueba tus conocimientos de manera divertida
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {juegos.map((juego) => {
            const Icon = juego.icon;
            const colorClasses = {
              purple:
                "border-purple-500 dark:border-purple-400 hover:border-purple-600",
              pink: "border-pink-500 dark:border-pink-400 hover:border-pink-600",
              indigo:
                "border-indigo-500 dark:border-indigo-400 hover:border-indigo-600",
              teal: "border-teal-500 dark:border-teal-400 hover:border-teal-600",
              orange: "border-orange-500 dark:border-orange-400 hover:border-orange-600",
              emerald: "border-emerald-500 dark:border-emerald-400 hover:border-emerald-600",
            };
            const bgClasses = {
              purple: "bg-purple-500 dark:bg-purple-400",
              pink: "bg-pink-500 dark:bg-pink-400",
              indigo: "bg-indigo-500 dark:bg-indigo-400",
              teal: "bg-teal-500 dark:bg-teal-400",
              orange: "bg-orange-500 dark:bg-orange-400",
              emerald: "bg-emerald-500 dark:bg-emerald-400",
            };

            return (
              <button
                key={juego.id}
                onClick={() => navigate(juego.ruta)}
                className={`group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border-4 ${
                  colorClasses[juego.color as keyof typeof colorClasses]
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-20 h-20 ${
                      bgClasses[juego.color as keyof typeof bgClasses]
                    } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {juego.titulo}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {juego.descripcion}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}