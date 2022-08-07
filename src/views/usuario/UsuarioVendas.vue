<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div v-for="(venda, index) in vendas" :key="index" class="vendas-wrapper">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="comprador">
            <span>Comprador:</span> {{ venda.comprador_id }}
          </p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services";
import { mapState } from "vuex";
export default {
  name: "UsuarioVendas",
  components: {
    ProdutoItem,
  },
  data() {
    return {
      vendas: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getVendas() {
      api.get(`/transacao?tipo=vendedor_id`).then((res) => {
        this.vendas = res.data;
      });
    },
  },
  watch: {
    login() {
      this.getVendas();
    },
  },
  created() {
    if (this.login) {
      this.getVendas();
    }
  },
};
</script>

<style scoped>
.vendas-wrapper {
  margin-bottom: 40px;
}
.comprador span {
  color: #e80;
}
.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}
h3 {
  justify-self: end;
  margin: 0;
}
h2 {
  margin-bottom: 20px;
}
</style>