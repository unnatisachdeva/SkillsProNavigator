"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";
import useFetch from "@/hooks/use-fetch";

const OnboardingForm = ({ industries = [] }) => {
  const router = useRouter();
  const { fn: updateUserFn, loading } = useFetch(updateUser);

  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [subIndustries, setSubIndustries] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = values.subIndustry
        ? `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`
        : values.industry;

      const skillsArray = typeof values.skills === "string"
        ? values.skills.split(",").map((skill) => skill.trim())
        : [];

      const submissionData = {
        ...values,
        industry: formattedIndustry,
        skills: skillsArray,
      };

      console.log("Submitting data:", submissionData);

    //   const response = await updateUserFn(submissionData);
    //   console.log("Update successful:", response);

    //   if (response?.updatedUser) {
    //     toast.success("Profile completed successfully!");
    //     router.push("/dashboard");
    //     router.refresh();
    //   } else {
    //     console.error("Unexpected API response:", response);
    //     toast.error("Failed to update profile. Please try again.");
    //   }

    const response = await updateUserFn(submissionData);
console.log("API Response:", response);

if (response?.success && response?.updatedUser) {
  toast.success("Profile completed successfully!");
  router.push("/dashboard");
  router.refresh();
} else {
  toast.error(response?.error || "Failed to update profile. Please try again.");
}

    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleIndustryChange = useCallback(
    (value) => {
      setValue("industry", value);
      const selected = industries.find((ind) => ind.id === value);
      setSelectedIndustry(selected);
      setSubIndustries(selected?.subIndustries || []);
      setValue("subIndustry", selected?.subIndustries?.[0] || "");
    },
    [industries, setValue]
  );

  useEffect(() => {
    if (industries.length > 0) {
      console.log("Industries loaded:", industries);
    }
    const industryValue = watch("industry");
    if (industryValue) handleIndustryChange(industryValue);
  }, [handleIndustryChange, watch, industries]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={handleIndustryChange}
                defaultValue={watch("industry")}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {Array.isArray(industries) && industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">{errors.industry.message}</p>
              )}
            </div>

            {subIndustries.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                  defaultValue={watch("subIndustry")}
                >
                  <SelectTrigger id="subIndustry">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {subIndustries.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">{errors.subIndustry.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
              />
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
              ) : ("Complete Profile")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;


