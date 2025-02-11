import { educationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {CSS} from '@dnd-kit/utilities'

export default function EducationForm({resumeData, setResumeData}){
    const form = useForm({
        resolver:zodResolver(educationSchema),
        defaultValues :{
            educations: resumeData.educations || []
        }
    })
     useEffect(() => {
                const subscription = form.watch((values) => {
                    setResumeData({...resumeData, educations: values.educations?.filter(edu=>edu!==undefined) || []
                    })
                });
                return () => subscription.unsubscribe(); // Properly clean up the subscription
            }, [form, resumeData, setResumeData]);

            const {fields, append, remove, move} = useFieldArray({
                control:form.control,
                name:"educations"
            })
             const sensors = useSensors(useSensor(PointerSensor), //for pointer events
                        useSensor(KeyboardSensor, {
                            coordinateGetter: sortableKeyboardCoordinates //for keyboard events
                        }))
            
                     function handleDragEnd(event){
                        const {active, over} = event;
            
                        if(over && active.id!== over.id){
                            const oldIndex = fields.findIndex(field=>field.id === active.id)
                            const newIndex =fields.findIndex(field=>field.id === over.id)
                            move(oldIndex, newIndex) //for telling react hook form that index and position has changed
                            return arrayMove(fields, oldIndex, newIndex) // for telling dnd kit about position change
                         }
                     }

            return(
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="space-y-1.5 text-center">
                        <h2 className="text-2xl font-semibold">Education</h2>
                        <p className="text-sm text-muted-foreground">Add all the required education.</p>
                    </div>
                    <Form {...form}>
                        <form className="space-y-3">
                        <DndContext 
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
  modifiers={[restrictToVerticalAxis]} // Make sure it's an array
>
  <SortableContext 
    items={fields}
    strategy={verticalListSortingStrategy}
  >
                            {fields.map((field, index) =>(
                                <EducationItmes key={field.id} id={field.id} index={index} form={form} remove={remove}/>
                            ))}
                            </SortableContext>
                            </DndContext>
                            <div className="flex justify-center">
                                <Button type="button" onClick={()=>append({
                                    degree:"",
                                    institute:"",
                                    percentage:"",
                                    startDate:"",
                                    endDate :"",
                                })}>Add Education</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )
}

function EducationItmes({form, index, remove, id}){
     const{attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id})
    const classstyle = isDragging ? "space-y-3 border rounded-md bg-background p-3 shadow-xl z-50" : "space-y-3 border rounded-md bg-background p-3"
    return <div className={classstyle}
    ref={setNodeRef}
    style={{
      transform: CSS.Transform.toString(transform), // Check if transform is defined
      transition
    }}>
            <div className="flex justify-between gap-2">
                <span className="font-semibold">Education {index+1}</span> 
            <GripHorizontal className="size-5 cursor-grab text-muted-foreground" {...attributes}
            {...listeners} />
            </div>
                
                
                <FormField
                control={form.control}
                name={`educations.${index}.degree`}
                render ={({field})=>(
                    <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                            <Input {...field} autofocus />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name={`educations.${index}.institute`}
                render ={({field})=>(
                    <FormItem>
                        <FormLabel>Institute Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name={`educations.${index}.percentage`}
                render ={({field})=>(
                    <FormItem>
                        <FormLabel>Percentage/CGPA</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-2 gap-3">
                <FormField
                control={form.control}
                name={`educations.${index}.startDate`}
                render ={({field})=>(
                    <FormItem>
                        <FormLabel>Joining Date</FormLabel>
                        <FormControl>
                            <Input {...field} type="date" value={field.value?.slice(0,10)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name={`educations.${index}.endDate`}
                render ={({field})=>(
                    <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                            <Input {...field} type="date" value={field.value?.slice(0,10)}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                </div>
                <FormDescription>
                    Leave end date empty if you are currently here
                </FormDescription>
               
                <Button variant="destructive" type="button" onClick={()=> remove(index)}>Remove</Button>
            </div>
    
}