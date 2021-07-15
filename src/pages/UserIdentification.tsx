import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Keyboard } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Button } from "../components/Button";
export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();
  const [error, setError] = useState(false);

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setError(false);
    setName(value);
  }

  function handleError() {
    setError(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  const navigation = useNavigation();

  function handleNavigation() {
    if (isFilled) {
      navigation.navigate("Confirmation");
    } else {
      handleError();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {error != true ? (isFilled ? "😁" : "😃") : "😦"}
                </Text>
                <Text style={styles.title}>
                  {" "}
                  Como podemos {"\n"} chamar você?
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    (isFocused || isFilled) != error && {
                      borderColor: colors.green,
                    },
                    error && { borderColor: colors.red },
                  ]}
                  placeholder="Digite um nome"
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onChangeText={handleInputChange}
                ></TextInput>
                <View style={styles.footer}>
                  <Button onPress={handleNavigation}>Confirmar</Button>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  content: {
    flex: 1,
    width: "100%",
  },

  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },

  header: {
    alignItems: "center",
    // flex: 1,
    width: "100%",
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  emoji: {
    fontSize: 44,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },

  footer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
});
