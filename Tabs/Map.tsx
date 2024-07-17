import { AppTextInput } from "@/components/AppTextInput";
import { AppTitle } from "@/components/AppTitle";
import { VStack, Image, ScrollView, Box, Center } from "native-base";
import MapView from 'react-native-maps';

export default function Map(){

  return (
    <ScrollView flex={1} bgColor="white">
      <VStack flex={1} alignItems="center" justifyContent="center" p={5}>
        <AppTitle fontSize="xl" color="green.800" alignSelf="flex-start">
          Mapa
        </AppTitle>

        <AppTextInput
            placeholder="Pesquisar Localização"
        />

        <MapView
            initialRegion={{
                latitude: -3.10719,
                longitude: -60.0261,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={{
                width: "100%",
                height: 500,
                marginTop: 20
            }}
        />
      </VStack>
    </ScrollView>
  );
}