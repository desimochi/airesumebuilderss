"use server";
import prisma from "@/lib/prisma";
import { resumeSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(resumeValue) {
    const { id } = resumeValue;
    console.log("received values", resumeValue);
    const { photo, workExperiences, educations, ...resumevalues } = resumeSchema.parse(resumeValue);

    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const existingResume = id ? await prisma.resume.findUnique({ where: { id, userId } }) : null;
    if (id && !existingResume) {
        throw new Error("Resume Not Found");
    }

    let newPhotourl = undefined;

    // Handle photo upload and URL storage
    if (photo instanceof File) {
        if (existingResume?.photoUrl) {
            await del(existingResume.photoUrl); // Delete existing photo if any
        }
        const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, { access: "public" });
        newPhotourl = blob.url;
    } else if (photo === null) {
        if (existingResume?.photoUrl) {
            await del(existingResume.photoUrl); // Delete existing photo if set to null
        }
        newPhotourl = null;
    }

    // Update existing resume if `id` is present
    if (id) {
        return prisma.resume.update({
            where: { id },
            data: {
                ...resumevalues,
                photoUrl: newPhotourl,
                workExperiences: workExperiences
                    ? {
                        deleteMany: {},
                        create: workExperiences.map((exp) => ({
                            ...exp,
                            startDate: exp.startDate ? new Date(exp.startDate) : null,
                            endDate: exp.endDate ? new Date(exp.endDate) : null,
                        })),
                    }
                    : { deleteMany: {} }, // Ensure that the work experiences are handled correctly
                educations: educations
                    ? {
                        deleteMany: {},
                        create: educations.map((exp) => ({
                            ...exp,
                            startDate: exp.startDate ? new Date(exp.startDate) : null,
                            endDate: exp.endDate ? new Date(exp.endDate) : null,
                        })),
                    }
                    : { deleteMany: {} }, // Ensure that the educations are handled correctly
                updatedAt: new Date(),
            },
        });
    } else {
        // Create new resume if `id` is not present
        return prisma.resume.create({
            data: {
                userId: userId, // Ensure `userId` is used from authentication
                photoUrl: resumeValue.photoUrl ?? null, // Ensure null instead of undefined for photoUrl
                workExperiences: resumeValue.workExperiences?.length
                    ? {
                        create: resumeValue.workExperiences.map((exp) => ({
                            ...exp,
                            startDate: exp.startDate ? new Date(exp.startDate) : null,
                            endDate: exp.endDate ? new Date(exp.endDate) : null,
                        })),
                    }
                    : undefined, // If work experiences are empty, don't create anything
                educations: resumeValue.educations?.length
                    ? {
                        create: resumeValue.educations.map((exp) => ({
                            ...exp,
                            startDate: exp.startDate ? new Date(exp.startDate) : null,
                            endDate: exp.endDate ? new Date(exp.endDate) : null,
                        })),
                    }
                    : undefined, // If educations are empty, don't create anything
                updatedAt: new Date(),
            },
        });
    }
}
