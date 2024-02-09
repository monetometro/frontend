<template>
  <q-layout view="hHh lpR fFr">
    <q-header elevated class="custom-header">
      <q-toolbar>
        <q-toolbar-title @click="goToHome" style="cursor: pointer">
          <q-avatar>
            <q-img src="../assets/logo.svg" alt="Logo" />
          </q-avatar>
          MONETOMETRO
        </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="schedule"
          size="md"
          class="q-mr-md"
          @click="toggleRightDrawer"
        >
          <q-tooltip> Editar evento </q-tooltip>
          <q-badge color="orange" floating>{{ participantsCount() }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>
    <cookie-notice></cookie-notice>

    <q-footer reveal class="custom-footer">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="info_outline"
          size="18pt"
          @click="toggleInfoDialog('Objetivo', 'info_outline')"
          style="position: relative"
        >
          <div v-if="$q.screen.width > 600" class="footer-div">Objetivo</div>
          <q-tooltip> Objetivos do projeto</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          icon="manage_history"
          size="18pt"
          @click="toggleInfoDialog('Funcionamento', 'manage_history')"
        >
          <div v-if="$q.screen.width > 600" class="footer-div">
            Funcionamento
          </div>
          <q-tooltip>Como funciona?</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          icon="message"
          size="18pt"
          @click="toggleInfoDialog('Sugestões', 'message')"
        >
          <div v-if="$q.screen.width > 600" class="footer-div">Sugestões</div>
          <q-tooltip>Dê uma sugestão</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          icon="handshake"
          size="18pt"
          @click="toggleInfoDialog('Apoie', 'handshake')"
          ><div v-if="$q.screen.width > 600" class="footer-div">Apoie</div>
          <q-tooltip>Seja um colaborador</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-footer>

    <q-drawer
      v-model="rightDrawerOpen"
      bordered
      elevated
      overlay
      :breakpoint="700"
      content-class="bg-grey-1"
      side="right"
      :width="drawerWidth"
      no-swipe-close
    >
      <RightDrawer
        @participants-updated="updateEventParticipants"
        @closeDrawer="toggleRightDrawer"
      />
    </q-drawer>
    <q-dialog
      v-model="infoDialogOpen"
      full-width
      full-height
      :maximized="maximizedToggle()"
      :style="{ 'max-width': '100%', width: '100%' }"
      escape-key
      @escape-key="toggleInfoDialog('', '', '')"
    >
      <q-layout
        view="lHh lpr lFf"
        container
        style="height: 400px; background-color: #fff"
      >
        <q-header>
          <q-toolbar class="bg-grey-4">
            <q-toolbar-title style="color: #000; text-transform: uppercase">
              <q-icon :name="dialogIcon" size="md" />
              {{ dialogTitle }}</q-toolbar-title
            >

            <q-btn
              icon="close"
              @click="toggleInfoDialog('', '', '')"
              color="grey-7"
            >
              <q-tooltip> Fechar</q-tooltip>
            </q-btn>
          </q-toolbar>
        </q-header>

        <div class="container">
          <q-img
            src="../assets/logo.svg"
            class="watermark-image"
            v-if="$q.screen.width > 600"
          />
          <q-list>
            <q-item class="q-mb-md" v-if="showItem('Objetivo')">
              <div class="item-content">
                <q-icon name="thumb_down" color="pink-6" class="info-icon" />

                <div>
                  Você sabia que as reuniões podem ser uma grande fonte de
                  desperdício de tempo e dinheiro nas organizações? Muitas
                  vezes, as reuniões são longas, improdutivas, desnecessárias ou
                  envolvem pessoas que não precisam estar presentes. Isso tem um
                  preço, e o MONETOMETRO foi criado para conscientizá-lo disso.
                  Embora inicialmente tenha sido pensado para calcular os custos
                  de eventos com a participação de servidores públicos que têm
                  dados de transparência disponíveis, o MONETOMETRO também pode
                  atender a outros nichos. Em resumo, se você tem uma equipe
                  envolvida em uma atividade e quer saber quanto isso está
                  custando, o MONETOMETRO pode ajudar.
                </div>
              </div>
            </q-item>
            <q-item class="q-mb-md" v-if="showItem('Objetivo')">
              <div class="item-content">
                <q-icon
                  name="tips_and_updates"
                  color="amber-5"
                  class="info-icon"
                />

                <div>
                  O MONETOMETRO mostra o quanto um evento está custando em tempo
                  real, com base em dados públicos, provenientes de sites de
                  transparência ou outros valores que você queira informar nas
                  configurações do evento. Essa ferramenta é uma maneira de
                  conscientizar as pessoas sobre o uso eficiente do tempo em
                  reuniões e eventos. Com uma equipe conscientizada, você poderá
                  planejar melhor seus eventos, definir objetivos claros,
                  convidar apenas as pessoas essenciais, evitar distrações e
                  interrupções, e avaliar os resultados alcançados. Dessa forma,
                  você pode otimizar seu tempo, reduzir os custos e aumentar a
                  produtividade da sua organização. Após usar o MONETOMETRO,
                  reflita sobre esta pergunta: "O resultado desse evento valeu o
                  gasto?"
                </div>
              </div>
            </q-item>
            <q-item class="q-mb-md" v-if="showItem('Funcionamento')"
              ><div class="item-content">
                <q-icon
                  name="fa-solid fa-puzzle-piece"
                  size="md"
                  color="amber-9"
                  class="info-icon"
                />

                <div>
                  <p>
                    O MONETOMETRO funciona com três elementos fundamentais, o
                    endereço de Email, a Remuneração Mensal Média (RMM) e o
                    Custo Médio por Hora (CMH). Vamos explicá-los no contexto
                    dessa ferramenta. O endereço de Email é a identificação de
                    cada participante do evento e cada endereço desse tem
                    informações importantes. Quais são elas?
                  </p>
                </div>
              </div>
            </q-item>
            <q-item class="q-mb-md" v-if="showItem('Funcionamento')"
              ><div class="item-content">
                <q-icon
                  name="alternate_email"
                  size="md"
                  color="indigo"
                  class="info-icon"
                />

                <div>
                  <h5 class="q-mb-md">De que é formado o email?</h5>
                  <ul>
                    <li>
                      <strong>Nome de Usuário:</strong> O nome de usuário é
                      exclusivo no domínio e identifica uma pessoa em uma
                      organização.
                    </li>
                    <li>
                      <strong>Símbolo '@' (Arroba):</strong> Indica que a parte
                      antes dele é o usuário, e a parte depois é o domínio.
                    </li>
                    <li>
                      <strong>Domínio:</strong> Em ambientes corporativos e
                      governamentais reflete a organização à qual o usuário
                      pertence.
                    </li>
                  </ul>

                  <p>
                    Se pensarmos no Email
                    <strong>joao.silva@orgao.gov.br</strong>, "joao.silva" é o
                    usuário, e "orgao.gov.br" é o domínio que indica a
                    instituição governamental.
                  </p>

                  <p>
                    Orgãos públicos por meio de normativas do governo federal
                    usam o padrão de nomeclatura "nome.sobrenome@orgao.gov.br".
                    Então, no exemplo citado, por inferência, concluímos que
                    João Silva é um funcionário da instituição cujo endereço na
                    internet é orgao.gov.br. Então para a busca dos dados de
                    transparência dos domínios mapeados pelo MONETOMETRO usamos
                    esse padrão de escrita da conta de email.
                  </p>
                </div>
              </div>
            </q-item>
            <q-item class="q-mb-md" v-if="showItem('Funcionamento')"
              ><div class="item-content">
                <q-icon
                  name="payments"
                  size="md"
                  color="green-14"
                  class="info-icon"
                />

                <div>
                  <h5 class="q-mb-md">
                    O que é a Remuneração Mensal Média (RMM)?
                  </h5>
                  <p>
                    Os sites de transparencia dos entes governamentais
                    disponibilizam os salários dos seus respectivos servidores
                    mensalmente, normalmente o mês anterior ao mês corrente.
                    Acontece que pode existir valores de créditos que são pagos
                    excepcionalmente não fazendo parte dos vencimentos de outros
                    meses, então se esses valores existirem, eles serão
                    contabilizados. Quando integramos um domínio com o
                    respectivo site de transparência somamos todos os créditos
                    listados no último mês disponível, excluímos os adicionais
                    de férias e décimo terceiros, se houver, obtendo com isso o
                    salário base médio. Ao salário base médio acrescentamos
                    1/12/12 (um doze avos do décimo terceiro) e 1/12/3 (um doze
                    avos do terço de férias). A essa soma damos o nome de
                    Remuneração Mensal Média.
                  </p>
                </div>
              </div>
            </q-item>
            <q-item class="q-mb-md" v-if="showItem('Funcionamento')"
              ><div class="item-content">
                <q-icon
                  name="attach_money"
                  size="md"
                  color="cyan"
                  class="info-icon"
                />

                <div>
                  <h5 class="q-mb-md">O que é o Custo Médio por Hora (CMH)?</h5>
                  <p>
                    Vimos como é calculado o custo mensal de um participante do
                    evento, mas para o cálculo exibido no MONETOMETRO precisamos
                    chegar ao custo por hora de um participante. Por padrão,
                    dividimos o RMM por 168 horas, ou seja, assumimos uma carga
                    horária de 8 horas diárias por 21 dias úteis no mês. A essa
                    divisão do RMM pela média de horas trabalhadas no mês damos
                    o nome de Custo Médio por Hora (CMH).
                  </p>
                </div>
              </div>
            </q-item>
            <q-item class="q-mb-md" v-if="showItem('Funcionamento')">
              <div class="item-content">
                <q-icon
                  name="fa-regular fa-paper-plane"
                  size="md"
                  color="amber"
                  class="info-icon"
                />

                <div>
                  <p>
                    Para um uso mais ágil do MONETOMETRO recomendamos que use a
                    versão automatizada. Ao criar o convite do seu evento
                    adicione como participante o email

                    <span class="code"
                      ><strong ref="copyText">agenda@monetometro.com</strong>
                      &nbsp;
                      <q-btn
                        icon="content_copy"
                        flat
                        round
                        dense
                        @click="copyToClipboard"
                      >
                        <q-tooltip
                          ><span ref="copyTooltip">Copiar</span></q-tooltip
                        >
                      </q-btn></span
                    >. Feito isso você receberá um email com o link de seu
                    evento no MONETOMETRO, no dia e hora do evento acesse o link
                    para acompanhar em tempo real o custo dele.
                  </p>
                </div>
              </div>
            </q-item>

            <q-item class="q-mb-md" v-if="showItem('Funcionamento')">
              <div class="item-content">
                <q-icon
                  name="fa-solid fa-tower-broadcast"
                  color="deep-purple"
                  class="info-icon"
                />

                <div>
                  <div class="explanation">
                    Atualmente os emails dos domínios abaixo estão
                    automatizados, então se sua lista de participantes possuir
                    algum desses domínios de email o link enviado conterá os
                    respectivos valores de remuneração média mensal (RMM).
                    Abaixo, você pode consultar a disponibilidade do serviço de
                    extração de dados do MONETOMETRO em cada domínio, se online
                    (<q-icon name="cloud_done" color="green" />) ou indisponível
                    (<q-icon name="cloud_off" color="red" />).
                  </div>
                  <q-timeline color="dark">
                    <q-timeline-entry
                      v-for="(uf, index) in uniqueUFs"
                      :key="index"
                      :subtitle="uf"
                      side="left"
                      class="tm-content"
                    >
                      <q-list>
                        <q-item
                          v-for="(item, itemIndex) in itemsByUF(uf)"
                          :key="itemIndex"
                        >
                          <q-item-section avatar>
                            <q-icon :name="item.icon" :color="item.color" />
                            <q-tooltip v-if="!item.status"
                              >Monetometro INDISPONÍVEL</q-tooltip
                            >
                            <q-tooltip v-if="item.status"
                              >Monetometro ONLINE</q-tooltip
                            >
                          </q-item-section>
                          <q-item-section>
                            <q-item-label lines="1">
                              <a :href="item.link" target="_blank"
                                >{{ item.org }}
                                <q-tooltip
                                  >Clique para acessar a Fonte dos Dados em
                                  {{ item.link }}</q-tooltip
                                >
                              </a>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-timeline-entry>
                  </q-timeline>
                </div>
              </div>
            </q-item>

            <q-item class="q-mb-md" v-if="showItem('Sugestoes')">
              <SuggestionForm
                @save-clicked="saveSuggestion"
                ref="refSuggestion"
              />
            </q-item>

            <q-item class="q-mb-md" v-if="showItem('Apoie')">
              <div class="item-content">
                <div class="icon-container">
                  <q-icon
                    color="teal"
                    class="info-icon"
                    name="fa-solid fa-handshake-angle"
                  />
                </div>
                <div class="text-container">
                  <p>
                    Como qualquer site da internet existem custos para manter o
                    MONETOMETRO funcionando. Estamos empolgados em compartilhar
                    nossa idéia e convidá-lo a fazer parte desta incrível
                    iniciativa. O sucesso do nosso projeto depende da comunidade
                    que o sustenta, e gostaríamos de lhe fornecer uma visão
                    clara e transparente dos custos associados à operação,
                    manutenção e desenvolvimento contínuo desse serviço.
                  </p>
                  <h5>Operação:</h5>
                  <ul>
                    <li>
                      <strong>Hospedagem e Infraestrutura:</strong> Manter o
                      site acessível e responsivo envolve o uso de recursos de
                      computação para processamento, armazenamento e
                      transferência de dados.
                    </li>
                    <li>
                      <strong>Segurança e Backup:</strong> Para garantir a
                      disponibilidade do site é necessário investir em
                      estratégias de segurança da informação.
                    </li>
                    <li>
                      <strong>Monitoramento:</strong> Ferramentas de
                      monitoramento são essenciais para identificar e corrigir
                      problemas rapidamente, garantindo um ambiente online
                      confiável.
                    </li>
                  </ul>
                  <h5>Manutenção:</h5>
                  <ul>
                    <li>
                      <strong>Atualizações de Software:</strong> Para oferecer
                      uma experiência de usuário moderna e segura, precisamos
                      manter todos os componentes do nosso site atualizados.
                      Serviços terceiros como solução de Email e registro de
                      domínio precisam ser contratadas para o pleno
                      funcionamento.
                    </li>
                  </ul>
                  <h5>Desenvolvimento:</h5>
                  <ul>
                    <li>
                      <strong>Inovação Contínua:</strong> Planejamos implementar
                      novas integrações com os portais de transparência do
                      Brasil. Considerando que são mais de 5500 munícipios no
                      país e que em cada Estado pode haver mais de um portal de
                      transparência temos um grande desafio.
                    </li>
                  </ul>
                  <h5>Por que seu apoio é crucial:</h5>
                  <ul>
                    <li>
                      <strong>Sustentabilidade: </strong>Seu investimento nos
                      permitirá cobrir esses custos essenciais e garantir a
                      continuidade do nosso projeto.
                    </li>
                    <li>
                      <strong>Melhoria Contínua:</strong> Com sua ajuda, podemos
                      inovar, crescer e oferecer uma experiência cada vez melhor
                      aos nossos usuários.
                    </li>
                  </ul>
                  <p>
                    Agradecemos sinceramente por considerar apoiar o nosso
                    projeto. Cada contribuição, grande ou pequena, faz a
                    diferença e nos ajuda a conscientizar mais pessoas sobre o
                    uso do nosso bem mais precioso, o Tempo.
                  </p>
                  <div class="q-pa-md row items-start q-gutter-md">
                    <!-- Cartões de Crédito/Débito/Boleto -->
                    <q-card class="payment-card margin-r-25">
                      <q-card-section>
                        <q-toolbar>
                          <q-btn
                            flat
                            dense
                            icon="credit_card"
                            size="18pt"
                            @click="
                              toggleInfoDialog('Objetivo', 'info_outline')
                            "
                            style="position: relative"
                          >
                            <div
                              v-if="$q.screen.width > 600"
                              class="footer-div"
                            >
                              Cartão
                            </div>
                          </q-btn>

                          <q-btn
                            flat
                            dense
                            icon="fa-solid fa-barcode"
                            size="18pt"
                            @click="
                              toggleInfoDialog('Objetivo', 'info_outline')
                            "
                            style="position: relative"
                          >
                            <div
                              v-if="$q.screen.width > 600"
                              class="footer-div"
                            >
                              Boleto
                            </div> </q-btn
                          ><q-btn
                            flat
                            dense
                            icon="qr_code_2"
                            size="18pt"
                            @click="
                              toggleInfoDialog('Objetivo', 'info_outline')
                            "
                            style="position: relative"
                          >
                            <div
                              v-if="$q.screen.width > 600"
                              class="footer-div"
                            >
                              PIX
                            </div>
                          </q-btn>
                        </q-toolbar>
                        <br />
                        <hr />
                        <span
                          >Para essas formas de pagamento usamos a plataforma de
                          financiamento coletivo
                          <a
                            href="https://www.kickante.com.br/financiamento-coletivo/monetometro"
                            target="_blank"
                          >
                            Kickante</a
                          >, clique em um dos métodos acima para ir para a
                          página de pagamento ou escanei o QR Code abaixo.</span
                        > </q-card-section
                      ><img
                        src="../assets/qrcode-kickante.png"
                        alt="QR Code"
                        class="qr-code-image pay-qr-img"
                      />
                    </q-card>
                    <q-card class="payment-card">
                      <q-card-section>
                        <q-toolbar>
                          <q-btn
                            flat
                            dense
                            icon="fa-brands fa-bitcoin"
                            size="18pt"
                            style="position: relative"
                          >
                            <div class="footer-div">Bitcoin</div>
                          </q-btn>
                        </q-toolbar>
                        <br />
                        <hr />
                        <span>
                          A transferência pode ser feita para a carteira de
                          Bitcoin com chave
                          <span class="code code-lt"
                            ><strong ref="copyText"
                              >14m3UeajUTrqgsb3nHV9PaV6U7EocfbLRo</strong
                            >
                            &nbsp;
                            <q-btn
                              icon="content_copy"
                              flat
                              round
                              dense
                              @click="copyToClipboard"
                            >
                              <q-tooltip
                                ><span ref="copyTooltip"
                                  >Copiar</span
                                ></q-tooltip
                              >
                            </q-btn></span
                          >
                          ou escaneie o QR Code abaixo, que contém essa chave de
                          carteira.
                        </span> </q-card-section
                      ><img
                        src="../assets/qrcode-bitcoin.png"
                        alt="QR Code"
                        class="qr-code-image pay-qr-img"
                      />
                    </q-card>
                  </div>
                </div>
              </div>
            </q-item>

            <q-item class="q-mb-md" v-if="showItem('Apoie')">
              <div class="item-content">
                <q-icon
                  name="fa-solid fa-code"
                  color="blue"
                  class="info-icon"
                />

                <div>
                  <span>
                    Se você é desenvolvedor e quer colaborar incluindo novas
                    fontes de dados públicos acesse a página do projeto no
                    <a href="https://github.com/stgustavo/monetometro">GitHub</a
                    >.
                  </span>
                </div>
              </div>
            </q-item>
          </q-list>
        </div>
      </q-layout>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRoute } from "vue-router";

