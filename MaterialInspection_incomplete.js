// MaterialInspection.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";

import axios from "axios";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import TaskAlt from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import QrCode2 from "@mui/icons-material/QrCode2";
import { QRCodeSVG } from "qrcode.react";

/**
 * MaterialInspection
 * Combined single-file component:
 * - Top cards (Pending / Accepted / Rejected / Total)
 * - Fetch pending GR list with axios + dummy fallback
 * - Click a row to open popup form (in-place card overlay)
 * - Popup contains full Material Inspection form (3 tables, UD, Test Equipment, Quantity & UD)
 * - Accept/Reject QR generation
 */

export default function MaterialInspection() {
  // --- UI Tabs
  const [tab, setTab] = useState("pending");

  // --- pending GR list data
  const [pendingData, setPendingData] = useState([]);

  // --- selected row (from GR table)
  const [selectedRow, setSelectedRow] = useState(null);

  // --- popup open (when selectedRow set)
  const [isFormOpen, setIsFormOpen] = useState(false);

  // --- form state (inspection form)
  const [form, setForm] = useState({
    inspectionLotNumber: "",
    materialNumber: "",
    revisionLevel: "",
    valuationType: "",
    storageLocation: "",
    purchaseOrderNumber: "",
    grNumber: "",
    grPostingDate: "",
    vendor: "",
    project: "",
    plant: "",
    inspectionStartDate: "",
    inspectionEndDate: "",
    testEquipmentText: "",
    inspectionLotStatus: "",
    inspectedBy: "",
    inspectionLotQty: "",
    sampleSize: "",
    udCode: "",
    udDocumentDate: "",
    acceptedQuantity: "",
    blockedQty: "",
    returnedQty: "",
    destination: "",
    storageLocation2: "",
    udText: "",
    remark0010: "",
    remark0020: "",
    remark0030: "",
    approvedBy: "",
    approvalDate: "",
    remarks: "",
    category: "",
    fodCheck: false,
    approverSign: "",
    approvalSeal: "SCI-MCE Department",
  });

  // --- QR
  const [qrOpen, setQrOpen] = useState(false);
  const [qrPayload, setQrPayload] = useState("");
  const [qrType, setQrType] = useState(null);

  // --- tables
  const blankRow = {
    micNo: "",
    mic: "",
    desc: "",
    inspectedBy: "",
    samplingProc: "",
    sQty: "",
    iQty: "",
    uom: "",
    targetUom: "",
    lowerLimit: "",
    upperLimit: "",
    sampleNo: "",
    result: "",
    valuation: "",
    inspDesc: "",
  };

  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);

  // --- other states
  const [inspectionSummary, setInspectionSummary] = useState({ accepted: 0, rejected: 0 });
  const [electricalSummary, setElectricalSummary] = useState({ accepted: 0, rejected: 0 });
  const [referenceno, setReferenceNo] = useState(null);
  const [dimensiondata, setDimensionData] = useState(null);
  const [processOnHold, setProcessOnHold] = useState(false);
  const [indenterIntervention, setIndenterIntervention] = useState(false);

  // --- helper styles for header cards
  const cardStyle = (active, from, to) => ({
    width: 200,
    p: 2,
    cursor: "pointer",
    borderRadius: 3,
    textAlign: "center",
    boxShadow: active ? "0 4px 20px rgba(25,118,210,0.4)" : "0 2px 8px rgba(0,0,0,0.15)",
    background: active ? `linear-gradient(135deg, ${from}, ${to})` : "#e3f2fd",
    color: active ? "white" : "black",
    transition: "0.25s",
    "&:hover": { transform: "scale(1.03)" },
  });

  // --- fetch pending GR list (axios) with dummy fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.0.149:8000/generateddetails");
        // format minimal fields
        const formatted = res.data.map((item) => ({
          slno: item.SL_No,
          partNumber: item.BEL_Part_Number,
          mpn: item.MPN,
          batchNo: item.Batch_Lot_No,
          dateCode: item.DateCode,
          quantity: item.Quantity,
          poNo: item.BEL_PO_No,
          vendor: item.Vendor_Name,
          oemMake: item.OEM_Make,
          manufacture: item.Manufacturing_Place,
          grNo: item.GR_No || "",
          grDate: item.GR_Date ? item.GR_Date.split("T")[0] : "",
          receiptNo: item.Reference_No || "",
        }));
        setPendingData(formatted);
      } catch (err) {
        // dummy fallback
        const dummy = [
          {
            slno: 1,
            partNumber: "400512983122",
            mpn: "MPN-AX45",
            batchNo: "BATCH-789",
            dateCode: "2024-12",
            quantity: 22,
            poNo: "45000565003",
            vendor: "SOURCE TECHNOLOGIES",
            oemMake: "Siemens",
            manufacture: "Germany",
            grNo: "5004443429",
            grDate: "2025-10-16",
            receiptNo: "RCPT-001",
          },
          {
            slno: 2,
            partNumber: "400512654431",
            mpn: "MPN-ZX90",
            batchNo: "BATCH-456",
            dateCode: "2025-01",
            quantity: 50,
            poNo: "45000111111",
            vendor: "ABC ELECTRONICS",
            oemMake: "Honeywell",
            manufacture: "USA",
            grNo: "5004443430",
            grDate: "2025-10-17",
            receiptNo: "RCPT-002",
          },
        ];
        setPendingData(dummy);
      }
    };

    fetchData();
  }, []);

  // --- when clicking a row: set selected row, open form, fetch reports optionally
  const openFormForRow = async (row) => {
    setSelectedRow(row);
    setIsFormOpen(true);

    // fetch additional details if API available (best effort)
    try {
      const res = await axios.get("http://192.168.0.149:8000/subcontractinspectionreport", {
        params: { Ref_No: row.receiptNo },
      });
      setReferenceNo(res.data.Reference_No || null);
    } catch {
      setReferenceNo(null);
    }

    try {
      const res2 = await axios.get("http://192.168.0.149:8000/dimensionreport", {
        params: { Ref_No: row.receiptNo },
      });
      setDimensionData(res2.data || null);
    } catch {
      setDimensionData(null);
    }

    // Initialize form from clicked row (best effort, not exhaustive)
    setForm((f) => ({
      ...f,
      inspectionLotNumber: row.slno || "",
      materialNumber: row.partNumber || "",
      vendor: row.vendor || "",
      purchaseOrderNumber: row.poNo || "",
      grNumber: row.grNo || "",
      grPostingDate: row.grDate || "",
      inspectionLotQty: row.quantity || "",
    }));

    // init simple starter table rows (can be edited)
    setRows1([
      {
        micNo: "10",
        mic: "MPN-CHK",
        desc: "Manufacturer Part Number Verification",
        inspectedBy: "",
        samplingProc: "MGRH10",
        sQty: String(row.quantity || 1),
        iQty: String(row.quantity || 1),
        uom: "NO",
        targetUom: "NO",
        lowerLimit: "",
        upperLimit: "",
        sampleNo: "1",
        result: "",
        valuation: "",
        inspDesc: "",
      },
    ]);

    setRows2([
      {
        micNo: "10",
        mic: "DOC-COC",
        desc: "Certificate of Conformance",
        inspectedBy: "",
        samplingProc: "DOC-VER",
        sQty: "1",
        iQty: "1",
        uom: "SET",
        targetUom: "SET",
        lowerLimit: "",
        upperLimit: "",
        sampleNo: "DOC1",
        result: "",
        valuation: "",
        inspDesc: "",
      },
    ]);

    setRows3([
      {
        micNo: "10",
        mic: "ELEC-RES",
        desc: "Resistance Measurement",
        inspectedBy: "",
        samplingProc: "ELEC-01",
        sQty: "5",
        iQty: "5",
        uom: "Ohm",
        targetUom: "Ohm",
        lowerLimit: "",
        upperLimit: "",
        sampleNo: "E1",
        result: "",
        valuation: "",
        inspDesc: "",
      },
    ]);
  };

  // --- form helpers
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const addRowTo = (setter) => setter((prev) => [...prev, JSON.parse(JSON.stringify(blankRow))]);
  const updateRowIn = (setter, idx, field, value) => setter((prev) => prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  const removeRowFrom = (setter, idx) => setter((prev) => prev.filter((_, i) => i !== idx));

  // --- QR helpers
  const buildQrPayload = (type) => {
    const payload = {
      action: type === "accept" ? "ACCEPT" : "REJECT",
      inspectionLotNumber: form.inspectionLotNumber,
      materialNumber: form.materialNumber,
      grNumber: form.grNumber,
      inspectedBy: form.inspectedBy,
      approvedBy: form.approvedBy,
      approvalDate: form.approvalDate,
    };
    return Object.entries(payload)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  };

  const validateBeforeQr = () => {
    if (!form.inspectionLotNumber) return "Select a GR row first.";
    if (!form.inspectedBy || form.inspectedBy.trim() === "") return "Enter Inspected By.";
    // minimal validation
    return null;
  };

  const handleOpenQr = (type) => {
    const err = validateBeforeQr();
    if (err) {
      alert(err);
      return;
    }
    const payload = buildQrPayload(type);
    setQrPayload(payload);
    setQrType(type);
    setQrOpen(true);
  };

  const handleCloseQr = () => {
    setQrOpen(false);
    setQrPayload("");
    setQrType(null);
  };

  // --- small UI helpers
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ p: 1, minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #e6eef9 100%)" }}>
      <Card sx={{ maxWidth: 3000, mx: "auto", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, mb: 4 }}>
            MATERIAL INSPECTION
          </Typography>

          {/* header cards */}
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
            <Grid item>
              <Card onClick={() => setTab("pending")} sx={cardStyle(tab === "pending", "#1976d2", "#42a5f5")}>
                <PendingActionsIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={700}>
                  Pending GR List
                </Typography>
              </Card>
            </Grid>

            <Grid item>
              <Card onClick={() => setTab("accepted")} sx={cardStyle(tab === "accepted", "#2e7d32", "#66bb6a")}>
                <CheckCircleIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={700}>
                  Accepted GR List
                </Typography>
              </Card>
            </Grid>

            <Grid item>
              <Card onClick={() => setTab("rejected")} sx={cardStyle(tab === "rejected", "#d32f2f", "#ef5350")}>
                <CancelIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={700}>
                  Rejected GR List
                </Typography>
              </Card>
            </Grid>

            <Grid item>
              <Card onClick={() => setTab("total")} sx={cardStyle(tab === "total", "#1565c0", "#64b5f6")}>
                <SummarizeIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={700}>
                  Total
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Pending GR table */}
          {tab === "pending" && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Pending GR List for Inspection
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    {["Sl No", "Part Number", "MPN", "Batch No", "Date Code", "Quantity", "PO No", "Vendor", "GR No", "GR Date"].map((h) => (
                      <TableCell key={h} sx={{ fontWeight: 700, background: "#e3f2fd" }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {pendingData.map((row, idx) => (
                    <TableRow
                      key={idx}
                      hover
                      onClick={() => openFormForRow(row)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { background: "#f1f8ff" },
                      }}
                    >
                      <TableCell>{row.slno}</TableCell>
                      <TableCell sx={{ color: "#0d47a1", fontWeight: 700 }}>{row.partNumber}</TableCell>
                      <TableCell>{row.mpn}</TableCell>
                      <TableCell>{row.batchNo}</TableCell>
                      <TableCell>{row.dateCode}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.poNo}</TableCell>
                      <TableCell>{row.vendor}</TableCell>
                      <TableCell>{row.grNo}</TableCell>
                      <TableCell>{row.grDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}

          {/* The form popup overlay */}
          {isFormOpen && (
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(10,20,30,0.45)",
                p: 2,
              }}
            >
              <Card sx={{ width: "96%", maxWidth: 1200, maxHeight: "92vh", overflow: "auto", borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      Material Inspection
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    <IconButton onClick={() => setIsFormOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  {/* Inspection Lot Information */}
                  <Card sx={{ mb: 2, boxShadow: "none" }}>
                    <CardContent sx={{ background: "#f1f8ff", borderRadius: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                        Inspection Lot Information
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Inspection Lot Number" name="inspectionLotNumber" value={form.inspectionLotNumber} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Material Number / Desc." name="materialNumber" value={form.materialNumber} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Revision Level" name="revisionLevel" value={form.revisionLevel} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Valuation Type" name="valuationType" value={form.valuationType} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Storage Location" name="storageLocation" value={form.storageLocation} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="SO Number" name="purchaseOrderNumber" value={form.purchaseOrderNumber} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Project" name="project" value={form.project} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Plant" name="plant" value={form.plant} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="PO Number" name="purchaseOrderNumber" value={form.purchaseOrderNumber} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="GR Number" name="grNumber" value={form.grNumber} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" type="date" InputLabelProps={{ shrink: true }} fullWidth label="GR Posting Date" name="grPostingDate" value={form.grPostingDate} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Vendor" name="vendor" value={form.vendor} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField size="small" type="date" InputLabelProps={{ shrink: true }} fullWidth label="Inspection Start Date" name="inspectionStartDate" value={form.inspectionStartDate} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField size="small" type="date" InputLabelProps={{ shrink: true }} fullWidth label="Inspection End Date" name="inspectionEndDate" value={form.inspectionEndDate} onChange={handleFormChange} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Test Equipment Details */}
                  <Card sx={{ mb: 2, boxShadow: "none" }}>
                    <CardContent sx={{ background: "#fff8e1", borderRadius: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                        Test Equipment Details
                      </Typography>

                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                          <TextField size="small" fullWidth multiline minRows={2} label="Test Equipment Additional Text" name="testEquipmentText" value={form.testEquipmentText} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Inspection Lot Status" name="inspectionLotStatus" value={form.inspectionLotStatus} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Inspected By" name="inspectedBy" value={form.inspectedBy} onChange={handleFormChange} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Quantity & UD */}
                  <Card sx={{ mb: 2, boxShadow: "none" }}>
                    <CardContent sx={{ background: "#e8f5e9", borderRadius: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                        Quantity & UD Details
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Inspection Lot Qty" name="inspectionLotQty" value={form.inspectionLotQty} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Sample Size" name="sampleSize" value={form.sampleSize} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="UD Code" name="udCode" value={form.udCode} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" type="date" InputLabelProps={{ shrink: true }} fullWidth label="UD Document / Date" name="udDocumentDate" value={form.udDocumentDate} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Accepted Quantity" name="acceptedQuantity" value={form.acceptedQuantity} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Qty Posted to Blocked Stock" name="blockedQty" value={form.blockedQty} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Qty Returned to Vendor" name="returnedQty" value={form.returnedQty} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" fullWidth label="Destination" name="destination" value={form.destination} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField size="small" fullWidth label="Storage Location 2" name="storageLocation2" value={form.storageLocation2} onChange={handleFormChange} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* UD Text */}
                  <Box mb={2}>
                    <TextField fullWidth multiline minRows={4} label="UD Text" name="udText" value={form.udText} onChange={handleFormChange} />
                  </Box>

                  {/* Table group */}
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      {/* TABLE 1 */}
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <AssignmentIcon color="primary" />
                        <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
                          0010 - Visual Inspection
                        </Typography>
                        <Box sx={{ flex: 1 }} />
                        <TextField size="small" label="Remark" sx={{ width: 400 }} name="remark0010" value={form.remark0010} onChange={handleFormChange} />
                      </Box>

                      <Box textAlign="right" mb={1}>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => addRowTo(setRows1)}>
                          Add Row
                        </Button>
                      </Box>

                      <Paper variant="outlined" sx={{ mb: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              {[
                                "MIC No.",
                                "MIC",
                                "MIC Desc",
                                "Inspected By",
                                "Sampling Proc",
                                "S Qty",
                                "I Qty",
                                "UoM",
                                "Target UoM",
                                "Lower Limit",
                                "Upper Limit",
                                "Sample No.",
                                "Result",
                                "Valuation",
                                "Insp Desc",
                                "Actions",
                              ].map((h) => (
                                <TableCell key={h} sx={{ fontWeight: 700 }}>
                                  {h}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {rows1.length ? (
                              rows1.map((r, idx) => (
                                <TableRow key={idx}>
                                  {Object.keys(r).map((col) => (
                                    <TableCell key={col}>
                                      <TextField size="small" fullWidth value={r[col]} onChange={(e) => updateRowIn(setRows1, idx, col, e.target.value)} />
                                    </TableCell>
                                  ))}
                                  <TableCell>
                                    <IconButton color="error" onClick={() => removeRowFrom(setRows1, idx)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={16} align="center">
                                  No rows added
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </Paper>

                      {/* TABLE 2 */}
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <DescriptionIcon color="primary" />
                        <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
                          0020 - Documents Received
                        </Typography>
                        <Box sx={{ flex: 1 }} />
                        <TextField size="small" label="Remark" sx={{ width: 400 }} name="remark0020" value={form.remark0020} onChange={handleFormChange} />
                      </Box>

                      <Box textAlign="right" mb={1}>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => addRowTo(setRows2)}>
                          Add Row
                        </Button>
                      </Box>

                      <Paper variant="outlined" sx={{ mb: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              {[
                                "MIC No.",
                                "MIC",
                                "MIC Desc",
                                "Inspected By",
                                "Sampling Proc",
                                "S Qty",
                                "I Qty",
                                "UoM",
                                "Target UoM",
                                "Lower Limit",
                                "Upper Limit",
                                "Sample No.",
                                "Result",
                                "Valuation",
                                "Insp Desc",
                                "Actions",
                              ].map((h) => (
                                <TableCell key={h} sx={{ fontWeight: 700 }}>
                                  {h}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {rows2.length ? (
                              rows2.map((r, idx) => (
                                <TableRow key={idx}>
                                  {Object.keys(r).map((col) => (
                                    <TableCell key={col}>
                                      <TextField size="small" fullWidth value={r[col]} onChange={(e) => updateRowIn(setRows2, idx, col, e.target.value)} />
                                    </TableCell>
                                  ))}
                                  <TableCell>
                                    <IconButton color="error" onClick={() => removeRowFrom(setRows2, idx)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={16} align="center">
                                  No rows added
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </Paper>

                      {/* TABLE 3 */}
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EngineeringIcon color="primary" />
                        <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
                          0030 - Electrical Test
                        </Typography>
                        <Box sx={{ flex: 1 }} />
                        <TextField size="small" label="Remark" sx={{ width: 400 }} name="remark0030" value={form.remark0030} onChange={handleFormChange} />
                      </Box>

                      <Box textAlign="right" mb={1}>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => addRowTo(setRows3)}>
                          Add Row
                        </Button>
                      </Box>

                      <Paper variant="outlined">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              {[
                                "MIC No.",
                                "MIC",
                                "MIC Desc",
                                "Inspected By",
                                "Sampling Proc",
                                "S Qty",
                                "I Qty",
                                "UoM",
                                "Target UoM",
                                "Lower Limit",
                                "Upper Limit",
                                "Sample No.",
                                "Result",
                                "Valuation",
                                "Insp Desc",
                                "Actions",
                              ].map((h) => (
                                <TableCell key={h} sx={{ fontWeight: 700 }}>
                                  {h}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {rows3.length ? (
                              rows3.map((r, idx) => (
                                <TableRow key={idx}>
                                  {Object.keys(r).map((col) => (
                                    <TableCell key={col}>
                                      <TextField size="small" fullWidth value={r[col]} onChange={(e) => updateRowIn(setRows3, idx, col, e.target.value)} />
                                    </TableCell>
                                  ))}
                                  <TableCell>
                                    <IconButton color="error" onClick={() => removeRowFrom(setRows3, idx)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={16} align="center">
                                  No rows added
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                    </CardContent>
                  </Card>

                  {/* Inspection Options + Remarks */}
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                          <Typography sx={{ fontWeight: 700 }}>Inspection Options</Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <TextField
                              select
                              size="small"
                              label="Category"
                              value={form.category || ""}
                              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                              sx={{ width: 200 }}
                            >
                              <MenuItem value="">Select</MenuItem>
                              <MenuItem value="Mechanical">Mechanical</MenuItem>
                              <MenuItem value="Electrical">Electrical</MenuItem>
                              <MenuItem value="Electromechanical">Electromechanical</MenuItem>
                            </TextField>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Checkbox checked={indenterIntervention} onChange={(e) => { setIndenterIntervention(e.target.checked); setProcessOnHold(e.target.checked); }} />
                              <Typography>Indenter Intervention Required</Typography>

                              {processOnHold && (
                                <Tooltip title="Process is on hold">
                                  <PauseCircleOutlineIcon color="warning" />
                                </Tooltip>
                              )}
                            </Box>
                          </Stack>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                          <Typography sx={{ fontWeight: 700 }}>Remarks</Typography>
                          <TextField fullWidth multiline minRows={3} value={form.remarks || ""} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Approved By */}
                  <Box sx={{ mt: 3 }}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Approved By
                      </Typography>

                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                          <TextField size="small" fullWidth label="Approved By" name="approvedBy" value={form.approvedBy} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <TextField size="small" type="date" InputLabelProps={{ shrink: true }} fullWidth label="Approval Date" name="approvalDate" value={form.approvalDate} onChange={handleFormChange} />
                        </Grid>

                        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                          <Stack direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained" color="success" startIcon={<TaskAlt />} onClick={() => handleOpenQr("accept")}>
                              Accept QR
                            </Button>
                            <Button variant="contained" color="error" startIcon={<HighlightOffIcon />} onClick={() => handleOpenQr("reject")}>
                              Reject QR
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>

                  {/* QR floating */}
                  {qrOpen && (
                    <Paper sx={{ position: "fixed", right: 24, bottom: 24, p: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        {qrType === "accept" ? "Accept QR" : "Reject QR"}
                      </Typography>
                      <Box sx={{ mb: 1 }}>
                        <QRCodeSVG value={qrPayload} />
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="contained" onClick={handleCloseQr}>
                          Close
                        </Button>
                      </Stack>
                    </Paper>
                  )}
                </CardContent>
              </Card>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
