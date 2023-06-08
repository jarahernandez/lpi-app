import { View, FlatList, Button, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getFormulas } from "../apis";

import { FormulaImages } from "../services/formulaImages.service";


const HomeScreen = ({ navigation }) => {
  const [formulas, setFormulas] = useState([]);

  const loadFormulas = async () => {
    const data = await getFormulas();
    setFormulas(data);
  };

  useEffect(() => {
    loadFormulas();
  }, []);

  const onPressHandler = (formulaId) => {
    navigation.navigate("Formula Complete", { formulaId });
  };

  const lowerDash = (str) => {
    const formattedStr = str.replace(/\s+/g, '-').toLowerCase();
    return formattedStr;
  };

  return (
    <View>
      <FlatList
        data={formulas}
        renderItem={({ item }) => {
          const formattedName = lowerDash(item.formula_name);
          const formulaImage = FormulaImages.getImage(`${formattedName}.png`);
          return (
            <View>
              <Image
                source={formulaImage}
                style={{ width: 60, height: 60 }}
              />
              <Button
                title={item.formula_name}
                onPress={() => onPressHandler(item.id)}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;
