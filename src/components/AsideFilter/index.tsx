import { ReciptValidationType } from "@/types/refund/ReciptValidationType";
import { filters } from "@/utils/constants/filters";
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
  optionsStatusGPT: yup.array().of(yup.number()),
  optionsStatusTranslate: yup.array().of(yup.number()),
  optionsStatusRefund: yup.array().of(yup.number()),
});

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
    console.log(data);
    try {
      console.log(`Form submission: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <aside
      className="h-full flex items-center justify-center pb-12 px-8 fixed"
      style={{ gridArea: "aside" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {Object.values(filters).map((filter: any) => {
          return (
            <>
              <FormControl
                size={"small"}
                variant={"outlined"}
                key={filter.label}
              >
                <FormLabel component="legend">
                  <b>{filter.label}</b>
                </FormLabel>
                <div className="flex flex-col">
                  {filter.options.map((option: any) => {
                    return (
                      <FormControlLabel
                        key={option.value}
                        control={
                          <Checkbox
                            value={option.value}
                            sx={{ padding: "4px" }}
                            {...register(filter.key)}
                          />
                        }
                        label={option.label}
                      />
                    );
                  })}
                </div>
              </FormControl>
              <Divider />
            </>
          );
        })}

        <div className="flex flex-col gap-2">
          <Button type="submit" variant="contained">
            Aplicar filtros
          </Button>
          <Button type="button" variant="outlined" onClick={() => reset()}>
            Limpar filtros
          </Button>
        </div>
      </form>
      <Divider orientation="vertical" className="relative -right-12" />
    </aside>
  );
};
