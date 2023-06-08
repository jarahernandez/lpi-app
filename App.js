import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import FormulaForm from "./screens/FormulaForm";
import FormulaComplete from "./screens/FormulaComplete";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const [formulaId, setFormulaId] = useState();

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home Screen"
        component={HomeScreen}
      />
      <Drawer.Screen name="Formula Form" component={FormulaForm} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={DrawerNav}
        />
        <Stack.Screen name="Formula Complete" component={FormulaComplete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
