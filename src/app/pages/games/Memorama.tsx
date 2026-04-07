import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Grid3x3, Trophy } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ThemeToggle";
import { PageFooter } from "../../components/PageFooter";

type Carta = {
  id: number;
  contenido: string;
  pareja: number;
  volteada: boolean;
  emparejada: boolean;
};

const parejasOriginales = [
  { id: 1, contenido: "Alfabetización Mediática", pareja: 1 },
  { id: 2, contenido: "Analizar contenido crítico", pareja: 1 },
  { id: 3, contenido: "Desinformación", pareja: 2 },
  { id: 4, contenido: "Información falsa intencional", pareja: 2 },
  { id: 5, contenido: "Fake News", pareja: 3 },
  { id: 6, contenido: "Noticias inventadas", pareja: 3 },
  { id: 7, contenido: "Verificación", pareja: 4 },
  { id: 8, contenido: "Contrastar fuentes", pareja: 4 },
  { id: 9, contenido: "Privacidad", pareja: 5 },
  { id: 10, contenido: "Proteger datos personales", pareja: 5 },
  { id: 11, contenido: "Sesgo", pareja: 6 },
  { id: 12, contenido: "Perspectiva parcial", pareja: 6 },
];

export function Memorama() {
  const navigate = useNavigate();
  
  // Combinar parejas originales con las del localStorage
  const getStorageData = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const parejasPersonalizadas = getStorageData("parejas_memorama", []);
  const todasLasParejas = [...parejasOriginales, ...parejasPersonalizadas];

  const [cartas, setCartas] = useState<Carta[]>([]);
  const [cartasVolteadas, setCartasVolteadas] = useState<number[]>([]);
  const [movimientos, setMovimientos] = useState(0);
  const [parejasEncontradas, setParejasEncontradas] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    iniciarJuego();
  }, []);

  const iniciarJuego = () => {
    const cartasBarajadas = [...todasLasParejas]
      .sort(() => Math.random() - 0.5)
      .map((carta) => ({
        ...carta,
        volteada: false,
        emparejada: false,
      }));
    setCartas(cartasBarajadas);
    setCartasVolteadas([]);
    setMovimientos(0);
    setParejasEncontradas(0);
    setJuegoTerminado(false);
    setBloqueado(false);
  };

  const handleClickCarta = (id: number) => {
    if (bloqueado) return;
    
    const carta = cartas.find((c) => c.id === id);
    if (!carta || carta.volteada || carta.emparejada) return;

    const nuevasCartasVolteadas = [...cartasVolteadas, id];
    setCartasVolteadas(nuevasCartasVolteadas);

    const nuevasCartas = cartas.map((c) =>
      c.id === id ? { ...c, volteada: true } : c
    );
    setCartas(nuevasCartas);

    if (nuevasCartasVolteadas.length === 2) {
      setBloqueado(true);
      setMovimientos(movimientos + 1);

      const [id1, id2] = nuevasCartasVolteadas;
      const carta1 = cartas.find((c) => c.id === id1);
      const carta2 = cartas.find((c) => c.id === id2);

      if (carta1 && carta2 && carta1.pareja === carta2.pareja) {
        // ¡Pareja encontrada!
        setTimeout(() => {
          setCartas((prev) =>
            prev.map((c) =>
              c.id === id1 || c.id === id2 ? { ...c, emparejada: true } : c
            )
          );
          setCartasVolteadas([]);
          setBloqueado(false);
          
          const nuevasParejasEncontradas = parejasEncontradas + 1;
          setParejasEncontradas(nuevasParejasEncontradas);
          
          if (nuevasParejasEncontradas === todasLasParejas.length / 2) {
            setJuegoTerminado(true);
          }
        }, 500);
      } else {
        // No coinciden
        setTimeout(() => {
          setCartas((prev) =>
            prev.map((c) =>
              c.id === id1 || c.id === id2 ? { ...c, volteada: false } : c
            )
          );
          setCartasVolteadas([]);
          setBloqueado(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
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
                Memorama
              </h1>
              <div className="flex justify-center items-center space-x-6">
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  Movimientos: <span className="font-bold text-pink-600 dark:text-pink-400">{movimientos}</span>
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  Parejas: <span className="font-bold text-purple-600 dark:text-purple-400">{parejasEncontradas}/{todasLasParejas.length / 2}</span>
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-4 gap-4">
              {cartas.map((carta) => (
                <button
                  key={carta.id}
                  onClick={() => handleClickCarta(carta.id)}
                  disabled={carta.emparejada || bloqueado}
                  className={`aspect-square rounded-2xl transition-all duration-300 transform ${
                    carta.volteada || carta.emparejada
                      ? "bg-gradient-to-br from-pink-400 to-purple-500 text-white scale-100"
                      : "bg-gradient-to-br from-pink-200 to-purple-300 dark:from-pink-900 dark:to-purple-900 hover:scale-105"
                  } ${
                    carta.emparejada
                      ? "opacity-60 cursor-default"
                      : "cursor-pointer shadow-lg hover:shadow-xl"
                  } flex items-center justify-center p-4`}
                >
                  {carta.volteada || carta.emparejada ? (
                    <span className="text-center font-bold text-sm md:text-base leading-tight">
                      {carta.contenido}
                    </span>
                  ) : (
                    <Grid3x3 className="w-10 h-10 text-white" />
                  )}
                </button>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={iniciarJuego}
                variant="outline"
                className="px-8"
              >
                Reiniciar juego
              </Button>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Felicitaciones!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Completaste el memorama
              </p>
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-8">
                {movimientos} movimientos
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={iniciarJuego}
                  className="bg-pink-500 hover:bg-pink-600 dark:bg-pink-400 dark:hover:bg-pink-500 text-white px-8"
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