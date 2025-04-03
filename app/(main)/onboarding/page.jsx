// app/(main)/onboarding/page.jsx

import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";

const OnBoardingPage = async () => {
  console.log("🚀 OnBoardingPage Loaded");

  // Ensure the function is working
  const { isOnboarded } = await getUserOnboardingStatus();
  console.log("👉 Onboarding Status:", isOnboarded);

  return (
    <main>
      
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnBoardingPage;
