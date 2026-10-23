import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import HomeScreen from '../../features/home/presentation/screens/HomeScreen';
import FormScreen from '../../features/auth/presentation/screens/FormScreen';
import InfoRepScreen from '../../features/profile/presentation/screens/InfoRepScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#FCEFDA',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#E6D8BB',
              },
              headerLeft: () => (
                <Image
                  source={require('../../assets/logoRapp-removebg-preview.png')}
                  style={styles.logo}
                />
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={styles.SignIn}
                  onPress={() => navigation.navigate('Login' as never)}
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
            {(props) => <FormScreen {...props} type={0} />}
          </Stack.Screen>
          <Stack.Screen
            name="choice"
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
            {(props) => <FormScreen {...props} type={1} />}
          </Stack.Screen>
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
              {(props) => <FormScreen {...props} type={1} />}
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
              {(props) => <FormScreen {...props} type={2} />}
          </Stack.Screen>
          <Stack.Screen
            name="Info_rep"
            component={InfoRepScreen}
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
