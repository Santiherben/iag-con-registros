/* ========================================
   ELEMENTOS DEL DOM (ACTUALIZADO CON NIVEL EDUCATIVO)
   ======================================== */
const screens = {
  intro: document.getElementById('screenIntro'),
  game: document.getElementById('screenGame'),
  result: document.getElementById('screenResult')
};

const elements = {
  // Carrusel
  carouselTrack: document.getElementById('carouselTrack'),
  carouselDots: document.querySelectorAll('.carousel-dot'),
  prevSlide: document.getElementById('prevSlide'),
  nextSlide: document.getElementById('nextSlide'),
  
  // Bienvenida
  chips: document.querySelectorAll('.chip'),
  playerName: document.getElementById('playerName'),
  startBtn: document.getElementById('startBtn'),
  infoBtn: document.getElementById('infoBtn'),

  // 🆕 Nivel educativo
  nivelEducativoWrapper: document.getElementById('nivelEducativoWrapper'),
  nivelEducativo: document.getElementById('nivelEducativo'),
  nivelEducativoLabel: document.getElementById('nivelEducativoLabel'),

  // Caracterización
  countrySelect: document.getElementById('countrySelect'),
  countryOtherWrapper: document.getElementById('countryOtherWrapper'),
  countryOtherInput: document.getElementById('countryOther'),
  countryFinalInput: document.getElementById('countryFinal'),
  familiaridadInicial: document.getElementById('familiaridadInicial'),
  recursosSimilaresRadios: document.querySelectorAll('input[name="recursosSimilares"]'),
  
  // Juego
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  questionNumber: document.getElementById('questionNumber'),
  questionTitle: document.getElementById('questionTitle'),
  questionHelp: document.getElementById('questionHelp'),
  yesBtn: document.getElementById('yesBtn'),
  noBtn: document.getElementById('noBtn'),
  contextBtn: document.getElementById('contextBtn'),
  feedbackBox: document.getElementById('feedbackBox'),
  nextBtn: document.getElementById('nextBtn'),
  backBtn: document.getElementById('backBtn'),
  timeline: document.getElementById('timeline'),
  likertMarker: document.getElementById('likertMarker'),
  likertLevel: document.getElementById('likertLevel'),
  
  // Resultado
  resultTitle: document.getElementById('resultTitle'),
  resultDesc: document.getElementById('resultDesc'),
  resultLevel: document.getElementById('resultLevel'),
  didacticaList: document.getElementById('didacticaList'),
  toolsList: document.getElementById('toolsList'),
  finalTimeline: document.getElementById('finalTimeline'),
  downloadBtn: document.getElementById('downloadBtn'),
  copyBtn: document.getElementById('copyBtn'),
  restartBtn: document.getElementById('restartBtn'),
  
  // Tema
  themeToggle: document.getElementById('themeToggle'),
  themeIcon: document.getElementById('themeIcon'),

  // Principios UNESCO / ANEP
  principleTooltip: document.getElementById('principleTooltip'),
  principleButtons: document.querySelectorAll('.principle-info-btn'),
  tooltipTabs: document.querySelectorAll('#principleTooltip .tooltip-tab'),
  tooltipTitle: document.getElementById('tooltipTitle'),
  tooltipBody: document.getElementById('tooltipBody'),
  tooltipClose: document.querySelector('#principleTooltip .tooltip-close'),

  // Consentimiento de registro
  consentTracking: document.getElementById('consentTracking')
};

/* ========================================
   🆕 CONFIGURACIÓN DE NIVELES EDUCATIVOS
   ======================================== */
const NIVELES_EDUCATIVOS = {
  docente: [
    'Primaria',
    'Enseñanza Media Básica',
    'Enseñanza Media Superior',
    'Formación Docente',
    'Universitaria'
  ],
  estudiante: [
    'Enseñanza Media Básica',
    'Enseñanza Media Superior',
    'Formación Docente',
    'Universitaria'
  ]
};

/* ========================================
   TEMA + MODAL
   ======================================== */
let darkMode = localStorage.getItem('darkMode') === 'true';
updateTheme();

if (elements.themeToggle) {
  elements.themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    updateTheme();
  });
}

const modal = {
  overlay: document.getElementById('modalOverlay'),
  title: document.getElementById('modalTitle'),
  body: document.getElementById('modalBody'),
  closeBtn: document.getElementById('modalClose'),
  show(title, content) {
    if (!this.overlay || !this.title || !this.body) return;
    this.title.textContent = title;
    this.body.innerHTML = content;
    this.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },
  hide() {
    if (!this.overlay) return;
    this.overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

if (modal.closeBtn) {
  modal.closeBtn.addEventListener('click', () => modal.hide());
}
if (modal.overlay) {
  modal.overlay.addEventListener('click', (e) => { 
    if (e.target === modal.overlay) modal.hide(); 
  });
}
document.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape') {
    modal.hide();
    hidePrincipleTooltip();
  }
});

