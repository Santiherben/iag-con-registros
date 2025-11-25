/* ========================================
   IA EDUCATIVA ANEP - SCRIPT PRINCIPAL
   Configuración y lógica del cuestionario
   ======================================== */

/* ========================================
   CONFIGURACIÓN BASADA EN DOCUMENTO ANEP
   ======================================== */
const CONFIG = {
  // Escala Likert alineada a documento ANEP
  likert: [
    { 
      id: 'Muy bajo', 
      min: 0, 
      max: 20, 
      desc: 'Uso instrumental sin verificación. Necesitás fortalecer el pensamiento crítico y la comprensión de las limitaciones de la IA.',
      color: '#ef4444'
    },
    { 
      id: 'Bajo', 
      min: 21, 
      max: 40, 
      desc: 'Reconocés potencial pero falta verificación sistemática. Trabajá en transparencia y trazabilidad de fuentes.',
      color: '#f59e0b'
    },
    { 
      id: 'Medio', 
      min: 41, 
      max: 60, 
      desc: 'Uso con criterio en varios aspectos. Fortalecé conciencia de sesgos y declaración de autoría.',
      color: '#eab308'
    },
    { 
      id: 'Alto', 
      min: 61, 
      max: 80, 
      desc: 'Integración crítica frecuente. Seguí refinando prácticas en contextos complejos y diversos.',
      color: '#84cc16'
    },
    { 
      id: 'Muy alto', 
      min: 81, 
      max: 100, 
      desc: 'Excelencia: verificás información, mitigás sesgos, declarás autoría y aportás valor humano significativo.',
      color: '#22c55e'
    }
  ],

  // Árbol de decisiones por perfil
  perfiles: {
    docente: {
      inicio: 'd1',
      nodos: {
        d1: { 
          title: 'Definís reglas claras de uso de IA en tus cursos?',
          help: 'Establecés cuándo, cómo y con qué límites se puede usar IA. Incluye citación y transparencia.',
          context: 'Según ANEP: "Es esencial establecer círculos virtuosos que fomenten experiencias de aprendizaje auténticas". Las reglas claras son la base.',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'd2', 
          onNo: 'd2',
          anepRef: 'Sección 6 - Recomendaciones para el futuro'
        },
        d2: { 
          title: 'Explicás el valor agregado específico de la IA a tus estudiantes?',
          help: 'Claridad en borradores, ideación, mejora de expresión, accesibilidad, sin sustituir el pensamiento crítico.',
          context: 'ANEP destaca: "Fomentar una comprensión clara de la IA entre los estudiantes es fundamental para prepararlos como ciudadanos informados".',
          gainYes: 12, 
          gainNo: 2, 
          onYes: 'g1', 
          onNo: 'g1',
          anepRef: 'Introducción - Objetivo educativo'
        },
        // Tronco compartido
        g1: { 
          title: 'Verificás la información generada por IA antes de usarla?',
          help: 'Contrastás con fuentes confiables, académicas, evidencia empírica.',
          context: 'ANEP advierte sobre "alucinaciones" de IA: "Es crucial promover el pensamiento crítico... identificar y analizar críticamente estas dinámicas".',
          gainYes: 16, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g1b',
          anepRef: 'Sección 6 - Fenómeno de alucinación'
        },
        g1b: { 
          title: 'Si no verificás sistemáticamente, advertís sobre las limitaciones?',
          help: 'Transparencia mínima sobre posibles errores y sesgos de la IA.',
          context: 'La transparencia es un pilar del marco ANEP: "Consideraciones éticas relacionadas con privacidad, sesgo y transparencia".',
          gainYes: 8, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g2',
          anepRef: 'Sección 4 - Consideraciones éticas'
        },
        g2: { 
          title: 'Reconocés y trabajás con posibles sesgos de la IA?',
          help: 'Sesgos de datos, representación, confirmación, culturales. Estrategias de mitigación.',
          context: 'ANEP enfatiza: "Las tecnologías son espacios de disputa de intereses y conflictos... identificar y analizar críticamente estas dinámicas".',
          gainYes: 18, 
          gainNo: 0, 
          onYes: 'g3', 
          onNo: 'g3',
          anepRef: 'Sección 6 - Ciudadanía digital'
        },
        g3: { 
          title: 'Declarás autoría y asistencia de IA cuando corresponde?',
          help: 'Diferenciás claramente qué es producción humana y qué proviene de IA.',
          context: 'Marco ANEP sobre transparencia: "Entre un texto generado íntegramente por un LLM y uno creado por un ser humano, hay una variedad de matices".',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'g4', 
          onNo: 'g4',
          anepRef: 'Sección 4 - Espectro de uso'
        },
        g4: { 
          title: 'Añadís aportes personales y criterios propios al usar IA?',
          help: 'Síntesis, contextualización, ejemplos situados, análisis crítico.',
          context: 'ANEP destaca: "Debemos reforzar la importancia de la ética y la moral, asegurando que los estudiantes desarrollen un fuerte sentido de responsabilidad".',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'd3', 
          onNo: 'd3',
          anepRef: 'Sección 6 - Responsabilidad en aprendizaje'
        },
        d3: { 
          title: 'Evaluás conocimientos previos del grupo antes de proponer IA?',
          help: 'Si no hay base conceptual, priorizar andamiaje humano antes de IA.',
          context: 'ANEP recomienda: "Promover nuevas secuencias didácticas que estén en sintonía con las necesidades del siglo XXI".',
          gainYes: 12, 
          gainNo: 2, 
          onYes: 'FIN', 
          onNo: 'FIN',
          anepRef: 'Sección 6 - Secuencias didácticas'
        }
      }
    },

    estudiante: {
      inicio: 'e1',
      nodos: {
        e1: { 
          title: 'Conocés y respetás las reglas de uso de IA de tu curso?',
          help: 'Política institucional y de tu asignatura sobre uso de herramientas de IA.',
          context: 'ANEP indica: "Fomentar una comprensión clara de la IA entre los estudiantes es fundamental para prepararlos como ciudadanos informados".',
          gainYes: 10, 
          gainNo: 0, 
          onYes: 'e2', 
          onNo: 'e2',
          anepRef: 'Sección 6 - Ciudadanía digital'
        },
        e2: { 
          title: 'Identificás un aporte específico de la IA a tu tarea?',
          help: 'Claridad de expresión, ideación, contraste de ideas, accesibilidad.',
          context: 'Marco ANEP: "El uso de la IA puede ofrecer experiencias de aprendizaje personalizadas adaptadas a las necesidades individuales".',
          gainYes: 12, 
          gainNo: 2, 
          onYes: 'g1', 
          onNo: 'g1',
          anepRef: 'Sección 4 - Aprendizaje personalizado'
        },

        g1: { 
          title: 'Verificás los resultados de la IA con fuentes confiables?',
          help: 'Materiales del curso, libros, artículos académicos, evidencia.',
          context: 'ANEP advierte: "El uso indiscriminado de LLM para responder preguntas factuales implica un riesgo importante (alucinaciones)".',
          gainYes: 16, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g1b',
          anepRef: 'Sección 6 - Alucinaciones'
        },
        g1b: { 
          title: 'Si no verificás, señalás esa limitación en tu trabajo?',
          help: 'Transparencia mínima sobre falta de validación.',
          context: 'La transparencia es clave: "Es esencial que los estudiantes sean capaces de identificar y analizar críticamente".',
          gainYes: 8, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g2',
          anepRef: 'Sección 6 - Pensamiento crítico'
        },
        g2: { 
          title: 'Pensás en posibles sesgos de la IA y cómo mitigarlos?',
          help: 'Sesgos de datos, representación, confirmación, culturales.',
          context: 'ANEP: "Es imperativo que los jóvenes aprendan a navegar por estos territorios digitales con discernimiento".',
          gainYes: 18, 
          gainNo: 0, 
          onYes: 'g3', 
          onNo: 'g3',
          anepRef: 'Sección 6 - Navegación crítica'
        },
        g3: { 
          title: 'Dejás claro qué parte es tu trabajo y qué proviene de IA?',
          help: 'Autoría transparente, citas, marcas de asistencia.',
          context: 'ANEP presenta un espectro entre "pegar respuesta de IA" hasta "escribir todo sin IA". La transparencia es esencial.',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'g4', 
          onNo: 'g4',
          anepRef: 'Sección 4 - Espectro de uso'
        },
        g4: { 
          title: 'Incorporás aportes personales (síntesis, ejemplos, crítica)?',
          help: 'Construcción propia, no copia literal. Valor agregado humano.',
          context: 'ANEP destaca: "Desarrollar un fuerte sentido de responsabilidad frente a sus procesos de aprendizaje".',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'e3', 
          onNo: 'e3',
          anepRef: 'Sección 6 - Responsabilidad'
        },
        e3: { 
          title: 'Tenés base de conocimientos del tema antes de usar IA?',
          help: 'Sin base conceptual, primero aprender fundamentos.',
          context: 'ANEP recomienda: "Promover secuencias didácticas... equipándolos con habilidades críticas como la resolución de problemas".',
          gainYes: 12, 
          gainNo: 2, 
          onYes: 'FIN', 
          onNo: 'FIN',
          anepRef: 'Sección 6 - Habilidades críticas'
        }
      }
    }
  },

  // Acuerdos didácticos del documento ANEP
  acuerdos: [
    { 
      text: 'Establecer reglas claras sobre cuándo, cómo y con qué límites usar IA',
      ref: 'Adaptación de métodos de evaluación'
    },
    { 
      text: 'Requerir verificación y trazabilidad de fuentes (citas, evidencias)',
      ref: 'Evaluación resistente a IA'
    },
    { 
      text: 'Declarar autoría y nivel de asistencia de IA en producciones',
      ref: 'Transparencia en algoritmos'
    },
    { 
      text: 'Diseñar tareas con valor agregado humano (análisis, síntesis, contexto)',
      ref: 'Habilidades de orden superior'
    },
    { 
      text: 'Considerar protección de datos y edad del alumnado',
      ref: 'Consideraciones éticas'
    },
    { 
      text: 'Trabajar detección y mitigación de sesgos como competencia transversal',
      ref: 'Conciencia crítica'
    }
  ],

  // Herramientas sugeridas (modo educativo)
  herramientas: [
    { 
      name: 'Asistentes con modo educativo',
      desc: 'Interfaces que promueven verificación, citas y transparencia'
    },
    { 
      name: 'Editores con citador integrado',
      desc: 'Herramientas que sugieren fuentes verificables automáticamente'
    },
    { 
      name: 'Verificadores de sesgos',
      desc: 'Analizan texto generado para identificar posibles sesgos'
    },
    { 
      name: 'Plataformas de prompts éticos',
      desc: 'Enseñan a formular consultas que promuevan pensamiento crítico'
    }
  ]
};

