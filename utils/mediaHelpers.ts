import * as FileSystem from "expo-file-system";

export const saveMediaToCache = async (
  uri: string,
  filename: string,
): Promise<string> => {
  const cacheDir = FileSystem.cacheDirectory!;

  const fileUri = cacheDir + filename;

  await FileSystem.copyAsync({
    from: uri,
    to: fileUri,
  });

  return fileUri;
};

export const deleteMediaFromCache = async (uri: string): Promise<void> => {
  await FileSystem.deleteAsync(uri, { idempotent: true });
};
