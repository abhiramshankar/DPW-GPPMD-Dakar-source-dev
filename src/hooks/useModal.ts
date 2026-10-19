import { useBoolean } from "@fluentui/react-hooks";

const useModal = () => {
  const [isModalOpen, { setTrue: openModal, setFalse: closeModal }] =
    useBoolean(false);

  return [isModalOpen, openModal, closeModal] as const;
};

export default useModal;

