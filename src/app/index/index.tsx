import { View, Text } from "react-native";

import { styles } from "./styles";
import { Ingredients } from "../components/Ingredientes";
import { useState, useEffect } from "react";
import { services } from "@/app/services";

export default function Index() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }
    setSelected((state) => [...state, value]);
    console.log(selected);
  }

  useEffect(() => {
    services.ingredientes.findAll().then(setIngredients);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {"\n"}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu
      </Text>
      <Ingredients ingredientes={ingredients} />
    </View>
  );
}
