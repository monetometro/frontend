<template>
  <div id="app">
    <q-header>
      <q-toolbar class="bg-grey-4">
        <q-toolbar-title style="color: #000; text-transform: uppercase">
          <q-icon name="schedule" size="md"></q-icon> Dados do Evento
        </q-toolbar-title>

        <q-btn icon="close" @click="closeDrawer()" color="grey-7">
          <q-tooltip> Fechar</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    <div class="header-space"></div>
    <q-form>
      <div class="q-pa-md">
        <q-card class="q-ma-md">
          <q-card-section>
            <DatetimePicker
              v-model="DTI"
              @update:modelValue="updateDTI"
              label="Data de Início do Evento (DTI)"
            />
          </q-card-section>
        </q-card>

        <q-card class="q-ma-md">
          <q-card-section>
            <DatetimePicker
              v-model="DTE"
              @update:modelValue="updateDTE"
              label="Data de Término do Evento (DTE)"
            />
          </q-card-section>
        </q-card>

        <q-card class="q-ma-md">
          <q-card-section>
            <div>
              <q-input
                label="Email do participante"
                v-model="newParticipant.email"
                @blur="validateEmail"
              >
                <template v-slot:before>
                  <q-icon name="alternate_email" />
                </template>
              </q-input>
              <q-input
                label="Remuneração mensal média (RMM)"
                v-model="newParticipant.value"
                type="number"
              >
                <template v-slot:before>
                  <q-icon name="payments" />
                </template>
              </q-input>
              <div class="addButton">
                <q-btn @click="addParticipant" color="amber" text-color="black">
                  <q-icon left size="2em" name="manage_history" />
                  <div>Adicionar Participante</div>
                </q-btn>
              </div>
            </div>
            <q-table
              rows-per-page-label="Registros por página"
              :rows-per-page-options="[5, 10, 15]"
              v-model:pagination="pagination"
              :rows="participants"
              :columns="columns"
              row-key="id"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="email" :props="props">
                    {{ props.row.email }}
                  </q-td>
                  <q-td key="value" :props="props">
                    {{ props.row.value }}
                  </q-td>
                  <q-td auto-width>
                    <q-btn
                      round
                      tooltip="teste"
                      icon="edit"
                      color="blue-4"
                      size="12px"
                      @click="editParticipant(props.row)"
                    >
                      <q-tooltip> Editar participante </q-tooltip> </q-btn
                    >&nbsp;
                    <q-btn
                      round
                      icon="delete"
                      color="negative"
                      size="12px"
                      @click="deleteParticipant(props.row)"
                    >
                      <q-tooltip> Excluir participante </q-tooltip>
                    </q-btn>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <div v-if="loading" class="loading-overlay">
              <q-spinner-gears color="primary" size="60px" />
            </div>
          </q-card-section>
        </q-card>

        <q-card class="q-ma-md">
          <q-card-section>
            <q-input label="Custo Médio por Hora (CMH)" v-model="CMH" readonly>
              <template v-slot:before>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </div>
      <div ref="appRef">
        <VueTurnstile :site-key="sitekey" v-model="token" />
      </div>

      <div><br /><br /></div>
      <q-btn
        type="button"
        size="lg"
        color="primary"
        @click="save()"
        :loading="loadingButton"
        >Salvar Evento</q-btn
      >
      <div class="mobile-only"><br /><br /></div>
    </q-form>
  </div>
</template>

<script>
import DatetimePicker from "../components/DatetimePicker.vue";

import { useStore } from "../stores/store";

import { useRoute } from "vue-router";

import { ref } from "vue";

import { useQuasar } from "quasar";

import VueTurnstile from "vue-turnstile";

