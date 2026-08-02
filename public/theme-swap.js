document.addEventListener('astro:before-swap', function (e) {
	var theme = document.documentElement.getAttribute('data-theme')
	if (!theme) return
	e.newDocument.documentElement.setAttribute('data-theme', theme)
	var meta = e.newDocument.getElementById('theme-color-meta')
	if (meta) meta.content = theme === 'dark' ? '#0f0f0f' : '#ffffff'
})
