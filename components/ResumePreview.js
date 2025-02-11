import { BorderStyles } from "@/app/(main)/editor/Border";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Badge } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { object } from "zod";

export default function ResumePreview({resumeData, className, contentRef}){
    const contianerRef = useRef(null)
    const { width } = useDimension(contianerRef)
    return <div className={cn("bg-white text-black h-fit w-full aspect-[210/297] relative", className)} ref={contianerRef}>
            <div className={cn("space-y-6 p-6", !width && "invisible")} style={{
                zoom:(1/794)*width
            }}
            ref={contentRef} id="resumePreviewContent">
            <PersoanlInfoHeader resumeData={resumeData} />
            <SummarySection resumeData={resumeData} />
            <WorkExpSection resumeData={resumeData} />
            <EducationSection resumeData={resumeData} />
            <SkillsSection resumeData={resumeData} />
            </div>
    </div>
}

function PersoanlInfoHeader({resumeData}){
  const {photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex, borderStyle} = resumeData
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo )

  useEffect(()=>{
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : ""
    if(objectUrl){
        setPhotoSrc(objectUrl)
        if(photo === null) {
            setPhotoSrc("")
        }
    }
    return () => URL.revokeObjectURL(objectUrl)
  },[photo])

  return <div className="flex items-center gap-6">
    {photoSrc && (
        <Image src={photoSrc} width={100} height={100} alt="photo" className="aspect-square object-cover" style={{borderRadius : borderStyle === BorderStyles.SQUARE? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999px" : "10%"}} />
    )}
    <div className="space-y-2.5">
        <div className="space-y-1">
            <p className="text-3xl font-bold" style={{color:colorHex}}>
                {firstName} {lastName}
            </p>
            <p className="font-medium" style={{color:colorHex}}>{jobTitle}</p>
        </div>
        <p className="text-xs text-gray-500">
            {city}
            {city && country ? "," : ""}
            {country}
            {(city || country) && (phone || email) ? " • " : ""}
            {[phone, email].filter(Boolean).join(" • ")}
        </p>
    </div>
  </div>
}

function SummarySection({resumeData}){
    const {summary, colorHex} = resumeData
    if(!summary) return null

    return <>
    <hr className="border-2" style={{borderColor:colorHex}}/>
    <div className="space-y-3 break-before-avoid">
        <p className="textlg font-semibold" style={{color:colorHex}}>Professional Profile</p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
    </div>
    </>
}

function WorkExpSection({resumeData}){
    const {workExperiences, colorHex} = resumeData
    const workExperiencesNotEmpty = workExperiences?.filter(
        (exp)=>Object.values(exp).filter(Boolean).length>0
    )

    if(!workExperiencesNotEmpty?.length) return null

    return <>
    <hr className="border-2" style={{borderColor:colorHex}} />
    <div className="space-y-3">
        <p className="text-lg font-semibold" style={{color:colorHex}}>Work Experiences</p>
        {workExperiencesNotEmpty.map((exp, index)=>(
            <div key={index} className="break-inside-avoid space-y-1">
                <div className="flex items-center justify-between text-sm font-semibold" style={{color:colorHex}}>
                    <span>{exp.position}</span>
                    {exp.startDate && (
                        <span>
                            {formatDate(exp.startDate, "MM/yyyy")} - {" "}
                            {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") :"Present" }
                        </span>
                    )}
                </div>
                <p className="text-xs font-semibold">{exp.company}</p>
                <div className="whitespace-pre-line text-xs">
                    {exp.description}
                </div>
            </div>
        ))}
    </div>
    </>
}

function EducationSection({resumeData}){
    const {educations, colorHex} = resumeData
    const educationNotEmpty = educations?.filter(
        (exp)=>Object.values(exp).filter(Boolean).length>0
    )

    if(!educationNotEmpty?.length) return null

    return <>
    <hr className="border-2" style={{borderColor:colorHex}}/>
    <div className="space-y-3">
        <p className="text-lg font-semibold" style={{color:colorHex}}>Educations</p>
        {educationNotEmpty.map((edu, index)=>(
            <div key={index} className="break-inside-avoid space-y-1">
                <div className="flex items-center justify-between text-sm font-semibold" style={{color:colorHex}}>
                    <span>{edu.degree}</span>
                    {edu.startDate && (
                        <span>
                            {edu.startDate && `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ?`- ${formatDate(edu.endDate, "MM/yyyy")}`:""}`}
                        </span>
                    )}
                </div>
                <p className="text-xs font-semibold">{edu.institute} - {edu.percentage}</p>


            </div>
        ))}
    </div>
    </>
}

function SkillsSection({ resumeData }) {
    const { skills, colorHex } = resumeData;

    if (!skills?.length) return null;

    return (
        <>
            <hr className="border-2" style={{borderColor:colorHex}}/>
            <div className="break-inside-avoid space-y-3">
                <p className="text-lg font-semibold">Skills</p>
                <div className="flex break-inside-avoid flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-black text-white px-3 py-0.5 rounded-md" style={{backgroundColor:colorHex}}>{skill}</span>
                    ))}
                </div>
            </div>
        </>
    );
}
