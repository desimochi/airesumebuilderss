import ResumePreview from "@/components/ResumePreview";
import ColorPicker from "./ColorPicker";
import Border from "./Border";

export default function ResumePreviewSection({ resumeData, setResumeData, showresume }) {
    return (
        showresume && (
            <>
                <div className={`relative md:w-1/2 md:flex w-full ${!showresume ? "hidden" : ""}`}>
                    <div className="absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3">
                        <ColorPicker 
                            color={resumeData.colorHex} 
                            onChange={(color) => setResumeData({ ...resumeData, colorHex: color.hex })} 
                        />
                        <Border 
                            borderStyle={resumeData.borderStyle} 
                            onChange={(borderStyle) => setResumeData({ ...resumeData, borderStyle })} 
                        />
                    </div>
                    <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
                        <ResumePreview resumeData={resumeData} className="max-w-2xl shadow-md" />
                    </div>
                </div>
            </>
        )
    );
}
