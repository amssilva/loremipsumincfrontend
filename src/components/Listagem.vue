<template>
  <div>
    <b-button variant="info" size="lg" class="mt-2 mb-4" :disabled="selected==null" v-b-modal.modalSimulacao>Simular Investimento</b-button>
    
    <b-modal id="modalSimulacao" title="Simular Investimento" hide-footer>
      <b-form-group
        label="Valor:"
        label-for="nested-valor"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-valor" type="number" v-model="valorInvestimento"></b-form-input>
      </b-form-group>
      <b-row align-h="end">
        <b-col cols="auto">
          <b-button variant="success" @click="simular" >Simular</b-button>
        </b-col>
      </b-row>
    </b-modal>
    
    <b-table show-empty
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >

      <template #empty>
        <b-row align-h="center">
          <b-col cols="auto">
            <h4 v-if="items!=null">Nenhum projeto encontrado.</h4>
            <b-spinner v-else label="Loading..."></b-spinner>
          </b-col>
        </b-row>
      </template>

      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>

      <template #cell(risco)="data">
        <b-badge v-if="data.value == 0" pill variant="success">Baixo</b-badge>
        <b-badge v-if="data.value == 1" pill variant="warning">Médio</b-badge>
        <b-badge v-if="data.value == 2" pill variant="danger">Alto</b-badge>
      </template>

      <template #cell(data_inicio)="data">
        {{getData(data.value)}}
      </template>

      <template #cell(data_termino)="data">
        {{getData(data.value)}}
      </template>
    </b-table>
    <p>
      <b-button variant="success" size="sm" @click="cadastrar" class="mr-2">Cadastrar</b-button>
      <b-button variant="primary" size="sm" @click="editar" :disabled="selected==null" class="mr-2">Editar</b-button>
      <b-button variant="danger" size="sm" :disabled="selected==null" v-b-modal.modalExcluir>Deletar</b-button>
    </p>
    <b-modal id="modalExcluir" title="Atenção" @ok="deletar">
      Deseja realmente remover esse item?
    </b-modal>

  </div>
</template>

<script>
  import axios from './http';
  import utils from './utils';
  import moment from 'moment';

  export default {
    data() {
      return {
        fields: [{ key: 'selected', label: '' },
          { key: 'nome', label: 'Nome' },
          { key: 'data_inicio', label: 'Inicio' },
          { key: 'data_termino', label: 'Termino' },
          { key: 'valor', label: 'Valor' },
          { key: 'risco', label: 'Risco' },
          { key: 'participantes', label: 'Participantes' }
        ],
        items: null,
        selectMode: 'single',
        selected: null,
        valorInvestimento: null
      }
    },
    created(){
      axios.get(`${utils.getServiceUrl()}/projetos/`)
        .then((response) =>{
          this.items=response.data
        })
        .catch(() =>{
          this.$bvToast.toast('Sistema', {title: 'Erro',variant: 'danger',solid: true})
        })
    },
    methods: {
      onRowSelected(items) {
        this.selected = items[0]
      },
      cadastrar() {
        this.$router.push("/cadastrar");
      },
      editar() {
        this.$router.push({name:'Editar',params: {id: this.selected.id}});
      },
      deletar() {
        axios.delete(`${utils.getServiceUrl()}/projetos/${this.selected.id}/`)
          .then(() =>{
            this.$root.$bvToast.toast('Projeto removido com sucesso', {title: 'Notificação',variant: 'success',solid: true})
            location.reload();
          })
          .catch(() =>{
            this.$bvToast.toast('Não foi possivel executar esta ação', {title: 'Erro',variant: 'danger',solid: true})
          })
      },
      simular() {
        if(this.valorInvestimento < this.selected.valor) {
          this.$bvToast.toast('Valor minino do invesmento deve ser: R$' + this.selected.valor, {title: 'Erro',variant: 'danger',solid: true})
        }
        else{
          switch(this.selected.risco){
            case 0:
              this.$bvToast.toast('Retorno do investimento: R$' + this.valorInvestimento*5/100, {title: 'Resultado',variant: 'info',solid: true})
              break;

            case 1:
              this.$bvToast.toast('Retorno do investimento: R$' + this.valorInvestimento*10/100, {title: 'Resultado',variant: 'info',solid: true})
              break;

            case 2:
              this.$bvToast.toast('Retorno do investimento: R$' + this.valorInvestimento*20/100, {title: 'Resultado',variant: 'info',solid: true})
              break;
          }
        }
      },
      getData(data) {
        return moment(data).format('DD/MM/YYYY');
      }
    }
  }
</script>