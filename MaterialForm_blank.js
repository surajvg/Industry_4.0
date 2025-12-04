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
  const today = new Date().toLocaleDateString();

  const [meta, setMeta] = useState({});
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setMeta((m) => ({ ...m, [name]: value }));
  };

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

  const addRow1 = () => setRows1((r) => [...r, { ...blankRow }]);
  const addRow2 = () => setRows2((r) => [...r, { ...blankRow }]);
  const addRow3 = () => setRows3((r) => [...r, { ...blankRow }]);

  const updateRow = (setRows, index, field, val) =>
    setRows((r) => r.map((row, i) => (i === index ? { ...row, [field]: val } : row)));

  const removeRow = (setRows, index) =>
    setRows((r) => r.filter((_, i) => i !== index));

  return (
    <Box
      p={3}
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #d9e4f2 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ---------------------------------------------- */}
      {/* HEADER */}
      {/* ---------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={800} color="primary">
          Material Inspection
        </Typography>

        <Typography fontWeight={700} color="secondary">
          Date: {today}
        </Typography>
      </Stack>

      {/* ---------------------------------------------- */}
      {/* CARD 1 — INSPECTION LOT INFORMATION */}
      {/* ---------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0px 6px 18px rgba(0,0,0,0.12)" }}>
        <CardContent>
          <Box
            sx={{
              background: "#bbdefb",
              p: 1.2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Inspection Lot Information
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Inspection Lot Number"
                name="inspectionLotNumber"
                size="small"
                value={meta.inspectionLotNumber || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Material Number / Description"
                name="materialNumber"
                size="small"
                value={meta.materialNumber || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Revision Level"
                name="revisionLevel"
                size="small"
                value={meta.revisionLevel || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Valuation Type"
                name="valuationType"
                size="small"
                value={meta.valuationType || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            {/* ROW 2 */}
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Storage Location"
                name="storageLocation"
                size="small"
                value={meta.storageLocation || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Sale Order Number"
                name="saleOrderNumber"
                size="small"
                value={meta.saleOrderNumber || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Project"
                name="project"
                size="small"
                value={meta.project || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Plant"
                name="plant"
                size="small"
                value={meta.plant || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            {/* ROW 3 */}
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Purchase Order Number"
                name="purchaseOrderNumber"
                size="small"
                value={meta.purchaseOrderNumber || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="GR Number"
                name="grNumber"
                size="small"
                value={meta.grNumber || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                label="GR Posting Date"
                InputLabelProps={{ shrink: true }}
                name="grPostingDate"
                size="small"
                value={meta.grPostingDate || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Vendor"
                name="vendor"
                size="small"
                value={meta.vendor || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            {/* ROW 4 */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Inspection Start Date"
                InputLabelProps={{ shrink: true }}
                name="inspectionStartDate"
                size="small"
                value={meta.inspectionStartDate || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Inspection End Date"
                InputLabelProps={{ shrink: true }}
                name="inspectionEndDate"
                size="small"
                value={meta.inspectionEndDate || ""}
                onChange={handleMetaChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ---------------------------------------------- */}
      {/* CARD 2 — TEST EQUIPMENT DETAILS */}
      {/* ---------------------------------------------- */}
     <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0px 6px 18px rgba(0,0,0,0.12)" }}>
  <CardContent>
    <Box
      sx={{
        background: "#bbdefb",
        p: 1.2,
        borderRadius: 1,
        mb: 2,
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        Test Equipment Details
      </Typography>
    </Box>

    <Grid container spacing={2} alignItems="flex-start">
      
      {/* 6-column field */}
      <Grid item xs={12} md={6} sx={{ minWidth: "50%" }}>
        <TextField
          fullWidth
          label="Test Equipment Additional Text"
          name="testEquipmentText"
          size="small"
          value={meta.testEquipmentText || ""}
          onChange={handleMetaChange}
        />
      </Grid>

      {/* 3-column field */}
      <Grid item xs={12} md={3} sx={{ minWidth: "25%" }}>
        <TextField
          fullWidth
          size="small"
          label="Inspection Lot Status"
          name="inspectionLotStatus"
          value={meta.inspectionLotStatus || ""}
          onChange={handleMetaChange}
        />
      </Grid>

      {/* 3-column field */}
      <Grid item xs={12} md={3} sx={{ minWidth: "25%" }}>
        <TextField
          fullWidth
          size="small"
          label="Inspected By"
          name="inspectedBy"
          value={meta.inspectedBy || ""}
          onChange={handleMetaChange}
        />
      </Grid>

    </Grid>
  </CardContent>
</Card>



      {/* ---------------------------------------------- */}
      {/* CARD 3 — QUANTITY & UD DETAILS */}
      {/* ---------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0px 6px 18px rgba(0,0,0,0.12)" }}>
        <CardContent>
          <Box
            sx={{
              background: "#bbdefb",
              p: 1.2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Quantity & UD Details
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Inspection Lot Quantity"
                size="small"
                name="inspectionLotQty"
                value={meta.inspectionLotQty || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Sample Size"
                size="small"
                name="sampleSize"
                value={meta.sampleSize || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="UD Code"
                size="small"
                name="udCode"
                value={meta.udCode || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                label="UD Document / Date"
                InputLabelProps={{ shrink: true }}
                size="small"
                name="udDocumentDate"
                value={meta.udDocumentDate || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            {/* 2nd row */}
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Accepted Quantity"
                size="small"
                name="acceptedQuantity"
                value={meta.acceptedQuantity || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Quantity Posted to Blocked Stock"
                size="small"
                name="blockedQty"
                value={meta.blockedQty || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Quantity Returned to Vendor"
                size="small"
                name="returnedQty"
                value={meta.returnedQty || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Destination"
                size="small"
                name="destination"
                value={meta.destination || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Storage Location 2"
                size="small"
                name="storageLocation2"
                value={meta.storageLocation2 || ""}
                onChange={handleMetaChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ---------------------------------------------- */}
      {/* UD TEXT BOX */}
      {/* ---------------------------------------------- */}
      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel>UD Text</InputLabel>
          <OutlinedInput
            multiline
            minRows={4}
            label="UD Text"
            name="udText"
            value={meta.udText || ""}
            onChange={handleMetaChange}
            sx={{
              borderRadius: 3,
              paddingTop: "12px",
            }}
          />
        </FormControl>
      </Box>
      {/* ---------------------------------------------- */}
      {/* TABLE 1 — 0010 Visual Inspection */}
      {/* ---------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0px 6px 18px rgba(0,0,0,0.12)" }}>
        <CardContent>
          {/* TABLE HEADER BAR */}
          <Box
            sx={{
              background: "#90caf9",
              p: 1.2,
              borderRadius: 1,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AssignmentIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              0010 - Visual Inspection
            </Typography>

            <Box flexGrow={1} />

            <TextField
              size="small"
              label="Remark"
              sx={{ width: 500 }}
              name="remark0010"
              value={meta.remark0010 || ""}
              onChange={handleMetaChange}
            />
          </Box>

          {/* ADD ROW */}
          <Box textAlign="right" mb={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addRow1}
              sx={{ borderRadius: 2 }}
            >
              Add Row
            </Button>
          </Box>

          {/* ACTUAL TABLE */}
          <Paper elevation={0} sx={{ borderRadius: 2 }}>
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
                    "Sample No",
                    "Result",
                    "Valuation",
                    "Insp Desc",
                    "Actions",
                  ].map((h, idx) => (
                    <TableCell
                      key={idx}
                      sx={{ fontWeight: 700, background: "#e3f2fd" }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows1.length > 0 ? (
                  rows1.map((row, i) => (
                    <TableRow key={i}>
                      {Object.keys(row).map((field, k) => (
                        <TableCell key={k}>
                          <TextField
                            fullWidth
                            size="small"
                            value={row[field]}
                            onChange={(e) =>
                              updateRow(setRows1, i, field, e.target.value)
                            }
                          />
                        </TableCell>
                      ))}

                      <TableCell>
                        <IconButton color="error" onClick={() => removeRow(setRows1, i)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={16} align="center">
                      <Typography color="gray">No rows added</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>

      {/* ---------------------------------------------- */}
      {/* TABLE 2 — 0020 Documents Received */}
      {/* ---------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0px 6px 18px rgba(0,0,0,0.12)" }}>
        <CardContent>
          <Box
            sx={{
              background: "#90caf9",
              p: 1.2,
              borderRadius: 1,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <DescriptionIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              0020 - Documents Received
            </Typography>

            <Box flexGrow={1} />

            <TextField
              size="small"
              label="Remark"
              sx={{ width: 500 }}
              name="remark0020"
              value={meta.remark0020 || ""}
              onChange={handleMetaChange}
            />
          </Box>

          <Box textAlign="right" mb={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addRow2}
              sx={{ borderRadius: 2 }}
            >
              Add Row
            </Button>
          </Box>

          <Paper elevation={0} sx={{ borderRadius: 2 }}>
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
                    "Sample No",
                    "Result",
                    "Valuation",
                    "Insp Desc",
                    "Actions",
                  ].map((h, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: 700, background: "#e3f2fd" }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows2.length > 0 ? (
                  rows2.map((row, i) => (
                    <TableRow key={i}>
                      {Object.keys(row).map((field, k) => (
                        <TableCell key={k}>
                          <TextField
                            fullWidth
                            size="small"
                            value={row[field]}
                            onChange={(e) =>
                              updateRow(setRows2, i, field, e.target.value)
                            }
                          />
                        </TableCell>
                      ))}

                      <TableCell>
                        <IconButton color="error" onClick={() => removeRow(setRows2, i)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={16} align="center">
                      <Typography color="gray">No rows added</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>

      {/* ---------------------------------------------- */}
      {/* TABLE 3 — 0030 Electrical Test */}
      {/* ---------------------------------------------- */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0px 6px 18px rgba(0,0,0,0.12)" }}>
        <CardContent>
          <Box
            sx={{
              background: "#90caf9",
              p: 1.2,
              borderRadius: 1,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EngineeringIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              0030 - Electrical Test
            </Typography>

            <Box flexGrow={1} />

            <TextField
              size="small"
              label="Remark"
              sx={{ width: 500 }}
              name="remark0030"
              value={meta.remark0030 || ""}
              onChange={handleMetaChange}
            />
          </Box>

          <Box textAlign="right" mb={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addRow3}
              sx={{ borderRadius: 2 }}
            >
              Add Row
            </Button>
          </Box>

          <Paper elevation={0} sx={{ borderRadius: 2 }}>
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
                    "Sample No",
                    "Result",
                    "Valuation",
                    "Insp Desc",
                    "Actions",
                  ].map((h, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: 700, background: "#e3f2fd" }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows3.length > 0 ? (
                  rows3.map((row, i) => (
                    <TableRow key={i}>
                      {Object.keys(row).map((field, k) => (
                        <TableCell key={k}>
                          <TextField
                            fullWidth
                            size="small"
                            value={row[field]}
                            onChange={(e) =>
                              updateRow(setRows3, i, field, e.target.value)
                            }
                          />
                        </TableCell>
                      ))}

                      <TableCell>
                        <IconButton color="error" onClick={() => removeRow(setRows3, i)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={16} align="center">
                      <Typography color="gray">No rows added</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>

      {/* ---------------------------------------------- */}
      {/* APPROVED BY (Centered) */}
      {/* ---------------------------------------------- */}
      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
          boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Box
            sx={{
              background: "#bbdefb",
              p: 1.2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Approved By
            </Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Approved By"
                name="approvedBy"
                value={meta.approvedBy || ""}
                onChange={handleMetaChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                label="Approval Date"
                InputLabelProps={{ shrink: true }}
                name="approvalDate"
                value={meta.approvalDate || ""}
                onChange={handleMetaChange}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={4} justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="success"
              sx={{ px: 4, borderRadius: 3 }}
            >
              Accept QR
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ px: 4, borderRadius: 3 }}
            >
              Reject QR
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
