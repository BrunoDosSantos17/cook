import { ScrollView, Alert } from "react-native";



import { styles } from "./styles";
import { Ingredient } from "../Ingrediente";
import { useState } from "react";
import { Selected } from "../Selected";
import { router } from "expo-router";

export function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }
    setSelected((state) => [...state, value]);
    console.log(selected);
  }

  function handleClearSelected() {
    Alert.alert("Limpar", "Deseja limpar tudo", [
      {text: "Não", style: "cancel"},
      {text: "Sim", onPress: () =>  setSelected([])}
    ]);
  }

  function handleSearch() {
    router.navigate('../recipes')    
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: 100 }).map((item, index) => (
        <Ingredient
          key={index}
          name="Tomate"
          image=""
          selected={selected.includes(String(index))}
          onPress={() => handleToggleSelected(String(index))}
        />
      ))}
      {selected.length > 0 &&
        (<Selected
        quantity={selected.length}
        onClear={handleClearSelected}
        onSearch={handleSearch}
      />)}
    </ScrollView>
  );
}