import { defineComponent, ref } from "vue";
import RightDrawer from "components/RightDrawer.vue";
import SuggestionForm from "components/SuggestionForm.vue";
import { useStore } from "../stores/store";
import "@fortawesome/fontawesome-free/css/all.css";
import { useQuasar } from "quasar";
import CookieNotice from "components/CookieNotice.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    RightDrawer,
    SuggestionForm,
    CookieNotice,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();

    const store = useStore();
    const eventParticipants = ref(
      route.query.ATT ? JSON.parse(decodeURIComponent(route.query.ATT)) : []
    );
    const infoDialogOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const items = store.dataSources;
    items.sort((a, b) => (a.org > b.org ? 1 : b.org > a.org ? -1 : 0));

    const dialogTitle = ref("");
    const dialogIcon = ref("");

    return {
      infoDialogOpen,
      dialogTitle,
      dialogIcon,
      rightDrawerOpen,
      drawerWidth: window.innerWidth > 600 ? 500 : window.innerWidth,
      normalizeText(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      },
      showItem(anchor) {
        const lowerCaseAnchor = this.normalizeText(anchor.toLowerCase());
        const lowerCaseHash = window.location.hash.toLowerCase();

        return lowerCaseHash.includes("#" + lowerCaseAnchor);
      },
      addHash(newHash) {
        if (newHash != "")
          return this.$router.push({
            hash: "#" + this.normalizeText(newHash.normalize("NFD")),
          });
        else {
          this.$router.push({ hash: "" });
          return null;
        }
      },
      store,
      eventParticipants,
      toggleInfoDialog(title, icon) {
        const promise = this.addHash(title);

        if (title.toLowerCase() === "funcionamento") this.updateIcons();

        if (promise) {
          promise.then(() => {
            infoDialogOpen.value = !infoDialogOpen.value;
            dialogTitle.value = title;
            dialogIcon.value = icon;
          });
        }
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      maximizedToggle() {
        return window.innerWidth <= 600;
      },
      items,
    };
  },
  computed: {
    uniqueUFs() {
      return [...new Set(this.items.map((item) => item.UF))];
    },
  },
  created() {},
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);

    const hashes = window.location.hash
      .split("#")
      .filter((hash) => hash !== "");
    const title = this.normalizeText(hashes[hashes.length - 1]).toLowerCase();
    const formatetedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    switch (title) {
      case "objetivo":
        this.toggleInfoDialog(formatetedTitle, "info_outline");
        break;
      case "funcionamento":
        this.toggleInfoDialog(formatetedTitle, "manage_history");
        break;
      case "sugestoes":
        this.toggleInfoDialog(formatetedTitle, "message");
        break;
      case "apoie":
        this.toggleInfoDialog(formatetedTitle, "handshake");
        break;
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    showMessage(message, colorName) {
      this.$q.notify({
        message: message,
        color: colorName || "positive",
        position: "top-right",
        timeout: 5000,
        progress: true,
        icon:
          colorName == "positive"
            ? "check_circle"
            : colorName == "negative"
            ? "error"
            : colorName == "warning"
            ? "warning"
            : "announcement",
        actions: [
          {
            label: "X",
            color: "white",
            handler: () => {},
          },
        ],
      });
    },
    handleWindowResize() {
      this.drawerWidth =
        window.innerWidth > 600 ? 500 : window.innerWidth * 0.9;
    },
    async updateIcons() {
      this.items.forEach((item) => {
        this.store
          .getAPI()
          .isDomainUp(item.org)
          .then((response) => {
            item.status = response.data;
            this.updateItemIcon(item);
          })
          .catch((error) => {
            console.error("Error on updating icons:", error);
          });
      });
    },
    updateItemIcon(item) {
      item.icon = item.status ? "cloud_done" : "cloud_off";
      item.color = item.status ? "green" : "red";
    },
    itemsByUF(uf) {
      return this.items.filter((item) => item.UF === uf);
    },
    updateEventParticipants(newParticipants, CMH, DTE, DTI) {
      this.eventParticipants = newParticipants;
      this.store.parameters.CMH = CMH;
      this.store.parameters.DTE = DTE;
      this.store.parameters.DTI = DTI;
    },
    participantsCount() {
      return this.eventParticipants.length;
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.$refs.copyText.textContent);
        this.$refs.copyTooltip.textContent = "Copiado";
      } catch (err) {
        console.error("Erro ao copiar texto: ", err);
      }
    },
    saveSuggestion(suggestion, email, phone, token) {
      this.store
        .getAPI()
        .postSuggestion(token, suggestion, email, phone)
        .then((response) => {
          if (response.data.success) {
            this.showMessage(response.data.message, "positive");
            this.$refs.refSuggestion.clearSuggestion();
            this.infoDialogOpen = false;
          } else this.showMessage(response.data.message, "negative");
        })
        .catch((error) => {
          console.error("Error on saving suggestion:", error);
        });
    },
  },
});
</script>

