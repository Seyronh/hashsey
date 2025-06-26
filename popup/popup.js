// Inicializar localización
document.addEventListener("DOMContentLoaded", () => {
	// Localizar placeholder específicamente
	const inputField = document.getElementById("inputField");
	if (inputField) {
		inputField.placeholder = browser.i18n.getMessage(
			"universalPasswordPlaceholder",
		);
	}

	// Inicializar funcionalidad del botón de toggle password
	initTogglePassword();
});

// Función para inicializar el toggle de contraseña
function initTogglePassword() {
	const toggleButton = document.getElementById("togglePassword");
	const passwordInput = document.getElementById("inputField");
	const eyeIcon = document.getElementById("eyeIcon");
	const eyeOffIcon = document.getElementById("eyeOffIcon");

	if (toggleButton && passwordInput && eyeIcon && eyeOffIcon) {
		// Localizar el título del botón
		toggleButton.title = browser.i18n.getMessage("togglePasswordVisibility");

		toggleButton.addEventListener("click", () => {
			if (passwordInput.type === "password") {
				// Mostrar contraseña
				passwordInput.type = "text";
				eyeIcon.style.display = "none";
				eyeOffIcon.style.display = "block";
			} else {
				// Ocultar contraseña
				passwordInput.type = "password";
				eyeIcon.style.display = "block";
				eyeOffIcon.style.display = "none";
			}
		});
	}
}

const inputField = document.getElementById("inputField");
const lengthInput = document.getElementById("lengthInput");

// Variables globales
let universalPassword = "";
let lengthPassword = 16;

// Cargar valores guardados al inicializar
browser.storage.session
	.get(["universalPassword", "lengthPassword"])
	.then((result) => {
		if (result.universalPassword) {
			inputField.value = result.universalPassword;
			universalPassword = result.universalPassword;
		}
		if (result.lengthPassword) {
			lengthPassword = result.lengthPassword;
			lengthInput.value = lengthPassword;
		}
	});

async function updatelength() {
	lengthPassword = parseInt(this.value, 10) || 16;
}
async function updatePassword() {
	universalPassword = this.value;
}

async function save() {
	await browser.storage.session.set({
		universalPassword: universalPassword,
		lengthPassword: lengthPassword,
	});
}

inputField.addEventListener("input", updatePassword);
lengthInput.addEventListener("input", updatelength);
lengthInput.addEventListener("change", updatelength);
inputField.addEventListener("blur", save);
lengthInput.addEventListener("blur", save);
