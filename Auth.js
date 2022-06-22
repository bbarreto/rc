import { StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button, IconButton, Text, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { textState } from './atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image from "./assets/bg-auth.png";

export default function Welcome({ navigation }) {
  const [email, setEmail] = useState('teste@teste.com');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('123456');
  const [text, setText] = useRecoilState(textState);
  
  const signIn = () => {
    if (!email) return alert("Preencha o e-mail.");
    if (!password) return alert("Preencha a senha.");

    if (email !== "teste@teste.com") {
      return alert("E-mail não cadastrado.");
    }

    if (password !== "123456") {
      return alert("Senha inválida.");
    }

    setText(email);
    AsyncStorage.setItem('userSession', email);
    navigation.navigate('Feed');
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text variant="h4" style={styles.title}>Bem-vindo</Text>
        <TextInput variant="filled" value={email} onChangeText={setEmail} keyboardType='email-address' label="E-mail" style={styles.input} />
        <TextInput
          variant="filled"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          keyboardType='visible-password'
          label="Senha"
          style={styles.input}
          trailing={props => (
            <IconButton onPress={() => setIsPasswordVisible(!isPasswordVisible)} icon={props => <Icon name={isPasswordVisible ? "eye-off" : "eye"} {...props} />} {...props} />
          )}
        />
        <Button title="Entrar" onPress={signIn} style={[styles.button, styles.signin]} />
        <Button variant='text' uppercase={false} title="Fazer cadastro" onPress={() => alert("🎉🎉🎉")} style={[styles.button, styles.signup]}/>
      </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