function updateTheme() {
  if (darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (elements.themeIcon) elements.themeIcon.textContent = '☀';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (elements.themeIcon) elements.themeIcon.textContent = '☾';
  }
}

/* ========================================
   TOOLTIP PRINCIPIOS UNESCO / ANEP
   ======================================== */
let currentPrincipleId = null;
let currentSource = 'unesco';

function showPrincipleTooltip(principleId, source = 'unesco') {
  if (!elements.principleTooltip || !PRINCIPLES_CONTENT[principleId]) return;

  currentPrincipleId = principleId;
  currentSource = source;

  const data = PRINCIPLES_CONTENT[principleId];
  elements.tooltipTitle.textContent = data.title;

  elements.tooltipTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.source === source);
  });

  elements.tooltipBody.innerHTML = data[source];
  elements.principleTooltip.classList.remove('hidden');
}

function hidePrincipleTooltip() {
  if (!elements.principleTooltip) return;
  elements.principleTooltip.classList.add('hidden');
  currentPrincipleId = null;
}

// Abrir tooltip desde las cards
if (elements.principleButtons && elements.principleButtons.length) {
  elements.principleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const principleId = btn.dataset.principle;
      showPrincipleTooltip(principleId, 'unesco');
    });
  });
}

// Cambiar entre UNESCO / ANEP
if (elements.tooltipTabs && elements.tooltipTabs.length) {
  elements.tooltipTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (!currentPrincipleId) return;
      const source = tab.dataset.source;
      showPrincipleTooltip(currentPrincipleId, source);
    });
  });
}

// Cerrar tooltip (botón X)
if (elements.tooltipClose) {
  elements.tooltipClose.addEventListener('click', hidePrincipleTooltip);
}

// Cerrar al hacer clic fuera
document.addEventListener('click', (evt) => {
  if (!elements.principleTooltip || elements.principleTooltip.classList.contains('hidden')) return;
  const isTooltip = elements.principleTooltip.contains(evt.target);
  const isButton = evt.target.closest && evt.target.closest('.principle-info-btn');
  if (!isTooltip && !isButton) hidePrincipleTooltip();
});

/* ========================================
   MANEJO DE PAÍS
   ======================================== */
if (elements.countrySelect && elements.countryFinalInput) {
  const updateCountryFinal = () => {
    const value = elements.countrySelect.value;
    if (value === 'Otro') {
      if (elements.countryOtherWrapper) {
        elements.countryOtherWrapper.style.display = 'block';
      }
      if (elements.countryOtherInput) {
        elements.countryFinalInput.value = elements.countryOtherInput.value.trim();
      }
    } else {
      if (elements.countryOtherWrapper) {
        elements.countryOtherWrapper.style.display = 'none';
      }
      if (elements.countryOtherInput) {
        elements.countryOtherInput.value = '';
      }
      elements.countryFinalInput.value = value;
    }

    if (window.state) {
      window.state.country = elements.countryFinalInput.value || 'Uruguay';
    }
  };

  elements.countrySelect.addEventListener('change', updateCountryFinal);

  if (elements.countryOtherInput) {
    elements.countryOtherInput.addEventListener('input', () => {
      if (elements.countrySelect.value === 'Otro') {
        elements.countryFinalInput.value = elements.countryOtherInput.value.trim();
        if (window.state) {
          window.state.country = elements.countryFinalInput.value;
        }
      }
    });
  }

  updateCountryFinal();
}

/* ========================================
   🆕 MANEJO DE NIVEL EDUCATIVO
   ======================================== */
function updateNivelEducativo(perfil) {
  if (!elements.nivelEducativoWrapper || !elements.nivelEducativo) return;

  // Mostrar el campo
  elements.nivelEducativoWrapper.style.display = 'block';

  // Actualizar label según perfil
  if (elements.nivelEducativoLabel) {
    elements.nivelEducativoLabel.textContent = 
      perfil === 'docente' ? '¿En qué nivel trabajás?' : '¿En qué nivel estudiás?';
  }

  // Limpiar opciones anteriores
  elements.nivelEducativo.innerHTML = '<option value="">Seleccioná una opción</option>';

  // Cargar opciones según perfil
  const niveles = NIVELES_EDUCATIVOS[perfil] || [];
  niveles.forEach(nivel => {
    const option = document.createElement('option');
    option.value = nivel;
    option.textContent = nivel;
    elements.nivelEducativo.appendChild(option);
  });

  // Reset valor
  elements.nivelEducativo.value = '';
  
  // Sincronizar con state
  if (window.state) {
    window.state.nivelEducativo = '';
  }

  // Actualizar botón de inicio
  updateStartButtonState();
}

