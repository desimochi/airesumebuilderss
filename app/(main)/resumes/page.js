import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import ResumeItem from "./ResumeItem";
// app/page.js (or any other page file)
export const metadata = {
    title: "Your Resumes",
    description: "See all of your creatives resumes to apply at best companies!",
    keywords: ["Next.js", "React", "App Router"],
    author: "Puneet sharma",
    openGraph: {
      title: "Your Resumes",
      description: "See all of your creatives resumes to apply at best companies!",
      url: "https://yourwebsite.com",
      siteName: "AI Resume Builder MBAROI",
      images: [
        {
          url: "https://yourwebsite.com/og-image.jpg",
          width: 800,
          height: 600,
          alt: "An image for social sharing",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Your Resumes",
      description: "See all of your creatives resumes to apply at best companies!",
      images: ["https://yourwebsite.com/twitter-image.jpg"],
    },
  };
  

export default async function Page(){
  const {userId} = await auth()

  if(!userId){
    return null;
  }
  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: "desc"
      },
      include: {
        workExperiences: true, // Fetch related work experiences
        educations: true // Fetch related educations
      }
    }),
    prisma.resume.count({
      where: {
        userId
      }
    })
  ]);
  
     return (
       <main className="max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
         <Button asChild className="mx-auto flex w-fit gap-2">
            <Link href="/editor">
            <PlusSquare className="size-5" />
            New Resume
            </Link>
         </Button>
         <div className="space-y-1">
           <h1 className="text-3xl font-bold">Your Resumes</h1>
           <p>Total: {totalCount}</p>
         </div>
         <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
          {resumes.map(resume =>(
            <ResumeItem key={resume.id} resume={resume} />
          ))}
         </div>
       </main>
    )
}