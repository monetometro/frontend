import { defineStore } from "pinia";
import { dom } from "quasar";
import { api } from "boot/axios";

export const useStore = defineStore("store", {
  state: () => ({
    counter: 0,
    keys: { TURNSTILE: process.env.KEY_TURNSTILE },
    parameters: {
      DTE: null,
      DTI: null,
      CMH: null,
      ID: null,
    },
    dataSources: [
      {
        org: "es.gov.br",
        link: "https://dados.es.gov.br",
        icon: "",
        color: "green",
        UF: "Espírito Santo",
      },
      {
        org: "tjes.jus.br",
        link: "http://www.tjes.jus.br/portal-da-transparencia/pessoal/folha-de-pagamento",
        icon: "",
        color: "red",
        UF: "Espírito Santo",
      },
      {
        org: "tcees.tc.br",
        link: "https://dados.es.gov.br",
        icon: "",
        color: "green",
        UF: "Espírito Santo",
      },
      {
        org: "al.es.gov.br",
        link: "https://www.al.es.gov.br/Transparencia",
        icon: "",
        color: "green",
        UF: "Espírito Santo",
      },
    ],
    encodeToBase64(inputString) {
      if (inputString.trim() !== "") {
        try {
          // Convertendo a string para Base64
          return btoa(inputString);
        } catch (error) {
          console.error("Erro ao converter para Base64:", error);
          return "";
        }
      } else {
        console.warn("A string de entrada está vazia.");
        return "";
      }
    },
    getAPI() {
      class MonetometroAPI {
        constructor(state) {
          this.state = state;
          this.gateway = api;
        }
        client() {
          return this.gateway;
        }
        healthCheck() {
          return this.client().get(`${process.env.API_GET_HEALTHCHECK}`);
        }
        async postSuggestion(token, msg, email, phone) {
          let config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          let data = {
            token: this.state.encodeToBase64(token),
            suggestion: {
              message: msg,
              email: email,
              phone: phone,
            },
          };
          return this.client().post(
            `${process.env.API_SAVE_SUGGESTION}`,
            data,
            config
          );
        }
        async postEvent(token, att, dti, dte) {
          let config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          let data = {
            token: this.state.encodeToBase64(token),
            event: {
              participants: att,
              DTI: dti,
              DTE: dte,
            },
          };
          return this.client().post(
            `${process.env.API_SAVE_EVENT}`,
            data,
            config
          );
        }
        async isDomainUp(domain) {
          return this.client().get(
            `${process.env.API_GET_DOMAIN_UP}`.replace("{domain}", domain)
          );
        }
        getRemuneracao(emailArray) {
          let config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          let data = {
            emails: emailArray,
          };
          return this.client().post(
            `${process.env.API_POST_REMUNERACAO}`,
            data,
            config
          );
        }
      }
      return new MonetometroAPI(this);
    },
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
