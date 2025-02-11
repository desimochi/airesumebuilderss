import { useToast } from "@/hooks/use-toast";
import useDebouncing from "@/hooks/useDebouncing";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaveResume(resumeData) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const debouncedResumeData = useDebouncing(resumeData, 1500);
  const [resumeId, setResumeId] = useState(resumeData.id);
  const [lastSaveData, setLastSaveData] = useState(structuredClone(resumeData));
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  // Reset the error state whenever debouncedResumeData changes
  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        // Handle photo update logic
        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSaveData.photo, fileReplacer) === JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });
        setResumeId(updatedResume.id);
        setLastSaveData(newData);

        // Update URL searchParams with the new resume ID
        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes...</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    // Shallow check for changes between current and saved data
    const hasUnsaved = JSON.stringify(debouncedResumeData, fileReplacer) !== JSON.stringify(lastSaveData, fileReplacer);

    // Only save if there are unsaved changes, and no ongoing saving/error
    if (hasUnsaved && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [debouncedResumeData, isSaving, lastSaveData, isError, resumeId, searchParams, toast]);

  return {
    isSaving,
    hasUnsaved: JSON.stringify(resumeData) !== JSON.stringify(lastSaveData),
  };
}
