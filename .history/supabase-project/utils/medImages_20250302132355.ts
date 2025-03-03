// utils/medImages.ts
export const classificationImages: Record<string, string> = {
    "Obat Bebas": "/images/img01.png",
    "Obat Bebas Terbatas": "/images/img02.png",
    "Obat Keras": "/images/img03.png",
    "Obat Psikotropika": "/images/img03.png",
  };
  
  export const getLabelImage = (classification: string) => {
    return classificationImages[classification] || "/images/file.svg";
  };
  