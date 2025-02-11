import { personalInformationSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function PersonalInformation({resumeData, setResumeData}) {
    const form = useForm({
        resolver: zodResolver(personalInformationSchema),
        defaultValues: {
            firstName: resumeData.firstName || "",
            lastName: resumeData.lastName || "",
            jobTitle: resumeData.jobTitle || "",
            city: resumeData.city || "",
            country: resumeData.country || "",
            phone: resumeData.phone || "",
            email: resumeData.email || "",
        },
    });

    useEffect(() => {
        const subscription = form.watch((values) => {
            setResumeData({...resumeData, ...values})
        });
        return () => subscription.unsubscribe(); // Properly clean up the subscription
    }, [form, resumeData, setResumeData]);

    const photoInputRef = useRef(null)

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself</p>
            </div>
            <Form {...form}>
                <form
                    className="space-y-3"
                    onSubmit={form.handleSubmit((data) => {
                        console.log("Form Submitted:", data);
                    })}
                >
                    {/* Photo Upload */}
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field: { value, ...fieldValues } }) => (
                            <FormItem>
                                <FormLabel>Your Photo</FormLabel>
                                <div className="flex items-center gap-2">
                                <FormControl>
                                    <Input
                                        {...fieldValues}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            fieldValues.onChange(file);
                                        }}
                                        ref={photoInputRef}
                                    />
                                </FormControl>
                                <Button
  variant="secondary"
  type="button"
  onClick={() => {
    // Clear the file input
    fieldValues.onChange(null);
    
    // Clear the file input element itself
    if (photoInputRef.current) {
      photoInputRef.current.value = ""; // Reset the file input value
    }
  }}
>
  Remove
</Button>

                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* First Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
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
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="tel" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                </form>
            </Form>
        </div>
    );
}
