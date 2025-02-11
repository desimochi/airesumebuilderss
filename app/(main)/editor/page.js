import { auth } from "@clerk/nextjs/server";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
export const metadata = {
    title: "Edit Your Resume"
};

export default async function Page({ searchParams }) {
    const { resumeId } = await searchParams;

    const { userId } = await auth();
    if (!userId) return null;

    let resumeToEdit = null;

    if (resumeId) {
        try {
            resumeToEdit = await prisma.resume.findUnique({
                where: {
                    id: String(resumeId),
                    userId: userId
                },
                include: {
                    workExperiences: true,
                    educations: true
                }
            });

            console.log("Fetched resume:", resumeToEdit); // Debugging
        } catch (error) {
            console.error("Error fetching resume:", error);
            return null; // Prevents the page from breaking
        }
    }

    return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
