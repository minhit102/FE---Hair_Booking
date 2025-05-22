"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon, RefreshCw } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import {
  getImageLightXResponse,
  getOrderStatus,
  preSignedUrl,
} from "@/services/try-hairStyle/try-hairstyle.api";

const LIGHTX_API_URL =
  "https://api.lightxeditor.com/external/api/v2/uploadImageUrl";
const LIGHTX_HAIRSTYLE_API_URL =
  "https://api.lightxeditor.com/external/api/v1/hairstyle";
const LIGHTX_ORDER_STATUS_API_URL =
  "https://api.lightxeditor.com/external/api/v1/order-status";
const LIGHTX_API_KEY = process.env.NEXT_PUBLIC_LIGHTX_API_KEY;

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to check order status
  const checkOrderStatus = async (orderId: string) => {
    try {
      const response = await getOrderStatus(orderId);

      if (response.status === 200 && response.data.body?.output) {
        setResultImage(response.data.body.output);
        setProcessingStep("");
        toast.success("Xử lý ảnh hoàn tất!");
        return true;
      } else if (response.status === 200 && !response.data.body?.output) {
        toast.error("Xử lý ảnh thất bại");
        setProcessingStep("");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking order status:", error);
      return false;
    }
  };

  // Effect to poll order status
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (orderId && !resultImage) {
      intervalId = setInterval(async () => {
        const isCompleted = await checkOrderStatus(orderId);
        if (isCompleted) {
          clearInterval(intervalId);
        }
        setRetryCount((prev) => prev + 1);
      }, 7000); // Check every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderId, resultImage]);

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

  const handleTryHairstyle = async () => {
    if (selectedImage) {
      try {
        setIsLoading(true);
        setProcessingStep("Đang chuẩn bị ảnh...");
        setResultImage(null);
        setRetryCount(0);

        // Convert base64 to Blob to get file size and type
        const base64Data = selectedImage.split(",")[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);

          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: "image/jpeg" });

        // Get image size and type
        const imageData = {
          size: blob.size,
          contentType: blob.type,
        };
        setProcessingStep("Đang lấy URL upload...");
        const signedUrlResponse = await preSignedUrl(imageData);
        console.log("==============signedUrlResponse", signedUrlResponse);
        console.log(
          "==============signedUrlResponsebody",
          signedUrlResponse.body
        );
        const { uploadImage, imageUrl } = signedUrlResponse.body;
        console.log("==============uploadImage", uploadImage);
        console.log("==============imageUrl", imageUrl);

        // Upload image to S3 using pre-signed URL
        setProcessingStep("Đang upload ảnh...");
        const data = await axios.put(uploadImage, blob, {
          headers: {
            "Content-Type": blob.type,
          },
        });

        console.log("==============data", data);

        // Send request to LightX API for image processing
        setProcessingStep("Đang xử lý ảnh...");
        const lightXResponse = await getImageLightXResponse({
          imageUrl: imageUrl,
          textPrompt: "French Crop",
        });

        console.log("==============lightXResponse", lightXResponse);
        console.log("==============lightXResponseData ", lightXResponse.data);

        if (lightXResponse.data.body?.orderId) {
          setOrderId(lightXResponse.data.body.orderId);
          setProcessingStep("Đang chờ xử lý ảnh...");
        }
      } catch (error: any) {
        console.error("Error processing image:", error);
        const errorMessage =
          error.response?.data?.message || "Có lỗi xảy ra khi xử lý ảnh";
        toast.error(errorMessage);
        setProcessingStep("");
      } finally {
        setIsLoading(false);
      }
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ảnh gốc</CardTitle>
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
                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={handleTryHairstyle}
                    className="flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {processingStep}
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-4 w-4" />
                        Thử kiểu tóc
                      </>
                    )}
                  </Button>
                  {processingStep && (
                    <p className="text-sm text-gray-500">{processingStep}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kết quả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {resultImage ? (
                  <Image
                    src={resultImage}
                    alt="Result"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {processingStep ? (
                      <div className="text-center">
                        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p>{processingStep}</p>
                      </div>
                    ) : (
                      "Chưa có kết quả"
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
