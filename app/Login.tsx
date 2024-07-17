import { VStack, Image, Box } from "native-base";
import { AppButton } from "@/components/AppButton";
import { AppTextInput } from "@/components/AppTextInput";
import { AppTitle } from "@/components/AppTitle";
// import Logo from "@/assets/Logo.png";

export default function Login({ navigation }: { navigation: any }) {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={5}>
      <Image source={require("@/assets/Logo.png")} alt="Logo Endereça" style={{height: 50, resizeMode: "contain"}}/>

      <AppTitle>
        Faça login em sua conta
      </AppTitle>

      <Box>
        <AppTextInput
          label="Email"
          placeholder="Insira seu endereço de e-mail"
        />
        <AppTextInput
          label="Senha"
          placeholder="Insira sua senha"
          secureTextEntry={true}
        />
      </Box>
      <AppButton onPress={() => navigation.navigate('Tabs')}>Entrar</AppButton>
    </VStack>
  );
}