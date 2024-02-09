<template>
  <div v-if="!isCookieAccepted && !hiddenCookieNotice" class="cookie-notice">
    <div v-if="!showPolicy">
      <p>
        Nós usamos cookies para melhorar sua experiência de navegação no portal.
        Ao utilizar este site, você concorda com a política de monitoramento de
        cookies e uso de dados. Para ter mais informações sobre como isso é
        feito, acesse
        <a @click="togglePolicy">Política de Cookies e Uso de Dados</a>.<br />Se
        concorda, clique em ACEITO.
      </p>
      <q-btn @click="acceptCookies" color="primary" label="ACEITO" />
    </div>

    <div v-if="showPolicy" class="policy-container">
      <CookiePrivacyPolicy></CookiePrivacyPolicy>
      <div class="button-container">
        <q-btn @click="acceptCookies" color="primary" label="ACEITO" />
        <q-btn @click="togglePolicy" color="grey" label="Fechar" />
      </div>
    </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import { ref } from "vue";
import CookiePrivacyPolicy from "components/CookiesPrivacyPolicy.vue";

export default {
  components: {
    CookiePrivacyPolicy,
  },
  setup() {
    const showPolicy = ref(false);

    const isCookieAccepted = VueCookies.get("cookiesAccepted") === "true";

    const hiddenCookieNotice = ref(false);

    const acceptCookies = () => {
      VueCookies.set("cookiesAccepted", true, "365d");
      hiddenCookieNotice.value = true;
    };

    const togglePolicy = () => {
      showPolicy.value = !showPolicy.value;
    };

    return {
      showPolicy,
      hiddenCookieNotice,
      isCookieAccepted,
      acceptCookies,
      togglePolicy,
    };
  },
};
</script>

<style scoped>
.cookie-notice {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 600px;
  background-color: #f8f8f8;
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 99999;
}

.cookie-notice p a {
  color: #007bff;
  cursor: pointer;
}

.policy-container {
  margin-top: 10px;
}

.button-container {
  margin-top: 10px; /* Adapte conforme necessário */
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
}

.button-container .q-btn {
  margin-right: 20px !important; /* Adapte conforme necessário para o espaçamento desejado entre os botões */
}
</style>
