export const useAppStore = defineStore(
	'App Store',
	() => {
		const count = ref(0)

		return {
			count,

		}
	},
)
