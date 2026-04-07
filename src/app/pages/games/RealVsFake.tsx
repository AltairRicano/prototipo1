import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ThemeToggle";
import { PageFooter } from "../../components/PageFooter";

const noticiasOriginales = [
  {
    id: 1,
    titulo: "Científicos desarrollan nueva vacuna contra la malaria con 90% de efectividad",
    fuente: "Nature Medicine",
    imagen: "https://images.unsplash.com/photo-1771581875505-e2a423a58468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBhcnRpY2xlJTIwaGVhZGxpbmV8ZW58MXx8fHwxNzczMjkwODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    esReal: true,
    explicacion: "Esta es una noticia real publicada en una revista científica reconocida. Las fuentes científicas peer-reviewed son generalmente confiables.",
  },
  {
    id: 2,
    titulo: "Beber 10 vasos de agua al día cura todas las enfermedades según nuevo estudio",
    fuente: "SaludMilagrosa.com",
    imagen: "https://images.unsplash.com/photo-1760201797006-b4de6ebc823b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3MlMjB0YWJsZXR8ZW58MXx8fHwxNzczMjkwODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    esReal: false,
    explicacion: "Esta es una noticia falsa. Las afirmaciones absolutas como 'cura todas las enfermedades' son señales de alerta. La fuente no es reconocida en el ámbito científico.",
  },
  {
    id: 3,
    titulo: "Estudio de la OMS revela aumento en casos de ansiedad durante la pandemia",
    fuente: "Organización Mundial de la Salud",
    imagen: "https://images.unsplash.com/photo-1760199789464-eff5ba507e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbmV3cyUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzczMjkwODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    esReal: true,
    explicacion: "Noticia real de una organización internacional reconocida. La OMS es una fuente confiable para información de salud pública.",
  },
  {
    id: 4,
    titulo: "Gobierno secreto de reptilianos controla el mercado mundial según documentos filtrados",
    fuente: "ConspiracyNews24.net",
    imagen: "https://images.unsplash.com/photo-1599344941911-9caa7fd29ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWtlJTIwY29uc3BpcmFjeSUyMHRoZW9yeXxlbnwxfHx8fDE3NzMyOTA4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    esReal: false,
    explicacion: "Noticia falsa típica de teorías conspiracionales. No hay evidencia científica y la fuente no es confiable. Las afirmaciones extraordinarias requieren pruebas extraordinarias.",
  },
  {
    id: 5,
    titulo: "Tecnología 5G comprobada segura por múltiples estudios independientes",
    fuente: "IEEE Spectrum",
    imagen: "https://images.unsplash.com/photo-1771581875505-e2a423a58468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBhcnRpY2xlJTIwaGVhZGxpbmV8ZW58MXx8fHwxNzczMjkwODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    esReal: true,
    explicacion: "Noticia real publicada en una revista técnica respetada. IEEE es una organización profesional de ingeniería reconocida mundialmente.",
  },
];

export function RealVsFake() {
  const navigate = useNavigate();
  
  // Combinar noticias originales con las del localStorage
  const getStorageData = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const noticiasPersonalizadas = getStorageData("noticias_realfake", []);
  const noticias = [...noticiasOriginales, ...noticiasPersonalizadas];

  const [noticiaActual, setNoticiaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<boolean | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const noticia = noticias[noticiaActual];

  const handleSeleccion = (esReal: boolean) => {
    if (!mostrarResultado) {
      setRespuestaSeleccionada(esReal);
      setMostrarResultado(true);
      if (esReal === noticia.esReal) {
        setPuntaje(puntaje + 1);
      }
    }
  };

  const handleSiguiente = () => {
    if (noticiaActual < noticias.length - 1) {
      setNoticiaActual(noticiaActual + 1);
      setRespuestaSeleccionada(null);
      setMostrarResultado(false);
    } else {
      setJuegoTerminado(true);
    }
  };

  const handleReiniciar = () => {
    setNoticiaActual(0);
    setRespuestaSeleccionada(null);
    setMostrarResultado(false);
    setPuntaje(0);
    setJuegoTerminado(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="absolute top-6 left-6">
        <Button
          onClick={() => navigate("/juegos")}
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

      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        {!juegoTerminado ? (
          <div className="max-w-4xl w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Real vs Fake
              </h1>
              <div className="flex justify-center items-center space-x-4">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Noticia {noticiaActual + 1} de {noticias.length}
                </div>
                <div className="text-sm font-bold text-teal-600 dark:text-teal-400">
                  Puntaje: {puntaje}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-4">
                <div
                  className="bg-teal-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${((noticiaActual + 1) / noticias.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="h-72 overflow-hidden">
                <img
                  src={noticia.imagen}
                  alt="Imagen de noticia"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    Fuente: {noticia.fuente}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {noticia.titulo}
                </h2>

                {!mostrarResultado ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleSeleccion(true)}
                      className="group bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border-4 border-green-500 dark:border-green-400 rounded-2xl p-8 transition-all hover:-translate-y-1"
                    >
                      <ThumbsUp className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        REAL
                      </div>
                    </button>

                    <button
                      onClick={() => handleSeleccion(false)}
                      className="group bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border-4 border-red-500 dark:border-red-400 rounded-2xl p-8 transition-all hover:-translate-y-1"
                    >
                      <ThumbsDown className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-3" />
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        FAKE
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div
                      className={`p-6 rounded-2xl ${
                        respuestaSeleccionada === noticia.esReal
                          ? "bg-green-100 dark:bg-green-900 border-2 border-green-500 dark:border-green-400"
                          : "bg-red-100 dark:bg-red-900 border-2 border-red-500 dark:border-red-400"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        {respuestaSeleccionada === noticia.esReal ? (
                          <>
                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              ¡Correcto!
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              Incorrecto
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-gray-800 dark:text-gray-200">
                        Esta noticia es <strong>{noticia.esReal ? "REAL" : "FAKE"}</strong>.
                      </p>
                    </div>

                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        Explicación:
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {noticia.explicacion}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSiguiente}
                        className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-500 text-white px-8"
                      >
                        {noticiaActual < noticias.length - 1 ? "Siguiente noticia" : "Ver resultados"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl w-full">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Juego completado!
              </h2>
              <div className="text-6xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                {puntaje} / {noticias.length}
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {puntaje === noticias.length
                  ? "¡Perfecto! Eres un experto detectando fake news"
                  : puntaje >= noticias.length * 0.7
                  ? "¡Muy bien! Tienes buen ojo para las noticias falsas"
                  : puntaje >= noticias.length * 0.5
                  ? "¡Buen intento! Sigue practicando"
                  : "Practica más para mejorar tu detección"}
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleReiniciar}
                  className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-500 text-white px-8"
                >
                  Jugar de nuevo
                </Button>
                <Button
                  onClick={() => navigate("/juegos")}
                  variant="outline"
                  className="px-8"
                >
                  Volver a juegos
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PageFooter />
    </div>
  );
}