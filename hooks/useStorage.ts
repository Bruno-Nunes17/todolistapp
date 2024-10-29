import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ListItem {
  nameList: string;
  dateTime: string;
  description: string;
  items: [{ title: string; finished: boolean }];
}

const useStorage = () => {
  const getList = async (key: string) => {
    try {
      const lists = await AsyncStorage.getItem(key);
      return lists ? JSON.parse(lists) : [];
    } catch (error) {
      console.log(error);
    }
  };
  const saveList = async (key: string, data: object) => {
    try {
      const lists = await getList(key);
      const formattedData = { ...data, items: [] };
      lists.push(formattedData);
      await AsyncStorage.setItem(key, JSON.stringify(lists));
    } catch (error) {
      console.log(error);
    }
  };
  const saveItem = async (key: string, index: number, item: object) => {
    try {
      const lists = await getList(key);
      lists[index].items.push(item);
      await AsyncStorage.setItem(key, JSON.stringify(lists));
      return lists;
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (
    key: string,
    listIndex: number,
    itemIndex: number
  ) => {
    try {
      const lists = await getList(key);
      const newItems = lists[listIndex].items.filter(
        (items: ListItem, index: number) => index !== itemIndex
      );
      lists[listIndex].items = newItems;
      await AsyncStorage.setItem(key, JSON.stringify(lists));
      return lists[listIndex];
    } catch (error) {
      console.log(error);
    }
  };
  const removeList = async (key: string, indexToRemove: number) => {
    try {
      const lists = await getList(key);
      const newList = lists.filter(
        (lists: ListItem, index: number) => index !== indexToRemove
      );
      await AsyncStorage.setItem(key, JSON.stringify(newList));
      return newList;
    } catch (error) {
      console.log(error);
    }
  };
  const editItem = async (
    key: string,
    listIndex: number,
    itemIndex: number,
    itemTitle: string
  ) => {
    try {
      const lists = await getList(key);
      const filteredItem = lists[listIndex].items.filter(
        (items: ListItem, index: number) => index === itemIndex
      );
      const updatedItem = { ...filteredItem[0], title: itemTitle };

      lists[listIndex].items[itemIndex] = updatedItem;

      await AsyncStorage.setItem(key, JSON.stringify(lists));
      return lists[listIndex];
    } catch (error) {
      console.log(error);
    }
  };
  const updateItemStatus = async (
    key: string,
    listIndex: number,
    itemIndex: number,
    itemStatus: boolean
  ) => {
    try {
      const lists = await getList(key);
      const filteredItem = lists[listIndex].items.filter(
        (items: ListItem, index: number) => index === itemIndex
      );
      const updatedItem = { ...filteredItem[0], finished: itemStatus };

      lists[listIndex].items[itemIndex] = updatedItem;

      await AsyncStorage.setItem(key, JSON.stringify(lists));
      return lists[listIndex];
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getList,
    saveItem,
    saveList,
    removeItem,
    removeList,
    editItem,
    updateItemStatus,
  };
};

export default useStorage;
