// Utilidad para obtener mensajes localizados
function getMessage(key, substitutions = null) {
	if (typeof browser !== "undefined" && browser.i18n) {
		return browser.i18n.getMessage(key, substitutions);
	}

	// Fallback para cuando browser.i18n no está disponible
	const fallbackMessages = {
		passwordManagerTitle: "🔐 Hashsey Gestor de Contraseñas",
		fillPasswordButton: "🔑 Rellenar Contraseña",
		hideFieldButton: "🚫 Ocultar para este campo",
		closeButton: "❌ Cerrar",
		passwordFilledSuccess: "✅ Contraseña rellenada exitosamente",
		hashseyHiddenForField: "🚫 Hashsey ocultado para este campo",
		passwordNotConfiguredError:
			"❌ Debes configurar la contraseña universal primero",
	};

	return fallbackMessages[key] || key;
}

// Función para localizar elementos HTML por atributo data-i18n
function localizeHtml() {
	const elements = document.querySelectorAll("[data-i18n]");
	elements.forEach((element) => {
		const key = element.getAttribute("data-i18n");
		const message = getMessage(key);

		if (
			element.tagName === "INPUT" &&
			(element.type === "text" || element.type === "password")
		) {
			element.placeholder = message;
		} else {
			element.textContent = message;
		}
	});
}

// Función para localizar atributos específicos
function localizeAttribute(element, attribute, key) {
	const message = getMessage(key);
	element.setAttribute(attribute, message);
}
