import { useState, useCallback } from 'react';

/**
 * Hook personalizado para gerenciar o estado e as ações do modal
 * 
 * @returns {Object} Objeto contendo o estado e as funções para manipular o modal
 */
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  /**
   * Abre o modal e opcionalmente define dados associados
   * @param {any} data - Dados opcionais para associar ao modal
   */
  const openModal = useCallback((data?: any) => {
    setIsOpen(true);
    if (data !== undefined) {
      setModalData(data);
    }
  }, []);

  /**
   * Fecha o modal e limpa os dados associados
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
    
    // Pequeno timeout para remover os dados após a animação de fechamento
    setTimeout(() => {
      setModalData(null);
    }, 300);
  }, []);

  /**
   * Atualiza os dados do modal enquanto ele está aberto
   * @param {any} data - Novos dados para associar ao modal
   */
  const updateModalData = useCallback((data: any) => {
    setModalData((prevData: any) => ({ ...prevData, ...data }));
  }, []);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    updateModalData
  };
};

export default useModal;