import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes";
import { ModalList } from "../../components/modalist";
import { useEffect, useState } from "react";
import { CardList } from "../../components/cardlist";
import { AddButton } from "../../components/addbutton";
import useStorage from "../../hooks/useStorage";

type Item = {
  finished: boolean;
  title: string;
};

interface ListItem {
  dateTime: string;
  description: string;
  nameList: string;
  items: [];
}

export function Home() {
  const navigation = useNavigation<StackTypes>();
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(Number);
  const [list, setList] = useState<ListItem[]>([]);
  const { getList, removeList } = useStorage();
  const focused = useIsFocused();

  const handleToggle = () => {
    setModalVisible(!modalVisible);
  };

  const handleQuantity = (items: Item[]) => {
    const countFinishedItems = items.reduce((count, item) => {
      return item.finished ? count + 1 : count;
    }, 0);

    return countFinishedItems === items.length
      ? "Concluido"
      : `${countFinishedItems}/${items.length}`;
  };

  const handleDelete = async () => {
    const lists = await removeList("@lists", index);
    setList(lists);
    handleToggle();
  };

  const indexToRemove = (index: number) => {
    setIndex(index);
  };

  function renderLists({ item, index }: ListRenderItemInfo<ListItem>) {
    return (
      <View style={styles.content}>
        <CardList
          title={item.nameList}
          description={item.description}
          quantity={handleQuantity(item.items)}
          navigate={() => navigation.navigate("Lists", { index })}
          handleToggle={() => {
            handleToggle();
            indexToRemove(index);
          }}
        />
      </View>
    );
  }

  useEffect(() => {
    async function loadLists() {
      const lists = await getList("@lists");
      if (Array.isArray(lists)) {
        setList(lists);
      } else {
        setList([]);
      }
    }

    loadLists();
  }, [focused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Listas</Text>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLists}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={handleToggle}
      >
        <ModalList handleDelete={handleDelete} handleClose={handleToggle} />
      </Modal>
      <AddButton
        handlePress={() => navigation.navigate("FormList")}
        bottom={"2%"}
        left={"50%"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    marginBottom: 5,
  },
});
