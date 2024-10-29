import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight, StyleSheet, DimensionValue } from "react-native";

interface AddButtonProps {
  handlePress: () => void;
  bottom: DimensionValue;
  left: DimensionValue;
}

export function AddButton({ bottom, left, handlePress }: AddButtonProps) {
  return (
    <TouchableHighlight
      style={[styles.button, { left: left || "50%", bottom: bottom || "5%" }]}
      onPress={handlePress}
    >
      <Ionicons name="add" size={50} color={"#FFF"} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#BBF246",
    width: 60,
    height: 60,
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    transform: [{ translateX: -30 }],
  },
});
