import { Pressable, Text, View, StyleSheet } from "react-native";

interface CardListProps {
  title: string;
  description: string;
  quantity: string;
  navigate: () => void;
  handleToggle: () => void;
}

export function CardList({
  title,
  description,
  quantity,
  navigate,
  handleToggle,
}: CardListProps) {

  return (
    <Pressable
      style={styles.list}
      onPress={navigate}
      onLongPress={handleToggle}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.listTiltle}>{title}</Text>
        <Text>{quantity}</Text>
      </View>
      <Text style={styles.listDescription}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    width: "90%",
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    margin: 10,
  },
  listTiltle: {
    fontSize: 24,
    marginLeft: 10,
  },
  listDescription: {
    width: "85%",
    marginTop: 5,
    fontSize: 16,
    marginLeft: 10,
    textAlign: "justify",
  },
});
