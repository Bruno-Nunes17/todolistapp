import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import useStorage from "../../hooks/useStorage";

interface CardItemProps {
  title: string;
  itemIndex: number;
  listIndex: number;
  itemStatus: boolean;
  handlePress: () => void;
  onResult: (result: []) => void;
}

export function CardItem({
  title,
  itemIndex,
  itemStatus,
  listIndex,
  handlePress,
  onResult,
}: CardItemProps) {
  const [isChecked, setChecked] = useState(itemStatus);
  const { updateItemStatus } = useStorage();

  const handleUpdate = async () => {
    const list = await updateItemStatus(
      "@lists",
      listIndex,
      itemIndex,
      !itemStatus
    );
    onResult(list.items);
    setChecked(!isChecked);
  };
  return (
    <Pressable style={styles.item} onLongPress={handlePress}>
      <Text style={styles.itemTiltle}>{title}</Text>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={handleUpdate}
        color={isChecked ? "#BBF246" : undefined}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    width: "90%",
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  itemTiltle: {
    fontSize: 20,
    marginLeft: 10,
    width: "80%",
  },
  checkbox: {
    marginHorizontal: 20,
    height: 40,
    width: 40,
    borderRadius: 8,
  },
});
