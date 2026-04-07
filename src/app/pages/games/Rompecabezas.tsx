import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Puzzle, Trophy } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ThemeToggle";
import { PageFooter } from "../../components/PageFooter";

type Pieza = {
  id: number;
  posicionCorrecta: number;
  posicionActual: number;
  texto: string;
  color: string;
};

const fraseOriginal =
  "Verifica la fuente antes de compartir información en redes sociales digitales";

const colores = [
  "bg-blue-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-violet-400",
];

const dividirFraseEn8Partes = (frase: string): string[] => {
  const palabras = frase.split(" ");
  const parteSize = Math.ceil(palabras.length / 8);
  const partes: string[] = [];

  for (let i = 0; i < 8; i++) {
    const inicio = i * parteSize;
    const fin = Math.min(inicio + parteSize, palabras.length);
    const parte = palabras.slice(inicio, fin).join(" ");
    if (parte) {
      partes.push(parte);
    }
  }

  // Si hay menos de 8 partes, agregar partes vacías
  while (partes.length < 8) {
    partes.push("");
  }

  return partes.slice(0, 8);
};

const ItemTypes = {
  PIEZA: "pieza",
};

interface PiezaDraggableProps {
  pieza: Pieza;
  onDrop: (draggedId: number, targetId: number) => void;
}

function PiezaDraggable({ pieza, onDrop }: PiezaDraggableProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIEZA,
    item: { id: pieza.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PIEZA,
    drop: (item: { id: number }) => {
      if (item.id !== pieza.id) {
        onDrop(item.id, pieza.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const esCorrecta = pieza.posicionCorrecta === pieza.posicionActual;

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`${pieza.color} dark:opacity-90 rounded-2xl p-6 flex items-center justify-center text-white font-bold text-lg cursor-move transition-all transform ${
        isDragging ? "opacity-50 scale-95" : ""
      } ${isOver ? "scale-105 ring-4 ring-white" : ""} ${
        esCorrecta ? "ring-4 ring-green-500" : ""
      } shadow-lg hover:shadow-xl`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="text-center select-none">{pieza.texto}</span>
    </div>
  );
}

function RompecabezasGame() {
  const navigate = useNavigate();

  // Obtener frases de localStorage
  const getStorageData = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const frasesPersonalizadas = getStorageData("rompecabezas", []);
  const todasLasFrases = [{ id: 0, frase: fraseOriginal }, ...frasesPersonalizadas];

  // Seleccionar una frase aleatoria
  const [fraseSeleccionada] = useState(() => {
    const indice = Math.floor(Math.random() * todasLasFrases.length);
    return todasLasFrases[indice].frase;
  });

  const [piezas, setPiezas] = useState<Pieza[]>([]);
  const [movimientos, setMovimientos] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [tiempoInicio, setTiempoInicio] = useState<number>(Date.now());

  useEffect(() => {
    iniciarJuego();
  }, []);

  useEffect(() => {
    const todasCorrectas = piezas.every(
      (p) => p.posicionCorrecta === p.posicionActual
    );
    if (piezas.length > 0 && todasCorrectas && !juegoTerminado) {
      setJuegoTerminado(true);
    }
  }, [piezas, juegoTerminado]);

  const iniciarJuego = () => {
    const partes = dividirFraseEn8Partes(fraseSeleccionada);
    const piezasOriginales = partes.map((parte, index) => ({
      id: index + 1,
      posicionCorrecta: index + 1,
      texto: parte,
      color: colores[index],
    }));

    const piezasDesordenadas = [...piezasOriginales]
      .sort(() => Math.random() - 0.5)
      .map((pieza, index) => ({
        ...pieza,
        posicionActual: index + 1,
      }));
    setPiezas(piezasDesordenadas);
    setMovimientos(0);
    setJuegoTerminado(false);
    setTiempoInicio(Date.now());
  };

  const handleDrop = (draggedId: number, targetId: number) => {
    setPiezas((prevPiezas) => {
      const newPiezas = [...prevPiezas];
      const draggedIndex = newPiezas.findIndex((p) => p.id === draggedId);
      const targetIndex = newPiezas.findIndex((p) => p.id === targetId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const draggedPosicion = newPiezas[draggedIndex].posicionActual;
        const targetPosicion = newPiezas[targetIndex].posicionActual;

        newPiezas[draggedIndex].posicionActual = targetPosicion;
        newPiezas[targetIndex].posicionActual = draggedPosicion;
      }

      return newPiezas;
    });
    setMovimientos((prev) => prev + 1);
  };

  const piezasOrdenadas = [...piezas].sort(
    (a, b) => a.posicionActual - b.posicionActual
  );

  const piezasCorrectas = piezas.filter(
    (p) => p.posicionCorrecta === p.posicionActual
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
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
                Rompecabezas
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Arrastra las piezas para ordenar la frase correctamente
              </p>
              <div className="flex justify-center items-center space-x-6">
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  Movimientos:{" "}
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {movimientos}
                  </span>
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  Progreso:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {piezasCorrectas}/{piezas.length}
                  </span>
                </div>
              </div>
              <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-4">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${(piezasCorrectas / piezas.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {piezasOrdenadas.map((pieza) => (
                  <PiezaDraggable
                    key={pieza.id}
                    pieza={pieza}
                    onDrop={handleDrop}
                  />
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  💡 Pista:
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  La frase completa habla sobre una de las prácticas más
                  importantes en alfabetización mediática. Las piezas con borde
                  verde están en la posición correcta.
                </p>
              </div>

              <div className="text-center mt-8">
                <Button onClick={iniciarJuego} variant="outline" className="px-8">
                  Reiniciar juego
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Rompecabezas completado!
              </h2>
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 mb-6">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {fraseSeleccionada}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {movimientos}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Movimientos
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.floor((Date.now() - tiempoInicio) / 1000)}s
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tiempo
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={iniciarJuego}
                  className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500 text-white px-8"
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

export function Rompecabezas() {
  return (
    <DndProvider backend={HTML5Backend}>
      <RompecabezasGame />
    </DndProvider>
  );
}