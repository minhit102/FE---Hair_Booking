"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
          setError(null);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Vui lòng tải lên file ảnh");
      }
    }
  };

  const handleTryOn = () => {
    if (selectedImage) {
      // Here you would typically send the image data to your server
      // for processing with the virtual try-on feature
      console.log("Image ready for try-on");
    }
  };

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">Tải ảnh lên</h1>
          <p className="text-gray-500">
            Tải lên ảnh khuôn mặt của bạn để thử các kiểu tóc khác nhau
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tải ảnh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Selected"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Nhấn để tải ảnh lên</p>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {error && <div className="text-red-500 text-center">{error}</div>}

            {selectedImage && (
              <div className="flex justify-center">
                <Button
                  onClick={handleTryOn}
                  className="flex items-center gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Thử kiểu tóc
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
