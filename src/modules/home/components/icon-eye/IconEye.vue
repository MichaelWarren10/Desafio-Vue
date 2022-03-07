<template>
	<td class="icon">
		<BaseIcon class="icon__eye" icon="ic_eye_on" colors="var(--light-brand-primary)"/>
	</td>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BaseIcon } from '@warrenbrasil/nebraska-web';

@Component({
	components: {
		BaseIcon
	}
})
export default class IconEye extends Vue {}
</script>

<style scoped>
.icon {
	vertical-align: middle;
}

.icon__eye {
	cursor: pointer;
}
</style>
