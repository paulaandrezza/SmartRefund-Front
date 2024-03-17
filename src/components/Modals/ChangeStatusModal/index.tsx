import { ChangeStatusType } from "@/types/refund/ChangeStatusType";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Modal, Typography, styled } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 4,
  py: 3,
  borderRadius: 4,
};

type changeStatusModalProps = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const changeStatusModalSchema = yup.object().shape({
  status: yup.number().required("status obrigatório").min(1),
});

export const ChangeStatusModal = ({
  open,
  setIsOpen,
}: changeStatusModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeStatusType>({
    resolver: yupResolver(changeStatusModalSchema),
  });

  const onSubmit: SubmitHandler<ChangeStatusType> = async (data) => {
    try {
      console.log(`Form submission: ${JSON.stringify(data)}`);
      toast.success("Status atualizado com sucesso!");
      setIsOpen(false);
    } catch (error) {
      console.error("error:", error);
      toast.error(`${error}`);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 600 }}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Alterar status da solicitação
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Selecione o status atual dessa solicitação
          </Typography>

          <Button type="submit" variant="contained">
            Alterar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
