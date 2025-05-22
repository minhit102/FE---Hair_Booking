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
    imageUrl:
      "https://numihair.com/wp-content/uploads/2024/08/french-crop-haircut.jpg",
    textPrompt: "French Crop Men",
    name: "French Crop Men",
  },
  {
    id: "2",
    imageUrl: "https://phuloc.com.vn/uploads/blog/classic-pompadour.jpg",
    textPrompt: "Pompadour Medium Men",
    name: "Pompadour Medium Men",
  },

  {
    id: "3",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9kYMK04Gtt_98l4ZZYYbjqIO-nlhq-u6xw&s",
    textPrompt: "Side Part Medium Men",
    name: "Side Part Medium Men",
  },
  {
    id: "4",
    imageUrl:
      "https://i.pinimg.com/736x/cd/06/87/cd06874ebcad5ed5e1aa18e1388f4c32.jpg",
    textPrompt: "Quiff Men",
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
            unoptimized
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
