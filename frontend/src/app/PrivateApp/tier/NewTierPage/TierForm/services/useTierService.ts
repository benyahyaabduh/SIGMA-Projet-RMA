import { FormSubmitProps } from "types";
import { formatTierToApi } from "app/PrivateApp/tier/NewTierPage/TierForm/services/tierFormatter";
import { useMutation } from "@tanstack/react-query";
import useApi from "config/api/useApi";
import { ApiRoutes } from "config/api/apiRoutes";
import { toast } from "react-toastify";
import { isDefined } from "utils/helper";
import { RoutePath } from "config/routes/path";
import { useNavigate } from "react-router-dom";

const useTierService = () => {
  const api = useApi();
  const navigate = useNavigate();

  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: ({ data }: FormSubmitProps) =>
      api.post(ApiRoutes.SAVE_TIER, formatTierToApi(data)),
    onError: (error: any) => {
      return error;
    },
    onSuccess: (response) => {
      console.log("useTierService onSuccess", response);
      const id = response?.data?.id;
      const codeClient = response?.data?.codeClient;
      const message = `Tier ${codeClient} enregisté avec succés`;
      toast.success(message);

      if (isDefined(id)) {
        navigate(RoutePath.TIER_LIST);
      }
    },
  });

  return { onSubmit };
};

export default useTierService;
