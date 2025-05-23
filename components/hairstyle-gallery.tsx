import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HairstyleImage {
  id: string;
  imageUrl: string;
  textPrompt: string;
  name: string;
}

const hairstyleImages: HairstyleImage[] = [
  {
    id: "1",
    imageUrl: "/hairstyles/anh1.png",
    textPrompt:
      "Apply a short, clean taper fade haircut. The sides should be faded gradually from the skin to a short length near the top. The top hair should be about 2 inches long, styled with a side part and a matte finish. Hair color should be natural black. Keep the face, facial features, skin tone, lighting, and background completely unchanged.",
    name: "French Crop Men",
  },
  {
    id: "2",
    imageUrl: "/hairstyles/pompadour.jpg",
    textPrompt:
      "A realistic photo of a young Asian man with smooth skin, oval face, black eyebrows, symmetrical facial features, neutral expression, white studio background, French crop hairstyle with 2-inch choppy fringe, textured top, short faded sides (0.5 inch), no hat, photorealistic, high quality, consistent hair length",
    name: "Pompadour Medium Men",
  },
  {
    id: "3",
    imageUrl: "/hairstyles/side-part.jpg",
    textPrompt:
      "A realistic photo of a young Asian man with smooth skin, oval face, black eyebrows, symmetrical facial features, neutral expression, white studio background, side part hairstyle with 3-inch neatly combed top, low fade sides (0.5 inch), no hat, photorealistic, high quality, consistent hair length",
    name: "Side Part Medium Men",
  },
  {
    id: "4",
    imageUrl: "/hairstyles/quiff.jpg",
    textPrompt:
      "A realistic photo of a young Asian man with smooth skin, oval face, black eyebrows, symmetrical facial features, neutral expression, white studio background, buzz cut hairstyle with uniform 0.5-inch hair, low fade sides, no hat, photorealistic, high quality, consistent hair length",
    name: "Quiff Men",
  },
];

interface HairstyleGalleryProps {
  onSelect: (textPrompt: string) => void;
  selectedPrompt?: string;
}

export function HairstyleGallery({
  onSelect,
  selectedPrompt,
}: HairstyleGalleryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {hairstyleImages.map((hairstyle) => (
        <div
          key={hairstyle.id}
          className={cn(
            "relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all",
            selectedPrompt === hairstyle.textPrompt
              ? "border-green-500"
              : "border-transparent hover:border-gray-300"
          )}
          onClick={() => onSelect(hairstyle.textPrompt)}
        >
          <Image
            src={hairstyle.imageUrl}
            alt={hairstyle.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-sm text-white font-medium">
              {hairstyle.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
