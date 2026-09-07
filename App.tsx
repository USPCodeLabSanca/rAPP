import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Image, View, Text } from 'react-native';
import Home from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style = {{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: '',
                headerStyle: {
                  backgroundColor: '#FCEFDA',
                      elevation: 0, // Remove a sombra nativa do Android
                      shadowOpacity: 0, // Remove a sombra nativa do iOS
                      borderBottomWidth: 1,
                      borderBottomColor: '#E6D8BB',
                },
                headerLeft: ()=>(
                    <Image
                        source={require('./src/logoRapp-removebg-preview.png')}
                        style = {styles.logo}
                    />
                ),
                headerRight: ()=>(
                    <View style = {styles.SignIn}>
                        <Text  style = {styles.SignInText}>Entrar</Text>
                    </View>
                )
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
  logo:{
      width: 120,
      height: 35,
      marginLeft: -30,
  },
  SignIn:{
      height: 35,
      width: 70,
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: '#F26E21',
  },
  SignInText:{
      color: 'white',
      textAlign: 'center',
  }
});