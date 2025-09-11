"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next"
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";


interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress_?: (progress: number) => void;
  fileType?: "image" | "video";
}

function FileUpload({ onSuccess, onProgress_, fileType }: FileUploadProps) {

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {

    if (fileType === "video") {
        if (!file.type.startsWith("video/")) {
            setError("Please upload a valid video file");
        }
    }

    if (file.size > 100 * 1024 * 1024) {
        setError("File size must be less than 100 MB");
    }

    return true;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (!file || !validateFile(file))
        return;

    setUploading(true);
    setError(null);

    try {
        const resp = await fetch("/api/auth/imagekit-auth");
        const {authenticationParameters: auth_params, publicKey} = await resp.json();

        const result = await upload({
            file,
            fileName: file.name,
            publicKey,
            signature: auth_params.signature,
            expire: auth_params.expire,
            token: auth_params.token,
            onProgress: (event) => {
                const percent = (event.loaded / event.total) * 100;
                onProgress_?.(Math.round(percent));
            }
        });

        const videoData: any = {
            title: result.name,
            description: (result as any).description ?? 'My video',
            videoUrl: result.url,
            thumbnailUrl: `${result.url}/preview.jpg?tr=so-0`
        }

        await apiClient.createVideo(videoData);

        onSuccess(result);
    }
    catch (error) {
        console.error("Upload failed", error)
    }
    finally {
        setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
        {/* File Input */}
        <label className="block">
            <span className="block text-sm font-medium text-gray-50 mb-1">Choose a {fileType} file</span>
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white hover:file:bg-blue-700
                    cursor-pointer transition"
            />
        </label>

        {/* Loader */}
        {uploading && (
            <div className="flex items-center gap-2 text-blue-600">
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Uploading...</span>
            </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
    </div>
  )
}

export default FileUpload
