"use Client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";

const OnboardingForm = ({industries}) => {

    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
      } = useForm({
        resolver: zodResolver(onboardingSchema),
      });
    return <div>  </div>     
};

export default OnboardingForm;
