import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteModalAtom } from "components/DeleteModal/services/deleteAtom";
import { useRecoilState } from "recoil";
import { isNotDefinedOrEmpty } from "utils/helper";
import { has } from "lodash";
import useApi from "config/api/useApi";
import { toast } from "react-toastify";

const useDelete = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const [modal, setModal] = useRecoilState(deleteModalAtom);

  const onDelete = (data: any) => {
    setModal(data);
  };

  const onClose = () => {
    setModal(null);
  };

  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: ({ data, deleteUrl }: any) => {
      setModal({
        ...modal,
        state: "loading",
      });

      if (
        isNotDefinedOrEmpty(deleteUrl) ||
        isNotDefinedOrEmpty(data) ||
        !has(data, "id")
      ) {
        return new Promise((resolve, reject) => reject("Invalid params"));
      }

      return api.delete(deleteUrl, { params: { id: data.id } });
    },
    onSuccess(data, variables) {
      //return queryClient.invalidateQueries(current.fetchUrl);
      return queryClient.invalidateQueries(variables?.fetchUrl).then(() => {
        setModal({
          ...modal,
          state: "success",
        });
        toast.success("Data deleted successfully");
        onClose();
      });
    },
    onError(error) {
      setModal({
        ...modal,
        state: "error",
      });

      console.error("useDeleteService Failed", { error });
      toast.error("Error deleting data");
    },
  });

  return { onDelete, onClose, onSubmit };
};

export default useDelete;
