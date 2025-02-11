import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateExpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/LoadingButton";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExp } from "./actions";
import { Dialog,  DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle, } from "@/components/ui/dialog";
    import {
        Form,
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
      } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
export default function GenerateWorkExpButton({onWorkExpGenerated}){
    const [showInputDialog, setShowInputDialog] = useState(false)

    return <>
    <Button variant="outline" type="button" onClick = {()=>setShowInputDialog(true)} >
        <WandSparklesIcon className="size-4" />
        SmartFill - AI
    </Button>
    <InputDialog open={showInputDialog} onOpenchange={setShowInputDialog} onWorkExpGenerated={(workExp)=>{
        onWorkExpGenerated(workExp);
        setShowInputDialog(false)
    }} />
    </>
}

function InputDialog({open, onOpenchange, onWorkExpGenerated}){
        const {toast} = useToast()
        const form = useForm({
            resolver : zodResolver(generateExpSchema),
            defaultValues : {
                description:""
            }
        })

        async function onSubmit(input) {
            try {
                const response  = await generateWorkExp(input)
                onWorkExpGenerated(response)
            } catch (error) {
                console.error(error)
                toast({
                    variant:"destructive",
                    description:"Something went wrong"
                })
            }
            
        }

        return <Dialog open={open} onOpenChange={onOpenchange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate work experience</DialogTitle>
            <DialogDescription>
              Describe this work experience and the AI will generate an optimized
              entry for you.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={`E.g. "from nov 2019 to dec 2020 I worked at google as a software engineer, my tasks were: ..."`}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton type="submit" loading={form.formState.isSubmitting}>
                Generate
              </LoadingButton>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
}