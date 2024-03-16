export const InternalReceiptStatusEnum = {
  1: { label: "Não processado", color: "info" },
  2: { label: "Sucesso", color: "primary" },
  3: { label: "Falhou uma vez", color: "warning" },
  4: { label: "Falhou mais de uma vez", color: "warning" },
  5: { label: "Sem sucesso", color: "error" },
} as const;
