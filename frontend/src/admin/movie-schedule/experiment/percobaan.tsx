import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

// Define the type for your data
interface Cinema {
  id: string; // The key to identify the Box
  name: string;
  location: string;
}

const CinemaList: React.FC = () => {
  // State to hold the list of cinemas
  const [cinemas, setCinemas] = useState<Cinema[]>([
    { id: "1", name: "Cinema A", location: "xxaxx" },
    { id: "2", name: "Cinema B", location: "yybyy" },
  ]);

  // State for form input
  const [newCinema, setNewCinema] = useState({ name: "", location: "" });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCinema((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding new cinema
  const addCinema = () => {
    const newId = (cinemas.length + 1).toString(); // Generate a new key
    const newCinemaData: Cinema = {
      id: newId,
      name: newCinema.name,
      location: newCinema.location,
    };
    setCinemas((prev) => [...prev, newCinemaData]); // Add new cinema to state
    setNewCinema({ name: "", location: "" }); // Reset form
  };

  // Handle updating a specific cinema by ID
  const updateCinema = (id: string, updatedName: string) => {
    setCinemas((prev) =>
      prev.map((cinema) =>
        cinema.id === id ? { ...cinema, name: updatedName } : cinema
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cinema List
      </Typography>

      {/* Form to add new cinema */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Cinema Name"
          name="name"
          value={newCinema.name}
          onChange={handleInputChange}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Location"
          name="location"
          value={newCinema.location}
          onChange={handleInputChange}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" onClick={addCinema}>
          Add Cinema
        </Button>
      </Box>

      {/* Render list of cinemas */}
      {cinemas.map((cinema) => (
        <Box
          key={cinema.id} // Unique key for each Box
          sx={{
            p: 2,
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6">{cinema.name}</Typography>
          <Typography>Location: {cinema.location}</Typography>
          <Button
            variant="outlined"
            onClick={() => updateCinema(cinema.id, `${cinema.name} Updated`)}
            sx={{ mt: 1 }}
          >
            Update Name
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default CinemaList;
