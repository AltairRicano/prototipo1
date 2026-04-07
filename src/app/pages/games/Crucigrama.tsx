import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Trophy, Lightbulb } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ThemeToggle";
import { PageFooter } from "../../components/PageFooter";

type Palabra = {
  id: number;
  palabra: string;
  pista: string;
  fila: number;
  columna: number;
  direccion: "horizontal" | "vertical";
};

const palabras: Palabra[] = [
  {
    id: 1,
    palabra: "VERIFICACION",
    pista: "Proceso de comprobar la veracidad de la información",
    fila: 0,
    columna: 2,
    direccion: "horizontal",
  },
  {
    id: 2,
    palabra: "FUENTE",
    pista: "Origen de la información",
    fila: 2,
    columna: 0,
    direccion: "horizontal",
  },
  {
    id: 3,
    palabra: "PRIVACIDAD",
    pista: "Derecho a proteger datos personales",
    fila: 4,
    columna: 1,
    direccion: "horizontal",
  },
  {
    id: 4,
    palabra: "SESGO",
    pista: "Tendencia parcial en la información",
    fila: 7,
    columna: 3,
    direccion: "horizontal",
  },
  {
    id: 5,
    palabra: "VIRAL",
    pista: "Contenido que se propaga rápidamente",
    fila: 0,
    columna: 2,
    direccion: "vertical",
  },
  {
    id: 6,
    palabra: "FAKE",
    pista: "Palabra en inglés para 'falso'",
    fila: 2,
    columna: 0,
    direccion: "vertical",
  },
  {
    id: 7,
    palabra: "CRITICO",
    pista: "Tipo de pensamiento necesario para analizar medios",
    fila: 4,
    columna: 6,
    direccion: "vertical",
  },
  {
    id: 8,
    palabra: "NOTICIA",
    pista: "Información sobre eventos actuales",
    fila: 2,
    columna: 8,
    direccion: "vertical",
  },
];

const FILAS = 12;
const COLUMNAS = 14;

type Celda = {
  letra: string;
  palabraIds: number[];
  numero?: number;
  estaLlena: boolean;
};

