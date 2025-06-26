# 🔐 Hashsey - Gestor de Contraseñas Sin Almacenamiento

<div align="center">

![Hashsey Logo](icons/icon.svg)

**Un gestor de contraseñas innovador que nunca almacena tus contraseñas**

[![Versión](https://img.shields.io/badge/versión-1.0.0-blue.svg)](https://github.com/Seyronh/hashsey)
[![Licencia](https://img.shields.io/badge/licencia-GPL%20v3-green.svg)](LICENSE)
[![WebExtension](https://img.shields.io/badge/plataforma-WebExtension-orange.svg)]()

[🚀 Instalación](#-instalación) • [✨ Características](#-características) • [🛡️ Seguridad](#️-seguridad) • [📖 Uso](#-uso) • [🌍 Idiomas](#-idiomas)

</div>

---

## 🎯 ¿Qué es Hashsey?

**Hashsey** es un gestor de contraseñas revolucionario que utiliza algoritmos criptográficos para **generar contraseñas únicas** basándose en una contraseña maestra y el dominio del sitio web. A diferencia de otros gestores de contraseñas:

- ❌ **No almacena** ninguna contraseña
- ❌ **No sincroniza** datos en la nube
- ❌ **No tiene** base de datos vulnerable
- ✅ **Genera** contraseñas únicas y seguras al instante
- ✅ **Funciona** sin conexión a internet
- ✅ **Protege** tu privacidad al 100%

## ✨ Características

### 🔑 Generación Determinística
- Genera la misma contraseña para el mismo sitio web siempre
- Utiliza algoritmos criptográficos seguros (hash)
- Contraseñas únicas para cada dominio

### 🎨 Interfaz Intuitiva
- **Popup elegante** con diseño moderno
- **Menú flotante** que aparece automáticamente en formularios de login
- **Botón de visibilidad** para mostrar/ocultar contraseñas
- **Longitud personalizable** de contraseñas

### 🌐 Compatibilidad Universal
- Funciona en **todos los sitios web**
- Detección automática de formularios de login
- Compatible con **Firefox** y navegadores basados en **WebExtensions**

### 🛡️ Máxima Seguridad
- **Zero-knowledge**: Ni siquiera nosotros conocemos tus contraseñas
- **Sin almacenamiento local** de credenciales
- **Sin transmisión de datos** a servidores externos
- **Código abierto** y auditable

## 🚀 Instalación

### Opción 1:Firefox extension
> ⚠️ **La extensión para Firefox está actualmente en proceso de aprobación.**  
> Pronto estará disponible en la tienda de complementos de Firefox.

### Opción 2: Archivo empaquetado
1. Descarga el archivo `hashsey-1.0.0.zip` desde [Releases](https://github.com/Seyronh/hashsey/releases)
2. Descomprime el archivo
3. Sigue los pasos 2-4 de la Opción 1

### Opción 3: Desde el código fuente
1. Clona este repositorio:
   ```bash
   git clone https://github.com/Seyronh/hashsey.git
   cd hashsey
   ```

2. Abre Firefox y ve a `about:debugging`

3. Haz clic en "Este Firefox" → "Cargar complemento temporal"

4. Selecciona el archivo `manifest.json`

## 📖 Uso

### Configuración inicial
1. **Haz clic** en el icono de Hashsey en la barra de herramientas
2. **Introduce** tu contraseña universal (esta será tu contraseña maestra)
3. **Configura** la longitud deseada para las contraseñas generadas

### Uso diario
1. **Vuelve a configurar** la extensión cuando lo necesites (tu contraseña maestra y la longitud de las contraseñas no se almacenan)
2. **Visita** cualquier sitio web con formulario de login
3. **Aparecerá automáticamente** un menú flotante de Hashsey
4. **Haz clic** en "🔑 Rellenar Contraseña"
5. **¡Listo!** La contraseña se generará y rellenará automáticamente

### Ejemplo visual
```
Tu contraseña universal: "MiSuperContraseña123"
Sitio web: google.com
↓ (Algoritmo hash)
Contraseña generada: "K9mP2$nQ8vX3"
```

## 🛡️ Seguridad

### ¿Cómo funciona la seguridad?

1. **Tu contraseña universal** + **dominio del sitio** → **Función hash** → **Contraseña única**

2. **Ventajas del sistema**:
   - Si alguien hackea un sitio web, solo obtiene la contraseña de ESE sitio
   - Tu contraseña universal nunca se almacena ni transmite
   - Imposible ingeniería inversa desde las contraseñas generadas

3. **Algoritmos utilizados**:
   - Hash criptográfico seguro
   - Generación determinística
   - Entropía alta en las contraseñas resultantes

### ⚠️ Importante
- **Memoriza bien** tu contraseña universal
- **No la compartas** con nadie
- **Considera usar** una frase larga y fácil de recordar

## 🌍 Idiomas

Hashsey está disponible en:
- 🇪🇸 **Español** (predeterminado)
- 🇺🇸 **English**

## 🔧 Desarrollo

### Estructura del proyecto
```
hashsey/
├── manifest.json          # Configuración de la extensión
├── background.js          # Script de fondo
├── content.js            # Script de contenido (detección de formularios)
├── popup/
│   ├── popup.html        # Interfaz del popup
│   ├── popup.js          # Lógica del popup
│   └── popup.css         # Estilos del popup
├── _locales/
│   ├── es/messages.json  # Traducciones en español
│   └── en/messages.json  # Traducciones en inglés
└── icons/
    └── icon.svg          # Icono de la extensión
```

### Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia GPL v3 (GNU General Public License versión 3). Ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**¿Te gusta Hashsey?** ⭐ ¡Dale una estrella al repositorio!

**¿Encontraste un bug?** 🐛 [Reporta un issue](https://github.com/Seyronh/hashsey/issues)

**¿Quieres contribuir?** 🤝 [Lee la guía de contribución](#-desarrollo)

</div>

---
