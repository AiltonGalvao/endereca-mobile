import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const saveFile = async (stringContent: string, fileFormat: string) => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(); // Essa linha pede permissão para acesso aos arquivos
      if (permissions.granted) { // Se a permissão for aceita, ele cria o arquivo no diretório escolhido
        const uri = await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, `${getCurrentTime()}.${fileFormat}`, `text/${fileFormat}`);
        await FileSystem.writeAsStringAsync(uri, stringContent, { encoding: FileSystem.EncodingType.UTF8 });
        console.log(`Arquivo salvo em ${uri}`);
      } else { // Se não for ele usa a Sharing API
        const path = `${FileSystem.documentDirectory}${getCurrentTime()}.${fileFormat}`;
        await FileSystem.writeAsStringAsync(path, stringContent, { encoding: FileSystem.EncodingType.UTF8 });
        await Sharing.shareAsync(path);
      }
    } catch (error) {
      console.log('Erro ao salvar arquivo:', error);
    }
  };

  function getCurrentTime() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //Janeiro é 0
    const yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}