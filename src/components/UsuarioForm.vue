<template>
  <div>
    <form autocomplete="off">
      <label for="nome">Nome</label>
      <input type="text" id="nome" name="nome" v-model="nome" />

      <label for="email">Email</label>
      <input type="text" id="email" name="email" v-model="email" />

      <label for="senha">Senha</label>
      <input type="password" id="senha" name="senha" v-model="senha" />

      <label for="cep">Cep</label>
      <input
        type="text"
        id="cep"
        name="cep"
        v-model="cep"
        @keyup="preencherCep"
      />

      <label for="rua">Rua</label>
      <input type="text" id="rua" name="rua" v-model="rua" />

      <label for="numero">Número</label>
      <input type="text" id="numero" name="numero" v-model="numero" />

      <label for="bairro">Bairro</label>
      <input type="text" id="bairro" name="bairro" v-model="bairro" />

      <label for="cidade">Cidade</label>
      <input type="text" id="cidade" name="cidade" v-model="cidade" />

      <label for="estado">Estado</label>
      <input type="text" id="estado" name="estado" v-model="estado" />

      <div class="button">
        <slot />
      </div>
    </form>
  </div>
</template>

<script>
import { mapFields } from "@/helpers";

import { getCep } from "@/services";

export default {
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
        "bairro",
        "rua",
        "cep",
        "numero",
        "cidade",
        "estado",
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO",
    }),
  },
  methods: {
    preencherCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then((res) => {
          this.rua = res.data.logradouro;
          this.bairro = res.data.bairro;
          this.estado = res.data.uf;
          this.cidade = res.data.localidade;
        });
      }
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}
.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>