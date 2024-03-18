import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/theme";

import Animated, { SlideInDown, BounceOutDown } from "react-native-reanimated";
import { Button } from "../Button";
import { styles } from "./styles";

type Props = {
  quantity: number;
  onClear: () => void;
  onSearch: () => void;
};

export function Selected({ quantity, onClear, onSearch }: Props) {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.duration(500)}
      exiting={BounceOutDown}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{quantity} Ingredients selecionados</Text>
        <MaterialIcons
          color={theme.colors.gray_400}
          name="close"
          size={24}
          onPress={onClear}
        />
      </View>

      <Button title="Encontrar"onPress={onSearch}/>
    </Animated.View>
  );
}
