import { useNavigate } from "react-router";
import { Book, Brain } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { PageFooter } from "../components/PageFooter";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="absolute top-6 left-6">
        <Button
          onClick={() => navigate("/admin")}
          variant="outline"
          className="rounded-full px-6"
        >
          Administración
        </Button>
      </div>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Alfabetización Mediática
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Aprende a navegar el mundo digital de manera crítica e informada
          </p>
        </div>

        {/* Main Buttons */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Comienza a aprender */}
          <button
            onClick={() => navigate("/aprender")}
            className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border-4 border-blue-500 dark:border-blue-400"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500 dark:bg-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Book className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Comienza a aprender
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Explora conceptos fundamentales sobre medios digitales y
                alfabetización mediática
              </p>
            </div>
          </button>

          {/* Responder preguntas */}
          <button
            onClick={() => navigate("/juegos")}
            className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border-4 border-green-500 dark:border-green-400"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-500 dark:bg-green-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Responder preguntas
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Pon a prueba tus conocimientos con juegos interactivos y
                divertidos
              </p>
            </div>
          </button>
        </div>

        {/* Stats/Info */}
        <div className="mt-16 grid grid-cols-3 gap-8 w-full max-w-2xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              4
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Temas clave
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              4
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Juegos
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              ∞
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Aprendizaje
            </div>
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}