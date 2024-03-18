import { FetchReceiptsDataOptions } from "@/types/refund/ReciptValidationType";
import { FilterOption, filters, optionsType } from "@/utils/constants/filters";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const asideFilterSchema = yup.object().shape({
  optionsStatusGPT: yup.array().of(yup.number()),
  optionsStatusTranslate: yup.array().of(yup.number()),
  optionsStatusRefund: yup.array().of(yup.number()),
});

interface AsideFilterProps {
  fetchReceiptsData: (options?: FetchReceiptsDataOptions) => void;
}

export const AsideFilter = ({ fetchReceiptsData }: AsideFilterProps) => {
  const [resetFilter, setResetFilters] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FetchReceiptsDataOptions>({
    resolver: yupResolver(asideFilterSchema),
  });

  // TODO: descobrir pq a solicitação nao funciona de primeira

  const onSubmit: SubmitHandler<FetchReceiptsDataOptions> = async (data) => {
    console.log("submit");
    fetchReceiptsData(data);
  };

  // const handleReset = () => {
  //   reset();
  //   setResetFilters(true);
  //   console.log("reset");
  // };

  return (
    <aside
      className="h-full flex items-center justify-center py-20 px-8 fixed overflow-y-auto bg-[#e5f4eb]"
      style={{ gridArea: "aside" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {Object.values(filters).map((filter: FilterOption) => {
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
                  {filter.options.map((option: optionsType) => {
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
          {/* <Button type="button" variant="outlined" onClick={handleReset}>
            Limpar filtros
          </Button> */}
        </div>
      </form>
    </aside>
  );
};
