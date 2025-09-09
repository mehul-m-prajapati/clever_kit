import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import VideoModel, {IVideo} from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    try {
        await connectToDatabase();
        const videos = await VideoModel.find({}).sort({createdAt: -1}).lean();

        if (!videos || videos.length === 0) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(videos, {status: 200});
    }
    catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {

    try {
        const session = getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const reqBody: IVideo = await request.json();

        if (
            !reqBody.title ||
            !reqBody.description ||
            !reqBody.videoUrl ||
            !reqBody.thumbnailUrl
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const videoData = {
            ...reqBody,
            controls: reqBody?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: reqBody.transformation?.quality ?? 100,
            },
        }
        const newVideo = VideoModel.create(videoData);

        return NextResponse.json(newVideo);
    }
    catch (error) {
        return NextResponse.json(
            { error: "Failed to create video" },
            { status: 500 }
        );
    }
}
