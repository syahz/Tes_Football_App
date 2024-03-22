/** @format */

import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

interface addMatchFormData {
  home_club_id: string;
  away_club_id: string;
  home_score: number;
  away_score: number;
}

const useMatch = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const match = async ({ home_club_id, away_club_id, home_score, away_score }: addMatchFormData) => {
    const success = handleInputErrors({ home_club_id, away_club_id, home_score, away_score });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home_club_id, away_club_id, home_score, away_score }),
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

  return { loading, match };
};

export default useMatch;

function handleInputErrors({ home_club_id, away_club_id, home_score, away_score }: addMatchFormData) {
  if (!home_club_id || !away_club_id) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Please fill all fields.",
    });
    return false;
  }
  if (home_score < 0 || home_score > 20) {
    toast({
      variant: "destructive",
      title: "Uh oh! Invalid input.",
      description: "Home score should be between 0 and 20.",
    });
    return false;
  }

  if (home_club_id === away_club_id) {
    toast({
      variant: "destructive",
      title: "Uh oh! Invalid input.",
      description: "Pilih Club dengan benar.!",
    });
    return false;
  }

  // Memeriksa apakah away_score berada di rentang 0-20
  if (away_score < 0 || away_score > 20) {
    toast({
      variant: "destructive",
      title: "Uh oh! Invalid input.",
      description: "Away score should be between 0 and 20.",
    });
    return false;
  }

  return true;
}
