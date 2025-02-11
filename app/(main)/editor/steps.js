import EducationForm from "./forms/EducationForm";
import GeneralInformation from "./forms/GeneralInformation";
import PersonalInformation from "./forms/PersoanlInformation";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExpForm from "./forms/WorkExpForm";

export const steps = [
    {
        title: "General Info",
        component: GeneralInformation,
        key: "general-info",
    },
    {
        title: "Personal Info",
        component: PersonalInformation,
        key: "personal-info",
    },
    {
        title:"Work experience", 
        component: WorkExpForm,
        key:"work-experience"
    },
    {
        title:"Education", 
        component: EducationForm,
        key:"education"
    },
    {
        title:"Skills", 
        component: SkillsForm,
        key:"skill"
    },
    {
        title:"Summary", 
        component: SummaryForm,
        key:"summary"
    }
    
];
