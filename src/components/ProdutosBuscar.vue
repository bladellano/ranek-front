<template>
  <form action="">
    <input
      placeholder="Buscar..."
      name="busca"
      id="busca"
      type="text"
      v-model="busca"
    />
    <input
      @click.prevent="buscarProdutos"
      type="submit"
      value="Buscar"
      id="lupa"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    buscarProdutos() {
      this.$router.push({ query: { q: this.busca } });
    },
  },
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0 10px;
}
#busca {
  width: 100%;
  padding: 20px;
  border: none;
}
#busca:hover,
#busca:focus {
  transform: scale(1.1);
}
#lupa {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: none;
}
</style>