import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  title: string;
  handleSubmit: () => void;
  height: DimensionValue;
  width: DimensionValue;
  textColor: string;
  disable: boolean;
  color: string;
}

export function Button({
  title,
  height,
  width,
  textColor,
  disable,
  color,
  handleSubmit,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonSubmit,
        { height: height, width: width, backgroundColor: color },
      ]}
      onPress={handleSubmit}
      disabled={disable}
    >
      <Text style={[{ fontSize: 20 }, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSubmit: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});
