import { StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from "@react-native-material/core";
import { SafeAreaView } from 'react-native-safe-area-context';
import { textState } from './atoms';

import React from 'react';
import {
  useRecoilState,
} from 'recoil';

export default function Feed({ navigation }) {
  console.log(textState)
  const [text, setText] = useRecoilState(textState);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Olá, {text}</Text>
        <Button variant="contained" title="Sair" onPress={() => {
          setText(null);
          navigation.navigate('Auth');
        }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  input: {
    margin: 5,
    width: "100%",
  },
  signin: {
    marginBottom: 10
  },
  button: {
    marginVertical: 5,
    width: "100%"
  },
  signup: {
    backgroundColor: "white",
  }
});
