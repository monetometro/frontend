<!-- DateTimePicker.vue -->
<template>
  <div>
    <q-input v-model="dateTime" :label="label" readonly>
      <template v-slot:before>
        <q-icon name="event" />
      </template>
      <template v-slot:append>
        <q-btn icon="search" round color="primary">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <div id="dvp" class="q-gutter-md">
              <q-date
                v-model="dateString"
                id="dv1"
                mask="YYYY/MM/DD"
                :locale="ptBrLocale"
                class="q-mb-sm"
                @update:model-value="changeDate"
              />

              <q-time
                v-model="timeString"
                id="dv2"
                format24h
                @update:model-value="changeDate"
              />
            </div>

            <q-btn
              label="OK"
              color="primary"
              class="full-width"
              v-close-popup
            />
          </q-popup-proxy>
          <q-tooltip> Selecione uma data </q-tooltip>
        </q-btn>
      </template>
    </q-input>
  </div>
</template>

<script>
import moment from "moment";
import { ref, watch } from "vue";

export default {
  props: {
    label: {
      type: String,
      default: "Date and Time",
    },
    modelValue: {
      type: Date,
      default: null,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const ptBrLocale = {
      days: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
      daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthsShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      firstDayOfWeek: true,
      pluralDay: "dias",
    };
    const date = moment(props.modelValue || new Date());
    const time = ref(date.format("HH:mm"));
    const dateTime = ref(
      "".concat(date.format("DD/MM/YYYY"), " ", date.format("HH:mm"))
    );
    const selectedDatetime = ref(props.modelValue);

    const dateString = ref(date.format("YYYY/MM/DD"));
    const timeString = ref(time);

    return {
      ptBrLocale,
      dateTime,
      pickerModel: false,
      date,
      time,
      dateString,
      timeString,
      selectedDatetime,
    };
  },

  methods: {
    openPicker() {
      this.pickerModel = true;
    },
    changeDate(value, reason, details) {
      if (this.dateString && this.timeString) {
        this.date = moment(
          "".concat(this.dateString, " ", this.timeString),
          "YYYY/MM/DD HH:mm"
        );
        this.dateTime = "".concat(
          this.date.format("DD/MM/YYYY"),
          " ",
          this.time
        );
        this.selectedDatetime = new Date(this.date);
        this.$emit("update:modelValue", this.selectedDatetime);
      }
    },
  },
};
</script>

<style scoped>
.q-popup-content {
  display: grid;
  grid-template-rows: auto 1fr auto; /* Uma linha para q-date, uma para q-time, uma para q-btn */
  gap: 10px; /* Espaçamento entre as linhas */
}

/* Alinhamento do ícone dentro do q-input */
.q-field__append {
  display: flex;
  align-items: center;
}

@media (max-width: 600px) {
  #dv1 {
    width: 100%; /* Garante que a data ocupa toda a largura em dispositivos menores que 600px */
    margin-bottom: 10px; /* Espaçamento inferior para separar os elementos */
  }

  #dv2 {
    width: 100%; /* Garante que o tempo ocupa toda a largura em dispositivos menores que 600px */
  }
}

@media (min-width: 601px) {
  #dvp {
    display: flex; /* Usa flexbox para colocar os elementos lado a lado em dispositivos maiores que 600px */
    align-items: flex-start; /* Alinha os elementos no início do contêiner */
  }

  #dv1 {
    margin-right: 10px; /* Adiciona um espaço à direita para separar os elementos */
  }
}
</style>
