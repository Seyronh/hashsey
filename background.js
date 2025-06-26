// Función para generar hash SHA-256
async function generateSHA256Hash(text) {
	const encoder = new TextEncoder();
	const data = encoder.encode(text);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

// Función para generar contraseña específica del sitio
async function generateSitePassword(masterPassword, domain, length = 16) {
	if (!masterPassword || !domain) return "";

	const salt = new TextEncoder().encode(domain + ":" + length);
	const password = new TextEncoder().encode(masterPassword);

	// Importar la contraseña como clave
	const key = await crypto.subtle.importKey("raw", password, "PBKDF2", false, [
		"deriveBits",
	]);
	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			salt: salt,
			iterations: 600000,
			hash: "SHA-256",
		},
		key,
		256 // 32 bytes
	);

	// Convertir a hex
	const hashArray = Array.from(new Uint8Array(derivedBits));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	// Generar contraseña
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
	let sitePassword = "";

	for (let i = 0; i < length; i++) {
		const index = parseInt(hashHex.substr(i * 2, 2), 16) % chars.length;
		sitePassword += chars[index];
	}

	return sitePassword;
}

// Variables globales para el background script
let universalPassword = "";
let lengthPassword = 16;

// Inicializar las variables desde el storage
browser.storage.session
	.get(["universalPassword", "lengthPassword"])
	.then((result) => {
		if (result.universalPassword) {
			universalPassword = result.universalPassword;
		}
		if (result.lengthPassword) {
			lengthPassword = result.lengthPassword;
		}
	});

// Escuchar cambios en el storage para mantener las variables actualizadas
browser.storage.onChanged.addListener((changes, namespace) => {
	if (namespace === "session") {
		if (changes.universalPassword) {
			universalPassword = changes.universalPassword.newValue || "";
			sendPassword();
		}
		if (changes.lengthPassword) {
			lengthPassword = changes.lengthPassword.newValue || 16;
			sendPassword();
		}
	}
});

async function sendPassword() {
	browser.tabs.query({}, async (tabs) => {
		for (const tab of tabs) {
			try {
				const domain = new URL(tab.url).hostname;
				if (!domain) continue;
				const sitePassword = await generateSitePassword(
					universalPassword,
					domain,
					lengthPassword
				);
				console.log(sitePassword);
				browser.tabs
					.sendMessage(tab.id, {
						action: "updatePassword_Hashsey",
						password: sitePassword,
					})
					.catch(() => {
						// Ignorar errores si el tab no tiene content script
					});
			} catch (error) {
				console.log("Error procesando tab:", error);
			}
		}
	});
}

// Manejar mensajes desde content scripts
browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.action === "requestPassword_Hashsey") {
		try {
			// Obtener el dominio desde la URL del tab
			let domain = "";
			if (sender && sender.tab && sender.tab.url) {
				domain = new URL(sender.tab.url).hostname;
			}

			const sitePassword = await generateSitePassword(
				universalPassword,
				domain,
				lengthPassword
			);
			browser.tabs
				.sendMessage(sender.tab.id, {
					action: "updatePassword_Hashsey",
					password: sitePassword,
				})
				.catch(() => {
					// Ignorar errores si el tab no tiene content script
				});
			sendResponse({ success: true });
		} catch (error) {
			console.error("Error generando contraseña:", error);
			sendResponse({ success: false, error: error.message });
		}
		return true; // Mantener el canal de mensaje abierto para respuesta asíncrona
	}
});
