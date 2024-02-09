<template>
  <div
    class="fullscreen bg-dark text-white text-center q-pa-md flex flex-center"
  >
    <q-img src="../assets/logo.svg" class="watermark-image" />

    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nada aqui...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Ir para a página principal"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .watermark-image {
    position: absolute;
    top: 0%;

    opacity: 0.1; /* Ajuste a opacidade conforme necessário */
    width: 150px;
  }
}

/* Estilos para dispositivos maiores que 600 pixels de largura */
@media only screen and (min-width: 601px) {
  .watermark-image {
    position: absolute;
    top: 0%;

    opacity: 0.1; /* Ajuste a opacidade conforme necessário */
    width: 25vh;
  }
}
</style>
