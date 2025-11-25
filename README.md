
# 🇺🇾 anep-ia-reflexiva
# **Herramienta de Reflexión sobre el Uso de IA en Educación**
### Autoevaluación crítica alineada al documento *IA en Educación – ANEP (2024)*

---

## **Descripción general**

**anep-ia-reflexiva** es una herramienta interactiva diseñada para **docentes y estudiantes**, cuyo objetivo es promover un **uso crítico, responsable y transparente** de la Inteligencia Artificial en contextos educativos.

Se basa en los lineamientos del documento oficial:

> **“La Inteligencia Artificial en la Educación” – ANEP, 2024**

e integra principios UNESCO sobre alfabetización digital, sesgos, ética, verificación y transparencia.

La aplicación ofrece:

- Un **cuestionario ramificado** adaptado al perfil (docente/estudiante).  
- Recomendaciones personalizadas según nivel formativo.  
- Cálculo automático del nivel en una **escala Likert 0–100**.  
- Descarga de **certificado PDF**.  
- Registro opcional de resultados en Google Sheets.  
- **Chatbot pedagógico** integrado (Cloudflare Worker + Gemini).  
- Modo claro/oscuro y diseño responsivo.

---

## **Objetivos del proyecto**

- Favorecer la **reflexión crítica** sobre el uso de IA.  
- Ofrecer **recomendaciones pedagógicas** basadas en el marco ANEP.  
- Fortalecer prácticas de verificación, transparencia y autoría.  
- Ayudar a instituciones educativas a comprender el uso actual de IA.  
- Acompañar procesos formativos desde una perspectiva ética y humanista.

---

##  **Arquitectura del proyecto**

El sistema está compuesto por varios módulos presentes en el repositorio.

### **1. Lógica de cuestionario y certificación**
- **certificado-ia.js**  
- **configuracion-ia.js**  
- **juego-ia.js**

### **2. Interfaz y control de estados**
- **ui-ia.js**

### **3. Chatbot pedagógico (v2.1)**
- **chatbot-component.js**

### **4. Estructura principal del sitio**
- **index.html**

### **5. Estilos visuales**
- **styles.css**

---

## 📊 **Características principales**

### ✔️ Cuestionario adaptado por perfil
Con preguntas validadas por el documento ANEP (2024).

### ✔️ Árbol de decisiones basado en:
- Verificación  
- Transparencia y autoría  
- Sesgos  
- Valor agregado humano  
- Ética y responsabilidad  

### ✔️ Recomendaciones automáticas
Personalizadas según respuestas y nivel educativo.

### ✔️ Certificado PDF descargable
Incluye:

- Nombre del participante  
- Perfil (docente/estudiante)  
- Puntaje alcanzado  
- Explicación del nivel  
- Recorrido completo  

### ✔️ Registro en Google Sheets
Envío opcional mediante Google Apps Script.

### ✔️ Chatbot pedagógico
Asistente educativo basado en:

- Cloudflare Worker  
- API Gemini 2.5  

---

##  **Cómo ejecutar el proyecto**

### 🔧 Opción 1 — Localmente
1. Clonar el repositorio  
2. Abrir `index.html` en el navegador  

###  Opción 2 — Publicarlo en línea
Compatible con:

- GitHub Pages  
- DriveToWeb  
- Netlify  
- Cloudflare Pages  

---

## 📡 **Integración con Google Sheets**
La URL del Apps Script debe colocarse en `juego-ia.js` dentro de:

```js
const url = "https://script.google.com/macros/s/XXXX/exec";
```

---

## 📚 **Marco conceptual**

### **Documento ANEP (2024)**
- Ética y transparencia  
- Sesgos  
- Ciudadanía digital  
- Aprendizaje auténtico  

### **UNESCO**
- Directrices globales  
- Equidad y derechos digitales  
- Alfabetización en IA  

---

## **Autores**

**Prof. Santiago Hernández**  
Especialista en Tecnología Educativa – ANEP  
Investigador | Maestrando en Educación  
ORCID: https://orcid.org/0009-0001-9086-1490  

**Prof. Diego Daluz**  
Investigador en Ciencias Sociales y Tecnología  
Maestrando en Educación  
ORCID: https://orcid.org/0009-0007-3089-6652  

---

##  **Licencia**

Este proyecto se distribuye bajo licencia **MIT**.

---

## 💬 **Contacto académico**
Correo (opcional para agregar)  
Artículo asociado:  
https://horizontespedagogicos.ibero.edu.co/article/view/3235
