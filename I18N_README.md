# Sistema de Internacionalización (i18n) para Hashsey

## Estructura de archivos

```
_locales/
├── es/
│   └── messages.json    # Mensajes en español
└── en/
    └── messages.json    # Mensajes en inglés
```

## Configuración

### manifest.json

- `default_locale`: Define el idioma por defecto (español)
- Los campos `name`, `description` y `default_title` usan variables i18n con formato `__MSG_clave__`

### Archivos de localización

Los archivos `messages.json` contienen objetos con:

- `message`: El texto localizado
- `description`: Descripción del propósito del mensaje

## Uso en el código

### En HTML

- Usa `data-i18n="clave"` para localizar texto de elementos
- Usa `data-i18n-placeholder="clave"` para placeholders (aunque se maneja programáticamente)

### En JavaScript

- `getMessage(clave)`: Obtiene un mensaje localizado
- `localizeHtml()`: Localiza automáticamente elementos HTML con atributos data-i18n

## Idiomas soportados

- **Español (es)**: Idioma por defecto
- **Inglés (en)**: Idioma secundario

## Claves de mensaje disponibles

- `extName`: Nombre de la extensión
- `extDescription`: Descripción de la extensión
- `extTitle`: Título de la extensión
- `universalPasswordLabel`: Etiqueta para contraseña universal
- `universalPasswordPlaceholder`: Placeholder para contraseña universal
- `lengthLabel`: Etiqueta para longitud
- `passwordManagerTitle`: Título del menú flotante
- `fillPasswordButton`: Texto del botón rellenar
- `hideFieldButton`: Texto del botón ocultar
- `closeButton`: Texto del botón cerrar
- `passwordFilledSuccess`: Mensaje de éxito
- `hashseyHiddenForField`: Mensaje de campo oculto

## Cómo agregar nuevos idiomas

1. Crear nueva carpeta en `_locales/` con el código del idioma (ej: `fr` para francés)
2. Crear `messages.json` con todas las claves traducidas
3. La extensión detectará automáticamente el idioma del navegador

## Cómo agregar nuevos mensajes

1. Agregar la nueva clave en todos los archivos `messages.json`
2. Usar `getMessage('nuevaClave')` en el código JavaScript
3. Para HTML, usar `data-i18n="nuevaClave"` y llamar `localizeHtml()`
