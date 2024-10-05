export const getCategoryImage = (industryName: string, categoryImage: Record<string, any>) => {
  const defaultImage = {
    url: 'default-image-url',
    bgColor: 'default-bg-color',
  };

  return categoryImage[industryName] || defaultImage;
};
