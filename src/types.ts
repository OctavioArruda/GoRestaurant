export interface IFoodContainer {
  Id: string;
  Name: string;
  Description: string;
  Price: string;
  Available: boolean;
  Image: string;
}

export interface IEditingFood {
  editingFood: IFoodContainer;
  editModalOpen: boolean;
}
