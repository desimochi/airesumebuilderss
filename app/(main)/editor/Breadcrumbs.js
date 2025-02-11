import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { steps } from "./steps";
import React from "react";

export default function Breadcrumbs({ currentStep, setCurrentStep }) {
    return (
        <div className="flex justify-center">
            <Breadcrumb>
                <BreadcrumbList>
                    {steps.map((step, index) => (
                        <React.Fragment key={step.key}>
                            <BreadcrumbItem>
                                {step.key === currentStep ? (
                                    <BreadcrumbPage>{step.title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink >
                                        <button onClick={() => setCurrentStep(step.key)}>
                                            {step.title}
                                        </button>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {/* Add a separator, but only if it's not the last breadcrumb item */}
                            {index < steps.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
