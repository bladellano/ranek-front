<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div
        v-for="(compra, index) in compras"
        :key="index"
        class="produtos-wrapper"
      >
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span>Vendedor:</span> {{ compra.vendedor_id }}
          </p>
        </ProdutoItem>
      </div>
    </div>
    <PaginaCarregando v-else/>
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services";
import { mapState } from "vuex";
export default {
  name: "UsuarioCompras",
  components: {
    ProdutoItem,
  },
  data() {
    return {
      compras: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getCompras() {
      api.get(`/transacao?tipo=comprador_id`).then((res) => {
        this.compras = res.data;
      });
    },
  },
  watch: {
    login() {
      this.getCompras();
    },
  },
  created() {
    if (this.login) {
      this.getCompras();
    }
  },
};
</script>

<style scoped>
.produtos-wrapper {
  margin-bottom: 40px;
}
.vendedor span {
  color: #e80;
}
h2 {
  margin-bottom: 20px;
}
</style>