import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        const resumeData = await req.json();
        console.log("Received resume data:", resumeData);
        const { photo, workExperiences, educations, ...resumedata} = resumeData
        const {userId} = await auth()
        if(!userId){
            throw new Error("User not authenticated")
        }
        // TODO: Save resumeData to a database (MongoDB, PostgreSQL, etc.) Premimum user limit

        return Response.json({ message: "Resume saved successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error saving resume:", error);
        return Response.json({ error: "Failed to save resume" }, { status: 500 });
    }
}
