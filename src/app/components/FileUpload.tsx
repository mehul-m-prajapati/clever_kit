"use client";

import { useState } from "react";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next"


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
        const {authenticationParameters: auth_params} = await resp.json();

        const result = await upload({
            file,
            fileName: file.name,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
            signature: auth_params.signature,
            expire: auth_params.expire,
            token: auth_params.token,
            onProgress: (event) => {
                const percent = (event.loaded / event.total) * 100;
                onProgress_?.(Math.round(percent));
            }
        });

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
    <div>
        <input
            type="file"
            accept={fileType === "video" ? "video/*" : "image/*"}
            onChange={handleFileChange}
        />
        {uploading && <span>Loading....</span>}

        {error && <p className="text-red-800 text-xl font-bold">{error}</p>}
    </div>
  )
}

export default FileUpload
