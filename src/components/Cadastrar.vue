<template>
  <div>
    <b-card bg-variant="light">
      <b-form @submit="salvar">
        <b-form-group
          label-cols-lg="3"
          label="Novo Projeto"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label="Nome:"
            label-for="nested-nome"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input required id="nested-nome" v-model="model.nome"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Data de inicio:"
            label-for="nested-data_inicio"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input required id="nested-data_inicio" type="date" v-model="model.data_inicio"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Data de termino:"
            label-for="nested-data_termino"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input required id="nested-data_termino" type="date" v-model="model.data_termino"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Valor:"
            label-for="nested-valor"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input required id="nested-valor" type="number" v-model="model.valor"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Risco:"
            label-cols-sm="3"
            label-align-sm="right"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio-group required v-model="model.risco"
              class="pt-2"
              :options="riskOptions"
              :aria-describedby="ariaDescribedby"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group
            label="Participantes:"
            label-for="nested-participantes"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input required id="nested-participantes" v-model="model.participantes"></b-form-input>
          </b-form-group>
        </b-form-group>
        <b-container class="bv-example-row">
          <b-row>
            <b-col cols="10">
              <b-button @click="volta()">Voltar</b-button>
            </b-col>
            <b-col cols="2">
              <b-button variant="success" type="submit">Confirmar</b-button>
            </b-col>
          </b-row>
        </b-container>       
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from './http';
import utils from './utils';

export default {
  name: 'Cadastrar',
  data() {
    return {
      model: {
        nome: null,
        data_inicio: null,
        data_termino: null,
        valor: null,
        risco: null,
        participantes: null
      },
      riskOptions: [
        { text: 'Baixo', value: 0 },
        { text: 'Médio', value: 1 },
        { text: 'Alto', value: 2 },
      ]
    }
  },
  methods:{
    volta(){
      this.$router.push("/");
    },
    salvar(event) {
      event.preventDefault();
      axios.post(`${utils.getServiceUrl()}/projetos/`, this.model)
        .then(() =>{
          this.$root.$bvToast.toast('Projeto criado com sucesso', {title: 'Notificação',variant: 'success',solid: true})
          this.$router.push('/');
        })
        .catch(() =>{
          this.$bvToast.toast('Não foi possivel executar esta ação', {title: 'Erro',variant: 'danger',solid: true})
        })
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
