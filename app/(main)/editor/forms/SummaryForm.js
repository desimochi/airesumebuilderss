import { summarySchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import GenerateSummaryButton from "./GenerateSummaryButton";

export default function SummaryForm({resumeData, setResumeData}){
    const form = useForm({
        resolver:zodResolver(summarySchema),
        defaultValues:{
            summary: resumeData.summary || ""
        }
    })
    useEffect(() => {
        const subscription = form.watch((values) => {
            setResumeData({...resumeData, ...values})
        });
        return () => subscription.unsubscribe(); // Properly clean up the subscription
    }, [form, resumeData, setResumeData]);

    return <div className="max-w-xl mx-auto space-y-6">
    <div className="space-y-1.5 text-center">
        <h2 className=" text-2xl font-semibold">Professional Summary</h2>
        <p className="text-sm text-muted-foreground">Write a short description about yourself or let AI write an amazing summary for you.</p>
    </div>
    <Form {...form}>
        <form className="space-y-3">
            <FormField control={form.control} name="summary" render={({field})=>(
                <FormItem>
                    <FormLabel className="sr-only">Professional Summary</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholde="A brief, engaging summary about yourself" />
                    </FormControl>
                    <FormMessage />
                    <GenerateSummaryButton resumeData={resumeData} onSummaryGenerated={summary =>form.setValue("summary", summary)}/>
                </FormItem>
            )}
            />
        </form>
    </Form>
    </div>
}