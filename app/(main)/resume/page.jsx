import { getResume } from "@/actions/resume";
import ResumeBuilderWrapper from "./_components/resume-builder-wrapper";

const ResumePage = async () => {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilderWrapper initialContent={resume?.content} />
    </div>
  );
};

export default ResumePage;
