# Sistema de Noticias de IA

## Descripción
Sistema implementado para mostrar las últimas noticias relacionadas con la Inteligencia Artificial en España y el mundo. Las noticias se obtienen, categorizan y resumen automáticamente.

## Archivos creados

### 1. `/docs/app/api/news/route.ts`
API endpoint que:
- Obtiene noticias de IA desde NewsAPI (o datos de ejemplo)
- Categoriza automáticamente cada noticia en: Regulación, Ética, Tecnología, Negocios, Investigación, Sociedad
- Genera resúmenes automáticos
- Cachea los resultados por 1 hora (revalidate: 3600)

### 2. `/docs/app/_components/ai-news.tsx`
Componente React que:
- Muestra las noticias con tarjetas interactivas
- Incluye categorías con colores distintivos
- Muestra fecha relativa (hace X horas/días)
- Enlaces directos a la fuente original
- Animación de carga (skeleton)
- Diseño responsive con modo oscuro

### 3. `/docs/app/page.tsx` (modificado)
- Importa el componente AINews
- Lo integra en el Feature con id="docs-card"
- Reemplaza el contenido anterior

### 4. `/docs/.env.local`
Variables de entorno para configurar la API key de NewsAPI (opcional)

## Configuración

### Sin API Key (predeterminado)
El sistema funciona inmediatamente con noticias de ejemplo predefinidas.

### Con API Key (recomendado para producción)
1. Ve a https://newsapi.org/register
2. Crea una cuenta gratuita
3. Copia tu API key
4. Edita `/docs/.env.local`:
   ```
   NEWS_API_KEY=tu_api_key_aqui
   ```
5. Reinicia el servidor de desarrollo

## Características

✅ **Búsqueda automática** de noticias de IA  
✅ **Categorización inteligente** basada en palabras clave  
✅ **Resúmenes automáticos** (2-3 primeras oraciones)  
✅ **Enlaces a fuentes originales**  
✅ **Diseño responsive** con hover effects  
✅ **Modo oscuro** incluido  
✅ **Caché de 1 hora** para optimizar rendimiento  
✅ **Datos de respaldo** si la API falla  
✅ **Formato de fecha relativo** (hace X horas/días)  

## Categorías

- 🔵 **Regulación**: Leyes, normativas, políticas
- 🟣 **Ética**: Responsabilidad, privacidad, derechos
- 🟢 **Tecnología**: Avances técnicos, nuevos modelos
- 🟠 **Negocios**: Empresas, inversión, mercado
- 🩷 **Investigación**: Estudios científicos, descubrimientos
- 🔵 **Sociedad**: Impacto social, empleo, educación

## Fuentes de noticias

Con API Key configurada:
- Búsqueda en múltiples idiomas (español e inglés)
- Noticias de fuentes verificadas
- Actualización en tiempo real

Sin API Key:
- 6 noticias de ejemplo curadas manualmente
- Temas relevantes para RegulacionIA
- Fuentes españolas e internacionales

## Optimización

- **Cache**: Las noticias se cachean por 1 hora
- **Límite**: Se muestran las 6 noticias más recientes
- **Eliminación de duplicados**: Por título
- **Ordenamiento**: Por fecha de publicación

## Próximas mejoras (opcionales)

- [ ] Filtros por categoría
- [ ] Búsqueda dentro de las noticias
- [ ] Paginación
- [ ] Integración con múltiples APIs de noticias
- [ ] Sistema de favoritos
- [ ] Compartir en redes sociales
- [ ] Notificaciones de nuevas noticias
