import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../../components/button";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import useStorage from "../../hooks/useStorage";

type FormData = {
  nameList: string;
  dateTime: string;
  description: string;
};

export function FormList() {
  const navigation = useNavigation<StackTypes>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const { saveList } = useStorage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nameList: "",
      dateTime: "",
      description: "",
    },
  });

  const handleList = (data: FormData) => {
    const formdate = {
      ...data,
      dateTime: dateTime
        ? `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`
        : "",
    };
    if (
      formdate.nameList === "" ||
      formdate.description === "" ||
      formdate.dateTime === ""
    ) {
      console.log("preencha os campos");
      return;
    }
    saveList("@lists", formdate);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setDateTime(currentDate);

    if (Platform.OS !== "ios") {
      setShowTimePicker(true);
    }
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    if (selectedTime && dateTime) {
      const finalDateTime = new Date(
        dateTime.getFullYear(),
        dateTime.getMonth(),
        dateTime.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      setDateTime(finalDateTime);
    }
    setShowTimePicker(false);
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Pressable
          style={styles.arrowBack}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back" size={50} />
        </Pressable>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Criar uma nova lista</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={{ fontSize: 20, textAlign: "left" }}>Nome da lista</Text>
          <Controller
            control={control}
            name="nameList"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Insira o nome da sua lista"
                onChangeText={onChange}
                value={value}
                multiline={true}
              />
            )}
          />
        </View>
        <View
          style={{ width: "100%", alignItems: "center", marginVertical: 10 }}
        >
          <Text style={{ fontSize: 20, textAlign: "left" }}>Data e Hora</Text>
          <Pressable
            onPress={showDateTimePicker}
            style={{ width: "100%", alignItems: "center" }}
          >
            <TextInput
              style={[styles.input, { color: dateTime ? "#000" : "" }]}
              placeholder="Selecione data e hora"
              value={
                dateTime
                  ? `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`
                  : ""
              }
              editable={false}
            />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={dateTime || new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={dateTime || new Date()}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={{ fontSize: 20, textAlign: "left" }}>Descrição</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { height: 120 }]}
                placeholder="Insira a descrição"
                onChangeText={onChange}
                value={value}
                multiline={true}
              />
            )}
          />
        </View>
        <Button
          title="Criar lista"
          handleSubmit={handleSubmit(handleList)}
          width={"80%"}
          height={50}
          color={"#BBF246"}
          textColor={"#FFF"}
          disable={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginLeft: 10,
    flexDirection: "row",
  },
  arrowBack: {
    flex: 1,
  },
  titleSection: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    height: "auto",
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    textAlignVertical: "top",
    fontSize: 20,
  },
});