export default {
  name: "App",
  components: { DatetimePicker, VueTurnstile },
  props: {
    rightDrawerOpen: Boolean,
  },
  setup() {
    const $q = useQuasar();

    const route = useRoute();
    const store = useStore();

    const sitekey = store.keys.TURNSTILE;
    const now = new Date();

    store.parameters.DTI = new Date(route.query.DTI ? route.query.DTI : now);
    store.parameters.DTE = new Date(route.query.DTE ? route.query.DTE : now);
    store.parameters.CMH = parseFloat(route.query.CMH ?? 0) || 0;

    const DTI = ref(new Date(route.query.DTI ? route.query.DTI : now));
    const DTE = ref(new Date(route.query.DTE ? route.query.DTE : now));
    const CMH = ref(parseFloat(route.query.CMH ?? 0) || 0); // Garante que CMH seja um número

    const participants = ref(
      route.query.ATT ? JSON.parse(decodeURIComponent(route.query.ATT)) : []
    );

    const loading = ref(false);
    const verified = ref(false);
    const loadingButton = ref(false);

    return {
      DTE,
      DTI,
      CMH,
      store,
      token: "",
      sitekey,
      verified,
      showMessage(message, colorName, noTimeout) {
        $q.notify({
          message: message,
          color: colorName || "positive",
          position: "top-right",
          timeout: noTimeout ? 0 : 5000,
          progress: true,
          html: true,
          icon:
            colorName == "positive"
              ? "check_circle"
              : colorName == "negative"
              ? "error"
              : colorName == "warning"
              ? "warning"
              : "announcement",
          textColor: colorName == "warning" ? "black" : "white",
          actions: [
            {
              label: "X",
              color: "white",
              handler: () => {},
            },
          ],
        });
      },
      loading,
      loadingButton,
      newParticipant: ref({
        email: "",
        value: 0,
      }),
      participants,
      pagination: { sortBy: "email", descending: false },
      columns: [
        {
          name: "email",
          required: true,
          label: "Email",
          align: "left",
          field: "email",
          sortable: true,
        },
        {
          name: "value",
          required: true,
          label: "RMM",
          align: "left",
          field: "value",
          sortable: true,
        },
        { name: "actions", label: "Ações", align: "center", field: "actions" },
      ],
    };
  },
  watch: {
    participants: {
      handler(newParticipants) {
        this.updateParticipants();
      },
      deep: true, // Observar alterações profundas na lista de participantes
    },
  },
  computed: {},

  methods: {
    closeDrawer() {
      this.$emit("closeDrawer", false);
    },
    updateDTI(value) {
      this.DTI = value;
    },
    updateDTE(value) {
      this.DTE = value;
    },
    updateParticipants() {
      this.calcularCMH();

      /*this.$emit(
        "participants-updated",
        this.participants,
        this.CMH,
        this.DTE,
        this.DTI
      );*/
    },
    async validateEmail(emailInput) {
      const email = emailInput.target.value;
      if (email.length == 0) {
        this.showMessage(
          "Necessário informar o Email do participante!",
          "negative"
        );
        return false;
      }

      const emailDomain = email.split("@")[1];

      // Verifica se o domínio do e-mail ou algum subdomínio está na lista
      const isValidDomain = this.store.dataSources.some(
        (item) => emailDomain && emailDomain.endsWith(item.org)
      );
      if (!isValidDomain)
        this.showMessage(
          "O domínio do email informado não possui integração.",
          "primary"
        );

      try {
        this.loading = true;

        const response = await this.store.getAPI().getRemuneracao([email]);

        this.newParticipant.value =
          response.data && response.data.length > 0
            ? parseFloat(response.data[0].valor).toFixed(2)
            : "0.00";

        if (this.newParticipant.value > 0)
          this.showMessage(
            "Remuneração mensal média (RMM) atualizada com sucesso!",
            "positive"
          );
        else {
          this.showMessage(
            "Necessário informar Remuneração mensal média (RMM)!",
            "negative"
          );
          this.newParticipant.fail = true;
        }

        return true; // Email is valid
      } catch (error) {
        this.showMessage(error, "negative");
        return false;
      } finally {
        this.loading = false;
      }
    },
    async addParticipant() {
      if (this.newParticipant.email && this.newParticipant.value > 0) {
        const existingParticipant = this.participants.find(
          (p) => p.email === this.newParticipant?.email
        );
        if (existingParticipant) {
          // Atualizar o participante existente
          existingParticipant.email = this.newParticipant.email;
          existingParticipant.value = this.newParticipant.value;
        } else {
          // Inserir um novo participante
          this.participants.push({
            id: this.participants.length + 1,
            email: this.newParticipant.email,
            value: this.newParticipant.value,
          });
        }

        this.newParticipant.email = "";
        this.newParticipant.value = 0;
        this.newParticipant.fail = false;

        this.showMessage(
          "Lista de participantes atualizada com sucesso!",
          "positive"
        );
      } else
        this.showMessage(
          "Necessário informar Remuneração mensal média (RMM)!",
          "negative"
        );
    },
    editParticipant(participant) {
      this.newParticipant.email = participant.email;
      this.newParticipant.value = participant.value;
      this.newParticipant.id = participant.id;
    },
    deleteParticipant(participant) {
      const index = this.participants.indexOf(participant);
      if (index !== -1) {
        this.participants.splice(index, 1);
      }
    },

    calcularCMH() {
      const horasUteisNoPeriodo = 168; //média de 21 dias úteis, 8 horas trabalhadas por dia
      if (this.participants.length > 0) {
        const totalSalarios = this.participants.reduce(
          (total, participant) => total + parseFloat("0" + participant.value),
          0
        );

        // Calcula o CMH considerando a quantidade total de horas úteis no período
        this.CMH = (totalSalarios / horasUteisNoPeriodo).toFixed(2);
      } else {
        // Caso não haja participantes, o CMH é 0
        this.CMH = 0;
      }
      this.store.parameters.CMH = this.CMH;
    },

    save() {
      this.updateParticipants();

      if (!(this.token.length > 0)) this.verified = false;
      else this.verified = true;

      var duringNow = this.DTE - this.DTI;
      if (this.DTE < this.DTI || Math.abs(duringNow) <= 0)
        this.showMessage(
          "Informe o período do evento!<br/>DTE precisa ser uma data maior que DTI. ",
          "negative"
        );
      else if (!this.participants || this.participants.length == 0)
        this.showMessage(
          "Informe os participantes do evento!<br/>Depois de preencher o email e o RMM clique no botão ADICIONAR PARTICIPANTE.",
          "negative"
        );
      else if (!this.verified) {
        this.showMessage(
          "Marque a caixa de validação em destaque na página.",
          "negative"
        );
        this.$refs.appRef.classList.add("margin-red");
      } else {
        this.loadingButton = true;
        this.store
          .getAPI()
          .postEvent(this.token, this.participants, this.DTI, this.DTE)
          .then((response) => {
            this.loadingButton = false;
            if (response.data.success) {
              this.showMessage(response.data.message, "positive");

              this.store.parameters.DTE = this.DTE;
              this.store.parameters.DTI = this.DTI;
              this.store.parameters.CMH = this.CMH;

              this.$router
                .push({
                  path: this.$route.path,
                  query: {
                    DTE: this.store.parameters.DTE.toISOString(),
                    DTI: this.store.parameters.DTI.toISOString(),
                    CMH: this.store.parameters.CMH,
                    ATT: encodeURIComponent(JSON.stringify(this.participants)),
                    ID: this.store.parameters.ID,
                  },
                })
                .then(() => {
                  this.$router.go(0);
                });
            } else this.showMessage(response.data.message, "negative");
          })
          .catch((error) => {
            console.error("Error on saving event:", error);
          });
      }
    },
  },
  mounted() {
    if (this.participants.some((el) => el.value == 0)) {
      this.showMessage(
        "Existem participantes sem RMM informado, isso impactará o custo médio apresentado. Verifique os detalhes do evento!",
        "warning",
        true
      );
    }

    this.calcularCMH();
  },
};
</script>

<style scoped>
.addButton {
  padding: 10px 0px 25px 0px !important;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(220, 220, 220, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.top-right {
  color: rgba(231, 118, 26, 0.5);
  float: right;
  animation: global-piscar 6s ease infinite;
  padding-right: 10px;
  font-size: 10pt;
}

.top-right .top-icon {
  font-size: 40px;
}
</style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-space {
  min-height: 50px;
}
@keyframes blink {
  0% {
    border-color: transparent;
  }
  50% {
    border-color: red;
  }
  100% {
    border-color: transparent;
  }
}
.margin-red {
  animation: blink 1.5s infinite; /* Adapte o tempo conforme necessário */
  border: 2px solid transparent;
  border-radius: 5px;
  margin: 10px; /* Adapte a margem conforme necessário */
  transition: border-color 0.5s;
}
</style>
