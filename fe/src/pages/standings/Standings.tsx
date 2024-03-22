/** @format */
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

interface Standings {
  id: number;
  nama_club: string;
  Ma: number;
  Me: number;
  S: number;
  K: number;
  GM: number;
  GK: number;
  Poin: number;
}

const Standings = () => {
  const [standings, setStandings] = useState<Standings[]>([]);
  useEffect(() => {
    fetch("http://localhost:4000/Standing")
      .then(response => response.json())
      .then(result => {
        if (result && Array.isArray(result.data)) {
          setStandings(result.data as Standings[]);
        } else {
          console.error("Expected result.data to be array", result);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Football Match Standings ⚽️</CardTitle>
          <CardDescription>Football Standings.</CardDescription>
        </CardHeader>
        <Table>
          <TableCaption>A list of Standings Team 🥅.</TableCaption>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-[100px]">Nomor</TableHead>
              <TableHead>Nama Club</TableHead>
              <TableHead>Main</TableHead>
              <TableHead>Menang</TableHead>
              <TableHead>Seri</TableHead>
              <TableHead>Kalah</TableHead>
              <TableHead>Goal Menang</TableHead>
              <TableHead>Goal Kalah</TableHead>
              <TableHead>Point</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {standings.map((standing, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{standing.nama_club}</TableCell>
                <TableCell>{standing.Ma}</TableCell>
                <TableCell>{standing.Me}</TableCell>
                <TableCell>{standing.S}</TableCell>
                <TableCell>{standing.K}</TableCell>
                <TableCell>{standing.GM}</TableCell>
                <TableCell>{standing.GK}</TableCell>
                <TableCell>{standing.Poin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Standings;
