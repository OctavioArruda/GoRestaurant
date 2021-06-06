import { useEffect, useState, useCallback } from 'react';

import { Header } from '../../components/Header';
import Food from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { IFoodContainer } from '../../types';
import { getFoods, insertFood, updateFood, deleteFood } from '../../services/foods';
import { FoodsContainer } from './styles';

export const Dashboard = (): JSX.Element => {
  const [foods, setFoods] = useState<IFoodContainer[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodContainer>();
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const fetchFoods = useCallback(async (): Promise<void> => {
    const foods = await getFoods();
    console.log(foods);
    setFoods(foods);
  }, [setFoods]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleAddFood = async (food: IFoodContainer): Promise<void> => {
    try {
      const addedFood = await insertFood(food);

      setFoods([...foods, addedFood]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: IFoodContainer): Promise<void> => {
    try {
      if (!editingFood) throw Error();

      const foodUpdated = await updateFood(food, editingFood);

      const foodsUpdated = foods.map(f => (f.id !== foodUpdated.id ? f : foodUpdated));

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: string) => {
    await deleteFood(id);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  };

  const toggleModal = (): void => {
    setIsOpenModal(!isModalOpen);
  };

  const toggleEditModal = (): void => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: IFoodContainer): void => {
    setEditingFood(food);
    toggleEditModal();
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={isModalOpen} setIsOpen={toggleModal} handleAddFood={handleAddFood} />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood as IFoodContainer}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid='foods-list'>
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
