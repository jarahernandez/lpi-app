import { View, Text, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { getFormulaWithMaterials } from "../apis";
import { FlatList } from "react-native-gesture-handler";

import { FormulaImages } from "../services/formulaImages.service";

const FormulaComplete = () => {
    const route = useRoute();
    const { formulaId } = route.params;

    const [formulaComplete, setFormulaComplete] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [batches, setBatches] = useState('1');

    const handleInputChange = (text) => {
        const parsedValue = parseInt(text, 10);
        if (!isNaN(parsedValue)) {
            setBatches(parsedValue.toString());
        } else {
            setBatches(text.trim() !== "" ? text : "1");
        }
    };

    const loadCompleteFormula = async () => {
        try {
            const data = await getFormulaWithMaterials(formulaId);
            setFormulaComplete(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCompleteFormula();
    }, []);

    const lowerDash = (str) => {
        const formattedStr = str.replace(/\s+/g, '-').toLowerCase();
        return formattedStr;
    };

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    const formattedName = lowerDash(formulaComplete[0]["formula_name"]);
    const formulaImage = FormulaImages.getImage(`${formattedName}.png`);

    return (
        <View>
            <View>
                <Image
                    source={formulaImage}
                    style={{ width: 100, height: 100 }}
                />
                <Text>Formula: {formulaComplete[0]["formula_name"]}</Text>
                {(batches === "" || batches === "1") ? (
                    <TextInput
                    placeholder="Enter number of batches..."
                    defaultValue=""
                    keyboardType="numeric"
                    onChangeText={handleInputChange}
                    />) 
                    :
                    (<TextInput
                        placeholder="Enter number of batches..."
                        defaultValue={batches}
                        keyboardType="numeric"
                        onChangeText={handleInputChange}
                    />)}
            </View>
            {formulaComplete && (
                <FlatList
                    data={formulaComplete}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text>
                                    {item.material_name}: {item.amount * batches}
                                </Text>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
};

export default FormulaComplete;
