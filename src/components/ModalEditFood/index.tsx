import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { IFoodContainer } from '../../types';
import { FormHandles } from '@unform/core';

interface IModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: IFoodContainer) => Promise<void>;
  editingFood: IFoodContainer;
}
export const ModalEditFood = ({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood,
}: IModalEditFoodProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: React.FormEvent<HTMLInputElement>) => {
    const food: IFoodContainer = JSON.parse(data.currentTarget.value);
    handleUpdateFood(food);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name='image' placeholder='Cole o link aqui' Icon={null} />

        <Input name='name' placeholder='Ex: Moda Italiana' Icon={null} />
        <Input name='price' placeholder='Ex: 19.90' Icon={null} />

        <Input name='description' placeholder='Descrição' Icon={null} />

        <button type='submit' data-testid='edit-food-button'>
          <div className='text'>Editar Prato</div>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
