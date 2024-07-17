import { VStack, Image, ScrollView } from "native-base";

export default function Addresses(){

  return (
    <ScrollView flex={1} bgColor="white">
      <VStack flex={1} alignItems="flex-start" justifyContent="flex-start" p={5}>
        <Image source={require("@/assets/Logo.png")} alt="Logo Endereça" style={{height: 50, resizeMode: "contain"}} />
      </VStack>
    </ScrollView>
  );
}