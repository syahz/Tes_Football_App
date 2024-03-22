/** @format */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useClub from "@/hooks/useClub";
import { useState } from "react";

interface Inputs {
  nama_club: string;
  kota_club: string;
}
const Home = () => {
  const { loading, club } = useClub();
  const [inputs, setInputs] = useState<Inputs>({
    nama_club: "",
    kota_club: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await club(inputs);
    console.log(inputs);
  };

  return (
    <div>
      <Card className="w-[300px] md:w-[500px]">
        <CardHeader>
          <CardTitle>Add Football Club ⚽</CardTitle>
          <CardDescription>Form for Add Fotball Club.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Club Name</Label>
                <Input id="name" placeholder="Persib" value={inputs.nama_club} onChange={e => setInputs({ ...inputs, nama_club: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Club City</Label>
                <Input id="name" placeholder="Bandung" value={inputs.kota_club} onChange={e => setInputs({ ...inputs, kota_club: e.target.value })} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={loading}>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Home;
