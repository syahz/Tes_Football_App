/** @format */

import SelectAwayClub from "@/components/selectAwayClub";
import SelectHomeClub from "@/components/selectHomeClub";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMatch from "@/hooks/useMatch";
import { useState } from "react";

interface Inputs {
  home_club_id: string;
  home_score: number;
  away_club_id: string;
  away_score: number;
}

const Match = () => {
  const { loading, match } = useMatch();
  const [inputs, setInputs] = useState<Inputs>({
    home_club_id: "",
    home_score: 0,
    away_club_id: "",
    away_score: 0,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await match(inputs);
    console.log("🚀 =>", inputs);
  };

  return (
    <div>
      <Card className="w-[300px] md:w-[500px]">
        <CardHeader>
          <CardTitle>Add Match Football ⚽️</CardTitle>
          <CardDescription>Form for Add Football Match.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Home Club</Label>
                <SelectHomeClub onSelect={clubId => setInputs({ ...inputs, home_club_id: clubId })} />
                <Input type="number" id="name" placeholder="Score Home" value={inputs.home_score} onChange={e => setInputs({ ...inputs, home_score: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Away Club</Label>
                <SelectAwayClub onSelect={clubId => setInputs({ ...inputs, away_club_id: clubId })} />
                <Input type="number" id="name" placeholder="Score Home" value={inputs.away_score} onChange={e => setInputs({ ...inputs, away_score: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="secondary">Add Club</Button>
            <Button disabled={loading}>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Match;
