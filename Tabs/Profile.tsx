import { AppButton } from "@/components/AppButton";
import { AppTitle } from "@/components/AppTitle";
import { User } from "@/interfaces/User";
import { getUserData } from "@/services/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VStack, Avatar, Box } from "native-base";
import { useEffect, useState } from "react";

export default function Profile({ navigation }: { navigation: any }){
  const [userData, setUserData] = useState({} as User);
  const blankPfp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    async function userData() {
      const userId = await AsyncStorage.getItem("userId");

      if(!userId) return null;

      const result = await getUserData(userId);
      if(result) {
        setUserData(result);
        console.log(result);
      }
    }
    userData();
  }, []);

  function logout() {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("clientId");
    navigation.replace("Login");
  }

  return (
    <VStack flex={1} bgColor="#fff" alignItems="center" p={5}>
      <AppTitle fontSize="xl" color="green.800">
        Perfil
      </AppTitle>

      <Avatar size="xl" source={{ uri: userData?.profilePicture ?  userData.profilePicture : blankPfp}} mt={5} />

      <AppTitle color="green.800">Informações</AppTitle>

      <AppTitle fontSize="md">{userData.name}</AppTitle>

      <AppTitle fontSize="md">{userData.email}</AppTitle>

      <Box flexGrow={1} />

      <AppButton mb={5} onPress={logout}>
        Sair
      </AppButton>
    </VStack>
  );
}