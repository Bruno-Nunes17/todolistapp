import {
  StyleSheet,
  View,
  Pressable,
  Modal,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useIsFocused,
} from "@react-navigation/native";
import { StackParamList, StackTypes } from "../../routes";
import { useEffect, useState } from "react";
import { ModalItem } from "../../components/modalitem";
import { CardItem } from "../../components/carditem";
import { AddButton } from "../../components/addbutton";
import { Button } from "../../components/button";
import { EditItem } from "../../components/edititem";
import useStorage from "../../hooks/useStorage";

type ListRouteProp = RouteProp<StackParamList, "Lists">;

interface Items {
  title: string;
  finished: boolean;
}

export function List() {
  const navigation = useNavigation<StackTypes>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [itemIndex, setItemIndex] = useState(0);
  const [itemTitle, setItemTitle] = useState("");
  const [items, setItems] = useState<Items[]>([]);
  const { getList } = useStorage();
  const focused = useIsFocused();
  const route = useRoute<ListRouteProp>();
  const { index } = route.params;
  const listIndex = index

  const handleToggleModalItem = () => {
    setModalVisible(!modalVisible);
  };

  const handleToggleEditItem = () => {
    setModalEditVisible(!modalEditVisible);
  };
  const handleResult = (result: []) => {
    setItems(result);
  }

  const handleModalItemResult = (result: []) => {
    setItems(result);
    handleToggleModalItem();
  };

  const handleEditItemResult = (result: []) => {
    setItems(result);
    handleToggleEditItem();
  };

  function renderItems({ item, index }: ListRenderItemInfo<Items>) {
    return (
      <View style={styles.content}>
        <CardItem
        onResult={handleResult}
        itemIndex={index}
        listIndex={listIndex}
        itemStatus={item.finished}
          handlePress={() => {
            setModalEditVisible(!modalEditVisible);
            setItemIndex(index);
            setItemTitle(item.title)
          }}
          title={item.title}
        />
      </View>
    );
  }

  useEffect(() => {
    async function loadLists() {
      const lists = await getList("@lists");
      if (Array.isArray(lists)) {
        setItems(lists[index].items);
      } else {
        setItems([]);
      }
    }

    loadLists();
  }, [focused]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" size={50} />
        </Pressable>
      </View>
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item, index) => String(item.title)}
          renderItem={renderItems}
        />
      </View>
      <Modal
        visible={modalEditVisible}
        transparent={true}
        onRequestClose={handleToggleEditItem}
      >
        <EditItem
          itemTitle={itemTitle}
          setItemTitle={setItemTitle}
          itemIndex={itemIndex}
          listIndex={index}
          onResult={handleEditItemResult}
          handleClose={handleToggleEditItem}
        />
      </Modal>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={handleToggleModalItem}
      >
        <ModalItem
          handleClose={handleToggleModalItem}
          index={index}
          onResult={handleModalItemResult}
        />
      </Modal>
      <AddButton
        bottom={"2%"}
        left={"50%"}
        handlePress={handleToggleModalItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    marginVertical: 20,
    marginLeft: 10,
  },
  content: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});