/* ========================================
   CONTENIDO DE PRINCIPIOS UNESCO / ANEP
   ======================================== */


/* ========================================
   CONTENIDO DE PRINCIPIOS UNESCO / ANEP
   - Texto breve + citas textuales de ambos documentos
   - Usado por el tooltip de las cards
   ======================================== */

const PRINCIPLES_CONTENT = {
  verificacion: {
    title: 'Verificación',
    unesco: `
      <p><strong>UNESCO</strong></p>
      <p>“Las decisiones y resultados producidos por los sistemas de IA deben poder <strong>ser verificados</strong>, y debe proporcionarse información suficiente para permitir que tales decisiones sean comprendidas y cuestionadas por las personas afectadas”.</p>
      <p><em>Recomendación sobre la ética de la IA, principio de transparencia y explicabilidad.</em></p>
      <p>En educación esto implica contrastar las respuestas de la IA con fuentes confiables y juicio profesional.</p>
    `,
    anep: `
      <p><strong>ANEP</strong></p>
      <p>“El uso indiscriminado de LLM para responder preguntas factuales implica un riesgo importante…”</p>
      <p>“Fomentar el pensamiento crítico […] se torna impostergable”.</p>
      <p><em>La inteligencia artificial en la educación, sección 6. Recomendaciones para el futuro.</em></p>
      <p>Por eso se espera que estudiantes y docentes verifiquen la información generada por IA antes de utilizarla en evaluaciones o producciones.</p>
    `
  },
  transparencia: {
    title: 'Transparencia',
    unesco: `
      <p><strong>UNESCO</strong></p>
      <p>“Las personas deberán ser informadas cuando estén interactuando con un sistema de IA y deberán comprender el papel que ese sistema desempeña en la toma de decisiones”.</p>
      <p>“Las interacciones mediadas por IA deben ser claramente diferenciables de las humanas”.</p>
      <p><em>Recomendación sobre la ética de la IA, transparencia y explicabilidad.</em></p>
    `,
    anep: `
      <p><strong>ANEP</strong></p>
      <p>“Fomentar una comprensión clara de la IA […] implica enseñar a los estudiantes a <strong>diferenciar</strong> entre la información generada por IA y la creada por humanos”.</p>
      <p><em>La inteligencia artificial en la educación, sección 6.</em></p>
      <p>En tareas y evaluaciones se espera declarar qué partes fueron asistidas por IAG y cuál es el aporte personal.</p>
    `
  },
  sesgos: {
    title: 'Sesgos',
    unesco: `
      <p><strong>UNESCO</strong></p>
      <p>“Los sistemas de IA no deben perpetuar ni amplificar sesgos […]; deberán tomarse medidas activas para identificar, mitigar y corregir discriminaciones”.</p>
      <p><em>Recomendación sobre la ética de la IA, principio de equidad y no discriminación.</em></p>
      <p>En el aula esto supone revisar críticamente ejemplos y respuestas de la IA para evitar estereotipos y exclusiones.</p>
    `,
    anep: `
      <p><strong>ANEP</strong></p>
      <p>“Los algoritmos de IA a veces emiten resultados que no se originan en los datos de entrenamiento y los interpretan de forma incorrecta […] generando resultados inesperados o erróneos”.</p>
      <p><em>La inteligencia artificial en la educación, sección 6.</em></p>
      <p>Detectar y discutir estos errores con el grupo es parte del trabajo sobre sesgos y ciudadanía digital crítica.</p>
    `
  },
  valor_agregado: {
    title: 'Valor agregado',
    unesco: `
      <p><strong>UNESCO</strong></p>
      <p>“Los sistemas de IA deben servir para complementar la capacidad humana, no para sustituirla, manteniendo el control humano significativo”.</p>
      <p><em>Recomendación sobre la ética de la IA, participación y agencia humana.</em></p>
      <p>La IA tiene sentido educativo cuando expande oportunidades de aprendizaje y no reemplaza el trabajo intelectual del estudiante.</p>
    `,
    anep: `
      <p><strong>ANEP</strong></p>
      <p>“Todos los matices entre lo generado por IA y lo creado por un ser humano pueden enriquecer los procesos de aprendizaje, pero ello no implica la eliminación del componente humano en el proceso”.</p>
      <p><em>La inteligencia artificial en la educación, sección 4.</em></p>
      <p>Las producciones deberían mostrar ejemplos, análisis y decisiones propias: la IA apoya, pero el valor educativo lo aporta la mirada pedagógica.</p>
    `
  }
};


/* ========================================
   ESTADO DE LA APLICACIÓN
   ======================================== */


/* ========================================
   ACTUALIZACIÓN DEL STATE EN configuracion-ia.js
   
   Agregá esto al objeto state existente:
   ======================================== */

const state = {
  profile: null,
  name: '',
  currentId: null,
  path: [],
  evidence: 0,
  currentSlide: 0,
  country: 'Uruguay',
  nivelEducativo: '',
  familiaridadInicial: '',
  recursosSimilares: '',
  consentTracking: true
};

// ✅ AGREGAR ESTA LÍNEA:
window.state = state;
