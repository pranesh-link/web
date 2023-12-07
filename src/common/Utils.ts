export const getImage = async (fileName: string) => {
  const image = await import(`../assets/${fileName}`);
  return image.default;
};
