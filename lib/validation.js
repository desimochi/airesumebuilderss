import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""))

export const generalInformationSchema =z.object({
    title: optionalString,
    description: optionalString,
})

export const personalInformationSchema = z.object({
    photo: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.type.startsWith("image/"),
            { message: "Must be an image file" }
        )
        .refine(
            (file) => !file || file.size <= 1024 * 1024 * 4,
            { message: "File must be less than 4 MB" }
        ),
    firstName: optionalString,
    lastName: optionalString,
    jobTitle: optionalString,
    city: optionalString,
    country: optionalString,
    phone: optionalString,
    email: optionalString,
});

export const workExperienceSchema = z.object({
    workExperiences: z.array(
        z.object({
            position: optionalString,
            company : optionalString,
            startDate : optionalString,
            endDate: optionalString,
            description : optionalString
        })
    ).optional(),
})


export const educationSchema = z.object({
    educations: z.array(
        z.object({
            degree: optionalString,
            institute : optionalString,
            percentage : optionalString,
            startDate : optionalString,
            endDate: optionalString,
           
        })
    ).optional(),
})

export const skillsSchema =z.object({
    skills:z.array(z.string().trim()).optional()
})

export const summarySchema = z.object({
    summary: optionalString
})

export const resumeSchema = z.object({
    ...generalInformationSchema.shape,
    ...personalInformationSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
    ...summarySchema.shape,
    colorHex: optionalString,
    borderStyle : optionalString
})

export const generateSummarySchema = z.object({
    jobTitle: optionalString,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
})

export const generateExpSchema =  z.object({
    description : z.string().trim().min(1, "Required").min(20, "Must be atleast 20 character")
})