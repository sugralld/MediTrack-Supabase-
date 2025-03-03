// utils/medLabelImages.ts
export const classificationImages: Record<string, string> = {
    "Obat Bebas": "/images/img01.png",
    "Obat Bebas Terbatas": "/images/img02.png",
    "Obat Keras": "/images/img03.png",
    "Psikotropika": "/images/img03.png",
  };
  
  export const getLabelImage = (medLabel: string) => {
    return classificationImages[medLabel] || "/images/file.svg";
  };
  