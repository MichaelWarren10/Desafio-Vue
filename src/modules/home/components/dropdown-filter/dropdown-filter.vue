<template>
	<div class="wrapper">
		<FilterFoundation class="wrapper__button" label="Filtre por status" :active="isActive" @click="isActive = !isActive">
			<template v-slot:left-slot>
				<BaseIcon
					icon="ic_filter_list"
					colors="currentColor"
				/>
			</template>
		</FilterFoundation>
		<div v-if="isActive" class="wrapper__dropdown">
			<ul style="list-style:none;">
				<li v-for="(option, index) in options" :key="index">
					<Checkbox :value="option.text" v-model="option.checked">{{ option.text }}</Checkbox>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FilterFoundation, BaseIcon, Checkbox } from '@warrenbrasil/nebraska-web';

@Component({
	components: {
		FilterFoundation,
		BaseIcon,
		Checkbox
	}
})
export default class DropdownFilter extends Vue {
	private isActive = false;
	private options = [
		{
			text: 'Concluído',
			checked: false
		}, {
			text: 'Processando',
			checked: false
		}, {
			text: 'Processado',
			checked: false
		}
	]
}
</script>

<style scoped>
	.wrapper {
		margin: 0;
		position: relative;
	}

	.wrapper__button {
		margin: 0 0 0 20px;
		height: 64px;
		border-radius: 4px;
		border: 1px solid var(--base-over-disabled);
		width: 220px;
	}

	@keyframes go-back {
		from {
			transform: translateY(-71px);
			opacity: 0;
		}

		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.wrapper__dropdown {
		background-color: #fff;
		width: 220px;
		margin: 0 -20px 0 0;
		position: absolute;
		top: 80px;
		border-radius: 4px;
		border: 1px solid var(--base-over-disabled);
		animation: go-back .5s;
	}

	.wrapper__dropdown::before {
		content: '';
		display: inline-block;
		border-color: var(--base-over-disabled);
		border-width: 0 1px 1px 0;
		border-style: solid;
		padding: 6px;
		background-color: white;
		transform: rotate(-135deg);
		-webkit-transform: rotate(-135deg);
		display: inline-block;
		left: calc(50% - 9px);
		top: -7px;
		position: absolute;
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
