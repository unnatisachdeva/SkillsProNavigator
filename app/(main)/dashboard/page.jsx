// app/main/dashboard/page.jsx
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
//import { industries } from "@/data/industries";
//import OnboardingForm from "./_components/onboarding-form";

const IndustryInsightsPage = async () => {
  // Ensure this is a server component
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return <div> IndustryInsightsPage</div>
 
};

export default IndustryInsightsPage;
