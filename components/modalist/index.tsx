import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
} from "react-native";
import { Button } from "../button";

interface ModalListProps {
  handleClose: () => void;
  handleDelete: () => void;
}

export function ModalList({ handleClose, handleDelete }: ModalListProps) {
  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.modal}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Text style={styles.title}>Compras</Text>
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
  title: {
    marginTop: 15,
    marginBottom: 20,
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
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});
