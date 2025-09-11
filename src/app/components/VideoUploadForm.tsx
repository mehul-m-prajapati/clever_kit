"use client";

import FileUpload from "./FileUpload";

function VideoUploadForm() {

  const onSuccess = (result: any) => {

    console.log('file uploaded');
    console.log(result);

  }

  const onProgress = () => {
  }

  return (
    <div>
        <FileUpload onSuccess={onSuccess} onProgress_={onProgress} fileType="video"></FileUpload>
    </div>
  )
}

export default VideoUploadForm
