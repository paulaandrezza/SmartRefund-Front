import { RecipEntryType } from "@/types/refund/ReciptEntryType";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Modal, Typography, styled } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

type AddReciptModalProps = {
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

export const AddReciptModal = ({ open, setIsOpen }: AddReciptModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipEntryType>();
  const [selectedFile, setSelectedFile] = useState<File>({} as File);

  const onSubmit: SubmitHandler<RecipEntryType> = async (data) => {
    try {
      console.log(`File: ${selectedFile}`);
      console.log(`Form submission: ${JSON.stringify(data)}`);
      toast.success("Nota fiscal enviada com sucesso!");
      setIsOpen(false);
    } catch (error) {
      console.error("error:", error);
      toast.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile({} as File);
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
            Adicionar nota fiscal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Selecione a nota fiscal que deseja enviar
          </Typography>

          <Button
            component="label"
            role={undefined}
            variant="contained"
            color="secondary"
            tabIndex={-1}
            {...register("file")}
            startIcon={<CloudUploadIcon />}
          >
            Upload imagem
            <VisuallyHiddenInput
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              required
              onChange={handleFileChange}
            />
          </Button>
          <Typography variant="body2" className="pb-4">
            {selectedFile.name}
          </Typography>

          <Button type="submit" variant="contained">
            Adicionar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
