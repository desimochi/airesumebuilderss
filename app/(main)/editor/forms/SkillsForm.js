import { skillsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; 
import { useEffect } from "react";
import { ReceiptRussianRuble } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function SkillsForm({resumeData, setResumeData}){
    const form = useForm({
        resolver: zodResolver(skillsSchema),
        defaultValues :{
            skills : resumeData.skills || []
        }
    })

    useEffect(() => {
                    const subscription = form.watch((values) => {
                        setResumeData({...resumeData, skills: values.skills?.filter(skill=>skill!==undefined).map(skill=>skill.trim()).filter(skill=>skill!=="") || []
                        })
                    });
                    return () => subscription.unsubscribe(); // Properly clean up the subscription
                }, [form, resumeData, setResumeData]);

    return <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
                        <h2 className="text-2xl font-semibold">Skills</h2>
                        <p className="text-sm text-muted-foreground">Add as many work experience as you like.</p>
                    </div>
            <Form {...form}>
                <form className="space-y-3">
                    <FormField control={form.control} name="skills"
                     render={({field})=>(
                        <FormItem>
                            <FormLabel className="sr-only">Skills</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="e.g. React, Next Js, HTML..." onChange={(e)=>{
                                    const skills = e.target.value.split(",")
                                    field.onChange(skills)
                                }}/>
                            </FormControl>
                            <FormDescription>Seprate each skills with a comma.</FormDescription>
                        </FormItem>
                     )}
                    />
                </form>
            </Form>
    </div>
}