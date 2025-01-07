<script setup lang="ts">
const {
	variant = 'primary',
	disabled = false,
	to = null,
} = defineProps<{
	variant?: 'primary'
	disabled?: boolean
	to?: string
}>()

const component = computed(() => {
	if (to) {
		return resolveComponent('NuxtLink')
	}

	return 'button'
})
</script>

<template>
	<component
		:is="component"
		:to="to"
		class="flex select-none items-center justify-center rounded-full font-semibold transition-colors duration-75 py-2 px-4"
		:class="{
			'bg-zinc-100 text-zinc-950 active:enabled:bg-zinc-200': variant === 'primary',
		}"
		:disabled="disabled"
	>
		<slot></slot>
	</component>
</template>