function hideNivelEducativo() {
  if (!elements.nivelEducativoWrapper) return;
  elements.nivelEducativoWrapper.style.display = 'none';
  if (elements.nivelEducativo) {
    elements.nivelEducativo.value = '';
  }
  if (window.state) {
    window.state.nivelEducativo = '';
  }
}

// Listener para cambios en nivel educativo
if (elements.nivelEducativo) {
  elements.nivelEducativo.addEventListener('change', () => {
    if (window.state) {
      window.state.nivelEducativo = elements.nivelEducativo.value || '';
    }
    updateStartButtonState();
  });
}

/* ========================================
   CONSENTIMIENTO DE REGISTRO
   ======================================== */
if (elements.consentTracking) {
  elements.consentTracking.addEventListener('change', () => {
    if (window.state) {
      window.state.consentTracking = elements.consentTracking.checked;
    }
    // 🔧 AGREGADO: Validar botón cuando cambia el consentimiento
    updateStartButtonState();
  });

  if (window.state) {
    window.state.consentTracking = elements.consentTracking.checked;
  }
}

/* ========================================
   🔧 CARRUSEL (CORREGIDO PARA 2 SLIDES)
   ======================================== */
function updateCarousel() {
  if (!elements.carouselTrack) return;

  const offset = -state.currentSlide * 100;
  elements.carouselTrack.style.transform = `translateX(${offset}%)`;

  if (elements.carouselDots && elements.carouselDots.length) {
    elements.carouselDots.forEach((dot, index) => 
      dot.classList.toggle('active', index === state.currentSlide)
    );
  }

  if (elements.prevSlide) {
    elements.prevSlide.style.display = state.currentSlide === 0 ? 'none' : 'block';
  }

  if (!elements.nextSlide || !elements.startBtn) return;

  // ✅ CORREGIDO: Ahora verifica Slide 2 (índice 1) en lugar de Slide 3 (índice 2)
  if (state.currentSlide === 1) {
    elements.nextSlide.classList.add('hidden');
    elements.startBtn.classList.remove('hidden');
  } else {
    elements.nextSlide.classList.remove('hidden');
    elements.startBtn.classList.add('hidden');
  }
}

// Navegación carrusel
if (elements.prevSlide) {
  elements.prevSlide.addEventListener('click', () => { 
    if (state.currentSlide > 0) { 
      state.currentSlide--; 
      updateCarousel(); 
    }
  });
}
if (elements.nextSlide) {
  elements.nextSlide.addEventListener('click', () => { 
    // ✅ CORREGIDO: Máximo slide es 1 (antes era 2)
    if (state.currentSlide < 1) { 
      state.currentSlide++; 
      updateCarousel(); 
    }
  });
}
if (elements.carouselDots && elements.carouselDots.length) {
  elements.carouselDots.forEach((dot, index) => 
    dot.addEventListener('click', () => { 
      state.currentSlide = index; 
      updateCarousel(); 
    })
  );
}

/* ========================================
   🔧 HABILITAR / DESHABILITAR BOTÓN INICIO (CORREGIDO)
   ======================================== */
function updateStartButtonState() {
  if (!elements.startBtn) return;

  console.log('=== 🔍 DEBUG: Validando formulario ===');

  // 1) Perfil elegido
  const perfilOk = !!state.profile;
  console.log('✓ Perfil OK:', perfilOk, '| Valor:', state.profile);

  // 2) Nivel educativo (OBLIGATORIO solo para docente/estudiante)
  let nivelOk = true;
  if (state.profile === 'docente' || state.profile === 'estudiante') {
    if (elements.nivelEducativo) {
      nivelOk = elements.nivelEducativo.value.trim() !== '';
      console.log('✓ Nivel OK:', nivelOk, '| Valor:', elements.nivelEducativo.value);
    }
  } else {
    console.log('✓ Nivel OK: true (no requerido para este perfil)');
  }

  // 3) Familiaridad
  let famOk = true;
  if (elements.familiaridadInicial) {
    famOk = elements.familiaridadInicial.value.trim() !== '';
    console.log('✓ Familiaridad OK:', famOk, '| Valor:', elements.familiaridadInicial.value);
  }

  // 4) Recursos similares
  let recursosOk = true;
  if (elements.recursosSimilaresRadios && elements.recursosSimilaresRadios.length) {
    recursosOk = Array.from(elements.recursosSimilaresRadios).some(r => r.checked);
    console.log('✓ Recursos OK:', recursosOk);
  }

  // 5) 🔧 AGREGADO: Consentimiento (OBLIGATORIO)
  let consentOk = true;
  if (elements.consentTracking) {
    consentOk = elements.consentTracking.checked;
    console.log('✓ Consentimiento OK:', consentOk);
  }

  // 🔑 Botón habilitado SOLO si TODO está completo
  const todasOk = perfilOk && nivelOk && famOk && recursosOk && consentOk;
  console.log('━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RESULTADO:', todasOk ? '✅ TODAS OK' : '❌ FALTAN CAMPOS');
  console.log('🎯 Botón:', todasOk ? '🟢 HABILITADO' : '🔴 DESHABILITADO');
  console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

  elements.startBtn.disabled = !todasOk;
}

