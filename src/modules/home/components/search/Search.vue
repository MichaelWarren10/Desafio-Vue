<template>
	<InputText 
		class="wrapper__input" 
		placeholder="Busque pelo título" 
		leadingIcon="ic_search" 
		@input="filterByTitle($event, items)"/>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { InputText } from '@warrenbrasil/nebraska-web';
import { IFilterTextEmiterComponent } from '../../interfaces/filter-by-text';

@Component({
	components: {
		InputText
	}
})
export default class Search extends Vue {
	@Prop({type: Array, required: true}) 
	private items!: any[];

	@Emit('filter-by-title')
	private filterByTitle(text: string, items: any[]): IFilterTextEmiterComponent {
		return {text, items};
	}
}
</script>

<style scoped>
@media (max-width: 740px) { 
	.wrapper__input {
		width: 100%;
	}
}
</style>
