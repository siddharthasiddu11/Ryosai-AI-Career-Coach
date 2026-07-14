"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();

  const industryRef = useRef("");
  const subIndustryRef = useRef("");
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const bioRef = useRef(null);

  const [industry, setIndustry] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading,
    fn: updateUserFn,
    data,
  } = useFetch(updateUser); // this is for API call to update user 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !industryRef.current ||
      !subIndustryRef.current ||
      !experienceRef.current.value ||
      !skillsRef.current.value.trim() ||
      !bioRef.current.value.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    await updateUserFn({
      industry: `${industryRef.current}-${subIndustryRef.current
        .toLowerCase()
        .replace(/ /g, "-")}`,
      experience: parseInt(experienceRef.current.value),
      skills: skillsRef.current.value.split(",").map((s) => s.trim()).filter(Boolean),
      bio: bioRef.current.value,
    });
  };

  useEffect(() => {
    if (data?.success && !loading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [data, loading, router]);

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="mt-10 mx-2 w-full max-w-lg">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Industry */}
            <div className="space-y-2">
              <Label>Industry</Label>

              <Select
                onValueChange={(value) => {
                  industryRef.current = value;
                  setIndustry(value);

                  const selected = industries.find(
                    (item) => item.id === value
                  );

                  setSelectedIndustry(selected);
                  subIndustryRef.current = "";
                }} 
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>

                    {industries.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Specialization */}
            {industry && (
              <div className="space-y-2">
                <Label>Specialization</Label>

                <Select
                  onValueChange={(value) => {
                    subIndustryRef.current = value;
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Specialization" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>

                      {selectedIndustry?.subIndustries.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Experience */}
            <div className="space-y-2">
              <Label>Years of Experience</Label>

              <Input
                ref={experienceRef}
                type="number"
                min={0}
                max={50}
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label>Skills</Label>

              <Input
                ref={skillsRef}
                placeholder="JavaScript, React..."
              />

              <p className="text-sm text-muted-foreground">
                Separate skills with commas.
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label>Professional Bio</Label>

              <Textarea
                ref={bioRef}
                className="h-32"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;