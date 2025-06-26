// Helper function to heuristically detect login forms
function isAuthForm(form) {
	const passwordInputs = form.querySelectorAll('input[type="password"]');
	if (passwordInputs.length === 0) return false;
	return true;
}

// Escuchar mensajes del popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "updatePassword_Hashsey") {
		handlePasswordUpdate(message.password);
		sendResponse({ success: true });
	}
});
function requestPassword() {
	browser.runtime
		.sendMessage({
			action: "requestPassword_Hashsey",
			data: {},
		})
		.then((response) => {
			if (response && response.success) {
				handlePasswordUpdate(response.password);
			}
		})
		.catch((error) => {});
}
let password = "";
requestPassword();
function handlePasswordUpdate(newPassword) {
	password = newPassword;
	// No need to update button handlers since overlay is created once and uses current password
}
function createFloatingMenu(passwordInput) {
	// Check if menu already exists
	if (document.querySelector(".hashsey-floating-menu")) {
		return;
	}

	// Create floating menu
	const floatingMenu = document.createElement("div");
	floatingMenu.className = "hashsey-floating-menu";
	floatingMenu.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 20px;
		border-radius: 15px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		z-index: 10001;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		transform: translateX(400px);
		transition: transform 0.3s ease;
		min-width: 280px;
	`;

	// Create title
	const title = document.createElement("div");
	title.textContent = getMessage("passwordManagerTitle");
	title.style.cssText = `
		color: white;
		margin: 0 0 15px 0;
		font-size: 16px;
		font-weight: 600;
		text-align: center;
	`;

	// Create fill button
	const fillButton = document.createElement("button");
	fillButton.textContent = getMessage("fillPasswordButton");
	fillButton.style.cssText = `
		background: linear-gradient(45deg, #4CAF50, #45a049);
		color: white;
		border: none;
		padding: 10px 18px;
		margin: 5px 0;
		border-radius: 20px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.3s ease;
		box-shadow: 0 3px 12px rgba(76, 175, 80, 0.3);
		font-family: inherit;
		width: 100%;
	`;

	// Create close button
	const closeButton = document.createElement("button");
	closeButton.textContent = getMessage("closeButton");
	closeButton.style.cssText = `
		background: linear-gradient(45deg, #f44336, #d32f2f);
		color: white;
		border: none;
		padding: 8px 16px;
		margin: 5px 0;
		border-radius: 20px;
		cursor: pointer;
		font-size: 12px;
		font-weight: 500;
		transition: all 0.3s ease;
		box-shadow: 0 3px 12px rgba(244, 67, 54, 0.3);
		font-family: inherit;
		width: 100%;
	`;

	// Add hover effects
	[fillButton, closeButton].forEach((button) => {
		button.addEventListener("mouseenter", () => {
			button.style.transform = "translateY(-2px)";
		});

		button.addEventListener("mouseleave", () => {
			button.style.transform = "translateY(0)";
		});
	});

	// Add click events
	fillButton.addEventListener("click", () => {
		// Check if password is empty or not configured
		if (!password || password.trim() === "") {
			hideFloatingMenu();
			showErrorMessage(passwordInput, "passwordNotConfiguredError");
			return;
		}

		passwordInput.value = password;
		passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
		passwordInput.dispatchEvent(new Event("change", { bubbles: true }));
		hideFloatingMenu();
		showSuccessMessage(passwordInput);
	});

	closeButton.addEventListener("click", hideFloatingMenu);

	function hideFloatingMenu() {
		floatingMenu.style.transform = "translateX(400px)";
		setTimeout(() => {
			if (floatingMenu.parentNode) {
				floatingMenu.parentNode.removeChild(floatingMenu);
			}
		}, 300);
	}

	function showFloatingMenu() {
		document.body.appendChild(floatingMenu);
		setTimeout(() => {
			floatingMenu.style.transform = "translateX(0)";
		}, 10);

		// Close menu when clicking outside (excluding the hashsey button)
		document.addEventListener(
			"click",
			(e) => {
				// Check if the click is on the floating menu, password input, or hashsey button
				const hashseyButton = passwordInput.parentNode?.querySelector(
					'button[type="button"]'
				);
				if (
					!floatingMenu.contains(e.target) &&
					e.target !== passwordInput &&
					e.target !== hashseyButton &&
					!hashseyButton?.contains(e.target)
				) {
					hideFloatingMenu();
				}
			},
			{ once: true }
		);

		// Close menu with Escape key
		const escapeHandler = (e) => {
			if (e.key === "Escape") {
				hideFloatingMenu();
				document.removeEventListener("keydown", escapeHandler);
			}
		};
		document.addEventListener("keydown", escapeHandler);
	}

	// Assemble the menu
	floatingMenu.appendChild(title);
	floatingMenu.appendChild(fillButton);
	floatingMenu.appendChild(closeButton);

	// Store reference to show/hide functions
	passwordInput.hashseyShowFloatingMenu = showFloatingMenu;
	passwordInput.hashseyHideFloatingMenu = hideFloatingMenu;
}

function showSuccessMessage(passwordInput) {
	// Create success message
	const successMsg = document.createElement("div");
	successMsg.textContent = getMessage("passwordFilledSuccess");
	successMsg.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		background: linear-gradient(45deg, #4CAF50, #45a049);
		color: white;
		padding: 15px 20px;
		border-radius: 10px;
		box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
		z-index: 10001;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		font-weight: 500;
		transform: translateX(400px);
		transition: transform 0.3s ease;
	`;

	document.body.appendChild(successMsg);

	// Animate in
	setTimeout(() => {
		successMsg.style.transform = "translateX(0)";
	}, 10);

	// Remove after 3 seconds
	setTimeout(() => {
		successMsg.style.transform = "translateX(400px)";
		setTimeout(() => {
			if (successMsg.parentNode) {
				successMsg.parentNode.removeChild(successMsg);
			}
		}, 300);
	}, 3000);
}

function showErrorMessage(passwordInput, messageKey) {
	// Create error message
	const errorMsg = document.createElement("div");
	errorMsg.textContent = getMessage(messageKey);
	errorMsg.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		background: linear-gradient(45deg, #f44336, #d32f2f);
		color: white;
		padding: 15px 20px;
		border-radius: 10px;
		box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
		z-index: 10001;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		font-weight: 500;
		transform: translateX(400px);
		transition: transform 0.3s ease;
	`;

	document.body.appendChild(errorMsg);

	// Animate in
	setTimeout(() => {
		errorMsg.style.transform = "translateX(0)";
	}, 10);

	// Remove after 4 seconds (longer than success message)
	setTimeout(() => {
		errorMsg.style.transform = "translateX(400px)";
		setTimeout(() => {
			if (errorMsg.parentNode) {
				errorMsg.parentNode.removeChild(errorMsg);
			}
		}, 300);
	}, 4000);
}

function setupPasswordField(passwordInput) {
	// Check if already setup or hidden
	if (passwordInput.hashseySetup || passwordInput.hashseyHidden) {
		return;
	}

	// Create wrapper container for the password field
	const wrapper = document.createElement("div");
	wrapper.style.cssText = `
		position: relative;
		display: inline-block;
		width: ${passwordInput.offsetWidth || passwordInput.style.width || "100%"};
	`;

	// Insert wrapper before the input and move input inside wrapper
	passwordInput.parentNode.insertBefore(wrapper, passwordInput);
	wrapper.appendChild(passwordInput);

	// Add padding to the input to make space for the button
	const originalPaddingRight =
		window.getComputedStyle(passwordInput).paddingRight;
	const paddingValue = parseInt(originalPaddingRight) || 8;
	passwordInput.style.paddingRight = `${paddingValue + 40}px`;

	// Create the button with Hashsey icon
	const hashseyButton = document.createElement("button");
	hashseyButton.type = "button";
	hashseyButton.innerHTML = `
		<svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
			<path d="M601.132289 280.136049zM609.708353 328.125554c0 0.109556 0.006143 0.218088 0.006143 0.329691v-0.097269c0.001024-0.076791-0.006143-0.154607-0.006143-0.232422zM608.734638 311.924616c0.086006 0.751532 0.146416 1.518422 0.222183 2.272002-0.0686-0.75358-0.135153-1.52047-0.222183-2.272002zM607.291983 302.654359c0.198634 1.05153 0.396244 2.099989 0.570304 3.153567-0.169965-1.057674-0.37167-2.102037-0.570304-3.153567zM594.771914 351.958533v-29.311789c0-55.055338-31.452733-103.588526-76.550787-132.213289 37.777273 18.351097 68.351513 50.303486 82.67874 89.075976-22.708753-61.619467-86.388277-106.076567-154.874942-106.076567-85.564049 0-166.619931 69.361064-166.61993 154.926136v209.975331h37.182395V337.014926c0-65.544019 50.127378-118.673429 115.66423-118.673428 21.102277 0 35.158174 5.537172 52.227366 15.196506 44.810341 15.838482 76.924504 58.550882 76.924505 108.78372v21.51695c0 7.129314 3.907146 13.434399 9.90609 17.349737 13.069896-0.851873 23.462332-13.59003 23.462333-29.229878zM609.376614 319.071336c0.054266 0.786344 0.101365 1.572688 0.14232 2.363127-0.040955-0.790439-0.09215-1.576783-0.14232-2.363127zM603.191323 286.254787zM605.85752 295.830163c0.275425 1.159038 0.51911 2.327291 0.775081 3.495545-0.249828-1.168253-0.499656-2.33753-0.775081-3.495545z" fill="#667eea"/>
			<path d="M680.196714 819.348873c0 17.235062-12.87331 31.21212-28.751724 31.21212H282.41317c-15.880461 0-28.756843-13.976035-28.756844-31.21212V481.230198c0-17.237109 12.876382-31.209049 28.756844-31.209048h369.03182c15.878414 0 28.751724 13.971939 28.751724 31.209048v338.118675z" fill="#FDD72C"/>
		</svg>
	`;
	hashseyButton.style.cssText = `
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
		width: 32px;
		height: 32px;
		border: none;
		background: rgba(128, 128, 128, 0.3);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.2s ease;
		z-index: 1000;
	`;

	// Add hover effects to the button
	hashseyButton.addEventListener("mouseenter", () => {
		hashseyButton.style.backgroundColor = "rgba(128, 128, 128, 1)";
		hashseyButton.style.transform = "translateY(-50%) scale(1.1)";
	});

	hashseyButton.addEventListener("mouseleave", () => {
		hashseyButton.style.backgroundColor = "rgba(128, 128, 128, 0.3)";
		hashseyButton.style.transform = "translateY(-50%) scale(1)";
	});

	// Append button to wrapper
	wrapper.appendChild(hashseyButton);

	// Create the floating menu for this input
	createFloatingMenu(passwordInput);

	// Add click event to the button to show floating menu
	hashseyButton.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();

		// Don't show menu if this field has been hidden
		if (passwordInput.hashseyHidden) {
			return;
		}

		if (passwordInput.hashseyShowFloatingMenu) {
			passwordInput.hashseyShowFloatingMenu();
		}
	});

	// Mark as setup
	passwordInput.hashseySetup = true;
}

// Find all forms in the page
const forms = document.querySelectorAll("form");

// Filter forms that look like login forms
const authForms = Array.from(forms).filter(isAuthForm);

// Example: log the login forms to the console
authForms.forEach((form, idx) => {
	const passwordInput = form.querySelector('input[type="password"]');
	if (passwordInput) {
		setupPasswordField(passwordInput);
	}
});

// Also handle dynamically added password fields
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const passwordInputs = node.querySelectorAll
					? node.querySelectorAll('input[type="password"]')
					: [];
				passwordInputs.forEach(setupPasswordField);

				// Check if the node itself is a password input
				if (node.matches && node.matches('input[type="password"]')) {
					setupPasswordField(node);
				}
			}
		});
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
});
