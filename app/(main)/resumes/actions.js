"use server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

 
export async function deleteResume(id) {
    const {userId} = await auth()
    if(!userId){
        throw new Error("user not authenticated")
    }
    const resume = await prisma.resume.findUnique({
        where:{
            id,
            userId
        },

        include:{
            workExperiences: true, 
        educations: true 
        }
    })
    if(!resume){
        throw new Error("Resume not found")
    }
    await prisma.workExperience.deleteMany({
        where: { resumeId: id },
    });
    await prisma.education.deleteMany({
        where: { resumeId: id },
    });
    if (resume.photoUrl) {
        try {
            await del(resume.photoUrl);
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    }
    await prisma.resume.delete({
        where:{
            id
        }
    })
    revalidatePath("/resumes")
}