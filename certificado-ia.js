/* ========================================
   GENERADOR DE PDF (jsPDF)
   ======================================== */
let jsPDFLoaded = false;

function cargarJsPDF() {
  return new Promise((resolve, reject) => {
    if (jsPDFLoaded || (window.jspdf && window.jspdf.jsPDF)) {
      jsPDFLoaded = true;
      return resolve();
    }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = () => { jsPDFLoaded = true; resolve(); };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function agregarTextoMultilinea(doc, texto, x, y, maxWidth, lineHeight) {
  const split = doc.splitTextToSize(texto, maxWidth);
  split.forEach(line => {
    doc.text(line, x, y);
    y += lineHeight;
    if (y > 280) { doc.addPage(); y = 20; }
  });
  return y;
}

/* ========================================
   ACCIONES FINALES
   ======================================== */
if (elements.downloadBtn) {
  elements.downloadBtn.addEventListener('click', async () => {
    const nivel = CONFIG.likert.find(l => state.evidence >= l.min && l.max >= state.evidence);
    const fecha = new Date().toLocaleDateString('es-UY');
    const nombre = state.name || 'Sin nombre';
    const perfilHumano = state.profile === 'docente' ? 'Docente' : 'Estudiante';

    try {
      await cargarJsPDF();
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      // Portada
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('IA Educativa ANEP', 15, 20);
      doc.setFontSize(12);
      doc.text('Uso crítico y reflexivo de IA en educación', 15, 28);

      // Datos principales
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      let y = 55;
      doc.text(`Participante: ${nombre}`, 15, y); y += 8;
      doc.text(`Perfil: ${perfilHumano}`, 15, y); y += 8;
      doc.text(`Fecha: ${fecha}`, 15, y); y += 12;

      // Nivel
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33);
      doc.text(`Nivel alcanzado: ${nivel.id}`, 15, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(55, 55, 55);
      y = agregarTextoMultilinea(doc, nivel.desc, 15, y, 180, 7);
      y += 6;

      // Recorrido completo
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33);
      doc.text('Recorrido completo', 15, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(55, 55, 55);

      const perfil = CONFIG.perfiles[state.profile];
      state.path.forEach((item, i) => {
        const nodo = perfil.nodos[item.id];
        const respuesta = item.answer ? 'Sí' : 'No';
        y = agregarTextoMultilinea(doc, `${i + 1}. ${nodo.title}`, 15, y, 180, 6);
        y = agregarTextoMultilinea(doc, `   Respuesta: ${respuesta}`, 15, y, 180, 6);
        y = agregarTextoMultilinea(doc, `   Devolución: ${item.feedback}`, 15, y, 180, 6);
        y = agregarTextoMultilinea(doc, `   Referencia ANEP: ${nodo.anepRef}`, 15, y, 180, 6);
        y += 4;
      });

      // Acuerdos didácticos
      doc.addPage();
      y = 20;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33);
      doc.text('Acuerdos didácticos ANEP', 15, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(55, 55, 55);
      CONFIG.acuerdos.forEach((a, i) => {
        y = agregarTextoMultilinea(doc, `${i + 1}. ${a.text} (Ref.: ${a.ref})`, 15, y, 180, 6);
        y += 2;
      });

      // Referencias
      y += 6;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33);
      doc.text('Referencias', 15, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(55, 55, 55);
      y = agregarTextoMultilinea(doc, 'Basado en el documento "La inteligencia artificial en la educación" (ANEP, 2024).', 15, y, 180, 6);
      y = agregarTextoMultilinea(doc, 'Artículo académico: https://horizontespedagogicos.ibero.edu.co/article/view/3235', 15, y, 180, 6);

      doc.save(`certificado-ia-anep-${Date.now()}.pdf`);
      modal.show('Descarga completada', '<p>El certificado se ha descargado exitosamente en <strong>PDF</strong>.</p>');
    } catch (e) {
      console.error(e);
      modal.show('Error al generar PDF', '<p>No se pudo generar el PDF. Verificá la conexión a Internet para cargar jsPDF.</p>');
    }
  });
}

if (elements.copyBtn) {
  elements.copyBtn.addEventListener('click', () => {
    const nivel = CONFIG.likert.find(l => state.evidence >= l.min && l.max >= state.evidence);
    const perfil = CONFIG.perfiles[state.profile];
    const resumen = `IA Educativa ANEP - Resultados

Perfil: ${state.profile}
${state.name ? `Nombre: ${state.name}` : ''}
Nivel: ${nivel.id}

Respuestas:
${state.path.map((p, i) => {
  const nodo = perfil.nodos[p.id];
  return `${i + 1}. ${nodo.title} → ${p.answer ? 'Sí' : 'No'}`;
}).join('\n')}`;
    navigator.clipboard.writeText(resumen).then(() => {
      elements.copyBtn.innerHTML = '<span>✓ Copiado</span>';
      setTimeout(() => { elements.copyBtn.innerHTML = '<span>Copiar resumen</span>'; }, 2000);
    });
  });
}

if (elements.restartBtn) {
  elements.restartBtn.addEventListener('click', () => {
    state.profile = null;
    state.name = '';
    state.currentId = null;
    state.path = [];
    state.evidence = 0;
    state.currentSlide = 0;
    state.country = 'Uruguay';
    state.familiaridadInicial = '';
    state.recursosSimilares = '';
    state.consentTracking = true;

    elements.chips.forEach(c => c.classList.remove('active'));
    elements.playerName.value = '';

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
  });
}
