;(function () {
	var THEME_COLORS = { light: '#ffffff', dark: '#0f0f0f' }
	function applyTheme(theme) {
		document.documentElement.setAttribute('data-theme', theme)
		var meta = document.getElementById('theme-color-meta')
		if (meta) meta.content = THEME_COLORS[theme] || THEME_COLORS.light
	}
	window.__applyTheme = applyTheme
	applyTheme(localStorage.getItem('theme') || 'light')
	document.documentElement.classList.add('js')
})()
