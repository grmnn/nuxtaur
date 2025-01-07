<script setup lang="ts">
const appStore = useAppStore()
</script>

<template>
	<article>
		<h1>Home</h1>
		{{ appStore.count }}

		<AppButton
			variant="primary"
			@click="appStore.count++"
		>
			Increment
		</AppButton>

		<AppButton
			variant="primary"
			@click="appStore.count--"
		>
			Decrement
		</AppButton>
	</article>
</template>
