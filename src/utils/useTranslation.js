import { create } from "zustand"

const defaultLanguage = "es"

const content = {
  en: {
    "close": "Close",
    "search": "Search for a colonia or address",
    "home": {
      "title": "Rio Grande Valley Flood Maps 2018-2025",
      "subtitle":
        "Explore the FLUJOS flood mapping tool featuring a flood database co-produced by the University of Arizona, the Texas RioGrande Legal Aid, Inc., and several other community-based organizations. Choose a flood event to see if a place was affected by flooding.",
    },
    "selectAction": "Select a flood event",
    "flood": "flood",
    "no-flood": "no-flood",
    "water": "Permanent water",
    "satellite": "satellite",
    "event-2": { "label": "Great June Flood of 2018" },
    "event-3": { "label": "September, 2018" },
    "event-4": { "label": "May, 2019" },
    "event-5": { "label": "Early June, 2019" },
    "event-6": { "label": "Great June Flood of 2019, the Sequel" },
    "event-7": { "label": "May, 2020" },
    "event-8": { "label": "Early June, 2020" },
    "event-9": { "label": "Mid June, 2020" },
    "event-10": { "label": "Hurricane Hanna" },
    "event-11": { "label": "August, 2020" },
    "event-12": { "label": "May, 2021" },
    "event-13": { "label": "Early July, 2021" },
    "event-14": { "label": "March, 2025" },
    "event-15": { "label": "Event 15" },
    "flood-events": "Events",
    "frequency": "Frequency",
    "about": "About",
    "app-name": "RGV Floodmaps",
    "disclaimer":
      "The frequency visualization tab is not quite ready yet, but we are working on it!",
    "confirmation": "I understand",
    "disclaimer2": {
      "title": "Disclaimer",
      "content":
        "The data and maps provided on this website are intended for informational purposes only. The information is from historic flood observations from satellite images which do not represent flooding in real-time and should not be considered as exact conditions in your area. The information should not be relied upon for emergency planning, construction, engineering, or legal purposes. Neither Texas Riogrande Legal Aid nor the University of Arizona assumes any legal liability or responsibility or makes any guarantees or warranties as to the accuracy, completeness, or suitability of the information for any purpose. Texas Riogrande Legal Aid and the University of Arizona expressly disclaim all liability for any consequences arising from the use or reliance on this map or any other content provided on this site.  This disclaimer applies both to individual use of the data and aggregate use with other data.",
    },
    "about": [
      "About",
      [
        ["Welcome to the FLUJOS mapping tool! "],
        [
          "What is FLUJOS? FLUJOS stands for Flood Justice Utilizing Satellite Observation. With 100+ participatory maps from flood-vulnerable residents in Cameron and Hidalgo County, Texas we built a machine learning algorithm to identify floods using satellite imagery in the Rio Grande Valley of South Texas. This is not a model where we might see floods; instead we’ve mapped actual places where flooding has been observed through a satellite. How might you use this tool? We developed this tool for concerned residents, community-based organizations, local government, and anyone else that wants to fight floods together! You can use the search bar to find a specific location. Want to see if this area flooded in a specific flood event? Select a flood event in the drop down list.",
        ],
      ],
      [
        ["Technical details: "],
        [
          "This tool is based on data produced by machine learning algorithms on PlanetScope and Sentinel-1 satellites. PlanetScope is an optical satellite (obscured by clouds), with 3-5 meter resolution (building-level visible), and near-daily available imagery. Sentinel-1 is a radar satellite (penetrates cloud cover), with 10 meter resolution (blocks and roads visible), and imagery available every 6 days. While PlanetScope can detect more flooding, we use Sentinel-1 to see floods underneath clouds. With PlanetScope we achieved 79% accuracy in the Rio Grande Valley region after training the algorithm on 18 flood events world wide and fine-tuning the algorithm with local participatory mapping. In contrast, the Sentinel-1 is trained on over 5,000 automatically generated labels from global watersheds using the DynamicWorld dataset.",
        ],
      ],
      [
        ["Collaborators: "],
        [
          "The FLUJOS flood map tool is a collaboration between the University of Arizona, Utah State University, University of Texas Rio Grande Valley and several community-based organizations including ",
        ],
        ["Texas RioGrande Legal Aid Inc.", "https://www.trla.org/"],
        [", "],
        ["ARISE Adelante", "https://ariseadelante.org/"],
        [", "],
        [
          "Border Workers United",
          "https://www.facebook.com/BorderWorkersUnited/",
        ],
        [", "],
        ["La Unión del Pueblo Entero", "https://lupenet.org/"],
        [", and "],
        ["Proyecto Azteca", "https://www.proyectoazteca.org/"],
        [
          ". Funding was provided by The Google Environmental Justice Grant, the Climate Change Artificial Intelligence Grant, the Mellon Foundation Fronteridades Grant, the Lewis and Clark Explorers Grant, the University of Arizona’s Research Innovation & Impact Grant, the One Health Research Grant, and the NASA Space grant.",
        ],
      ],
      [
        ["More information: "],
        [
          "Interested in learning more or have questions about the data? Please contact Lucas Belury at ",
        ],
        ["lbelury@arizona.edu", "mailto:lbelury@arizona.edu"],
        [" or access his personal website: "],
        ["lucasbelury.com.", "https://lucasbelury.com/"],
      ],
      [
        ["Recommended citation: "],
        [
          "*Belury, L., *Zhang, Z., Buxton, C., Laurel, A., & Tellman, B. (2025, February 22). FLUJOS RGV flood database. assets.rgvflood.arizona.edu",
        ],
      ],
      [[""], ["*denotes co-first authorship"]],
      [
        [""],
        [
          "The material is based upon work supported by NASA’s Future Investigators in NASA Earth and Space Science and Technology (FINESST) under award no. 80NSSC24K1903.",
        ],
      ],
    ],
  },
  es: {
    "close": "Cerrar",
    "search": "Buscar una colonia o dirección",
    "home": {
      "title": "Mapas de Inundaciones del Valle del Río Grande 2018-2025",
      "subtitle":
        "Explore la herramienta de mapeo de inundaciones FLUJOS, que incluye una base de datos de inundaciones coproducida por la Universidad de Arizona, Texas RioGrande Legal Aid, Inc. y varias otras organizaciones comunitarias. Elija un evento de inundación para ver si un lugar se vio afectado por una inundación.",
    },
    "selectAction": "Seleccione un evento de inundación",
    "flood": "inundación",
    "no-flood": "ninguna inundación",
    "water": "Agua permanente",
    "satellite": "satélite",
    "event-2": { "label": "Las grandes inundaciones de 2018" },
    "event-3": { "label": "Septiembre, 2018" },
    "event-4": { "label": "Mayo, 2019" },
    "event-5": { "label": "Principios de junio, 2019" },
    "event-6": {
      "label": "Las grandes inundaciones de junio de 2019, la secuela",
    },
    "event-7": { "label": "Mayo, 2020" },
    "event-8": { "label": "Principios de junio, 2020" },
    "event-9": { "label": "Mediados de junio, 2020" },
    "event-10": { "label": "Huracán Hanna" },
    "event-11": { "label": "Agosto, 2020" },
    "event-12": { "label": "Mayo, 2021" },
    "event-13": { "label": "Principios de julio, 2021" },
    "event-14": { "label": "Marzo, 2025" },
    "event-15": { "label": "Event 15" },
    "flood-events": "Inundaciones",
    "frequency": "Frecuencia",
    "about": "Acerca de",
    "app-name": "Mapas de inundaciones del Valle del Río Grande",
    "disclaimer":
      "La pestaña de visualización de frecuencias aún no está lista, pero estamos trabajando en ella.",
    "confirmation": "Comprendo",
    "disclaimer2": {
      "title": "Descargo de responsabilidad",
      "content":
        "Los datos y mapas proporcionados en este sitio web están destinados únicamente a fines informativos. La información proviene de observaciones históricas de inundaciones a partir de imágenes satelitales que no representan inundaciones en tiempo real y no deben considerarse como condiciones exactas en su área. No se debe confiar en la información para planificación de emergencias, construcción, ingeniería o fines legales. Ni Texas Riogrande Legal Aid ni la Universidad de Arizona asumen ninguna responsabilidad legal ni ofrecen ninguna garantía en cuanto a la exactitud, integridad o idoneidad de la información para cualquier propósito. Texas Riogrande Legal Aid y la Universidad de Arizona renuncian expresamente a toda responsabilidad por las consecuencias que surjan del uso o la confianza en este mapa o cualquier otro contenido proporcionado en este sitio. Esta exención de responsabilidad se aplica tanto al uso individual de los datos como al uso agregado con otros datos.",
    },
    "about": [
      "Acerca de",
      [
        ["¡Bienvenidos a la herramienta de mapeo FLUJOS! "],
        [
          "¿Qué es FLUJOS? FLUJOS significa Justicia de Inundaciones Utilizando Observación Satelital. Con más de 100 mapas participativos de residentes vulnerables a las inundaciones en los condados de Cameron e Hidalgo, Texas, creamos un algoritmo de aprendizaje automático para identificar inundaciones utilizando teledetección en el Valle del Río Grande en el sur de Texas. Este no es un modelo en el que podríamos ver inundaciones; en lugar de eso, hemos mapeado lugares reales donde se han observado inundaciones a través de un satélite. ¿Cómo podrías utilizar esta herramienta? Desarrollamos esta herramienta para residentes preocupados, organizaciones comunitarias, gobiernos locales y cualquier otra persona que quiera luchar juntos contra las inundaciones! Puede utilizar la barra de búsqueda para encontrar una ubicación específica. ¿Quiere ver si esta área se inundó en una inundación específica? Seleccione un evento de inundación en la lista desplegable.",
        ],
      ],
      [
        ["Detalles técnicos: "],
        [
          "esta herramienta se basa en datos producidos por algoritmos de aprendizaje automático en los satélites PlanetScope y Sentinel-1. PlanetScope es un satélite óptico (oscurecido por las nubes), con una resolución de 3 a 5 metros (visible a nivel de edificio) e imágenes disponibles casi a diario. Sentinel-1 es un satélite de radar (penetra la capa de nubes), con una resolución de 10 metros (bloques y carreteras visibles) e imágenes disponibles cada 6 días. Si bien PlanetScope puede detectar más inundaciones, utilizamos Sentinel-1 para ver inundaciones debajo de las nubes. Con PlanetScope logramos una precisión del 79% en la región del Valle del Río Grande después de entrenar el algoritmo en 18 eventos de inundaciones en todo el mundo y ajustarlo con mapeo participativo local. Por el contrario, Sentinel-1 está entrenado en más de 5.000 etiquetas generadas automáticamente a partir de cuencas hidrográficas globales utilizando el conjunto de datos DynamicWorld.",
        ],
      ],
      [
        ["Colaboradores: "],
        [
          "La herramienta de mapa de inundaciones FLUJOS es una colaboración entre la Universidad de Arizona, la Universidad Estatal de Utah, la Universidad de Texas Rio Grande Valley y varias organizaciones comunitarias, incluidas ",
        ],
        ["Texas RioGrande Legal Aid Inc.", "https://www.trla.org/"],
        [", "],
        ["ARISE Adelante", "https://ariseadelante.org/"],
        [", "],
        [
          "Border Workers United",
          "https://www.facebook.com/BorderWorkersUnited/",
        ],
        [", "],
        ["La Unión del Pueblo Entero", "https://lupenet.org/"],
        [", y "],
        ["Proyecto Azteca", "https://www.proyectoazteca.org/"],
        [
          ". El financiamiento fue proporcionado por la Beca de Justicia Ambiental de Google, la Beca de Inteligencia Artificial para el Cambio Climático, la Beca Fronteridades de la Fundación Mellon, la Beca Lewis and Clark Explorers, la Beca de Impacto e Innovación en Investigación de la Universidad de Arizona, la Beca de Investigación One Health y la Beca Espacial de la NASA.",
        ],
      ],
      [
        ["Más información: "],
        [
          "¿Está interesado en obtener más información o tiene preguntas sobre los datos? Comuníquese con Lucas Belury en ",
        ],
        ["lbelury@arizona.edu", "mailto:lbelury@arizona.edu"],
        [" o acceda a su sitio web personal: "],
        ["lucasbelury.com.", "https://lucasbelury.com/"],
      ],
      [
        ["Cita recomendada: "],
        [
          "*Belury, L., *Zhang, Z., Buxton, C., Laurel, A., & Tellman, B. (2025, February 22). FLUJOS RGV flood database. assets.rgvflood.arizona.edu",
        ],
      ],
      [[""], ["*denota co-primera autoría"]],
      [
        [""],
        [
          "El material se basa en el trabajo financiado por los Futuros Investigadores de la NASA en Ciencia y Tecnología de la Tierra y el Espacio (FINESST) bajo la subvención n.º 80NSSC24K1903.",
        ],
      ],
    ],
  },
}

const languages = [
  {
    id: "en",
    label: "English",
  },
  { id: "es", label: "Español" },
]

export const useTranslationStore = create((set) => ({
  language: languages.find((s) => s.id === defaultLanguage),
  languages,
  content: content[defaultLanguage],
  setLanguage: (language) => {
    if (typeof window === "undefined") return
    if (typeof document === "undefined") return
    document.documentElement?.setAttribute("lang", language.id)
    set({ language, content: content[language.id] })
  },
}))
