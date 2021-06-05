import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { IFoodContainer } from '../../types';

interface IModalAddFoodProps {
  handleAddFood: (food: IFoodContainer) => void;
  isOpen: boolean;
  setIsOpen: () => void;
}

export const ModalAddFood = ({
  handleAddFood,
  isOpen,
  setIsOpen,
}: IModalAddFoodProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    const food: IFoodContainer = JSON.parse(e.currentTarget.value);

    handleAddFood(food);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name='image' placeholder='Cole o link aqui' Icon={null} />

        <Input name='name' placeholder='Ex: Moda Italiana' Icon={null} />
        <Input name='price' placeholder='Ex: 19.90' Icon={null} />

        <Input name='description' placeholder='Descrição' Icon={null} />
        <button type='submit' data-testid='add-food-button'>
          <p className='text'>Adicionar Prato</p>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
