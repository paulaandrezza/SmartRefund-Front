export const filters = {
  optionsStatusGPT: {
    label: "Status de Envio para o GPT",
    options: [
      {
        label: "Não processado",
        value: "1",
      },
      {
        label: "Sucesso",
        value: "2",
      },
      {
        label: "Falhou uma vez",
        value: "3",
      },
      {
        label: "Falhou duas vezes",
        value: "4",
      },
      {
        label: "Sem sucesso",
        value: "5",
      },
    ],
  },

  optionsStatusTranslate: {
    label: "Status da Tradução",
    options: [
      {
        label: "Tradução bem sucedida",
        value: "1",
      },
      {
        label: "Erro da tradução",
        value: "2",
      },
    ],
  },

  optionsStatusRefund: {
    label: "Status do Reembolso",
    options: [
      {
        label: "Submetido",
        value: "1",
      },
      {
        label: "Pago",
        value: "2",
      },
      {
        label: "Recusado",
        value: "3",
      },
    ],
  },
};