import * as FileSystem from "expo-file-system";

export const saveMediaToCache = async (
  uri: string,
  filename: string,
): Promise<string> => {
  const fileUri = `${FileSystem.cacheDirectory}${filename}`;
  await FileSystem.copyAsync({
    from: uri,
    to: fileUri,
  });
  return fileUri;
};

export const deleteMediaFromCache = async (uri: string): Promise<void> => {
  try {
    await FileSystem.deleteAsync(uri);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
