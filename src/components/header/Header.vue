<template>
	<NavBar class="nav">
		<BaseIcon slot="left" icon="ic_arrow_left" />
		<span slot="center">MOVIMENTAÇÕES</span>
	</NavBar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NavBar, BaseIcon } from '@warrenbrasil/nebraska-web';

@Component({
	components: {
    NavBar,
		BaseIcon
  }
})
export default class Header extends Vue {}
</script>

<style scoped>
.nav {
	background-color: var(--light-brand-primary);
	color: #fff;
}
</style>
