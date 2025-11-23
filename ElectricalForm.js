
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Divider,
    Card,
    MenuItem,
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
    Select,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";
import BuildIcon from "@mui/icons-material/Build"; // Add Instrument
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InstrumentList from "./InstrumentList";


function ElectricalForm({ sampleCount = 5, onSummaryChange }) {
    const TOLERANCE = 0.3;

    const [rows, setRows] = useState([
        {
            slno: 1,
            instrument: "",
            basicDimension: "",
            min: "",
            max: "",
            observed: Array(sampleCount).fill(""),
        },
    ]);

    const [basicDimensions, setBasicDimensions] = useState([]);
    const [inspectorSignature, setInspectorSignature] = useState(null);
    const [approverSignature, setApproverSignature] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [showInstrumentTable, setShowInstrumentTable] = useState(false);

    const [instrumentRows, setInstrumentRows] = useState([
        {
            // slno: 1,
            // part_no: "",
            // description: "",
            // model: ""
        }
    ]);

    

    const [form, setForm] = useState({
        partNumber: "",
        mpn: "",
        batchNo: "",
        totalQty: "",
        category: "",
    });

    // Measurement

    const [selectedMeasurement, setSelectedMeasurement] = useState('');

    const measurements = [
        { value: 'resistance', label: 'Resistance - Ω', symbol: 'Ω' },
        { value: 'capacitance', label: 'Capacitance - F', symbol: 'F' },
        { value: 'conductance', label: 'Conductance - S', symbol: 'S' },
        { value: 'voltage', label: 'Voltage - V', symbol: 'V' },
        { value: 'current', label: 'Current - A', symbol: 'A'},
        { value: 'rotation', label: 'Direction of Rotation -↻/↺', symbol: '↻/↺' },
      ];

    const handleMeasurementChange = (event) => {
    setSelectedMeasurement(event.target.value);
    };

    useEffect(() => {
        // Dummy data for dimensions
        setBasicDimensions([
            {  dimension: 25.0 },
            {  dimension: 50.0 },
            {  dimension: 75.0 },
        ]);
    }, []);

    useEffect(() => {
        if (onSummaryChange) {
            onSummaryChange(getSummary());
        }
    }, [rows]); // triggers when rows update

    // Update observed array if sampleCount changes
    useEffect(() => {
        setRows((prev) =>
            prev.map((r) => ({
                ...r,
                observed: Array(sampleCount)
                    .fill("")
                    .map((_, i) => r.observed[i] || ""),
            }))
        );
    }, [sampleCount]);

    const handleChange = (index, field, value, obsIndex = null) => {
        const regex = /^\d*\.?\d{0,2}$/;
        setRows((prev) => {
            const newRows = [...prev];
            const row = { ...newRows[index] };

            if (field === "basicDimension") {
                if (value === "" || regex.test(value)) {
                    row.basicDimension = value;
                    if (value) {
                        const numVal = parseFloat(value);
                        row.min = (numVal - TOLERANCE).toFixed(2);
                        row.max = (numVal + TOLERANCE).toFixed(2);
                    } else {
                        row.min = "";
                        row.max = "";
                    }
                }
            } else if (field === "observed" && obsIndex !== null) {
                if (value === "" || regex.test(value)) {
                    const updatedObserved = [...row.observed];
                    updatedObserved[obsIndex] = value;
                    row.observed = updatedObserved;
                }
            } else {
                if (value === "" || regex.test(value)) {
                    row[field] = value;
                }
            }

            newRows[index] = row;
            return newRows;
        });
    };

    // const handleAddRow = () => {
    //     setRows((prev) => [
    //         ...prev,
    //         {
    //             slno: prev.length + 1,
    //             instrument: "",
    //             basicDimension: "",
    //             min: "",
    //             max: "",
    //             observed: Array(sampleCount).fill(""),
    //         },
    //     ]);
    // };

    // const handleDeleteRow = () => {
    //     setRows((prev) => {
    //         if (prev.length === 1) return prev; // prevent deleting last row
    //         return prev.slice(0, -1);
    //     });
    // };

    // const handleSignatureUpload = (event, type) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             if (type === "inspector") setInspectorSignature(reader.result);
    //             else setApproverSignature(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleSave = async () => {
        try {
            const response = await axios.post("/api/dimensional-inspection", { rows });
            alert("Data saved successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Failed to save data.");
        }
    };

    const validateSample = (sampleIndex) => {
    for (let row of rows) {
      const val = parseFloat(row.observed[sampleIndex]);
      const min = parseFloat(row.min);
      const max = parseFloat(row.max);

      if (isNaN(val) || val < min || val > max) {
        return false; // One dimension failed → whole sample fails
      }
    }
    return true; // All dimensions passed → sample passes
  };

    // Compute inspection results for each sample
    const getInspectionResults = () => {
    const results = [];

    for (let s = 0; s < sampleCount; s++) {
      let hasAnyValue = false;
      let sampleStatus = "Accepted";

      const dimensionList = [];   // basic dimensions for this sample
      const observedList = [];    // observed values for this sample

      // Loop through each dimension row
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        const basicD = row.basicDimension;
        const valStr = row.observed[s];

        if (valStr === "" || basicD === "") continue; // skip empty rows

        hasAnyValue = true;

        const val = parseFloat(valStr);
        const min = parseFloat(row.min);
        const max = parseFloat(row.max);

        dimensionList.push(basicD);
        observedList.push(val);

        // Check tolerance
        if (isNaN(val) || val < min || val > max) {
          sampleStatus = "Rejected";
        }
      }

      // Only include samples that actually have values
      if (hasAnyValue) {
        results.push({
          sample: s + 1,
          basicDimensions: dimensionList,
          observedValues: observedList,
          status: sampleStatus
        });
      }
    }

    return results;
  };

    const getSummary = () => {
        const results = getInspectionResults();
        let accepted = 0;
        let rejected = 0;
        results.forEach((r) => {
            r.status === "Accepted" ? accepted++ : rejected++;
        });
        return { accepted, rejected };
    };

    const isRejectedValue = (val, min, max) => {
        if (val === "") return false;
        const numVal = parseFloat(val);
        return numVal < parseFloat(min) || numVal > parseFloat(max);
    };

    const [showMarkingTable, setShowMarkingTable] = useState(false);


    return (
        <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Box p={2} sx={{ backgroundColor: "#fff", borderRadius: "12px" }}>
                <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: "bold", mb: 2,fontFamily: 'Times New Roman',fontSize:18 }}
                >
                    ELECTRICAL INSPECTION REPORT
                </Typography>



                {/* <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          Required Value : ± {TOLERANCE} mm
        </Typography> */}
                <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            mt: 2,
                          }}
                        >
                          {/* Add Row */}
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              const newRow = {
                                slno: rows.length + 1,
                                instrument: "",
                                basicDimension: "",
                                min: "",
                                max: "",
                                observed: Array(sampleCount).fill(""),
                              };
                
                              const updated = [...rows, newRow];
                              setRows(updated);
                            }}
                          >
                            Add Dimension
                          </Button>
                
                          {/* Delete Last Row */}
                          <Button
                            variant="contained"
                            color="error"
                            disabled={rows.length === 1}
                            onClick={() => {
                              if (rows.length === 1) return;
                              const updated = rows.slice(0, -1);
                              setRows(updated);
                            }}
                          >
                            Delete Dimension
                          </Button>
                
                          {/* Show / Hide Results */}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowResults(prev => !prev)}
                          >
                            {showResults ? "Hide Results" : "Show Results"}
                          </Button>
                        </Box>



                {/* Main Table with Add/Delete/View Row */}
                <TableContainer component={Paper} sx={{ border: "1px solid black", mt: 2, borderRadius:"12px" }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold", fontFamily: 'Times New Roman' }}>SL No</TableCell>
                                <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold", fontFamily: 'Times New Roman' }}>Basic Value</TableCell>
                                <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold", fontFamily: 'Times New Roman' }}>Unit</TableCell>
                                <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold", fontFamily: 'Times New Roman' }}>Min</TableCell>
                                <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold", fontFamily: 'Times New Roman' }}>Max</TableCell>
                                {Array.from({ length: sampleCount }, (_, i) => (
                                    <TableCell key={i} sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold" }}>{i + 1}</TableCell>
                                ))}
                                {/* <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold", fontFamily: 'Times New Roman' }}>Actions</TableCell> */}
                            </TableRow>
                        </TableHead>

                        {/* <TableBody>
                            {rows.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell sx={{ border: "1px solid black", textAlign: "center", fontFamily: 'Times New Roman' }}>{i + 1}</TableCell>
                                    <TableCell sx={{ border: "1px solid black", fontFamily: 'Times New Roman' }}>
                                        <TextField
                                            select
                                            variant="standard"
                                            fullWidth
                                            value={row.basicDimension}
                                            onChange={(e) => handleChange(i, "basicDimension", e.target.value)}
                                            SelectProps={{ native: true }}
                                        >
                                            <option value="">Select Dimension</option>
                                            {basicDimensions.map((d, idx) => (
                                                <option key={idx} value={d.dimension}>{d.dimension}</option>
                                            ))}
                                        </TextField>
                                    </TableCell>
                                    <TableCell sx={{ border: "1px solid black", fontFamily: 'Times New Roman' }}>
                                        <TextField
                                            select
                                            variant="standard"
                                            fullWidth
                                            value={selectedMeasurement}
                                            onChange={handleMeasurementChange}
                                            SelectProps={{ native: true }}
                                        >
                                            <option value="">Select Measurement</option>
                                            {measurements.map((measurement) => (
                                            <option key={measurement.value} value={measurement.value}>{measurement.label}</option>
                                            ))}
                                        </TextField>
                                    </TableCell>

                                   
                                    
                                    <TableCell sx={{ border: "1px solid black", textAlign: "center", fontFamily: 'Times New Roman' }}>{row.min}</TableCell>
                                    <TableCell sx={{ border: "1px solid black", textAlign: "center", fontFamily: 'Times New Roman' }}>{row.max}</TableCell>

                                    {row.observed.map((val, j) => (
                                        <TableCell
                                            key={j}
                                            sx={{
                                                border: "1px solid black",
                                                backgroundColor: isRejectedValue(val, row.min, row.max) ? "#ffcccc" : "#ffffff",
                                            }}
                                        >
                                            <TextField
                                                variant="standard"
                                                fullWidth
                                                value={val}
                                                onChange={(e) => handleChange(i, "observed", e.target.value, j)}
                                            />
                                        </TableCell>
                                    ))}

                                    
                                </TableRow>
                            ))}
                        </TableBody> */}
                        <TableBody>
  {rows.map((row, i) => (
    <TableRow key={i}>
      <TableCell sx={{ border: "1px solid black", textAlign: "center", fontFamily: 'Times New Roman' }}>{i + 1}</TableCell>

      {/* Basic Dimension */}
      <TableCell sx={{ border: "1px solid black", fontFamily: 'Times New Roman' }}>
        <TextField
          select
          variant="standard"
          fullWidth
          value={row.basicDimension}
          onChange={(e) => handleChange(i, "basicDimension", e.target.value)}
          SelectProps={{ native: true }}
        >
          <option value="">Select Dimension</option>
          {basicDimensions.map((d, idx) => (
            <option key={idx} value={d.dimension}>{d.dimension}</option>
          ))}
        </TextField>
      </TableCell>

      {/* Unit Selector */}
      <TableCell sx={{ border: "1px solid black", fontFamily: 'Times New Roman' }}>
        <TextField
          select
          variant="standard"
          fullWidth
          value={selectedMeasurement}
          onChange={handleMeasurementChange}
          SelectProps={{ native: true }}
        >
          <option value="">Select Measurement</option>
          {measurements.map((measurement) => (
            <option key={measurement.value} value={measurement.value}>{measurement.label}</option>
          ))}
        </TextField>
      </TableCell>

      {/* MIN & MAX */}
      <TableCell sx={{ border: "1px solid black", textAlign: "center", fontFamily: 'Times New Roman' }}>{row.min}</TableCell>
      <TableCell sx={{ border: "1px solid black", textAlign: "center", fontFamily: 'Times New Roman' }}>{row.max}</TableCell>

      {/* OBSERVED VALUES WITH RED / GREEN BACKGROUND */}
      {row.observed.map((val, j) => (
        <TableCell
          key={j}
          sx={{
            border: "1px solid black",
            backgroundColor: isRejectedValue(val, row.min, row.max)
              ? "#ff9999"    // RED if out of tolerance
              : validateSample(j)
                ? "#ccffcc"  // GREEN if sample index is valid
                : ""          // WHITE default
          }}
        >
          <TextField
            variant="standard"
            fullWidth
            value={val}
            onChange={(e) => handleChange(i, "observed", e.target.value, j)}
          />
        </TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>

                    </Table>
                </TableContainer>


                {/* Results Table */}
                        {showResults && (
                          <Box mt={4}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 ,textAlign:'center', fontFamily: 'Times New Roman', fontSize:18}}>
                              Inspection Results
                            </Typography>
                            <TableContainer component={Paper} sx={{ border: "1px solid black" }}>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold" }}>Sample</TableCell>
                                    <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold" }}>Basic Dimension</TableCell>
                                    <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold" }}>Observed Value</TableCell>
                                    <TableCell sx={{ border: "1px solid black", textAlign: "center", fontWeight: "bold" }}>Result</TableCell>
                                  </TableRow>
                                </TableHead>
                
                                <TableBody>
                                  {getInspectionResults().map((res, idx) => (
                                    <React.Fragment key={idx}>
                                      {res.basicDimensions.map((dim, dIdx) => (
                                        <TableRow key={`${idx}-${dIdx}`}>
                
                                          {/* MERGED SAMPLE CELL */}
                                          {dIdx === 0 && (
                                            <TableCell
                                              rowSpan={res.basicDimensions.length}
                                              sx={{
                                                border: "1px solid black",
                                                textAlign: "center",
                                                verticalAlign: "middle",
                                                fontWeight: "bold"
                                              }}
                                            >
                                              {res.sample}
                                            </TableCell>
                                          )}
                
                                          {/* Basic Dimension */}
                                          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
                                            {dim}
                                          </TableCell>
                
                                          {/* Observed Value */}
                                          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
                                            {res.observedValues[dIdx]}
                                          </TableCell>
                
                                          {/* MERGED RESULT CELL */}
                                          {dIdx === 0 && (
                                            <TableCell
                                              rowSpan={res.basicDimensions.length}
                                              sx={{
                                                border: "1px solid black",
                                                textAlign: "center",
                                                verticalAlign: "middle",
                                                color: res.status === "Rejected" ? "red" : "green",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              {res.status}
                                            </TableCell>
                                          )}
                
                                        </TableRow>
                                      ))}
                                    </React.Fragment>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                
                          </Box>
                        )}

                        
                    <Box
                              mb={2}
                              display="flex"
                              justifyContent="center"
                              gap={3}
                              sx={{ mt: 2 }}
                            >
                    
                              {/* Save Button */}
                              <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                                sx={{
                                  width: "10rem",
                                  background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
                                  color: "#0d47a1",
                                  fontWeight: "bold",
                                  borderRadius: "8px",
                                  boxShadow: 2,
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #bbdefb, #90caf9)",
                                    boxShadow: 4
                                  }
                                }}
                              >
                                Save
                              </Button>
                    
                              {/* Add / Hide Instrument Button */}
                              <Button
                                variant="contained"
                                startIcon={<BuildIcon />}
                                onClick={() => setShowInstrumentTable(prev => !prev)}
                                sx={{
                                  width: "14rem",
                                  background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
                                  color: "#1b5e20",
                                  fontWeight: "bold",
                                  borderRadius: "8px",
                                  boxShadow: 2,
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #c8e6c9, #a5d6a7)",
                                    boxShadow: 4
                                  }
                                }}
                              >
                                {showInstrumentTable ? "Hide Instrument" : "Add Instrument"}
                              </Button>
                    
                              {/* Add / Hide Additional Details Button */}
                              <Button
                                variant="contained"
                                startIcon={<BuildIcon />}
                                onClick={() => setShowMarkingTable(prev => !prev)}
                                sx={{
                                  width: "16rem",
                                  background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
                                  color: "#e65100",
                                  fontWeight: "bold",
                                  borderRadius: "8px",
                                  boxShadow: 2,
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #ffe0b2, #ffcc80)",
                                    boxShadow: 4
                                  }
                                }}
                              >
                                {showMarkingTable ? "Hide Additional Details" : "Add Additional Details"}
                              </Button>
                    
                            </Box>

                {/* Instrument Code */}
                {showInstrumentTable && (
                    <InstrumentList></InstrumentList>
                )}

                {showMarkingTable && (
                    <Card
                        sx={{
                            p: 4,
                            mt: 4,
                            width: "100%",
                            border: "1px solid #cfcfcf",
                            boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
                            borderRadius: "12px",
                            background: "linear-gradient(to bottom, #fafafa, #ffffff)",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                mb: 3,
                                // textDecoration: "underline",
                                fontFamily: "Times New Roman",
                                color: "#0d47a1",
                                textAlign: "center",
                            }}
                        >
                            Remarks
                        </Typography>




                        {/* REMARK SECTION - UPDATED */}

                        <Box
                            sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: "#f7f9fc",
                            border: "1px solid #e0e0e0",
                            }}
                        >

              </Box>
                        {/* Electrical Inspection Remark */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontFamily: "Times New Roman",
                                    color: "#1a237e",
                                    mb: 1,
                                }}
                            >
                                Electrical Inspection Remark :
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Enter electrical inspection remark"
                                variant="outlined"
                            />
                        </Box>

                        {/* FORM CONTENT IN SYSTEMATIC ORDER */}
                        <Grid container spacing={3}>

                            {/* Electrical Parameter */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Electrical Parameter :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="NA">NA</MenuItem>
                                    <MenuItem value="OK">OK</MenuItem>
                                    <MenuItem value="NOT OK">NOT OK</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Functional */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Functional :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="NA">NA</MenuItem>
                                    <MenuItem value="OK">OK</MenuItem>
                                    <MenuItem value="NOT OK">NOT OK</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Dimensions */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Dimensions :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="NA">NA</MenuItem>
                                    <MenuItem value="OK">OK</MenuItem>
                                    <MenuItem value="NOT OK">NOT OK</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Visual Inspection */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Visual Inspection :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="NA">NA</MenuItem>
                                    <MenuItem value="OK">OK</MenuItem>
                                    <MenuItem value="NOT OK">NOT OK</MenuItem>
                                </TextField>
                            </Grid>

                            {/* COC */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    COC :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="received">Received</MenuItem>
                                    <MenuItem value="not_received">Not Received</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Test Report */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Test Report :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="received">Received</MenuItem>
                                    <MenuItem value="not_received">Not Received</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Imported Document */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Imported Document Received :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="received">Received</MenuItem>
                                    <MenuItem value="not_received">Not Received</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Malware Certificate */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Malware Free Certificate :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="received">Received</MenuItem>
                                    <MenuItem value="not_received">Not Received</MenuItem>
                                </TextField>
                            </Grid>

                            {/* FOD Check */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    FOD Check :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Counterfeit */}
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Counterfeit Checked :
                                </Typography>
                                <TextField fullWidth select defaultValue="" variant="outlined">
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Shelf Life */}
                            <Grid item xs={12} md={6}>
                                <Typography sx={{ fontWeight: "bold", fontFamily: "Times New Roman", mb: 1 }}>
                                    Shelf Lifetime Date :
                                </Typography>

                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <TextField
                                        type="date"
                                        fullWidth
                                        label="MFG Date"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        type="date"
                                        fullWidth
                                        label="EXP Date"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                                
                            </Grid>
                            <Button variant="contained" style={{ width: "10rem", backgroundColor: 'aliceblue', color: 'black' }} sx={{ mt: 2,mx:4,my:2 }} startIcon={<SaveIcon />} >
                                Save
                            </Button>
                        </Grid>
                    </Card>
                )}

            </Box>
        </Grid>
    );
}

export default ElectricalForm;

