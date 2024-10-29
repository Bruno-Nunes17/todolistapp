import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Button } from "../button";
import { useState } from "react";
import useStorage from "../../hooks/useStorage";

interface ModalItemProps {
  handleClose: () => void;
  index: number;
  onResult: (result: []) => void;
}

export function ModalItem({ handleClose, index, onResult }: ModalItemProps) {
  const [itemTitle, setItemTitle] = useState("");
  const { saveItem } = useStorage();

  const handleCreate = async () => {
    const item = { title: itemTitle, finished: false };
    const items = await saveItem("@lists", index, item);
    onResult(items[index].items);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.modal}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Text style={styles.title}>Novo Item</Text>
            <TextInput
              style={styles.input}
              value={itemTitle}
              placeholder="Insira o nome do item"
              onChangeText={setItemTitle}
            />
            <Button
              title="Adicionar"
              textColor="#fff"
              width={"80%"}
              height={50}
              handleSubmit={handleCreate}
              color="#BBF246"
              disable={false}
            />
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
    height: 220,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: "20%",
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 20,
    borderWidth: 2,
    borderRadius: 8,
    width: "80%",
    height: 50,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 20,
  },
});
