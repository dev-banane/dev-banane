<script setup lang="ts">
defineProps<{
	variant?: 'default' | 'icon' | 'outline' | 'inverted' | 'link';
	size?: 'sm' | 'md';
	href?: string;
	type?: 'button' | 'submit' | 'reset';
	lightMode?: boolean;
}>();

defineOptions({
	inheritAttrs: false
});
</script>

<template>
	<component
		:is="href ? 'a' : 'button'"
		:type="href ? undefined : (type ?? 'button')"
		:href="href"
		class="app-button"
		:class="[
			variant === 'icon' && 'app-button--icon',
			variant === 'icon' && size === 'sm' && 'app-button--icon-sm',
			variant === 'outline' && 'app-button--outline',
			variant === 'inverted' && 'app-button--inverted',
			variant === 'link' && 'app-button--link',
			(!variant || variant === 'default') && 'app-button--default',
			$props.lightMode && 'app-button--light',
			$props.lightMode && variant === 'icon' && 'app-button--icon-light',
			$props.lightMode && variant === 'outline' && 'app-button--outline-light',
			$props.lightMode && variant === 'inverted' && 'app-button--inverted-light',
			$props.lightMode && variant === 'link' && 'app-button--link-light',
		]"
		v-bind="$attrs"
	>
		<slot />
	</component>
</template>

<style scoped>
.app-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	border-radius: 9999px;
	transition: all 0.2s;
	cursor: pointer;
	font-weight: 600;
	text-decoration: none;
	border: none;
}

.app-button--default {
	background-color: #0a0a0a;
	color: white;
	padding: 0.75rem 1.5rem;
	font-size: 0.875rem;
	border-bottom-width: 3px;
	border-bottom-style: solid;
	border-bottom-color: rgb(52 211 153);
}

.app-button--default:hover {
	background-color: rgb(52 211 153);
	border-bottom-color: #0a0a0a;
	color: #0a0a0a;
	opacity: 0.9;
}

.app-button--icon {
	height: 2.75rem;
	width: 2.75rem;
	padding: 0;
	background-color: transparent;
	color: inherit;
	border-bottom-width: 3px;
	border-bottom-style: solid;
	border-bottom-color: rgb(52 211 153);
}

.app-button--icon:hover {
	background-color: rgb(52 211 153);
	border-bottom-color: #0a0a0a;
	color: #0a0a0a;
	opacity: 0.9;
}

.app-button--icon-sm {
	height: 2.25rem;
	width: 2.25rem;
}

.app-button--outline {
	background-color: transparent;
	color: rgba(0, 0, 0, 0.8);
	padding: 0.5rem 0.875rem;
	font-size: 0.875rem;
	border: 2px solid rgba(0, 0, 0, 0.2);
}

.app-button--outline:hover {
	background-color: #0a0a0a;
	border-color: #0a0a0a;
	color: white;
}

.app-button--inverted {
	background-color: rgba(255, 255, 255, 0.05);
	color: white;
	padding: 0.625rem 1.25rem;
	font-size: 0.875rem;
	border: 2px solid rgba(255, 255, 255, 0.3);
}

.app-button--inverted:hover {
	background-color: white;
	border-color: white;
	color: #0a0a0a;
}

.app-button--link {
	background: none;
	border: none;
	color: inherit;
	padding: 0;
	font-size: inherit;
	font-weight: inherit;
	border-radius: 0;
}

.app-button--link:hover {
	opacity: 1;
	color: white;
}

.app-button--light.app-button--default {
	background-color: #fff;
	color: #0a0a0a;
	border-bottom-color: rgb(52 211 153);
}
.app-button--light.app-button--default:hover {
	background-color: rgb(52 211 153);
	border-bottom-color: #fff;
	color: #000;
	opacity: 0.9;
}
.app-button--icon-light {
	background-color: transparent;
	color: inherit;
	border-bottom-color: rgb(52 211 153);
}
.app-button--icon-light:hover {
	background-color: rgb(52 211 153);
	border-bottom-color: #fff;
	color: #fff;
	opacity: 0.9;
}
.app-button--light.app-button--outline,
.app-button--outline-light {
	background-color: transparent;
	color: rgba(255,255,255,0.8);
	border: 2px solid rgba(255,255,255,0.2);
}
.app-button--light.app-button--outline:hover,
.app-button--outline-light:hover {
	background-color: #fff;
	border-color: #fff;
	color: #0a0a0a;
}
.app-button--light.app-button--inverted,
.app-button--inverted-light {
	background-color: rgba(0, 0, 0, 0.05);
	color: #0a0a0a;
	border: 2px solid rgba(0,0,0,0.3);
}
.app-button--light.app-button--inverted:hover,
.app-button--inverted-light:hover {
	background-color: #0a0a0a;
	border-color: #0a0a0a;
	color: #fff;
}
.app-button--light.app-button--link,
.app-button--link-light {
	color: inherit;
	background: none;
	border: none;
	padding: 0;
	font-size: inherit;
	font-weight: inherit;
	border-radius: 0;
}
.app-button--light.app-button--link:hover,
.app-button--link-light:hover {
	opacity: 1;
	color: #0a0a0a;
}
</style>
