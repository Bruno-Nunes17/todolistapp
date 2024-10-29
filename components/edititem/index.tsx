import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "../button";
import useStorage from "../../hooks/useStorage";
import { useState } from "react";

interface EditItemProps {
  itemIndex: number;
  listIndex: number;
  itemTitle: string;
  handleClose: () => void;
  onResult: (result: []) => void;
  setItemTitle: (title: string) => void;
}

export function EditItem({
  itemIndex,
  listIndex,
  itemTitle,
  handleClose,
  setItemTitle,
  onResult,
}: EditItemProps) {
  const { removeItem, editItem } = useStorage();

  const handleDelete = async () => {
    const list = await removeItem("@lists", listIndex, itemIndex);
    onResult(list.items);
  };

  const handleEdit = async () => {
    const list = await editItem("@lists", listIndex, itemIndex, itemTitle);
    onResult(list.items);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.modal}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={itemTitle}
              onChangeText={setItemTitle}
            />
            <View style={styles.buttons}>
              <Button
                title="Deletar"
                textColor="#fff"
                width={"80%"}
                height={50}
                handleSubmit={handleDelete}
                color="#E82929"
                disable={false}
              />
              <Button
                title="Salvar"
                textColor="#fff"
                width={"80%"}
                height={50}
                handleSubmit={handleEdit}
                color="#BBF246"
                disable={false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(24, 24, 24, 0.6)",
  },
  container: {
    height: "auto",
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: "20%",
  },
  input: {
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 8,
    width: "80%",
    height: 50,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 20,
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});
