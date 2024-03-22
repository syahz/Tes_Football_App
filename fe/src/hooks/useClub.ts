/** @format */

import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

interface addClubFormData {
  nama_club: string;
  kota_club: string;
}

const useClub = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const club = async ({ nama_club, kota_club }: addClubFormData) => {
    const success = handleInputErrors({ nama_club, kota_club });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/club", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama_club, kota_club }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data, "🚀");
      } else {
        const errorData = await res.json();
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `An error occurred, ${errorData.message}`,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `An error occurred,${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, club };
};

export default useClub;

function handleInputErrors({ nama_club, kota_club }: addClubFormData) {
  if (!nama_club || !kota_club) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Please fill all fields.",
    });
    return false;
  }

  return true;
}
