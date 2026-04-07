import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Trophy, User, Bot } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ThemeToggle";
import { PageFooter } from "../../components/PageFooter";

const TOTAL_CASILLAS = 100;

// Serpientes: de casilla superior a casilla inferior
const serpientes = [
  { inicio: 98, fin: 28 },
  { inicio: 87, fin: 24 },
  { inicio: 64, fin: 60 },
  { inicio: 62, fin: 19 },
  { inicio: 54, fin: 34 },
  { inicio: 47, fin: 26 },
];

// Escaleras: de casilla inferior a casilla superior
const escaleras = [
  { inicio: 4, fin: 14 },
  { inicio: 9, fin: 31 },
  { inicio: 21, fin: 42 },
  { inicio: 28, fin: 84 },
  { inicio: 51, fin: 67 },
  { inicio: 71, fin: 91 },
];

const preguntasOriginales = [
  {
    pregunta: "¿Qué significa alfabetización mediática?",
    opciones: [
      "Saber leer y escribir",
      "Analizar críticamente medios de comunicación",
      "Usar redes sociales",
      "Ver televisión"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué es desinformación?",
    opciones: [
      "Falta de información",
      "Información falsa intencional",
      "Información verdadera",
      "Noticias del periódico"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Cómo verificar una noticia?",
    opciones: [
      "Compartirla inmediatamente",
      "Creerla sin más",
      "Contrastar con varias fuentes",
      "Ignorarla"
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué son las fake news?",
    opciones: [
      "Noticias reales",
      "Noticias inventadas o falsas",
      "Noticias antiguas",
      "Noticias de deportes"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Por qué es importante la privacidad online?",
    opciones: [
      "No es importante",
      "Para ocultar cosas",
      "Para proteger datos personales",
      "Para ser secreto"
    ],
    correcta: 2
  }
];

const getDiceIcon = (numero: number) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  return icons[numero - 1] || Dice1;
};

export function SerpientesEscaleras() {
  const navigate = useNavigate();
  
  // Combinar preguntas originales con las del localStorage
  const getStorageData = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const preguntasPersonalizadas = getStorageData("preguntas_serpientes", []);
  const preguntas = [...preguntasOriginales, ...preguntasPersonalizadas];

  const [posicionJugador, setPosicionJugador] = useState(0);
  const [posicionComputadora, setPosicionComputadora] = useState(0);
  const [dado, setDado] = useState(1);
  const [turnoJugador, setTurnoJugador] = useState(true);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [ganador, setGanador] = useState<"jugador" | "computadora" | null>(null);
  const [tirando, setTirando] = useState(false);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [mensaje, setMensaje] = useState("");

  const obtenerCasilla = (numero: number): { fila: number; columna: number } => {
    if (numero === 0) return { fila: 0, columna: 0 };
    
    const filaDesdeAbajo = Math.floor((numero - 1) / 10);
    const fila = 9 - filaDesdeAbajo;
    const posicionEnFila = (numero - 1) % 10;
    
    // Las filas impares (desde abajo) van de derecha a izquierda
    const columna = filaDesdeAbajo % 2 === 0 ? posicionEnFila : 9 - posicionEnFila;
    
    return { fila, columna };
  };

  const moverJugador = (esJugador: boolean, pasos: number) => {
    const setPosicion = esJugador ? setPosicionJugador : setPosicionComputadora;
    const posicionActual = esJugador ? posicionJugador : posicionComputadora;
    
    let nuevaPosicion = Math.min(posicionActual + pasos, TOTAL_CASILLAS);
    
    // Revisar serpientes
    const serpiente = serpientes.find(s => s.inicio === nuevaPosicion);
    if (serpiente) {
      setTimeout(() => {
        setMensaje(esJugador ? "¡Oh no! Caíste en una serpiente 🐍" : "La computadora cayó en una serpiente 🐍");
        setTimeout(() => {
          setPosicion(serpiente.fin);
          setMensaje("");
        }, 1500);
      }, 500);
      return;
    }
    
    // Revisar escaleras
    const escalera = escaleras.find(e => e.inicio === nuevaPosicion);
    if (escalera) {
      setTimeout(() => {
        setMensaje(esJugador ? "¡Genial! Subiste por una escalera 🪜" : "La computadora subió por una escalera 🪜");
        setTimeout(() => {
          setPosicion(escalera.fin);
          setMensaje("");
          if (escalera.fin >= TOTAL_CASILLAS) {
            setJuegoTerminado(true);
            setGanador(esJugador ? "jugador" : "computadora");
          }
        }, 1500);
      }, 500);
      return;
    }
    
    setPosicion(nuevaPosicion);
    
    if (nuevaPosicion >= TOTAL_CASILLAS) {
      setTimeout(() => {
        setJuegoTerminado(true);
        setGanador(esJugador ? "jugador" : "computadora");
      }, 500);
    }
  };

  const responderPregunta = (indiceRespuesta: number) => {
    const esCorrecta = indiceRespuesta === preguntas[preguntaActual].correcta;
    
    if (esCorrecta) {
      setMensaje("¡Correcto! Puedes tirar el dado");
      setMostrarPregunta(false);
      setPreguntaActual((prev) => (prev + 1) % preguntas.length);
    } else {
      setMensaje("Incorrecto. Pierdes tu turno");
      setMostrarPregunta(false);
      setPreguntaActual((prev) => (prev + 1) % preguntas.length);
      setTimeout(() => {
        setMensaje("");
        setTurnoJugador(false);
        setTimeout(turnoComputadora, 1500);
      }, 2000);
    }
  };

  const tirarDado = () => {
    if (tirando || mostrarPregunta || !turnoJugador) return;
    
    setTirando(true);
    setMensaje("");
    
    // Animación del dado
    let contador = 0;
    const intervalo = setInterval(() => {
      setDado(Math.floor(Math.random() * 6) + 1);
      contador++;
      if (contador > 10) {
        clearInterval(intervalo);
        const resultado = Math.floor(Math.random() * 6) + 1;
        setDado(resultado);
        setTirando(false);
        
        setTimeout(() => {
          moverJugador(true, resultado);
          if (posicionJugador + resultado < TOTAL_CASILLAS) {
            setTimeout(() => {
              setTurnoJugador(false);
              setTimeout(turnoComputadora, 2000);
            }, 2000);
          }
        }, 500);
      }
    }, 100);
  };

  const turnoComputadora = () => {
    if (juegoTerminado) return;
    
    setMensaje("Turno de la computadora...");
    setTirando(true);
    
    // Animación del dado
    let contador = 0;
    const intervalo = setInterval(() => {
      setDado(Math.floor(Math.random() * 6) + 1);
      contador++;
      if (contador > 10) {
        clearInterval(intervalo);
        const resultado = Math.floor(Math.random() * 6) + 1;
        setDado(resultado);
        setTirando(false);
        
        setTimeout(() => {
          moverJugador(false, resultado);
          if (posicionComputadora + resultado < TOTAL_CASILLAS) {
            setTimeout(() => {
              setMensaje("");
              setTurnoJugador(true);
              setMostrarPregunta(true);
            }, 2000);
          }
        }, 500);
      }
    }, 100);
  };

  const iniciarJuego = () => {
    setPosicionJugador(0);
    setPosicionComputadora(0);
    setDado(1);
    setTurnoJugador(true);
    setJuegoTerminado(false);
    setGanador(null);
    setTirando(false);
    setMostrarPregunta(true);
    setMensaje("");
    setPreguntaActual(0);
  };

  useEffect(() => {
    iniciarJuego();
  }, []);

  const DiceIcon = getDiceIcon(dado);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
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
                Serpientes y Escaleras
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Responde correctamente y avanza hasta la casilla 100
              </p>
              
              {/* Indicador de turno */}
              <div className="flex justify-center items-center space-x-8 mb-4">
                <div className={`flex items-center space-x-2 px-6 py-3 rounded-2xl ${turnoJugador ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                  <User className="w-5 h-5" />
                  <span className="font-bold">Tú: {posicionJugador}/100</span>
                </div>
                <div className={`flex items-center space-x-2 px-6 py-3 rounded-2xl ${!turnoJugador ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                  <Bot className="w-5 h-5" />
                  <span className="font-bold">PC: {posicionComputadora}/100</span>
                </div>
              </div>

              {mensaje && (
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-6 py-3 rounded-xl inline-block font-bold">
                  {mensaje}
                </div>
              )}
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Tablero */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 mb-8">
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: 100 }, (_, i) => {
                    const numero = 100 - i;
                    const { fila, columna } = obtenerCasilla(numero);
                    const esSerpiente = serpientes.some(s => s.inicio === numero);
                    const esEscalera = escaleras.some(e => e.inicio === numero);
                    const tieneJugador = posicionJugador === numero;
                    const tieneComputadora = posicionComputadora === numero;
                    
                    return (
                      <div
                        key={numero}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-bold border-2 transition-all ${
                          esSerpiente ? 'bg-red-200 dark:bg-red-900/40 border-red-400' :
                          esEscalera ? 'bg-green-200 dark:bg-green-900/40 border-green-400' :
                          numero === 100 ? 'bg-yellow-300 dark:bg-yellow-600 border-yellow-500' :
                          'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <span className="text-gray-700 dark:text-gray-300">{numero}</span>
                        <div className="flex gap-0.5 mt-0.5">
                          {tieneJugador && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                          )}
                          {tieneComputadora && (
                            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Leyenda */}
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-200 dark:bg-red-900/40 border-2 border-red-400 rounded"></div>
                    <span className="text-gray-700 dark:text-gray-300">Serpiente 🐍</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 dark:bg-green-900/40 border-2 border-green-400 rounded"></div>
                    <span className="text-gray-700 dark:text-gray-300">Escalera 🪜</span>
                  </div>
                </div>
              </div>

              {/* Pregunta Modal */}
              {mostrarPregunta && turnoJugador && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    {preguntas[preguntaActual].pregunta}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {preguntas[preguntaActual].opciones.map((opcion, index) => (
                      <button
                        key={index}
                        onClick={() => responderPregunta(index)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-4 font-bold transition-all hover:scale-105"
                      >
                        {opcion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dado y controles */}
              {!mostrarPregunta && turnoJugador && (
                <div className="text-center">
                  <Button
                    onClick={tirarDado}
                    disabled={tirando || !turnoJugador}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-xl px-12 py-8 rounded-3xl shadow-2xl disabled:opacity-50"
                  >
                    <DiceIcon className="w-12 h-12 mr-4" />
                    {tirando ? "Tirando..." : "Tirar dado"}
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {ganador === "jugador" ? "¡Ganaste! 🎉" : "Ganó la computadora 🤖"}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {ganador === "jugador" 
                  ? "¡Excelente! Demostraste tus conocimientos de alfabetización mediática"
                  : "¡Sigue practicando! La próxima vez ganarás"}
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={iniciarJuego}
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 text-white px-8"
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