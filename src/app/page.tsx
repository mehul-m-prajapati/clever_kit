'use client'

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import { Video } from "@imagekit/next";
import VideoComponent from "./components/VideoComponent";


export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
        try {
            const resp: any = await apiClient.getVideos();

            console.log(resp);
            setVideos(resp);

        } catch (error) {
            console.log("error fetching videos", error);
        }
    }

    fetchVideos();
  }, []);

  return (
    <>
        {videos.map(video => (
            <>
                {/*<VideoComponent video={video} />*/}
                <Video
                    key={video.videoUrl}
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={video.videoUrl}
                    controls={video.controls}
                    width={video.transformation?.width}
                    height={video.transformation?.height}
                />
            </>
        ))}
    </>
  );
}
