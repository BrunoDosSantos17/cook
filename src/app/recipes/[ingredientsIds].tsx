import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "../components/Recipe";
import { View, Text, FlatList } from "react-native";

import { styles } from "./styles";
import { useEffect, useState } from "react";
import { services } from "../services";
import { Ingredients } from "../components/Ingredientes";

export default function Recipes() {

const params = useLocalSearchParams<{ingredientsIds: string}>()
const [ingredients, setIngredients] = useState<IngredientResponse[]>([])



const ingredientesIds = params.ingredientsIds.split(',');

useEffect(() => {
  services.ingredientes.findByIds(ingredientesIds).then(setIngredients)
}, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.back()}
        />

        <Text style={styles.title}>Ingredientes</Text>
      </View>

      <Ingredients ingredientes={ingredients}/>

      <FlatList
        data={["1"]}
        keyExtractor={(item) => item}
        renderItem={() => (
          <Recipe
            recipe={{
              name: "Omelete",
              image:
                "https://www.confeiteiradesucesso.com/wp-content/uploads/2022/11/receitaomeletefit.jpg",
              minutes: 10,
            }}
          />
        )}
      />
    </View>
  );
}
