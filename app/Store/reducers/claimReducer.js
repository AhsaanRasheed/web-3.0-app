import { TOGGLE_CHECKBOX, STORE_CHECKED_ITEM_DATA } from "@/app/actionTypes";

const initialState = {
  checkedItems: {},
  itemData: {},
};

const claimReducer = (state = initialState, action) => {
  console.log("Previous state:", state); // Log the state before update

  switch (action.type) {
    case TOGGLE_CHECKBOX:
      const itemId = action.payload.id;
      const isChecked = state.checkedItems[itemId];
      let updatedCheckedItems = { ...state.checkedItems };
      let updatedItemData = { ...state.itemData };

      if (isChecked) {
        delete updatedCheckedItems[itemId]; // Remove the item from checkedItems
        delete updatedItemData[itemId]; // Remove the item data as well
      } else {
        updatedCheckedItems[itemId] = true; // Add the item to checkedItems
      }

      const newStateToggle = {
        ...state,
        checkedItems: updatedCheckedItems,
        itemData: updatedItemData,
      };
      console.log("New state after TOGGLE_CHECKBOX:", newStateToggle);
      return newStateToggle;

    case STORE_CHECKED_ITEM_DATA:
      const newStateStore = {
        ...state,
        itemData: {
          ...state.itemData,
          [action.payload.id]: action.payload.data,
        },
      };
      console.log("New state after STORE_CHECKED_ITEM_DATA:", newStateStore);
      return newStateStore;

    default:
      return state;
  }
};

export default claimReducer;
