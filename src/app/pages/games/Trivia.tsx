import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ThemeToggle";
import { PageFooter } from "../../components/PageFooter";

const preguntasOriginales = [
  {
    id: 1,
    pregunta: "¿Qué es la alfabetización mediática?",
    opciones: [
      "La capacidad de leer y escribir en medios digitales",
      "La capacidad de acceder, analizar, evaluar y crear contenido mediático",
      "El proceso de publicar contenido en redes sociales",
      "La habilidad de usar diferentes dispositivos electrónicos",
    ],
    respuestaCorrecta: 1,
  },
  {
    id: 2,
    pregunta: "¿Cuál es la diferencia entre desinformación y información errónea?",
    opciones: [
      "No hay diferencia, son lo mismo",
      "La desinformación es más grave que la información errónea",
      "La desinformación se comparte con intención de engañar, la información errónea puede ser sin intención",
      "La información errónea solo ocurre en redes sociales",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 3,
    pregunta: "¿Qué debes hacer antes de compartir una noticia en redes sociales?",
    opciones: [
      "Compartirla inmediatamente si tiene un titular llamativo",
      "Verificar la fuente y contrastar con otras fuentes confiables",
      "Esperar a que alguien más la comparta primero",
      "Solo leer el titular",
    ],
    respuestaCorrecta: 1,
  },
  {
    id: 4,
    pregunta: "¿Cuál de estas NO es una responsabilidad en internet?",
    opciones: [
      "Respetar los derechos de autor",
      "Proteger la privacidad propia y ajena",
      "Compartir toda la información que encuentres",
      "Comunicarte con respeto",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 5,
    pregunta: "¿Qué caracteriza a las fake news?",
    opciones: [
      "Son noticias que no me gustan",
      "Son errores accidentales en el periodismo",
      "Son contenidos diseñados para parecer noticias reales pero contienen información falsa",
      "Son noticias de entretenimiento",
    ],
    respuestaCorrecta: 2,
  },
];

export function Trivia() {
  const navigate = useNavigate();
  
  // Combinar preguntas originales con las del localStorage
  const getStorageData = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const preguntasPersonalizadas = getStorageData("preguntas_trivia", []);
  const preguntas = [...preguntasOriginales, ...preguntasPersonalizadas];

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const pregunta = preguntas[preguntaActual];

  const handleSeleccion = (index: number) => {
    if (!mostrarResultado) {
      setRespuestaSeleccionada(index);
    }
  };

  const handleConfirmar = () => {
    if (respuestaSeleccionada !== null) {
      setMostrarResultado(true);
      if (respuestaSeleccionada === pregunta.respuestaCorrecta) {
        setPuntaje(puntaje + 1);
      }
    }
  };

  const handleSiguiente = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      setRespuestaSeleccionada(null);
      setMostrarResultado(false);
    } else {
      setJuegoTerminado(true);
    }
  };

  const handleReiniciar = () => {
    setPreguntaActual(0);
    setRespuestaSeleccionada(null);
    setMostrarResultado(false);
    setPuntaje(0);
    setJuegoTerminado(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
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
          <div className="max-w-3xl w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trivia
              </h1>
              <div className="flex justify-center items-center space-x-4">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Pregunta {preguntaActual + 1} de {preguntas.length}
                </div>
                <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  Puntaje: {puntaje}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-4">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${((preguntaActual + 1) / preguntas.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {pregunta.pregunta}
              </h2>

              <div className="space-y-4 mb-8">
                {pregunta.opciones.map((opcion, index) => {
                  const isSeleccionada = respuestaSeleccionada === index;
                  const isCorrecta = index === pregunta.respuestaCorrecta;
                  
                  let claseBoton = "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600";
                  
                  if (mostrarResultado) {
                    if (isCorrecta) {
                      claseBoton = "bg-green-100 dark:bg-green-900 border-2 border-green-500 dark:border-green-400";
                    } else if (isSeleccionada && !isCorrecta) {
                      claseBoton = "bg-red-100 dark:bg-red-900 border-2 border-red-500 dark:border-red-400";
                    }
                  } else if (isSeleccionada) {
                    claseBoton = "bg-purple-100 dark:bg-purple-900 border-2 border-purple-500 dark:border-purple-400";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSeleccion(index)}
                      disabled={mostrarResultado}
                      className={`w-full p-4 rounded-xl text-left transition-all ${claseBoton} flex items-center justify-between`}
                    >
                      <span className="text-gray-900 dark:text-white font-medium">
                        {opcion}
                      </span>
                      {mostrarResultado && isCorrecta && (
                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                      )}
                      {mostrarResultado && isSeleccionada && !isCorrecta && (
                        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                {!mostrarResultado ? (
                  <Button
                    onClick={handleConfirmar}
                    disabled={respuestaSeleccionada === null}
                    className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500 text-white px-8"
                  >
                    Confirmar
                  </Button>
                ) : (
                  <Button
                    onClick={handleSiguiente}
                    className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500 text-white px-8"
                  >
                    {preguntaActual < preguntas.length - 1 ? "Siguiente" : "Ver resultados"}
                  </Button>
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
              <div className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                {puntaje} / {preguntas.length}
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {puntaje === preguntas.length
                  ? "¡Perfecto! Eres un experto en alfabetización mediática"
                  : puntaje >= preguntas.length * 0.7
                  ? "¡Muy bien! Tienes buenos conocimientos"
                  : puntaje >= preguntas.length * 0.5
                  ? "¡Buen intento! Sigue aprendiendo"
                  : "Sigue practicando para mejorar"}
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleReiniciar}
                  className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500 text-white px-8"
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