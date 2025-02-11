import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import preview from "@/public/resumeprevie.jpg"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-gray-900 text-center md:text-start md:flex-row lg:gap-12">
      <div className="max-w-prose space-y-3">
          <h1 className="text-xl text-red-700 font-bold mx-auto md:ms-0">AIResumeBuilder</h1>
          <p className="text-2xl font-extrabold tracking-tight lg:text-5xl scroll-m-20">Create a{" "} <span className="inline-block bg-gradient-to-r from-red-700 to bg-red-500 bg-clip-text text-transparent">Perfect Resume</span>
          {" "} in Minues
          </p>
          <p className="text-lg text-gray-700">
            Our AI Resume Builder help you create a professional resume.
          </p>
          <Button asChild size="lg" variant="mine">
            <Link href="/resumes">Get Started</Link>
          </Button>
      </div>
      <div>
        <Image src={preview} alt="resumepreview" width={600} className="shadow-md lg:rotate-[1.5deg]" />
      </div>
    </main>
  );
}