/* ========================================
   🆕 SELECCIÓN DE PERFIL (ACTUALIZADO)
   ======================================== */
elements.chips.forEach(chip => {
  chip.addEventListener('click', () => {
    console.log('🔵 Click en chip:', chip.dataset.profile);
    
    elements.chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const perfil = chip.dataset.profile;

    // ✅ Actualizar state
    if (window.state) {
      window.state.profile = perfil;
      console.log('✅ State actualizado - Perfil:', window.state.profile);
    } else {
      console.error('❌ window.state no existe!');
    }

    // Mostrar nivel educativo según perfil
    if (perfil === 'docente' || perfil === 'estudiante') {
      updateNivelEducativo(perfil);
    } else {
      hideNivelEducativo();
    }

    updateStartButtonState();
  });
});

// Cambios en familiaridad inicial
if (elements.familiaridadInicial) {
  elements.familiaridadInicial.addEventListener('change', (e) => {
    console.log('🔵 Familiaridad cambió:', e.target.value);
    if (window.state) {
      window.state.familiaridadInicial = e.target.value || '';
      console.log('✅ State actualizado - Familiaridad:', window.state.familiaridadInicial);
    }
    updateStartButtonState();
  });
}

// Cambios en recursos similares
if (elements.recursosSimilaresRadios && elements.recursosSimilaresRadios.length) {
  elements.recursosSimilaresRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      console.log('🔵 Recursos cambió:', e.target.value);
      if (e.target.checked && window.state) {
        window.state.recursosSimilares = e.target.value;
        console.log('✅ State actualizado - Recursos:', window.state.recursosSimilares);
      }
      updateStartButtonState();
    });
  });
}


// Estado inicial
updateStartButtonState();
updateCarousel();

/* ========================================
   INFO MARCO ANEP
   ======================================== */
if (elements.infoBtn) {
  elements.infoBtn.addEventListener('click', () => {
    modal.show('Marco ANEP sobre IA en Educación', `
      <p>Este cuestionario está basado en documentos oficiales de UNESCO y ANEP sobre el uso de IAG contextualizado a la Educación.</p>
      <h4>Principios clave:</h4>
      <ul>
        <li>Verificación de información con fuentes confiables</li>
        <li>Transparencia en autoría y uso de IA</li>
        <li>Conciencia y mitigación de sesgos</li>
        <li>Valor agregado pedagógico humano</li>
        <li>Protección de datos y privacidad</li>
        <li>Desarrollo de pensamiento crítico</li>
      </ul>
    `);
  });
}

/* ========================================
   CAMBIO DE PANTALLAS
   ======================================== */
function showScreen(screenName) {
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.add('hidden');
  });
  if (screens[screenName]) {
    screens[screenName].classList.remove('hidden');
    screens[screenName].classList.add('fade-in');
  }
}

/* ========================================
   BOTÓN "IA Educativa ANEP" (Inicio seguro)
   ======================================== */
const homeBtn = document.querySelector('.home-btn');

