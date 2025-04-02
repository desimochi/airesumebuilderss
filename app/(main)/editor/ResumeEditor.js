"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import { useState } from "react";
import ResumePreviewSection from "./ResumePreviewSection";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutoSaveResume from "./useAutoSaveResume";
import { maptoResumeValues } from "@/lib/utils";

export default function ResumeEditor({resumeToEdit}) {
    const searchParams = useSearchParams();
    const resumeDataDefault = resumeToEdit ? maptoResumeValues(resumeToEdit) : {};

    const [showpreview, setShowPreview] = useState (true)
    const [resumeData, setResumeData] = useState({
        colorHex: "#000000",
        borderStyle : "SQUIRCLE",
        ...resumeDataDefault,
    })

    const {isSaving, hasUnsaved} = useAutoSaveResume(resumeData)
    useUnloadWarning(hasUnsaved)
    const currentStep = searchParams.get("step") || steps[0].key;

    function setStep(key) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("step", key);
        window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    }

    const FormComponent = steps.find(step => step.key === currentStep)?.component;
    const isFirstStep = currentStep === steps[0].key;
    const isLastStep = currentStep === steps[steps.length - 1].key;

  

    return (
       <div className="flex flex-col min-h-screen">
  <header className="space-y-1.5 border-b px-3 py-5 text-center">
    <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to bg-red-500 bg-clip-text text-transparent">Build Your Resume</h1>
    <p className="text-sm text-muted-foreground">
      Kindly follow all the steps to create your resume. All changes will be saved automatically.
    </p>
  </header>

  <main className="flex flex-col md:flex-row flex-grow w-full">
    <div className="w-full md:w-1/2 p-3 order-1 md:order-none">
      <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
      {FormComponent ? (
        <FormComponent resumeData={resumeData} setResumeData={setResumeData} />
      ) : (
        <p>Invalid step. Please try again.</p>
      )}
    </div>

    <div className="md:border-r order-1 md:order-none" />
    <ResumePreviewSection
      resumeData={resumeData}
      setResumeData={setResumeData}
      showresume={showpreview}
    />
  </main>

  <footer className="w-full border-t px-3 py-5 sticky bottom-0 bg-background z-10">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          disabled={isFirstStep}
          onClick={() => setStep(steps[steps.findIndex(s => s.key === currentStep) - 1]?.key)}
        >
          Previous Step
        </Button>
        <Button
          disabled={isLastStep}
          onClick={() => setStep(steps[steps.findIndex(s => s.key === currentStep) + 1]?.key)}
        >
          Next Step
        </Button>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowPreview(!showpreview)}
        className="md:hidden"
        title={showpreview ? "Show input form" : "show resume preview"}
      >
        {showpreview ? <PenLineIcon /> : <FileUserIcon />}
      </Button>
      <div className="flex items-center gap-3">
        <Button variant="secondary" asChild>
          <Link href="/resumes">Close</Link>
        </Button>
        <p className="text-muted-foreground opacity-0">Saving...</p>
      </div>
    </div>
  </footer>
</div>

    );
}
