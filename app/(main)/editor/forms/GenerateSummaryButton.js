import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";

export default function GenerateSummaryButton({resumeData, onSummaryGenerated}){
    const{toast} = useToast();
    const[loading, setloading] = useState(false)
    async function hadnleClick() {
        try {
            setloading(true)
            const aiResponse  = await generateSummary(resumeData)
            onSummaryGenerated(aiResponse)
            
        } catch (error) {
            console.error(error);
            toast({
                variant:"destructive",
                description:"Something went wrong"
            })
        } finally {
            setloading(false)
        }
        
    }
    return <LoadingButton variant = "outline" type="button" onClick={hadnleClick} loading={loading}>
        <WandSparklesIcon className="size-4" />
        Generate AI
    </LoadingButton>
}