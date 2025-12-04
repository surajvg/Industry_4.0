import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import EngineeringIcon from "@mui/icons-material/Engineering";

export default function InspectionForm() {
  const today = new Date().toISOString().split("T")[0];

  // -----------------------------------------------------
  //   SAP-STYLE DUMMY DATA
  // -----------------------------------------------------
  const [meta, setMeta] = useState({
    inspectionLotNumber: "010017747254",
    materialNumber: "400512983122 / RES MF 18K 1% 0.063W",
    revisionLevel: "16",
    valuationType: "INC",
    storageLocation: "IGSL",
    saleOrderNumber: "0000001234",
    project: "PRJ-MFG-4402",
    plant: "1190",
    purchaseOrderNumber: "45000565003 / 00010",
    grNumber: "5004443429",
    grPostingDate: "2025-10-16",
    vendor: "SA2911 / SOURCE TECHNOLOGIES",
    inspectionStartDate: "2025-10-28",
    inspectionEndDate: "2025-11-03",

    testEquipmentText: "Fluke 87V, LCR Meter 4284A, Calibrated against STD-2025",
    inspectionLotStatus: "UD ICCO SPCO STUP",
    inspectedBy: "VEERENDRA / SACHIN",

    inspectionLotQty: "22.000",
    sampleSize: "22.000 NO",
    udCode: "01 / ACCP / Accept",
    udDocumentDate: "2025-11-03",
    acceptedQuantity: "22.000",
    blockedQty: "0.000",
    returnedQty: "0.000",
    destination: "STAGE-2 STORE",
    storageLocation2: "IGSL-02",

    udText:
      "All inspected characteristics comply with MIC specifications. Material accepted per UD Code 01.",

    remark0010: "Visual characteristics confirmed OK.",
    remark0020: "Documentation complete and verified.",
    remark0030: "Electrical measurement within specification.",

    approvedBy: "QA ENGINEER / RAVI",
    approvalDate: "2025-11-04",
  });

  const [rows1, setRows1] = useState([
    {
      micNo: "0010",
      mic: "MPN-CHK",
      desc: "Manufacturer Part Number Verification",
      inspectedBy: "Sachin",
      samplingProc: "MGRH10",
      sQty: "22",
      iQty: "22",
      uom: "NO",
      targetUom: "NO",
      lowerLimit: "-",
      upperLimit: "-",
      sampleNo: "1",
      result: "Matching",
      valuation: "Accepted",
      inspDesc: "CRCW060318K0FKEA",
    },
    {
      micNo: "0020",
      mic: "MARK-CHK",
      desc: "Marking & Package Inspection",
      inspectedBy: "Veerendra",
      samplingProc: "MGRH10",
      sQty: "22",
      iQty: "22",
      uom: "NO",
      targetUom: "NO",
      lowerLimit: "-",
      upperLimit: "-",
      sampleNo: "2",
      result: "OK",
      valuation: "Accepted",
      inspDesc: "Clear marking",
    },
  ]);

  const [rows2, setRows2] = useState([
    {
      micNo: "0010",
      mic: "DOC-COC",
      desc: "COC Verification",
      inspectedBy: "Sachin",
      samplingProc: "DOC-VER",
      sQty: "1",
      iQty: "1",
      uom: "SET",
      targetUom: "SET",
      lowerLimit: "-",
      upperLimit: "-",
      sampleNo: "DOC1",
      result: "Available",
      valuation: "Accepted",
      inspDesc: "CoC available in ZIMM489",
    },
    {
      micNo: "0020",
      mic: "DOC-TR",
      desc: "OEM Test Report Verification",
      inspectedBy: "Veerendra",
      samplingProc: "DOC-VER",
      sQty: "1",
      iQty: "1",
      uom: "SET",
      targetUom: "SET",
      lowerLimit: "-",
      upperLimit: "-",
      sampleNo: "DOC2",
      result: "N/A",
      valuation: "Accepted",
      inspDesc: "Not applicable",
    },
  ]);

  const [rows3, setRows3] = useState([
    {
      micNo: "0010",
      mic: "ELEC-RES",
      desc: "Resistance Measurement",
      inspectedBy: "Sachin",
      samplingProc: "ELEC-01",
      sQty: "5",
      iQty: "5",
      uom: "Ohms",
      targetUom: "Ohms",
      lowerLimit: "17.8",
      upperLimit: "18.2",
      sampleNo: "E1",
      result: "18.0",
      valuation: "Accepted",
      inspDesc: "Within tolerance",
    },
    {
      micNo: "0020",
      mic: "ELEC-PWR",
      desc: "Power Rating Verification",
      inspectedBy: "Veerendra",
      samplingProc: "ELEC-02",
      sQty: "5",
      iQty: "5",
      uom: "W",
      targetUom: "W",
      lowerLimit: "0.05",
      upperLimit: "0.07",
      sampleNo: "E2",
      result: "0.063",
      valuation: "Accepted",
      inspDesc: "Pass",
    },
  ]);

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setMeta((m) => ({ ...m, [name]: value }));
  };

  const updateRow = (setRows, index, field, val) =>
    setRows((r) => r.map((row, i) => (i === index ? { ...row, [field]: val } : row)));

  const removeRow = (setRows, index) =>
    setRows((r) => r.filter((_, i) => i !== index));

  const addRow = (setRows) =>
    setRows((r) => [...r, JSON.parse(JSON.stringify(r[0]))]);

  // -----------------------------------------------------
  // UI STARTS HERE
  // -----------------------------------------------------
  return (
    <Box
      p={3}
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #d9e4f2 100%)",
      }}
    >
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={800} color="primary">
          Material Inspection
        </Typography>
        <Typography fontWeight={700} color="secondary">
          Date: {today}
        </Typography>
      </Stack>

      {/* -------------------------------------------------- */}
      {/* CARD 1 — INSPECTION LOT INFORMATION (SAP Style) */}
      {/* -------------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ background: "#bbdefb", p: 1.2, borderRadius: 1, mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Inspection Lot Information
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Inspection Lot No." name="inspectionLotNumber" value={meta.inspectionLotNumber} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Material Number / Desc." name="materialNumber" value={meta.materialNumber} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Revision Level" name="revisionLevel" value={meta.revisionLevel} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Valuation Type" name="valuationType" value={meta.valuationType} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Storage Location" name="storageLocation" value={meta.storageLocation} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="SO Number" name="saleOrderNumber" value={meta.saleOrderNumber} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Project" name="project" value={meta.project} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Plant" name="plant" value={meta.plant} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="PO Number" name="purchaseOrderNumber" value={meta.purchaseOrderNumber} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="GR Number" name="grNumber" value={meta.grNumber} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth type="date" size="small" label="GR Posting Date" InputLabelProps={{ shrink: true }} name="grPostingDate" value={meta.grPostingDate} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Vendor" name="vendor" value={meta.vendor} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth type="date" size="small" label="Inspection Start Date" InputLabelProps={{ shrink: true }} name="inspectionStartDate" value={meta.inspectionStartDate} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth type="date" size="small" label="Inspection End Date" InputLabelProps={{ shrink: true }} name="inspectionEndDate" value={meta.inspectionEndDate} onChange={handleMetaChange} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* -------------------------------------------------- */}
      {/* CARD 2 — TEST EQUIPMENT DETAILS */}
      {/* -------------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ background: "#bbdefb", p: 1.2, borderRadius: 1, mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Test Equipment Details
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {/* 6-column long text */}
            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="Test Equipment Additional Text" name="testEquipmentText" value={meta.testEquipmentText} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Inspection Lot Status" name="inspectionLotStatus" value={meta.inspectionLotStatus} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Inspected By" name="inspectedBy" value={meta.inspectedBy} onChange={handleMetaChange} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* -------------------------------------------------- */}
      {/* CARD 3 — QUANTITY & UD DETAILS */}
      {/* -------------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ background: "#bbdefb", p: 1.2, borderRadius: 1, mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Quantity & UD Details
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Inspection Lot Qty" name="inspectionLotQty" value={meta.inspectionLotQty} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Sample Size" name="sampleSize" value={meta.sampleSize} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="UD Code" name="udCode" value={meta.udCode} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth type="date" size="small" label="UD Document / Date" InputLabelProps={{ shrink: true }} name="udDocumentDate" value={meta.udDocumentDate} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Accepted Qty" name="acceptedQuantity" value={meta.acceptedQuantity} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Blocked Stock Qty" name="blockedQty" value={meta.blockedQty} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Qty Returned to Vendor" name="returnedQty" value={meta.returnedQty} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Destination" name="destination" value={meta.destination} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Storage Location 2" name="storageLocation2" value={meta.storageLocation2} onChange={handleMetaChange} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* UD TEXT */}
      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel>UD Text</InputLabel>
          <OutlinedInput
            multiline
            minRows={4}
            label="UD Text"
            name="udText"
            value={meta.udText}
            onChange={handleMetaChange}
            sx={{ borderRadius: 3, paddingTop: "12px" }}
          />
        </FormControl>
      </Box>

      {/* -------------------------------------------------- */}
      {/* TABLE 1 — 0010 VISUAL INSPECTION */}
      {/* -------------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ background: "#90caf9", p: 1.2, borderRadius: 1, mb: 2, display: "flex", alignItems: "center" }}>
            <AssignmentIcon color="primary" />
            <Typography variant="h6" fontWeight={700} sx={{ ml: 1 }}>
              0010 - Visual Inspection
            </Typography>
            <Box flexGrow={1} />
            <TextField size="small" label="Remark" sx={{ width: 450 }} name="remark0010" value={meta.remark0010} onChange={handleMetaChange} />
          </Box>

          <Box textAlign="right" mb={2}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => addRow(setRows1)} sx={{ borderRadius: 2 }}>
              Add Row
            </Button>
          </Box>

          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {Object.keys(rows1[0]).concat("Actions").map((h, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: 700, background: "#e3f2fd" }}>
                      {h.toUpperCase()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows1.map((row, i) => (
                  <TableRow key={i}>
                    {Object.keys(row).map((field, k) => (
                      <TableCell key={k}>
                        <TextField
                          fullWidth
                          size="small"
                          value={row[field]}
                          onChange={(e) => updateRow(setRows1, i, field, e.target.value)}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton color="error" onClick={() => removeRow(setRows1, i)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>

      {/* -------------------------------------------------- */}
      {/* TABLE 2 — 0020 DOCUMENTS RECEIVED */}
      {/* -------------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ background: "#90caf9", p: 1.2, borderRadius: 1, mb: 2, display: "flex", alignItems: "center" }}>
            <DescriptionIcon color="primary" />
            <Typography variant="h6" fontWeight={700} sx={{ ml: 1 }}>
              0020 - Documents Received
            </Typography>
            <Box flexGrow={1} />
            <TextField size="small" label="Remark" sx={{ width: 450 }} name="remark0020" value={meta.remark0020} onChange={handleMetaChange} />
          </Box>

          <Box textAlign="right" mb={2}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => addRow(setRows2)} sx={{ borderRadius: 2 }}>
              Add Row
            </Button>
          </Box>

          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {Object.keys(rows2[0]).concat("Actions").map((h, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: 700, background: "#e3f2fd" }}>
                      {h.toUpperCase()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows2.map((row, i) => (
                  <TableRow key={i}>
                    {Object.keys(row).map((field, k) => (
                      <TableCell key={k}>
                        <TextField
                          fullWidth
                          size="small"
                          value={row[field]}
                          onChange={(e) => updateRow(setRows2, i, field, e.target.value)}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton color="error" onClick={() => removeRow(setRows2, i)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>

      {/* -------------------------------------------------- */}
      {/* TABLE 3 — 0030 ELECTRICAL TEST */}
      {/* -------------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ background: "#90caf9", p: 1.2, borderRadius: 1, mb: 2, display: "flex", alignItems: "center" }}>
            <EngineeringIcon color="primary" />
            <Typography variant="h6" fontWeight={700} sx={{ ml: 1 }}>
              0030 - Electrical Test
            </Typography>
            <Box flexGrow={1} />
            <TextField size="small" label="Remark" sx={{ width: 450 }} name="remark0030" value={meta.remark0030} onChange={handleMetaChange} />
          </Box>

          <Box textAlign="right" mb={2}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => addRow(setRows3)} sx={{ borderRadius: 2 }}>
              Add Row
            </Button>
          </Box>

          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {Object.keys(rows3[0]).concat("Actions").map((h, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: 700, background: "#e3f2fd" }}>
                      {h.toUpperCase()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows3.map((row, i) => (
                  <TableRow key={i}>
                    {Object.keys(row).map((field, k) => (
                      <TableCell key={k}>
                        <TextField
                          fullWidth
                          size="small"
                          value={row[field]}
                          onChange={(e) => updateRow(setRows3, i, field, e.target.value)}
                        />
                      </TableCell>
                        
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>

      {/* -------------------------------------------------- */}
      {/* APPROVED BY */}
      {/* -------------------------------------------------- */}
      <Card sx={{ textAlign: "center", borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ background: "#bbdefb", p: 1.2, borderRadius: 1, mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Approved By
            </Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <TextField fullWidth size="small" label="Approved By" name="approvedBy" value={meta.approvedBy} onChange={handleMetaChange} />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth type="date" size="small" label="Approval Date" InputLabelProps={{ shrink: true }} name="approvalDate" value={meta.approvalDate} onChange={handleMetaChange} />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={3} justifyContent="center" mt={3}>
            <Button variant="contained" color="success" sx={{ px: 4 }}>
              Accept QR
            </Button>
            <Button variant="contained" color="error" sx={{ px: 4 }}>
              Reject QR
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
