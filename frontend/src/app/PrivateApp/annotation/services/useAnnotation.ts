import { useSetRecoilState } from "recoil";
import { annotationModalAtom } from "./annotationAtom";
import { FormSubmitProps, OpenModalProps } from "types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiRoutes } from "config/api/apiRoutes";
import { formatTierToApi } from "app/PrivateApp/tier/NewTierPage/TierForm/services/tierFormatter";
import { toast } from "react-toastify";
import { formatDate, isDefined, toISODate } from "utils/helper";
import { RoutePath } from "config/routes/path";
import useApi from "config/api/useApi";
import useConfirmation from "components/ConfirmModal/services/useConfirmation";

export const typeAnnotations = [
  { id: 1, version: 0, value: "TEXTE", label: "TEXTE" },
  { id: 2, version: 0, value: "SCORE", label: "SCORE" },
];

const useAnnotation = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const setModal = useSetRecoilState(annotationModalAtom);

  const onOpenModal = (props: OpenModalProps) => {
    setModal(props);
  };

  const onCloseModal = () => {
    setModal(null);
  };

  const { mutateAsync: onSave } = useMutation({
    mutationFn: ({ data }: FormSubmitProps) =>
      api.post(ApiRoutes.SAVE_ANNOTATION, {
        ...data,
        typeAnnotation: data.typeAnnotation?.value,
        dateCreation: new Date(),
      }),
    onError: (error: any) => {
      toast.error("Error saving annotation");
      return error;
    },
    onSuccess: () => {
      return queryClient
        .invalidateQueries({ queryKey: [ApiRoutes.SEARCH_ANNOTATIONS] })
        .then(() => {
          toast.success("Annotation enregistée avec succés");
        });
    },
  });

  return { onOpenModal, onCloseModal, onSave };
};

export default useAnnotation;
