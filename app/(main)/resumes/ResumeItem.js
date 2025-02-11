"use client"
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { maptoResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { deleteResume } from "./actions";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useReactToPrint } from "react-to-print";
 

export default function ResumeItem({resume}){
    const contentRef = useRef(null)
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle:resume.title || "Resume"
    })
    const wasUpdated = resume.updatedAt !== resume.createdAt;

    return <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3">
        <div className="space-y-3">
            <Link href={`/editor?resumeId=${resume.id}`} className="inline-block w-full text-center">
                <p className="font-semibold line-clamp-1">
                    {resume.title || "No title"}...
                </p>
                {resume.description && <p className="line-clamp-2 text-sm">
                    {resume.description}
                </p> }
                <p className="text-xs text-muted-foreground">
                {wasUpdated? "Updted" : "Created"} on {""}
                {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
                </p>
            </Link>
            <Link href={`/editor?resumeId=${resume.id}`} className="relative inline-block w-full">
                <ResumePreview resumeData={maptoResumeValues(resume)} contentRef={contentRef} className="overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow" />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent " />
            </Link>
        </div>
        <MoreMenu resumeId={resume.id}  onPrintClick={reactToPrintFn}/>
    </div>
}

function MoreMenu({resumeId, onPrintClick}){
    const[showDeleteConfirmation, setshowDeleteConfirmation] = useState(false)
    return<>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100" >
                <MoreVertical className="size-4" />
            </Button>
    </DropdownMenuTrigger>    
    <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center gap-2" onClick = {()=> setshowDeleteConfirmation(true)}>
            <Trash2 className="size-4" />
            Delete
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" onClick = {onPrintClick}>
            <Printer className="size-4" />
            Print
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    <Deleteconfirmation resumeId={resumeId} open={showDeleteConfirmation} onOpenChange={setshowDeleteConfirmation} />
    </>

}

function Deleteconfirmation ({resumeId, open, onOpenChange}){
            const {toast} = useToast();
            const [isPending, startTransition] = useTransition()

            async function handledelete() {
                startTransition(async () => {
                    try {
                        if (!resumeId) {
                            console.error("Error: resumeId is null or undefined");
                            return;
                        }
                        await deleteResume(resumeId);
                        onOpenChange(false)
                    } catch (error) {
                        console.error(error)
                        toast({
                            variant:"destructive",
                            description:"Something went wrong"
                        })
                    }
                })
            }

        return <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                    Delete Resume?
                    </DialogTitle>
                    <DialogDescription>
                        This will permanently delete this resume. This action can not be undone
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={handledelete}>Delete</Button>
                    <Button variant="secondary" onClick={()=>onOpenChange(false)}>Cancel</Button>
                </DialogFooter>
                </DialogContent>
        </Dialog>
}