<style scoped>
p {
  line-height: 1.5;
}

.custom-header {
  background-color: #000; /* Defina a cor que desejar aqui */
  /* Outras propriedades de estilo do cabeçalho, se necessário */
}
.custom-footer {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  min-height: 70px;
}
.item-content {
  display: flex;
  flex-direction: column;
}
.item-content h5 {
  padding: 0px 0px 10px 0px !important;
  margin: 0px 0px 20px 0px;
}

@media screen and (min-width: 600px) {
  .custom-footer div button {
    margin-right: 50px !important;
  }
  .item-content {
    flex-direction: row;
  }
}
.watermark-image {
  position: fixed;
  bottom: -1vw;
  left: 55vw;

  opacity: 0.1;
  width: 40%;
}
.footer-div {
  position: absolute;
  bottom: 0;
  top: 28pt;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10pt;
}
.container {
  text-align: justify;
  padding: 60px 20px 20px 20px;
  font-size: 18px;
}

@media screen and (max-width: 400px) {
  .container {
    padding: 60px 0 0 0;
  }

  .q-item {
    padding: 0 10px;
  }
}

.q-timeline__subtitle {
  font-size: 16px !important;
}
.tm-content {
  font-size: 14px;
}
.info-icon {
  padding-right: 25px;
  font-size: 50px !important;
}
.code {
  display: inline-block !important;
  padding: 0 0.4em !important;
  border: 1px solid rgba(0, 0, 0, 0.25) !important;
  background-color: #eaeaea !important;
  font-size: 0.9em !important;
  border-radius: 0.25rem !important;
}
.code-lt {
  font-size: 0.69em !important;
}
.qr-code-image {
  min-width: 180px;
  max-width: 13vw;
  height: auto;
  display: block;
  margin: 0 auto;
}
.fullWidth {
  width: 100%;
}
.payment-card {
  min-width: 25vw;
  max-width: 300px;
  background-color: rgba(255, 255, 255, 0.2);
  height: 550px;
}
@media screen and (max-width: 400px) {
  .payment-card {
    width: 300px;
  }
}
.margin-r-25 button {
  margin-right: 25px;
}
.pay-qr-img {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
