# Sistema de Noticias de IA

## Descripción
Sistema implementado para mostrar las últimas noticias relacionadas con la Inteligencia Artificial desde medios españoles de calidad. Las noticias se obtienen mediante RSS feeds, se filtran por relevancia con IA, se categorizan y resumen automáticamente.

## Archivos creados

### 1. `/docs/app/api/news/route.ts`
API endpoint que:
- **Obtiene noticias de 13 medios españoles** mediante RSS feeds
- **Parser RSS/Atom personalizado** - No depende de librerías externas
- **Filtro estricto de IA** - Solo noticias que mencionen explícitamente IA, ML, modelos específicos (ChatGPT, Claude, etc.)
- **Categorización inteligente** en 9 categorías: Regulación, Ética, Tecnología, Negocios, Investigación, Sociedad, Laboral, Salud, Educación
- **Genera resúmenes automáticos** (2-3 primeras oraciones)
- **Caché de 1 hora** (revalidate: 3600)
- **Prioriza contenido español** (8 artículos ES + 2 EN, hasta 10 total)
- **Traducción opcional** mediante MyMemory API (gratuita)

### 2. `/docs/app/_components/ai-news.tsx`
Componente React que:
- Muestra hasta 10 noticias con tarjetas interactivas
- 9 categorías con colores distintivos
- Fecha relativa (hace X horas/días)
- Enlaces directos a la fuente original
- Animación de carga (skeleton con 3 placeholders)
- Diseño responsive con modo oscuro
- Scroll interno (max-h-[500px])
- Efectos hover con escala y sombra

### 3. `/docs/app/page.tsx` (modificado)
- Importa el componente AINews
- Lo integra en el Feature con id="docs-card"
- Título: "Últimas Noticias de IA"

### 4. `/docs/.env.local`
Variables de entorno opcionales:
```bash
# NEWS_API_KEY - Ya NO se usa (legacy)
NEWS_API_KEY=

# TRANSLATE_NEWS - Traducción automática (opcional)
# false = más rápido, muestra idioma original
# true = traduce artículos en inglés al español (límite 5)
TRANSLATE_NEWS=false
```

## Fuentes de Noticias (13 medios españoles)

### Medios Generalistas
- 📰 **El País** - Tecnología
- 📰 **El Mundo** - Tecnología
- 📰 **ABC** - Tecnología
- 📰 **Expansión** - Tecnología
- 📰 **La Razón** - Tecnología
- 📰 **El Español** - Omicrono
- 📰 **El Confidencial** - Tecnología

### Medios Especializados en Tecnología
- 💻 **Xataka** - Tecnología y gadgets
- 💻 **Genbeta** - Software y apps
- 💻 **Computer Hoy** - Tecnología
- 💻 **Hipertextual** - Tecnología
- 🔬 **Muy Interesante** - Ciencia y tecnología
- 🌐 **Europa Press** - Tecnología

## Características

✅ **100% contenido español** de medios verificados  
✅ **RSS feeds directos** - Sin APIs de pago ni límites  
✅ **Filtro estricto de IA** - Solo noticias relevantes  
✅ **9 categorías inteligentes** con priorización  
✅ **Hasta 10 artículos** simultáneos  
✅ **Resúmenes automáticos**  
✅ **Enlaces a fuentes originales**  
✅ **Diseño responsive** con hover effects  
✅ **Modo oscuro** incluido  
✅ **Caché de 1 hora** para optimizar rendimiento  
✅ **Datos de respaldo** si todos los feeds fallan  
✅ **Formato de fecha relativo** (hace X horas/días)  
✅ **Completamente gratuito** - Sin costes de APIs  

## Categorías con Colores

- 🔵 **Regulación**: Leyes, normativas, políticas, legislación
- 🟣 **Ética**: Responsabilidad, privacidad, derechos, transparencia
- 🟢 **Tecnología**: Avances técnicos, nuevos modelos, desarrollo
- 🟠 **Negocios**: Empresas, inversión, mercado, startups
- 🩷 **Investigación**: Estudios científicos, papers, descubrimientos
- 🔵 **Sociedad**: Impacto social, comunidad, sostenibilidad
- 🟡 **Laboral**: Empleo, salarios, trabajo, RRHH
- 🔴 **Salud**: Medicina, hospitales, diagnóstico, tratamiento
- 🟣 **Educación**: Escuelas, universidades, formación, enseñanza

## Filtro de IA (Estricto)

El sistema solo muestra noticias que mencionen EXPLÍCITAMENTE:

### Términos Aceptados
- Inteligencia Artificial / IA / AI
- Modelos específicos: ChatGPT, GPT, Claude, Gemini, Bard
- Empresas: OpenAI, DeepMind, Anthropic
- Tecnologías: Machine Learning, Deep Learning, Redes Neuronales
- Generativos: Stable Diffusion, Midjourney, DALL-E
- Técnicos: LLM, Transformer, Language Model

### NO Incluye
- ❌ "datos" o "big data" sin contexto de IA
- ❌ "robot" genérico sin IA
- ❌ "algoritmo" sin contexto de ML
- ❌ "automatización" sin IA

## Configuración (Opcional)

### Traducción Automática
Para activar la traducción de noticias en inglés:

1. Edita `/docs/.env.local`:
   ```bash
   TRANSLATE_NEWS=true
   ```
2. Reinicia el servidor de desarrollo
3. Se traducirán hasta 5 artículos en inglés usando MyMemory API (gratuita)

**Nota**: Solo traduce si es necesario. La mayoría del contenido ya viene en español.

## Optimización

- **Cache**: Las noticias se cachean por 1 hora (Next.js ISR)
- **Límite**: 10 noticias (8 español + 2 inglés máximo)
- **Eliminación de duplicados**: Por título exacto
- **Ordenamiento**: Por fecha de publicación (más recientes primero)
- **Peticiones paralelas**: Todos los RSS feeds se consultan simultáneamente
- **Timeout**: 3 segundos por traducción
- **Fallback**: Noticias de ejemplo si todos los feeds fallan

## Parser RSS Personalizado

El sistema incluye un parser RSS/Atom ligero que:
- ✅ Soporta RSS 2.0 y Atom
- ✅ Extrae: título, link, descripción, fecha
- ✅ Limpia CDATA y tags HTML
- ✅ Maneja feeds malformados
- ✅ User-Agent personalizado para evitar bloqueos
- ✅ No requiere dependencias externas

## Despliegue en Vercel

El sistema funciona en Vercel sin configuración adicional:

1. **No requiere variables de entorno** (todas son opcionales)
2. **RSS feeds funcionan en Edge** 
3. **ISR automático** con revalidación de 1 hora
4. **Sin límites de API** - Todo mediante RSS

### Variables de Entorno en Vercel (opcional)
Si quieres traducción, añade en Vercel Dashboard:
```
TRANSLATE_NEWS=true
```

## Próximas mejoras (opcionales)

- [ ] Filtros por categoría en la UI
- [ ] Búsqueda dentro de las noticias
- [ ] Paginación o "Cargar más"
- [ ] Sistema de favoritos con localStorage
- [ ] Compartir en redes sociales
- [ ] Notificaciones de nuevas noticias
- [ ] Vista en lista/grid
- [ ] Tema personalizable
