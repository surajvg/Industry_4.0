import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";


function InstrumentList({ sampleCount = 5, onSummaryChange }) {

    const [instrumentRows, setInstrumentRows] = useState([{}]);
    const [showInstrumentTable, setShowInstrumentTable] = useState(false);


    return (
        <Grid item xs={12}>        
                {/* Instrument Code */}
                    <Box mt={4}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                mb: 2,
                                fontFamily: "Times New Roman",
                                color: "#0d47a1",
                                textAlign: "center",
                                // textDecoration: "underline",
                            }}
                        >
                            Instrument Used
                        </Typography>

                        <TableContainer
                            component={Paper}
                            elevation={4}
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                border: "1px solid #d0d0d0",
                            }}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#e3f2fd" }}>

                                        <TableCell sx={{ borderRight: "1px solid #bdbdbd", textAlign: "center", fontWeight: "bold" }}>
                                            Serial No.
                                        </TableCell>

                                        <TableCell sx={{ borderRight: "1px solid #bdbdbd", textAlign: "center", fontWeight: "bold" }}>
                                            Equipment/Part No
                                        </TableCell>

                                        <TableCell sx={{ borderRight: "1px solid #bdbdbd", textAlign: "center", fontWeight: "bold" }}>
                                            Description
                                        </TableCell>

                                        <TableCell sx={{ borderRight: "1px solid #bdbdbd", textAlign: "center", fontWeight: "bold" }}>
                                            Make/Model
                                        </TableCell>

                                        <TableCell sx={{ borderRight: "1px solid #bdbdbd", textAlign: "center", fontWeight: "bold" }}>
                                            Cal Date
                                        </TableCell>

                                        <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                                            Due Date
                                        </TableCell>

                                        <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                                            Actions
                                        </TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {instrumentRows.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:hover": { backgroundColor: "#f5faff" },
                                                transition: "0.2s",
                                            }}
                                        >
                                            {/* Serial No */}
                                            <TableCell sx={{ textAlign: "center", fontSize: "0.9rem" }}>
                                                {index + 1}
                                            </TableCell>

                                            {/* Part */}
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    placeholder="Enter Part"
                                                    value={row.part}
                                                    onChange={(e) => {
                                                        const updated = [...instrumentRows];
                                                        updated[index].part = e.target.value;
                                                        setInstrumentRows(updated);
                                                    }}
                                                />
                                            </TableCell>

                                            {/* Description */}
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    placeholder="Enter Description"
                                                    value={row.description}
                                                    onChange={(e) => {
                                                        const updated = [...instrumentRows];
                                                        updated[index].description = e.target.value;
                                                        setInstrumentRows(updated);
                                                    }}
                                                />
                                            </TableCell>

                                            {/* Model */}
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    placeholder="Enter Model"
                                                    value={row.model}
                                                    onChange={(e) => {
                                                        const updated = [...instrumentRows];
                                                        updated[index].model = e.target.value;
                                                        setInstrumentRows(updated);
                                                    }}
                                                />
                                            </TableCell>

                                            {/* Cal Date */}
                                            <TableCell>
                                                <TextField
                                                    type="date"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={row.calDate}
                                                    onChange={(e) => {
                                                        const updated = [...instrumentRows];
                                                        updated[index].calDate = e.target.value;
                                                        setInstrumentRows(updated);
                                                    }}
                                                />
                                            </TableCell>

                                            {/* Due Date */}
                                            <TableCell>
                                                <TextField
                                                    type="date"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={row.dueDate}
                                                    onChange={(e) => {
                                                        const updated = [...instrumentRows];
                                                        updated[index].dueDate = e.target.value;
                                                        setInstrumentRows(updated);
                                                    }}
                                                />
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell sx={{ textAlign: "center" }}>
                                                <AddCircleIcon
                                                    sx={{
                                                        color: "green",
                                                        cursor: "pointer",
                                                        fontSize: 28,
                                                        mx: 1,
                                                        "&:hover": { transform: "scale(1.1)" },
                                                        transition: "0.2s",
                                                    }}
                                                    onClick={() => {
                                                        const updated = [...instrumentRows];
                                                        updated.splice(index + 1, 0, {
                                                            slno: index + 2,
                                                            part: "",
                                                            description: "",
                                                            model: "",
                                                            calDate: "",
                                                            dueDate: "",
                                                        });

                                                        const normalized = updated.map((r, i) => ({
                                                            ...r,
                                                            slno: i + 1,
                                                        }));

                                                        setInstrumentRows(normalized);
                                                    }}
                                                />

                                                <DeleteIcon
                                                    sx={{
                                                        color: "red",
                                                        cursor: instrumentRows.length > 1 ? "pointer" : "not-allowed",
                                                        opacity: instrumentRows.length > 1 ? 1 : 0.4,
                                                        fontSize: 26,
                                                        "&:hover": {
                                                            transform: instrumentRows.length > 1 ? "scale(1.1)" : "none",
                                                        },
                                                        transition: "0.2s",
                                                    }}
                                                    onClick={() => {
                                                        if (instrumentRows.length === 1) return;

                                                        const updated = instrumentRows.filter((_, i) => i !== index);

                                                        const normalized = updated.map((r, i) => ({
                                                            ...r,
                                                            slno: i + 1,
                                                        }));

                                                        setInstrumentRows(normalized);
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" style={{ width: "10rem", backgroundColor: 'aliceblue', color: 'black' }} sx={{ mt: 2,mx:4,my:2 }} startIcon={<SaveIcon />} >
                        Save
                    </Button>
                    </div>
                
        </Grid>
    );
}

export default InstrumentList;

