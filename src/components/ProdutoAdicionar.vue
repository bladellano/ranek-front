<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input type="text" name="nome" id="nome" v-model="produto.nome" />

    <label for="preco">Preço</label>
    <input type="number" name="preco" id="preco" v-model="produto.preco" />

    <label for="fotos">Fotos</label>
    <input type="file" name="fotos" id="fotos" multiple ref="fotos" />

    <label for="descricao">Descrição</label>
    <textarea
      name="descricao"
      id="descricao"
      v-model="produto.descricao"
    ></textarea>

    <input
      class="btn"
      type="submit"
      value="Adicionar Produto"
      @click.prevent="adicionarProduto"
    />
  </form>
</template>

<script>
import { api } from "@/services";
export default {
  name: "ProdutoAdicionar",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false",
      },
    };
  },
  methods: {
    async adicionarProduto(event) {
      
      const button = event.currentTarget;
      button.value = "Adicionando...";
      button.setAttribute("disabled","");

      const produto = this.formatarProduto();
      
      await api.post("/produto", produto);
      await this.$store.dispatch("getUsuarioProdutos");

      button.value = "Adicionar Produto";
      button.removeAttribute("disabled");

    },
    formatarProduto() {
      const form = new FormData();

      const files = this.$refs.fotos.files;

      for (let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append("nome", this.produto.nome);
      form.append("preco", this.produto.preco);
      form.append("descricao", this.produto.descricao);
      form.append("vendido", this.produto.vendido);
      form.append("usuario_id", this.$store.state.usuario.id);

      return form;
    },
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}
.btn {
  grid-column: 2;
}
</style>