import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, Trash2, BookOpen, Brain, Newspaper, Grid3x3, Puzzle, Dice3, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { PageFooter } from "../components/PageFooter";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("aprender");

  // Estados para formularios
  const [formData, setFormData] = useState<any>({});

  // Helpers para localStorage
  const getStorageData = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const setStorageData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Módulos de Aprendizaje
  const handleAddModuloAprender = (e: React.FormEvent) => {
    e.preventDefault();
    const modulos = getStorageData("modulos_aprender", []);
    const nuevoModulo = {
      id: Date.now(),
      icon: "BookOpen",
      titulo: formData.titulo,
      contenido: formData.contenido,
      color: formData.color || "blue",
      imagen: formData.imagen || "https://images.unsplash.com/photo-1758874384930-6e1452bb9c71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBsYXB0b3AlMjBoYXBweXxlbnwxfHx8fDE3NzMyOTA3NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    };
    modulos.push(nuevoModulo);
    setStorageData("modulos_aprender", modulos);
    setFormData({});
    alert("Módulo agregado exitosamente");
  };

  const handleDeleteModuloAprender = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este módulo?")) {
      const modulos = getStorageData("modulos_aprender", []);
      const nuevosModulos = modulos.filter((m: any) => m.id !== id);
      setStorageData("modulos_aprender", nuevosModulos);
      alert("Módulo eliminado");
    }
  };

  // Trivia
  const handleAddPreguntaTrivia = (e: React.FormEvent) => {
    e.preventDefault();
    const preguntas = getStorageData("preguntas_trivia", []);
    const nuevaPregunta = {
      id: Date.now(),
      pregunta: formData.pregunta,
      opciones: [
        formData.opcion1,
        formData.opcion2,
        formData.opcion3,
        formData.opcion4,
      ],
      respuestaCorrecta: parseInt(formData.respuestaCorrecta),
    };
    preguntas.push(nuevaPregunta);
    setStorageData("preguntas_trivia", preguntas);
    setFormData({});
    alert("Pregunta agregada exitosamente");
  };

  const handleDeletePreguntaTrivia = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta pregunta?")) {
      const preguntas = getStorageData("preguntas_trivia", []);
      const nuevasPreguntas = preguntas.filter((p: any) => p.id !== id);
      setStorageData("preguntas_trivia", nuevasPreguntas);
      alert("Pregunta eliminada");
    }
  };

  // Real vs Fake
  const handleAddNoticiaRealFake = (e: React.FormEvent) => {
    e.preventDefault();
    const noticias = getStorageData("noticias_realfake", []);
    const nuevaNoticia = {
      id: Date.now(),
      titulo: formData.titulo,
      fuente: formData.fuente,
      imagen: formData.imagen,
      esReal: formData.esReal === "true",
      explicacion: formData.explicacion,
    };
    noticias.push(nuevaNoticia);
    setStorageData("noticias_realfake", noticias);
    setFormData({});
    alert("Noticia agregada exitosamente");
  };

  const handleDeleteNoticiaRealFake = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta noticia?")) {
      const noticias = getStorageData("noticias_realfake", []);
      const nuevasNoticias = noticias.filter((n: any) => n.id !== id);
      setStorageData("noticias_realfake", nuevasNoticias);
      alert("Noticia eliminada");
    }
  };

  // Crucigrama
  const handleAddCrucigrama = (e: React.FormEvent) => {
    e.preventDefault();
    const crucigramas = getStorageData("crucigramas", []);
    const nuevoCrucigrama = {
      id: Date.now(),
      titulo: formData.titulo,
      palabras: JSON.parse(formData.palabras), // Esperamos un JSON con array de {palabra, pista}
    };
    crucigramas.push(nuevoCrucigrama);
    setStorageData("crucigramas", crucigramas);
    setFormData({});
    alert("Crucigrama agregado exitosamente");
  };

  const handleDeleteCrucigrama = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este crucigrama?")) {
      const crucigramas = getStorageData("crucigramas", []);
      const nuevosCrucigramas = crucigramas.filter((c: any) => c.id !== id);
      setStorageData("crucigramas", nuevosCrucigramas);
      alert("Crucigrama eliminado");
    }
  };

  // Serpientes y Escaleras
  const handleAddPreguntaSerpientes = (e: React.FormEvent) => {
    e.preventDefault();
    const preguntas = getStorageData("preguntas_serpientes", []);
    const nuevaPregunta = {
      id: Date.now(),
      pregunta: formData.pregunta,
      opciones: [
        formData.opcion1,
        formData.opcion2,
        formData.opcion3,
      ],
      respuestaCorrecta: parseInt(formData.respuestaCorrecta),
    };
    preguntas.push(nuevaPregunta);
    setStorageData("preguntas_serpientes", preguntas);
    setFormData({});
    alert("Pregunta agregada exitosamente");
  };

  const handleDeletePreguntaSerpientes = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta pregunta?")) {
      const preguntas = getStorageData("preguntas_serpientes", []);
      const nuevasPreguntas = preguntas.filter((p: any) => p.id !== id);
      setStorageData("preguntas_serpientes", nuevasPreguntas);
      alert("Pregunta eliminada");
    }
  };

  // Memorama
  const handleAddMemorama = (e: React.FormEvent) => {
    e.preventDefault();
    const memoramas = getStorageData("parejas_memorama", []);
    const pares = JSON.parse(formData.pares); // Esperamos un JSON con array de {concepto, descripcion}
    pares.forEach((par: any, index: number) => {
      const parejaId = Date.now() + index;
      memoramas.push({
        id: parejaId * 2 - 1,
        contenido: par.concepto,
        pareja: parejaId,
      });
      memoramas.push({
        id: parejaId * 2,
        contenido: par.descripcion,
        pareja: parejaId,
      });
    });
    setStorageData("parejas_memorama", memoramas);
    setFormData({});
    alert("Memorama agregado exitosamente");
  };

  const handleDeleteParMemorama = (pareja: number) => {
    if (confirm("¿Estás seguro de eliminar este par?")) {
      const memoramas = getStorageData("parejas_memorama", []);
      const nuevosMemoramas = memoramas.filter((m: any) => m.pareja !== pareja);
      setStorageData("parejas_memorama", nuevosMemoramas);
      alert("Par eliminado");
    }
  };

  // Rompecabezas
  const handleAddRompecabezas = (e: React.FormEvent) => {
    e.preventDefault();
    const rompecabezas = getStorageData("rompecabezas", []);
    const nuevoRompecabezas = {
      id: Date.now(),
      frase: formData.frase,
    };
    rompecabezas.push(nuevoRompecabezas);
    setStorageData("rompecabezas", rompecabezas);
    setFormData({});
    alert("Rompecabezas agregado exitosamente");
  };

  const handleDeleteRompecabezas = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este rompecabezas?")) {
      const rompecabezas = getStorageData("rompecabezas", []);
      const nuevosRompecabezas = rompecabezas.filter((r: any) => r.id !== id);
      setStorageData("rompecabezas", nuevosRompecabezas);
      alert("Rompecabezas eliminado");
    }
  };

  // Obtener datos actuales
  const modulosAprender = getStorageData("modulos_aprender", []);
  const preguntasTrivia = getStorageData("preguntas_trivia", []);
  const noticiasRealFake = getStorageData("noticias_realfake", []);
  const crucigramas = getStorageData("crucigramas", []);
  const preguntasSerpientes = getStorageData("preguntas_serpientes", []);
  const parejasMemorama = getStorageData("parejas_memorama", []);
  const rompecabezasData = getStorageData("rompecabezas", []);

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Panel de Administración
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Gestiona el contenido de la aplicación
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
          <TabsList className="grid grid-cols-7 mb-8">
            <TabsTrigger value="aprender">
              <BookOpen className="w-4 h-4 mr-2" />
              Aprender
            </TabsTrigger>
            <TabsTrigger value="trivia">
              <Brain className="w-4 h-4 mr-2" />
              Trivia
            </TabsTrigger>
            <TabsTrigger value="realfake">
              <Newspaper className="w-4 h-4 mr-2" />
              Real/Fake
            </TabsTrigger>
            <TabsTrigger value="crucigrama">
              <FileText className="w-4 h-4 mr-2" />
              Crucigrama
            </TabsTrigger>
            <TabsTrigger value="serpientes">
              <Dice3 className="w-4 h-4 mr-2" />
              Serpientes
            </TabsTrigger>
            <TabsTrigger value="memorama">
              <Grid3x3 className="w-4 h-4 mr-2" />
              Memorama
            </TabsTrigger>
            <TabsTrigger value="rompecabezas">
              <Puzzle className="w-4 h-4 mr-2" />
              Rompecabezas
            </TabsTrigger>
          </TabsList>

          {/* MÓDULOS DE APRENDIZAJE */}
          <TabsContent value="aprender">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Agregar Módulo
                </h2>
                <form onSubmit={handleAddModuloAprender} className="space-y-4">
                  <div>
                    <Label>Título (pregunta)</Label>
                    <Input
                      required
                      value={formData.titulo || ""}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      placeholder="¿Qué es...?"
                    />
                  </div>
                  <div>
                    <Label>Contenido (información)</Label>
                    <Textarea
                      required
                      value={formData.contenido || ""}
                      onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                      placeholder="Explicación detallada..."
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label>Color</Label>
                    <Select
                      value={formData.color || "blue"}
                      onValueChange={(value) => setFormData({ ...formData, color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Azul</SelectItem>
                        <SelectItem value="red">Rojo</SelectItem>
                        <SelectItem value="orange">Naranja</SelectItem>
                        <SelectItem value="green">Verde</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Imagen URL (opcional)</Label>
                    <Input
                      value={formData.imagen || ""}
                      onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Módulo
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Módulos Actuales ({modulosAprender.length})
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {modulosAprender.map((modulo: any) => (
                    <div
                      key={modulo.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {modulo.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {modulo.contenido}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteModuloAprender(modulo.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {modulosAprender.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No hay módulos personalizados</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* TRIVIA */}
          <TabsContent value="trivia">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Agregar Pregunta
                </h2>
                <form onSubmit={handleAddPreguntaTrivia} className="space-y-4">
                  <div>
                    <Label>Pregunta</Label>
                    <Input
                      required
                      value={formData.pregunta || ""}
                      onChange={(e) => setFormData({ ...formData, pregunta: e.target.value })}
                      placeholder="¿Cuál es...?"
                    />
                  </div>
                  <div>
                    <Label>Opción 1</Label>
                    <Input
                      required
                      value={formData.opcion1 || ""}
                      onChange={(e) => setFormData({ ...formData, opcion1: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Opción 2</Label>
                    <Input
                      required
                      value={formData.opcion2 || ""}
                      onChange={(e) => setFormData({ ...formData, opcion2: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Opción 3</Label>
                    <Input
                      required
                      value={formData.opcion3 || ""}
                      onChange={(e) => setFormData({ ...formData, opcion3: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Opción 4</Label>
                    <Input
                      required
                      value={formData.opcion4 || ""}
                      onChange={(e) => setFormData({ ...formData, opcion4: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Respuesta Correcta (0-3)</Label>
                    <Select
                      value={formData.respuestaCorrecta || "0"}
                      onValueChange={(value) => setFormData({ ...formData, respuestaCorrecta: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Opción 1</SelectItem>
                        <SelectItem value="1">Opción 2</SelectItem>
                        <SelectItem value="2">Opción 3</SelectItem>
                        <SelectItem value="3">Opción 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Pregunta
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Preguntas Actuales ({preguntasTrivia.length})
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {preguntasTrivia.map((pregunta: any) => (
                    <div
                      key={pregunta.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {pregunta.pregunta}
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Correcta: {pregunta.opciones[pregunta.respuestaCorrecta]}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePreguntaTrivia(pregunta.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {preguntasTrivia.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No hay preguntas personalizadas</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* REAL VS FAKE */}
          <TabsContent value="realfake">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Agregar Noticia
                </h2>
                <form onSubmit={handleAddNoticiaRealFake} className="space-y-4">
                  <div>
                    <Label>Título</Label>
                    <Input
                      required
                      value={formData.titulo || ""}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Fuente</Label>
                    <Input
                      required
                      value={formData.fuente || ""}
                      onChange={(e) => setFormData({ ...formData, fuente: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Imagen URL (obligatoria)</Label>
                    <Input
                      required
                      value={formData.imagen || ""}
                      onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label>¿Es Real?</Label>
                    <Select
                      value={formData.esReal || "true"}
                      onValueChange={(value) => setFormData({ ...formData, esReal: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Real</SelectItem>
                        <SelectItem value="false">Fake</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Explicación</Label>
                    <Textarea
                      required
                      value={formData.explicacion || ""}
                      onChange={(e) => setFormData({ ...formData, explicacion: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Noticia
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Noticias Actuales ({noticiasRealFake.length})
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {noticiasRealFake.map((noticia: any) => (
                    <div
                      key={noticia.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {noticia.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {noticia.esReal ? "✅ Real" : "❌ Fake"} - {noticia.fuente}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteNoticiaRealFake(noticia.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {noticiasRealFake.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No hay noticias personalizadas</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* CRUCIGRAMA */}
          <TabsContent value="crucigrama">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Agregar Crucigrama
                </h2>
                <form onSubmit={handleAddCrucigrama} className="space-y-4">
                  <div>
                    <Label>Título del Crucigrama</Label>
                    <Input
                      required
                      value={formData.titulo || ""}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      placeholder="Alfabetización Mediática"
                    />
                  </div>
                  <div>
                    <Label>Palabras y Pistas (JSON)</Label>
                    <Textarea
                      required
                      value={formData.palabras || ""}
                      onChange={(e) => setFormData({ ...formData, palabras: e.target.value })}
                      placeholder='[{"palabra":"FAKE","pista":"Noticia falsa"},{"palabra":"MEDIO","pista":"Canal de comunicación"}]'
                      rows={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Formato: Array de objetos con "palabra" y "pista"
                    </p>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Crucigrama
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Crucigramas Actuales ({crucigramas.length})
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {crucigramas.map((crucigrama: any) => (
                    <div
                      key={crucigrama.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {crucigrama.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {crucigrama.palabras?.length || 0} palabras
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCrucigrama(crucigrama.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {crucigramas.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No hay crucigramas personalizados</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* SERPIENTES Y ESCALERAS */}
          <TabsContent value="serpientes">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Agregar Pregunta
                </h2>
                <form onSubmit={handleAddPreguntaSerpientes} className="space-y-4">
                  <div>
                    <Label>Pregunta</Label>
                    <Input
                      required
                      value={formData.pregunta || ""}
                      onChange={(e) => setFormData({ ...formData, pregunta: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Opción 1</Label>
                    <Input
                      required
                      value={formData.opcion1 || ""}
                      onChange={(e) => setFormData({ ...formData, opcion1: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Opción 2</Label>
                    <Input
                      required
                      value={formData.opcion2 || ""}
                      onChange={(e) => setFormData({ ...formData, opcion2: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Opción 3</Label>
                    <Input
                      required
                      value={formData.opcion3 || ""}
                      onChange={(e) => setFormData({ ...formData, opcion3: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Respuesta Correcta (0-2)</Label>
                    <Select
                      value={formData.respuestaCorrecta || "0"}
                      onValueChange={(value) => setFormData({ ...formData, respuestaCorrecta: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Opción 1</SelectItem>
                        <SelectItem value="1">Opción 2</SelectItem>
                        <SelectItem value="2">Opción 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Pregunta
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Preguntas Actuales ({preguntasSerpientes.length})
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {preguntasSerpientes.map((pregunta: any) => (
                    <div
                      key={pregunta.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {pregunta.pregunta}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePreguntaSerpientes(pregunta.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {preguntasSerpientes.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No hay preguntas personalizadas</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* MEMORAMA */}
          <TabsContent value="memorama">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Agregar Pares
                </h2>
                <form onSubmit={handleAddMemorama} className="space-y-4">
                  <div>
                    <Label>Pares (JSON)</Label>
                    <Textarea
                      required
                      value={formData.pares || ""}
                      onChange={(e) => setFormData({ ...formData, pares: e.target.value })}
                      placeholder='[{"concepto":"Fake News","descripcion":"Noticia falsa"},{"concepto":"Verificación","descripcion":"Contrastar fuentes"}]'
                      rows={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Formato: Array de objetos con "concepto" y "descripcion"
                    </p>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Pares
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Pares Actuales ({parejasMemorama.length / 2})
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {Array.from(new Set(parejasMemorama.map((p: any) => p.pareja))).map((pareja: any) => {
                    const par = parejasMemorama.filter((p: any) => p.pareja === pareja);
                    return (
                      <div
                        key={pareja}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-start"
                      >
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {par[0]?.contenido} ↔️ {par[1]?.contenido}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteParMemorama(pareja)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                  {parejasMemorama.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No hay pares personalizados</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* ROMPECABEZAS */}
          <TabsContent value="rompecabezas">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Agregar Rompecabezas
                </h2>
                <form onSubmit={handleAddRompecabezas} className="space-y-4">
                  <div>
                    <Label>Frase Completa</Label>
                    <Textarea
                      required
                      value={formData.frase || ""}
                      onChange={(e) => setFormData({ ...formData, frase: e.target.value })}
                      placeholder="La alfabetización mediática es fundamental para navegar el mundo digital"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Se dividirá automáticamente en 8 partes
                    </p>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Rompecabezas
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Rompecabezas Actuales ({rompecabezasData.length})
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {rompecabezasData.map((rompecabeza: any) => (
                    <div
                      key={rompecabeza.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {rompecabeza.frase}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRompecabezas(rompecabeza.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {rompecabezasData.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No hay rompecabezas personalizados</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <PageFooter />
    </div>
  );
}
