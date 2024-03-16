import { ReciptValidationType } from "@/types/refund/ReciptValidationType";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const asideFilterSchema = yup.object().shape({
  status: yup.array().of(yup.number()),
});

const options = [
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
];

export const AsideFilter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReciptValidationType>({
    resolver: yupResolver(asideFilterSchema),
  });

  const onSubmit: SubmitHandler<ReciptValidationType> = async (data) => {
    try {
      console.log(`Form submission: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <aside className="h-full flex items-center justify-center pb-12 p-4 bg-[#e5f4eb]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormControl size={"small"} variant={"outlined"}>
          <FormLabel component="legend">Filtro</FormLabel>
          <div>
            {options.map((option: any) => {
              return (
                // TODO: resetar checkbox apos limpar filtros
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox {...register("status")} value={option.value} />
                  }
                  label={option.label}
                />
              );
            })}
          </div>
        </FormControl>
        <Divider />
        <div className="flex flex-col gap-2">
          <Button type="submit" variant="contained">
            Aplicar filtros
          </Button>
          <Button type="button" variant="outlined" onClick={() => reset()}>
            Limpar filtros
          </Button>
        </div>
      </form>
    </aside>
  );
};
