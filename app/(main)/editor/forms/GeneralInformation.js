import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { generalInformationSchema } from "@/lib/validation"
import { useEffect } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
export default  function GeneralInformation({resumeData, setResumeData}){
    const form = useForm({
        resolver:zodResolver(generalInformationSchema),
        defaultValues :{
            title: resumeData.title || "",
            description : resumeData.description ||""
        }
    })
    useEffect(() => {
            const subscription = form.watch((values) => {
                setResumeData({...resumeData, ...values})
            });
            return () => subscription.unsubscribe(); // Properly clean up the subscription
        }, [form, resumeData, setResumeData]);
    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className=" text-2xl font-semibold">General Information</h2>
                <p className="text-sm text-muted-foreground">This will not appear in resume.</p>
            </div>
            <Form {...form} >
                <form className="space-y-3">
                    <FormField control ={form.control} name="title" render={({field})=>(
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder ="Name Your Resume" autoFocus />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control ={form.control} name="description" render={({field})=>(
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder ="Describe you resume" />
                            </FormControl>
                            <FormDescription>Decribe what this resume is for</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </form>
            </Form>
        </div>
    )
}