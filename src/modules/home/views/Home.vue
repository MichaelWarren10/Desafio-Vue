<template>
	<div class="container">
		<Header />
		<Transactions />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from '@/components/header/Header.vue';
import Transactions from '@/modules/home/components/transactions/Transactions.vue';
import Search from '@/modules/home/components/search/Search.vue';

//Exemplo 1 de uso do store
import { namespace } from "vuex-class";
const HomeStoreModule = namespace("HomeModule");

//Exemplo 2 do uso do store
import { HomeModule } from "@/modules/home/store";

@Component({
  components: {
    Header,
		Transactions,
		Search
  },
})
export default class Home extends Vue {
  //Exemplo 1 de uso do store
  @HomeStoreModule.Getter("homeValue") private homeValue!: string;

  //Exemplo 2 do uso do store
  private get getHomeValue() {
    return HomeModule.homeValue;
  }
}
</script>

<style>
</style>
