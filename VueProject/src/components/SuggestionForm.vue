<template>
  <q-card
    class="q-pt-none"
    style="width: 100%; background-color: transparent"
    flat
  >
    <q-card-section>
      <!-- Campo de entrada de texto -->
      <q-input
        v-model="suggestion"
        label="ESCREVA AQUI SUA SUGESTÃO"
        type="textarea"
        :max-height="150"
        :rules="suggestionRules"
        @input="updateCharacterCount"
        @keyup="updateCharacterCount"
        ref="suggestionInput"
      />
      <!-- Contador de caracteres restantes -->
      <q-card-actions align="right">
        <span> {{ characterCount }} caracteres restantes </span>
      </q-card-actions>
    </q-card-section>
    <q-card-section>
      <!-- Opção para sugestão anônima -->
      <q-toggle v-model="anonymous" label="Enviar anonimamente" />
    </q-card-section>

    <q-card-section>
      <!-- Campo de e-mail -->
      <q-input
        v-model="email"
        label="E-mail"
        type="email"
        :rules="emailRules"
        :disable="anonymous"
        v-if="!anonymous"
      />
      <!-- Campo de telefone -->
      <q-input
        v-model="phone"
        label="Telefone"
        type="tel"
        :rules="phoneRules"
        :disable="anonymous"
        v-if="!anonymous"
      />
    </q-card-section>

    <!-- Botões de ação -->
    <div style="width: 100%">
      <div id="app" ref="appRef" style="float: left !important">
        <VueTurnstile :site-key="sitekey" v-model="token" />
      </div>
      <div style="float: right !important">
        <q-btn
          label="Salvar"
          @click="saveSuggestion"
          color="primary"
          size="xl"
          style="margin-right: 20px"
          :loading="showLoading()"
        >
        </q-btn>
        <q-btn
          label="Limpar"
          @click="clearSuggestion"
          color="grey-6"
          size="xl"
        />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import VueTurnstile from "vue-turnstile";
import { useStore } from "../stores/store";

import axios from "axios";

export default {
  name: "SuggestionForm",
  components: {
    VueTurnstile,
  },
  setup() {
    const store = useStore();
    const sitekey = store.keys.TURNSTILE;
    const anonymous = ref(false);
    const suggestion = ref("");
    const email = ref("");
    const phone = ref("");
    const maxCharacters = ref(1000);
    const characterCount = ref(1000);
    const verified = ref(false);
    const enableSaveButton = ref(true);

    return {
      suggestion,
      email,
      phone,
      anonymous,
      maxCharacters,
      characterCount,
      enableSaveButton,
      token: "",
      sitekey,
      verified,
      suggestionRules: [(v) => !!v || "É necessário preencher esse campo"],
      emailRules: [
        (v) => !!v || "Informe seu E-mail",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      phoneRules: [
        (v) => !!v || "Informe seu Telefone",
        (v) => /^\d{10}$/.test(v) || "Telefone deve ter 10 dígitos",
      ],
    };
  },
  methods: {
    updateCharacterCount() {
      this.characterCount = this.maxCharacters - this.suggestion.length;
      if (this.characterCount < 0) {
        this.suggestion = this.suggestion.slice(0, this.maxCharacters);
        this.characterCount = 0;
      }
    },
    clearSuggestion() {
      this.suggestion = "";
      this.email = "";
      this.phone = "";
      this.anonymous = false;
      this.updateCharacterCount();
      this.$refs.appRef.classList.remove("margin-red");
      this.$refs.suggestionInput.$el.classList.remove("margin-red");
      this.enableSaveButton = true;
    },
    disableLoading() {
      this.enableSaveButton = true;
    },
    showLoading() {
      return !this.enableSaveButton;
    },
    saveSuggestion() {
      if (!(this.token.length > 0)) this.verified = false;
      else this.verified = true;
      if (!this.verified) {
        this.$refs.appRef.classList.add("margin-red");
        return;
      }
      if (this.$refs.suggestionInput.validate()) {
        this.enableSaveButton = false;
        this.$emit(
          "save-clicked",
          this.suggestion,
          this.anonymous === true ? "" : this.email,
          this.anonymous === true ? "" : this.phone,
          this.token
        );
        //this.clearSuggestion();
      } else {
        this.$refs.suggestionInput.$el.classList.add("margin-red");
        return;
      }
    },
  },
};
</script>

<style scoped>
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
