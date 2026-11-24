import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HomeScreen from '../../features/home/presentation/screens/HomeScreen';
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
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#f3eee6',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#EAE4D9',
              },
              headerLeft: () => (
                <View style={styles.headerLeftContainer}>
                  <Text style={styles.logoTitle}>Rapp.</Text>
                  <Text style={styles.logoSubtitle}>repúblicas de São Carlos</Text>
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Info_rep"
            component={InfoRepScreen}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#f3eee6',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#EAE4D9',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  logoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e85d2c',
    letterSpacing: -0.5,
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#786F68',
    fontWeight: '400',
  },
});