export function Crucigrama() {
  const navigate = useNavigate();
  const [tablero, setTablero] = useState<(Celda | null)[][]>([]);
  const [respuestas, setRespuestas] = useState<{ [key: string]: string }>({});
  const [palabraSeleccionada, setPalabraSeleccionada] = useState<number | null>(null);
  const [celdaActiva, setCeldaActiva] = useState<{ fila: number; columna: number } | null>(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [mostrarPistas, setMostrarPistas] = useState(true);
  const [palabrasCorrectas, setPalabrasCorrectas] = useState<Set<number>>(new Set());

  useEffect(() => {
    inicializarTablero();
  }, []);

  useEffect(() => {
    verificarCompletado();
  }, [respuestas]);

  const inicializarTablero = () => {
    const nuevoTablero: (Celda | null)[][] = Array(FILAS)
      .fill(null)
      .map(() => Array(COLUMNAS).fill(null));

    palabras.forEach((palabra) => {
      for (let i = 0; i < palabra.palabra.length; i++) {
        const fila = palabra.direccion === "vertical" ? palabra.fila + i : palabra.fila;
        const col = palabra.direccion === "horizontal" ? palabra.columna + i : palabra.columna;

        if (!nuevoTablero[fila][col]) {
          nuevoTablero[fila][col] = {
            letra: palabra.palabra[i],
            palabraIds: [palabra.id],
            estaLlena: false,
          };
        } else {
          nuevoTablero[fila][col]!.palabraIds.push(palabra.id);
        }

        // Agregar número en la primera letra
        if (i === 0) {
          nuevoTablero[fila][col]!.numero = palabra.id;
        }
      }
    });

    setTablero(nuevoTablero);
  };

  const obtenerKey = (fila: number, columna: number) => `${fila}-${columna}`;

  const manejarClickCelda = (fila: number, columna: number) => {
    const celda = tablero[fila][columna];
    if (!celda) return;

    setCeldaActiva({ fila, columna });
    if (celda.palabraIds.length > 0) {
      setPalabraSeleccionada(celda.palabraIds[0]);
    }
  };

  const manejarInputCelda = (fila: number, columna: number, valor: string) => {
    const key = obtenerKey(fila, columna);
    const letra = valor.toUpperCase().slice(-1);

    setRespuestas((prev) => ({
      ...prev,
      [key]: letra,
    }));

    // Mover a la siguiente celda
    const palabraActual = palabras.find((p) => p.id === palabraSeleccionada);
    if (palabraActual && letra) {
      const siguienteFila =
        palabraActual.direccion === "vertical" ? fila + 1 : fila;
      const siguienteCol =
        palabraActual.direccion === "horizontal" ? columna + 1 : columna;

      if (
        siguienteFila < FILAS &&
        siguienteCol < COLUMNAS &&
        tablero[siguienteFila]?.[siguienteCol]
      ) {
        setCeldaActiva({ fila: siguienteFila, columna: siguienteCol });
      }
    }
  };

  const verificarPalabra = (palabra: Palabra): boolean => {
    let correcta = true;
    for (let i = 0; i < palabra.palabra.length; i++) {
      const fila = palabra.direccion === "vertical" ? palabra.fila + i : palabra.fila;
      const col = palabra.direccion === "horizontal" ? palabra.columna + i : palabra.columna;
      const key = obtenerKey(fila, col);
      if (respuestas[key] !== palabra.palabra[i]) {
        correcta = false;
        break;
      }
    }
    return correcta;
  };

  const verificarCompletado = () => {
    const correctas = new Set<number>();
    palabras.forEach((palabra) => {
      if (verificarPalabra(palabra)) {
        correctas.add(palabra.id);
      }
    });

    setPalabrasCorrectas(correctas);

    if (correctas.size === palabras.length) {
      setJuegoTerminado(true);
    }
  };

  const obtenerColorPalabra = (palabraId: number): string => {
    if (palabrasCorrectas.has(palabraId)) {
      return "bg-green-200 dark:bg-green-900/40 border-green-400";
    }
    if (palabraSeleccionada === palabraId) {
      return "bg-blue-200 dark:bg-blue-900/40 border-blue-400";
    }
    return "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600";
  };

  const reiniciarJuego = () => {
    setRespuestas({});
    setPalabraSeleccionada(null);
    setCeldaActiva(null);
    setJuegoTerminado(false);
    setPalabrasCorrectas(new Set());
    inicializarTablero();
  };

  const horizontales = palabras.filter((p) => p.direccion === "horizontal");
  const verticales = palabras.filter((p) => p.direccion === "vertical");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
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

      <div className="container mx-auto px-4 py-16">
        {!juegoTerminado ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Crucigrama
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Completa el crucigrama con términos de alfabetización mediática
              </p>
              <div className="flex justify-center items-center space-x-4">
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  Palabras completadas:{" "}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {palabrasCorrectas.size}/{palabras.length}
                  </span>
                </div>
                <Button
                  onClick={() => setMostrarPistas(!mostrarPistas)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {mostrarPistas ? "Ocultar" : "Mostrar"} pistas
                </Button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
              {/* Tablero */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 overflow-x-auto">
                  <div className="inline-block min-w-full">
                    <div
                      className="grid gap-0.5"
                      style={{
                        gridTemplateColumns: `repeat(${COLUMNAS}, minmax(0, 1fr))`,
                      }}
                    >
                      {tablero.map((fila, indiceFila) =>
                        fila.map((celda, indiceColumna) => {
                          if (!celda) {
                            return (
                              <div
                                key={`${indiceFila}-${indiceColumna}`}
                                className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 dark:bg-gray-900"
                              />
                            );
                          }

                          const key = obtenerKey(indiceFila, indiceColumna);
                          const valor = respuestas[key] || "";
                          const esActiva =
                            celdaActiva?.fila === indiceFila &&
                            celdaActiva?.columna === indiceColumna;
                          const colorClase = celda.palabraIds.some((id) =>
                            palabrasCorrectas.has(id)
                          )
                            ? "bg-green-100 dark:bg-green-900/30 border-green-400"
                            : celda.palabraIds.includes(palabraSeleccionada || -1)
                            ? "bg-blue-100 dark:bg-blue-900/30 border-blue-400"
                            : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600";

                          return (
                            <div
                              key={key}
                              className={`relative w-8 h-8 md:w-10 md:h-10 border-2 ${colorClase} ${
                                esActiva ? "ring-2 ring-emerald-500" : ""
                              }`}
                              onClick={() =>
                                manejarClickCelda(indiceFila, indiceColumna)
                              }
                            >
                              {celda.numero && (
                                <span className="absolute top-0 left-0.5 text-[8px] md:text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                  {celda.numero}
                                </span>
                              )}
                              <input
                                type="text"
                                maxLength={1}
                                value={valor}
                                onChange={(e) =>
                                  manejarInputCelda(
                                    indiceFila,
                                    indiceColumna,
                                    e.target.value
                                  )
                                }
                                onFocus={() =>
                                  manejarClickCelda(indiceFila, indiceColumna)
                                }
                                className="w-full h-full text-center text-sm md:text-lg font-bold bg-transparent border-0 outline-none uppercase text-gray-900 dark:text-white"
                                style={{ caretColor: "transparent" }}
                              />
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pistas */}
              {mostrarPistas && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400">→</span>
                      Horizontales
                    </h3>
                    <div className="space-y-3">
                      {horizontales.map((palabra) => (
                        <button
                          key={palabra.id}
                          onClick={() => {
                            setPalabraSeleccionada(palabra.id);
                            setCeldaActiva({
                              fila: palabra.fila,
                              columna: palabra.columna,
                            });
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all ${
                            palabrasCorrectas.has(palabra.id)
                              ? "bg-green-100 dark:bg-green-900/30 line-through opacity-60"
                              : palabraSeleccionada === palabra.id
                              ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400"
                              : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-2">
                            {palabra.id}.
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {palabra.pista}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400">↓</span>
                      Verticales
                    </h3>
                    <div className="space-y-3">
                      {verticales.map((palabra) => (
                        <button
                          key={palabra.id}
                          onClick={() => {
                            setPalabraSeleccionada(palabra.id);
                            setCeldaActiva({
                              fila: palabra.fila,
                              columna: palabra.columna,
                            });
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all ${
                            palabrasCorrectas.has(palabra.id)
                              ? "bg-green-100 dark:bg-green-900/30 line-through opacity-60"
                              : palabraSeleccionada === palabra.id
                              ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400"
                              : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-2">
                            {palabra.id}.
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {palabra.pista}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <Button onClick={reiniciarJuego} variant="outline" className="px-8">
                Reiniciar crucigrama
              </Button>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Crucigrama completado!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Has demostrado excelente conocimiento sobre alfabetización
                mediática
              </p>
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-6 mb-8">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {palabras.length}/{palabras.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Palabras correctas
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={reiniciarJuego}
                  className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-400 dark:hover:bg-emerald-500 text-white px-8"
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
