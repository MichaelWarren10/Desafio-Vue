<template>
	<FilterFoundation class="wrapper__filter" label="Filtre por status" :active="isActive" @click="isActive = !isActive">
		<template v-slot:left-slot>
			<BaseIcon
				icon="ic_filter_list"
				colors="currentColor"
			/>
		</template>
	</FilterFoundation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FilterFoundation, BaseIcon } from '@warrenbrasil/nebraska-web';

@Component({
	components: {
		FilterFoundation,
		BaseIcon
	}
})
export default class DropdownFilter extends Vue {
	private isActive = false
}
</script>

<style scoped>
	.wrapper__filter {
		margin-left: 20px;
		height: 64px;
		border-radius: 4px;
		border: 1px solid var(--base-over-disabled);
		width: 260px;
	}

	::v-deep {
		margin-right: 15px;
	}

	@media (max-width: 740px) { 
		.wrapper__filter {
			width: 100%;
			margin: 0;
		}
	}
</style>
