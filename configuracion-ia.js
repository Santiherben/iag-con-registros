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
    id: 'Amplio margen de mejora', 
    min: 0, 
    max: 20, 
    desc: 'Las prácticas muestran un uso inicial y poco sistemático. Es un buen punto de partida para comenzar a incorporar verificaciones y criterios más consistentes.',
    color: '#ef4444'
  },
  { 
    id: 'En proceso inicial', 
    min: 21, 
    max: 40, 
    desc: 'Se reconocen algunas buenas prácticas, aunque todavía falta incorporarlas con regularidad. Hay espacio para reforzar revisión, contraste de información y decisiones más informadas.',
    color: '#f59e0b'
  },
  { 
    id: 'Desarrollo progresivo', 
    min: 41, 
    max: 60, 
    desc: 'Se evidencia un avance claro: se combinan decisiones razonadas y uso cuidadoso. Aún queda margen para afinar criterios y fortalecer la autonomía en el proceso.',
    color: '#eab308'
  },
  { 
    id: 'Prácticas consolidadas', 
    min: 61, 
    max: 80, 
    desc: 'Se integra la herramienta con criterio y constancia. El trabajo es estable y muestra una lectura madura de la información y sus implicaciones.',
    color: '#84cc16'
  },
  { 
    id: 'Nivel avanzado', 
    min: 81, 
    max: 100, 
    desc: 'El uso demuestra solidez, claridad y revisión cuidadosa. Se aporta valor personal y se aplican buenos criterios de manera sostenida.',
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
    },

    /* ========================================
       PERFIL: ESTUDIANTE DE EDUCACIÓN MEDIA
       ======================================== */
    estudiante_media: {
      inicio: 'em1',
      nodos: {
        em1: { 
          title: 'Usás IA para hacer tareas o trabajos domiciliarios?',
          help: 'Incluye resúmenes, redacción de textos, resolución de ejercicios o “ideas” para trabajos.',
          context: 'El documento ANEP advierte que el uso de IA en ámbitos educativos debe acompañarse de reflexión, verificación y construcción propia, evitando el copiado acrítico.',
          gainYes: 10, 
          gainNo: 4, 
          onYes: 'em2', 
          onNo: 'em2',
          anepRef: 'Sección 6 - Recomendaciones para el futuro'
        },
        em2: { 
          title: 'Cuando usás IA en tareas, intentás entender el procedimiento y no solo la respuesta?',
          help: 'Por ejemplo, pedís que te explique paso a paso, comparás con lo visto en clase o intentás rehacer el ejercicio sin la herramienta.',
          context: 'ANEP insiste en que la IA debe apoyar procesos de comprensión y desarrollo de habilidades críticas, no sustituir el esfuerzo intelectual del estudiante.',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'g1', 
          onNo: 'g1',
          anepRef: 'Sección 4 - Habilidades de orden superior'
        },

        // Tronco común para estudiantes de media
        g1: { 
          title: 'Verificás los resultados de la IA con fuentes confiables?',
          help: 'Materiales del curso, libros, cuadernos, apuntes o explicaciones del docente.',
          context: 'ANEP advierte: “El uso indiscriminado de LLM para responder preguntas factuales implica un riesgo importante (alucinaciones)”.',
          gainYes: 16, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g1b',
          anepRef: 'Sección 6 - Alucinaciones'
        },
        g1b: { 
          title: 'Si no verificás, avisás que la información proviene de IA y podría contener errores?',
          help: 'Por ejemplo, aclarar en el trabajo que usaste IA y que no pudiste contrastar todo.',
          context: 'La transparencia es clave: “Es esencial que los estudiantes sean capaces de identificar y analizar críticamente” las respuestas de la IA.',
          gainYes: 8, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g2',
          anepRef: 'Sección 6 - Pensamiento crítico'
        },
        g2: { 
          title: 'Pensás en posibles sesgos de la IA y cómo podrían afectar tus tareas?',
          help: 'Por ejemplo, estereotipos en ejemplos, invisibilización de ciertos grupos o miradas muy parciales.',
          context: 'ANEP: “Es imperativo que los jóvenes aprendan a navegar por estos territorios digitales con discernimiento”.',
          gainYes: 18, 
          gainNo: 0, 
          onYes: 'g3', 
          onNo: 'g3',
          anepRef: 'Sección 6 - Navegación crítica'
        },
        g3: { 
          title: 'Dejás claro qué parte hiciste vos y qué parte fue generada con IA?',
          help: 'Marcar fragmentos, citar la herramienta usada o explicitar el tipo de ayuda recibida.',
          context: 'El marco ANEP presenta un espectro de usos y enfatiza la transparencia sobre la participación de la IA en las producciones.',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'g4', 
          onNo: 'g4',
          anepRef: 'Sección 4 - Espectro de uso'
        },
        g4: { 
          title: 'Agregás ejemplos, opiniones o análisis propios cuando usás IA?',
          help: 'Por ejemplo, relacionarlo con experiencias de clase, problemas locales o situaciones personales.',
          context: 'ANEP destaca la importancia del valor agregado humano y del desarrollo de responsabilidad frente al propio aprendizaje.',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'em3', 
          onNo: 'em3',
          anepRef: 'Sección 6 - Responsabilidad'
        },
        em3: { 
          title: 'Consultás con tu docente cuando tenés dudas sobre si es adecuado usar IA en una tarea?',
          help: 'Pedir orientación antes de entregar o diseñar junto al docente cómo usar la herramienta de forma aceptable.',
          context: 'El documento enfatiza la necesidad de diálogo pedagógico y acuerdos claros sobre el uso de IA en el aula.',
          gainYes: 12, 
          gainNo: 2, 
          onYes: 'FIN', 
          onNo: 'FIN',
          anepRef: 'Sección 6 - Acuerdos pedagógicos'
        }
      }
    },

    /* ========================================
       PERFIL: ESTUDIANTE UNIVERSITARIO
       ======================================== */
    estudiante_universitaria: {
      inicio: 'eu1',
      nodos: {
        eu1: { 
          title: 'Usás IA para trabajos académicos (informes, ensayos, proyectos de investigación)?',
          help: 'Incluye redacción de textos, revisión de estilo, generación de ideas o estructuración de trabajos.',
          context: 'En el nivel universitario, ANEP y UNESCO recomiendan prestar especial atención a la autoría, la citación y la integridad académica.',
          gainYes: 12, 
          gainNo: 4, 
          onYes: 'eu2', 
          onNo: 'eu2',
          anepRef: 'UNESCO - Guía para el uso de IA en educación superior'
        },
        eu2: { 
          title: 'Citás explícitamente la asistencia de IA cuando la usás en un trabajo académico?',
          help: 'Por ejemplo, indicar en la metodología o en una nota al pie qué herramienta se utilizó y para qué.',
          context: 'La recomendación de UNESCO y ANEP subraya la necesidad de transparencia y trazabilidad en las producciones académicas.',
          gainYes: 16, 
          gainNo: 0, 
          onYes: 'g1', 
          onNo: 'g1',
          anepRef: 'ANEP - Sección 4, transparencia y autoría'
        },

        // Tronco común adaptado a universidad
        g1: { 
          title: 'Contrastás lo generado por IA con bibliografía académica y recursos del curso?',
          help: 'Artículos, libros, normas de la asignatura, bases de datos científicas.',
          context: 'ANEP advierte sobre las “alucinaciones” y la necesidad de verificación rigurosa en contextos de alta exigencia académica.',
          gainYes: 18, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g1b',
          anepRef: 'Sección 6 - Alucinaciones'
        },
        g1b: { 
          title: 'Si no podés verificar todo, aclarás los límites del uso de IA en el trabajo?',
          help: 'Señalar qué partes pueden tener menor grado de verificación o dependen fuertemente de la herramienta.',
          context: 'La transparencia sobre las limitaciones y el proceso forma parte de la ética de la investigación y la formación universitaria.',
          gainYes: 10, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g2',
          anepRef: 'UNESCO - Ética de la IA'
        },
        g2: { 
          title: 'Revisás posibles sesgos de la IA en temas sensibles o de impacto social?',
          help: 'Por ejemplo, género, raza, discapacidad, contextos culturales, datos de salud o educación.',
          context: 'ANEP y UNESCO señalan que la IA puede amplificar sesgos y discriminaciones si no se los analiza críticamente.',
          gainYes: 18, 
          gainNo: 0, 
          onYes: 'g3', 
          onNo: 'g3',
          anepRef: 'UNESCO - Principio de equidad y no discriminación'
        },
        g3: { 
          title: 'Integramente tu propia lectura crítica y discusión teórica al usar IA?',
          help: 'No solo copiar, sino argumentar, comparar enfoques y adoptar una posición fundamentada.',
          context: 'En educación superior se espera un trabajo intelectual que vaya más allá de la simple reescritura de respuestas generadas por IA.',
          gainYes: 16, 
          gainNo: 0, 
          onYes: 'g4', 
          onNo: 'g4',
          anepRef: 'ANEP - Habilidades críticas y pensamiento de orden superior'
        },
        g4: { 
          title: 'Acordás con docentes y equipos de cátedra cómo está permitido usar IA en cada curso?',
          help: 'Revisar programas, rúbricas y orientaciones específicas antes de apoyarse en la herramienta.',
          context: 'Los acuerdos institucionales y de curso son parte de la cultura de integridad académica en la universidad.',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'eu3', 
          onNo: 'eu3',
          anepRef: 'ANEP - Adaptación de métodos de evaluación'
        },
        eu3: { 
          title: 'Reflexionás sobre cómo el uso de IA impacta en tu propia formación profesional?',
          help: 'Preguntarte si la herramienta potencia o debilita tu capacidad de investigar, escribir y tomar decisiones.',
          context: 'La finalidad de la formación universitaria es construir autonomía y criterio profesional; la IA debería fortalecer, no sustituir, estos procesos.',
          gainYes: 12, 
          gainNo: 2, 
          onYes: 'FIN', 
          onNo: 'FIN',
          anepRef: 'UNESCO / ANEP - Agencia humana y autonomía'
        }
      }
    },

    /* ========================================
       PERFIL: ESTUDIANTE DE FORMACIÓN EN EDUCACIÓN
       (Futuros/as docentes)
       ======================================== */
    estudiante_formacion: {
      inicio: 'ef1',
      nodos: {
        ef1: { 
          title: 'Usás IA tanto para estudiar como para diseñar actividades o materiales didácticos?',
          help: 'Por ejemplo, pedir ideas de consignas, explicaciones para tus futuros alumnos o ejemplos para clase.',
          context: 'En formación docente, el uso de IA se vincula no solo a la propia trayectoria de estudiante, sino también al rol futuro como mediador pedagógico.',
          gainYes: 14, 
          gainNo: 4, 
          onYes: 'ef2', 
          onNo: 'ef2',
          anepRef: 'ANEP - IA y rol docente'
        },
        ef2: { 
          title: 'Cuando usás IA para pensar clases, evaluás si las propuestas respetan el contexto y la diversidad de tus futuros grupos?',
          help: 'Analizar si las sugerencias son realistas, inclusivas y acordes a la normativa y a la institución donde podrías trabajar.',
          context: 'ANEP subraya la importancia del contexto y de la equidad en cualquier integración de tecnología en los procesos educativos.',
          gainYes: 16, 
          gainNo: 0, 
          onYes: 'g1', 
          onNo: 'g1',
          anepRef: 'Sección 6 - Ciudadanía digital y equidad'
        },

        // Tronco común adaptado a rol docente en formación
        g1: { 
          title: 'Contrastás las respuestas de la IA con bibliografía de didáctica y documentos curriculares?',
          help: 'Por ejemplo, programas oficiales, propuestas de ANEP, bibliografía de la carrera.',
          context: 'El marco ANEP enfatiza la necesidad de articular la IA con los marcos curriculares y pedagógicos vigentes.',
          gainYes: 18, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g1b',
          anepRef: 'ANEP - Marco referencial IA en Educación'
        },
        g1b: { 
          title: 'Si tomás ideas de IA para actividades, lo dejás claro en tu planificación o reflexión?',
          help: 'Reconocer de dónde surgen las propuestas y qué cambios personales realizaste.',
          context: 'La transparencia y la reflexión sobre el proceso son centrales en la formación inicial docente.',
          gainYes: 10, 
          gainNo: 0, 
          onYes: 'g2', 
          onNo: 'g2',
          anepRef: 'ANEP - Transparencia y autoría'
        },
        g2: { 
          title: 'Analizás cómo los sesgos de la IA pueden afectar a tus futuros estudiantes?',
          help: 'Lenguaje excluyente, ejemplos estereotipados, ausencia de ciertas realidades o puntos de vista.',
          context: 'La IA puede reforzar desigualdades; el rol docente incluye detectarlas y generar alternativas pedagógicas.',
          gainYes: 18, 
          gainNo: 0, 
          onYes: 'g3', 
          onNo: 'g3',
          anepRef: 'ANEP / UNESCO - Equidad y no discriminación'
        },
        g3: { 
          title: 'Revisás si tus secuencias didácticas mantienen un lugar central para la actividad intelectual del estudiante humano?',
          help: 'Evitar que la IA “haga todo” y priorizar pensamiento crítico, colaboración y producción propia.',
          context: 'ANEP insiste en que la IA debe complementar, no sustituir, la experiencia pedagógica y la construcción colectiva en el aula.',
          gainYes: 16, 
          gainNo: 0, 
          onYes: 'g4', 
          onNo: 'g4',
          anepRef: 'Sección 6 - Experiencias auténticas de aprendizaje'
        },
        g4: { 
          title: 'Compartís y discutís con docentes de la práctica cómo estás usando IA en tu formación?',
          help: 'Abrir el tema en tutorías, ateneos o instancias de evaluación para recibir orientaciones éticas y didácticas.',
          context: 'El trabajo colaborativo y la supervisión son claves para construir criterios sólidos sobre IA en la formación inicial.',
          gainYes: 14, 
          gainNo: 0, 
          onYes: 'ef3', 
          onNo: 'ef3',
          anepRef: 'ANEP - Comunidad profesional de aprendizaje'
        },
        ef3: { 
          title: 'Te preguntás cómo modelarás un uso responsable de IA para tus futuros estudiantes?',
          help: 'Pensar en el ejemplo que das: qué autorizás, qué problematizás y qué prácticas querés promover en el aula.',
          context: 'La formación docente busca que los futuros profesores sean referentes en ética digital y uso crítico de la tecnología.',
          gainYes: 12, 
          gainNo: 2, 
          onYes: 'FIN', 
          onNo: 'FIN',
          anepRef: 'ANEP - Rol docente y ciudadanía digital'
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
  profile: null,        // docente | estudiante (macro)
  profileKey: null,     // clave real usada en CONFIG.perfiles (docente, estudiante_media, etc.)
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

window.state = state;