import { ScrollView, Alert } from "react-native";


import { styles } from "./styles";
import { Ingredient, IngredientsProps } from "../Ingrediente";
import { useState, useEffect } from "react";
import { Selected } from "../Selected";
import { router } from "expo-router";
import { services } from "@/app/services";


type Props = {
  ingredientes: IngredientsProps[] 
}

export function Ingredients({ ingredientes }: Props) {
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
    router.navigate('../recipes/' + selected)    
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {ingredientes.map((item) => (
        <Ingredient
          key={item.name}
          name={item.name}
          image={`${services.storage.imagePath}/${item.image}`}
          selected={selected.includes(item.name)}
          onPress={() => handleToggleSelected(item.name)}
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
