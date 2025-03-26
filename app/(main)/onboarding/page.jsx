// app/(main)/onboarding/page.jsx

import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { redirect } from "next/navigation";

const OnBoardingPage = async () => {
  // Check if user is onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnBoardingPage;
