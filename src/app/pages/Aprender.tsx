import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, BookOpen, AlertTriangle, Newspaper, Scale } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { PageFooter } from "../components/PageFooter";

const temasOriginales = [
  {
    id: 1,
    icon: BookOpen,
    titulo: "¿Qué es la alfabetización mediática?",
    contenido:
      "La alfabetización mediática es la capacidad de acceder, analizar, evaluar y crear contenido en diversos formatos mediáticos. En la era digital, es esencial para navegar el mundo de la información de manera crítica y responsable. Incluye habilidades como verificar fuentes, identificar sesgos y comprender cómo los medios pueden influir en nuestras percepciones.",
    color: "blue",
    imagen: "https://images.unsplash.com/photo-1758874384930-6e1452bb9c71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBsYXB0b3AlMjBoYXBweXxlbnwxfHx8fDE3NzMyOTA3NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    icon: AlertTriangle,
    titulo: "¿Qué es la desinformación?",
    contenido:
      "La desinformación es información falsa o inexacta que se difunde deliberadamente para engañar. A diferencia de la información errónea (que puede compartirse sin intención maliciosa), la desinformación tiene el propósito específico de manipular opiniones, generar confusión o causar daño. Puede presentarse en forma de noticias falsas, memes manipulados o estadísticas inventadas.",
    color: "red",
    imagen: "https://images.unsplash.com/photo-1768595618189-dafdc57a2d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpYSUyMGxpdGVyYWN5JTIwbmV3c3xlbnwxfHx8fDE3NzMyOTA3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    icon: Newspaper,
    titulo: "¿Qué son las fake news?",
    contenido:
      "Las fake news (noticias falsas) son artículos o contenidos que aparentan ser noticias legítimas pero que contienen información inventada o engañosa. Se diseñan para parecer creíbles, usando titulares sensacionalistas y formatos similares a medios reales. Su objetivo puede ser influir en opiniones políticas, generar clics para obtener ingresos publicitarios o simplemente crear caos. Es crucial verificar las fuentes y contrastar la información antes de compartirla.",
    color: "orange",
    imagen: "https://images.unsplash.com/photo-1599344941194-5eb5eaaaf73d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWtlJTIwbmV3cyUyMG1pc2luZm9ybWF0aW9ufGVufDF8fHx8MTc3MzI5MDc3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    icon: Scale,
    titulo: "¿Qué obligaciones tengo en internet?",
    contenido:
      "Como usuario de internet, tienes responsabilidades importantes: verificar información antes de compartirla, respetar los derechos de autor, proteger la privacidad propia y ajena, comunicarte con respeto (evitando el cyberbullying), y ser consciente del impacto de tus acciones en línea. También debes conocer y seguir las leyes digitales de tu país, proteger tus datos personales y contribuir a crear un espacio digital seguro y constructivo para todos.",
    color: "green",
    imagen: "https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5ldCUyMHNlY3VyaXR5JTIwc2hpZWxkfGVufDF8fHx8MTc3MzI2ODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const getIconComponent = (iconName: string) => {
  const icons: any = {
    BookOpen,
    AlertTriangle,
    Newspaper,
    Scale,
  };
  return icons[iconName] || BookOpen;
};

export function Aprender() {
  const navigate = useNavigate();
  const [temaSeleccionado, setTemaSeleccionado] = useState<number | null>(null);

  // Combinar temas originales con los del localStorage
  const getStorageData = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const modulosPersonalizados = getStorageData("modulos_aprender", []).map((m: any) => ({
    ...m,
    icon: getIconComponent(m.icon),
  }));

  const temas = [...temasOriginales, ...modulosPersonalizados];

  const tema = temas.find((t) => t.id === temaSeleccionado);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
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
        {!temaSeleccionado ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Comienza a aprender
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Selecciona un tema para explorar
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {temas.map((tema) => {
                const Icon = tema.icon;
                const colorClasses = {
                  blue: "border-blue-500 dark:border-blue-400 hover:border-blue-600",
                  red: "border-red-500 dark:border-red-400 hover:border-red-600",
                  orange: "border-orange-500 dark:border-orange-400 hover:border-orange-600",
                  green: "border-green-500 dark:border-green-400 hover:border-green-600",
                };
                const bgClasses = {
                  blue: "bg-blue-500 dark:bg-blue-400",
                  red: "bg-red-500 dark:bg-red-400",
                  orange: "bg-orange-500 dark:bg-orange-400",
                  green: "bg-green-500 dark:bg-green-400",
                };

                return (
                  <button
                    key={tema.id}
                    onClick={() => setTemaSeleccionado(tema.id)}
                    className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-4 ${
                      colorClasses[tema.color as keyof typeof colorClasses]
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-14 h-14 ${
                          bgClasses[tema.color as keyof typeof bgClasses]
                        } rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {tema.titulo}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => setTemaSeleccionado(null)}
              variant="outline"
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a temas
            </Button>

            {tema && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src={tema.imagen}
                    alt={tema.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    {(() => {
                      const Icon = tema.icon;
                      const bgClasses = {
                        blue: "bg-blue-500 dark:bg-blue-400",
                        red: "bg-red-500 dark:bg-red-400",
                        orange: "bg-orange-500 dark:bg-orange-400",
                        green: "bg-green-500 dark:bg-green-400",
                      };
                      return (
                        <div
                          className={`w-16 h-16 ${
                            bgClasses[tema.color as keyof typeof bgClasses]
                          } rounded-2xl flex items-center justify-center`}
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      );
                    })()}
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {tema.titulo}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tema.contenido}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <PageFooter />
    </div>
  );
}