if (homeBtn) {
  homeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (screens.intro && !screens.intro.classList.contains('hidden')) {
      showScreen('intro');
      state.currentSlide = 0;
      updateCarousel();
      window.scrollTo(0, 0);
      return;
    }

    if (state.path && state.path.length > 0) {
      modal.show(
        'Confirmar salida',
        `
          <p style="line-height:1.6;">
            ¿Deseás volver al inicio?<br>
            <strong>Perderás el progreso actual de la recorrida.</strong>
          </p>
          <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
            <button id="cancelAbort" class="btn btn-secondary">Cancelar</button>
            <button id="confirmAbort" class="btn btn-danger">Aceptar</button>
          </div>
        `
      );

      setTimeout(() => {
        const cancelBtn = document.getElementById('cancelAbort');
        const confirmBtn = document.getElementById('confirmAbort');

        if (cancelBtn) {
          cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modal.hide();
          }, { once: true });
        }

        if (confirmBtn) {
          confirmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modal.hide();

            // Reset estado
            state.profile = null;
            state.name = '';
            state.currentId = null;
            state.path = [];
            state.evidence = 0;
            state.currentSlide = 0;
            state.country = 'Uruguay';
            state.nivelEducativo = '';
            state.familiaridadInicial = '';
            state.recursosSimilares = '';
            state.consentTracking = true;

            // Reset UI
            if (elements.chips && elements.chips.length) {
              elements.chips.forEach(c => c.classList.remove('active'));
            }
            if (elements.playerName) elements.playerName.value = '';

            // Reset nivel educativo
            hideNivelEducativo();

            if (elements.countrySelect) elements.countrySelect.value = 'Uruguay';
            if (elements.countryOtherWrapper) elements.countryOtherWrapper.style.display = 'none';
            if (elements.countryOtherInput) elements.countryOtherInput.value = '';
            if (elements.countryFinalInput) elements.countryFinalInput.value = 'Uruguay';

            if (elements.familiaridadInicial) elements.familiaridadInicial.value = '';
            if (elements.recursosSimilaresRadios && elements.recursosSimilaresRadios.length) {
              elements.recursosSimilaresRadios.forEach(r => { r.checked = false; });
            }
            if (elements.consentTracking) elements.consentTracking.checked = true;

            updateStartButtonState();
            updateCarousel();
            showScreen('intro');
            window.scrollTo(0, 0);
          }, { once: true });
        }
      }, 50);

    } else {
      showScreen('intro');
      state.currentSlide = 0;
      updateCarousel();
      window.scrollTo(0, 0);
    }
  });
}

/* ========================================
   MODAL HERRAMIENTAS (se usa en resultados)
   ======================================== */
function mostrarHerramientas(tipo) {
  if (!modal) return;

  let titulo = 'Herramientas recomendadas';
  let cuerpo = '';

  switch (tipo) {
    case 'educativo':
      titulo = 'Asistentes con modo educativo';
      cuerpo = '<p>Ejemplos: asistentes en modo educativo que promueven verificación y citación.</p>';
      break;
    case 'citador':
      titulo = 'Editores con citador integrado';
      cuerpo = '<p>Ejemplos: procesadores de texto con sugerencias de fuentes y citas.</p>';
      break;
    case 'sesgos':
      titulo = 'Verificadores de sesgos';
      cuerpo = '<p>Herramientas que analizan texto para detectar posibles sesgos o discriminaciones.</p>';
      break;
    case 'prompts':
      titulo = 'Plataformas de prompts éticos';
      cuerpo = '<p>Recursos que enseñan a formular consultas alineadas con pensamiento crítico y ética.</p>';
      break;
  }

  modal.show(titulo, cuerpo);
}

/* ========================================
   🔧 SINCRONIZACIÓN INICIAL
   ======================================== */
// Ejecutar después de que todo se cargue
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔄 Sincronizando estado inicial...');
  
  // Sincronizar perfil si hay un chip activo
  const activeChip = document.querySelector('.chip.active');
  if (activeChip && window.state) {
    const perfil = activeChip.dataset.profile;
    window.state.profile = perfil;
    console.log('✅ Perfil inicial sincronizado:', perfil);
    
    // Mostrar nivel educativo si corresponde
    if (perfil === 'docente' || perfil === 'estudiante') {
      updateNivelEducativo(perfil);
    }
  }
  
  // Sincronizar familiaridad inicial
  if (elements.familiaridadInicial && window.state) {
    window.state.familiaridadInicial = elements.familiaridadInicial.value || '';
    console.log('✅ Familiaridad inicial:', window.state.familiaridadInicial);
  }
  
  // Sincronizar recursos similares inicial
  if (elements.recursosSimilaresRadios && window.state) {
    const checkedRadio = Array.from(elements.recursosSimilaresRadios).find(r => r.checked);
    if (checkedRadio) {
      window.state.recursosSimilares = checkedRadio.value;
      console.log('✅ Recursos inicial:', window.state.recursosSimilares);
    }
  }
  
  // Sincronizar consentimiento inicial
  if (elements.consentTracking && window.state) {
    window.state.consentTracking = elements.consentTracking.checked;
    console.log('✅ Consentimiento inicial:', window.state.consentTracking);
  }
  
  // Validar estado del botón
  setTimeout(() => {
    console.log('🔍 Validando estado inicial del botón...');
    updateStartButtonState();
  }, 100);
});
