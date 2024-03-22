/** @format */

import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

interface Props {
  onSelect: (clubId: string) => void;
}

interface Club {
  id: number;
  nama_club: string;
  kota_club: string;
}

const SelectAwayClub: React.FC<Props> = ({ onSelect }) => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/club")
      .then(response => response.json())
      .then(result => {
        if (result && Array.isArray(result.data)) {
          setClubs(result.data as Club[]);
        } else {
          console.error("Expected result.data to be array", result);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (selectedValue: string) => {
    onSelect(String(selectedValue));
  };
  return (
    <div className="w-full">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Home Club" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Home Club</SelectLabel>
            {clubs.map(club => (
              <SelectItem key={club.id} value={club.id.toString()}>
                {club.nama_club}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectAwayClub;
