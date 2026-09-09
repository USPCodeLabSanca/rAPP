import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import choice from './src/screens/choice';
import Form from './src/screens/Form/Form';
import Info_rep from './src/screens/Info_rep/Info_rep';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//esse componente é o responsável por criar a navegação por pilha (a única que usamos até agora)
//se vocês quiserem, podemos usar também outros tipos de navegação
const Stack = createNativeStackNavigator();

//função que retorna o app como um todo
export default function App() {
  return (
      //o SafeAreaProvider tem que vir antes de tudo sempre
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>{/* Container de navegação entre páginas*/}
        <Stack.Navigator>{/* Como se fosse uma 'div' que envolve as páginas da pilha */}
         {/* Cada Stack.screen é uma página*/}
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: '',
              //personalização do header (é o que fica em cima de tudo)
              headerStyle: {
                backgroundColor: '#FCEFDA',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#E6D8BB',
              },
              headerLeft: () => (
                <Image
                  source={require('./src/assets/logoRapp-removebg-preview.png')}
                  style={styles.logo}
                />
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={styles.SignIn}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.SignInText}>Entrar</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Login"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#FCEFDA',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#E6D8BB',
              },
            }}
          >
          {/*
              OBS: essa forma não é a usual de carregar as páginas, fiz isso para reutilizar o mesmo arquivo
              Basicamente, criei uma função anônima dentro do Stack.Screen que devolve a página
              Assim, posso passar parâmetros e customizar se o componente Forms é de login ou registro
          */}
            {(props) => <Form {...props} type={0} />}
          </Stack.Screen>
          <Stack.Screen
            name="choice"
            component={choice}
            options={{
                title: '',
                headerStyle: {
                backgroundColor: '#FCEFDA',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#E6D8BB',
              },
            }}
          />
          <Stack.Screen
              name="RegistroUser"
              options={{
                title: '',
                headerStyle: {
                  backgroundColor: '#FCEFDA',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E6D8BB',
                },
              }}
            >
              {(props) => <Form {...props} type={1} />}
          </Stack.Screen>
          <Stack.Screen
              name="RegistroRep"
              options={{
                title: '',
                headerStyle: {
                  backgroundColor: '#FCEFDA',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E6D8BB',
                },
              }}
            >
              {(props) => <Form {...props} type={2} />}
          </Stack.Screen>
          <Stack.Screen
            name="Info_rep"
            component={Info_rep}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#FCEFDA',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#E6D8BB',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 60,
    marginLeft: -60,
  },
  SignIn: {
    height: 45,
    width: 95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F26E21',
  },
  SignInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});