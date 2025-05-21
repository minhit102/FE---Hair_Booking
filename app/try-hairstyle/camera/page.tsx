"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Camera,
  CameraOff,
  FlipHorizontal,
  Camera as CameraIcon,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      // Kiểm tra xem trình duyệt có hỗ trợ getUserMedia không
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Trình duyệt của bạn không hỗ trợ truy cập camera");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Đảm bảo video được tải
        await videoRef.current.play();
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      let errorMessage = "Không thể truy cập camera";

      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          errorMessage =
            "Vui lòng cho phép truy cập camera trong trình duyệt của bạn";
        } else if (error.name === "NotFoundError") {
          errorMessage = "Không tìm thấy camera trên thiết bị của bạn";
        } else if (error.name === "NotReadableError") {
          errorMessage = "Camera đang được sử dụng bởi ứng dụng khác";
        }
      }

      setError(errorMessage);
      toast.error(errorMessage);
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOn(false);
    setError(null);
  };

  const flipCamera = async () => {
    stopCamera();
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFlipped ? "user" : "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setIsFlipped(!isFlipped);
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error flipping camera:", error);
      toast.error("Không thể chuyển đổi camera");
      setError("Không thể chuyển đổi camera");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to image data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);

        // Stop the camera after capturing
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleTryHairstyle = async () => {
    if (capturedImage) {
      try {
        // Convert base64 to Blob to get file size and type
        const base64Data = capturedImage.split(",")[1];
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
        const signedUrl = await axios.post("/api/pre-signed-url", imageData);

        // Get pre-signed URL from API
        // const response = await axios.post("/api/pre-signed-url", imageData);

        // if (response.data) {
        //   // Here you can handle the pre-signed URL response
        //   console.log("Pre-signed URL received:", response.data);
        //   toast.success("Đã sẵn sàng để thử kiểu tóc!");
        // }
      } catch (error) {
        console.error("Error getting pre-signed URL:", error);
        toast.error("Có lỗi xảy ra khi xử lý ảnh");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative aspect-[4/3] bg-black">
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <CameraOff className="w-16 h-16" />
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-4 text-center">
                  {error}
                </div>
              )}
            </>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={capturedImage}
                alt="Captured"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="p-4 flex justify-center gap-4">
          {!capturedImage ? (
            <>
              <Button
                onClick={isCameraOn ? stopCamera : startCamera}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                {isCameraOn ? (
                  <>
                    <CameraOff className="w-5 h-5" />
                    Tắt camera
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Bật camera
                  </>
                )}
              </Button>

              {isCameraOn && (
                <>
                  <Button
                    onClick={flipCamera}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <FlipHorizontal className="w-5 h-5" />
                    Đổi camera
                  </Button>

                  <Button
                    onClick={capturePhoto}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <CameraIcon className="w-5 h-5" />
                    Chụp ảnh
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={retakePhoto}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Chụp lại
              </Button>

              <Button
                onClick={handleTryHairstyle}
                size="lg"
                className="flex items-center gap-2"
              >
                Thử kiểu tóc
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
