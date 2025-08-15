"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { doctorProfileSchema } from "@/schemas/doctorProfileSchme";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


// Define the days of the week
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CreateProfile() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof doctorProfileSchema>>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      specialization: "",
      qualifications: [""],
      experience: 0,
      consultationFee: 0,
      availableSlots: [{ day: "" }],
      bio: "",
      languages: ["Hindi"],
    },
  });

  const onSubmit = async (data: z.infer<typeof doctorProfileSchema>) => {
    try {
      const response = await axios.post("/api/doctor-profile", data);

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Helper functions for array fields
  const handleAddQualification = () => {
    const currentQualifications = form.getValues("qualifications");
    form.setValue("qualifications", [...currentQualifications, ""]);
  };

  const handleRemoveQualification = (index: number) => {
    const currentQualifications = form.getValues("qualifications");
    form.setValue(
      "qualifications",
      currentQualifications.filter((_, i) => i !== index)
    );
  };

  const handleAddLanguage = () => {
    const currentLanguages = form.getValues("languages");
    form.setValue("languages", [...currentLanguages, ""]);
  };

  const handleRemoveLanguage = (index: number) => {
    const currentLanguages = form.getValues("languages");
    form.setValue(
      "languages",
      currentLanguages.filter((_, i) => i !== index)
    );
  };

  // Handle day selection
  const handleDaySelection = (day: string, index: number) => {
    const currentSlots = form.getValues("availableSlots");
    const updatedSlots = [...currentSlots];
    updatedSlots[index] = { ...updatedSlots[index], day };
    form.setValue("availableSlots", updatedSlots);
  };

  // Add new day slot
  const handleAddDaySlot = () => {
    const currentSlots = form.getValues("availableSlots");
    form.setValue("availableSlots", [...currentSlots, { day: "" }]);
  };

  // Remove day slot
  const handleRemoveDaySlot = (index: number) => {
    const currentSlots = form.getValues("availableSlots");
    form.setValue(
      "availableSlots",
      currentSlots.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="mx-auto w-fit"
        variant="outline"
      >
        Create
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Doctor Profile</DialogTitle>
            <DialogDescription>All Field Are Required</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[75vh]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 pr-3"
              >
                {/* Specialization */}
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cardiology, Neurology, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Qualifications */}
                <div className="space-y-4">
                  <FormLabel>Qualifications</FormLabel>
                  {form.watch("qualifications")?.map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`qualifications.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="MD, MBBS, etc." {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => handleRemoveQualification(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddQualification}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Qualification
                  </Button>
                </div>

                {/* Experience */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience (years)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Consultation Fee */}
                <FormField
                  control={form.control}
                  name="consultationFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Fee (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Available Days */}
                <div className="space-y-4">
                  <FormLabel>Available Days</FormLabel>
                  {form.watch("availableSlots")?.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select
                        value={slot.day}
                        onValueChange={(value) =>
                          handleDaySelection(value, index)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS_OF_WEEK.filter((day) => {
                            const selectedDays = form
                              .getValues("availableSlots")
                              .map((s) => s.day)
                              .filter((_, i) => i !== index);
                            return !selectedDays.includes(day);
                          }).map((day) => (
                            <SelectItem
                              key={day}
                              value={day.toLocaleLowerCase()}
                            >
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveDaySlot(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddDaySlot}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Day
                  </Button>
                </div>

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell patients about yourself..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Languages */}
                <div className="space-y-4">
                  <FormLabel>Languages Spoken (Optional)</FormLabel>
                  {form.watch("languages")?.map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`languages.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                placeholder="English, Hindi, etc."
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => handleRemoveLanguage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddLanguage}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Language
                  </Button>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="text-white">
                    Create Profile
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
