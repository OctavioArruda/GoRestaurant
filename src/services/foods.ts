import { IFoodContainer } from '../types';
import api from './api';

export const getFoods = async (): Promise<IFoodContainer[]> =>
  await api.get('foods').then(response => response.data);

export const insertFood = async (food: IFoodContainer): Promise<IFoodContainer> =>
  await api
    .post('/foods', {
      ...food,
      available: true,
    })
    .then(response => response.data);

export const updateFood = async (
  food: IFoodContainer,
  editingFood: IFoodContainer
): Promise<IFoodContainer> =>
  await api.put(`foods/${food.id}`, {
    ...editingFood,
    ...food,
  });

export const deleteFood = async (id: string): Promise<void> => await api.delete(`/foods/${id}`);
