import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
//import { industries } from "@/data/industries";

const OnBoardingPage = async () => {
    //check if user is already oboarded 
    const {isOnboarded } = await getUserOnboardingStatus();
    
    if(isOnboarded){
        redirect("/dashboard");
    }

    return <main >
        <OnboardingForm industries={industries}/>
    </main>
};

export default OnBoardingPage;