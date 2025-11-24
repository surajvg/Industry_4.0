import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import axios from "axios";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IndenterForm from "../../Components/IndenterForm";

export default function Intenderdashboard() {

    const [tab, setTab] = useState("pending");
    const [pendingData, setPendingData] = useState([]);
    const [hoveredRow, setHoveredRow] = useState(null);

    const [openForm, setOpenForm] = useState(false);
    const [formData, setFormData] = useState(null);

    const handlePartNumberClick = (row) => {
    setFormData(row);
    setOpenForm(true);
};



    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get("http://192.168.0.149:8000/generateddetails");

    //             const formattedData = res.data.map((item) => ({
    //                 slno: item.WS_NO,
    //                 grNo: item.GR_No || "",
    //                 grDate: item.GR_Date ? item.GR_Date.split("T")[0] : "",
    //                 partNumber: item.BEL_Part_Number,
    //                 mpn: item.MPN,
    //                 batchNo: item.Batch_Lot_No,
    //                 dateCode: item.DateCode,
    //                 quantity: item.Quantity,
    //                 poNo: item.BEL_PO_No,
    //                 vendor: item.Vendor_Name,
    //                 oemMake: item.OEM_Make,
    //                 manufacture: item.Manufacturing_Place,
    //                 receiptNo: item.Reference_No || "",
    //             }));

    //             setPendingData(formattedData);

    //         } catch {
    //             const dummyData = [
    //                 {
    //                     WS_NO: 1,
    //                     GR_No: "GR2025-001",
    //                     GR_Date: "2025-01-15T10:23:00.000Z",
    //                     BEL_Part_Number: "423458754153",
    //                     MPN: "MPN-AX45",
    //                     Batch_Lot_No: "BATCH-789",
    //                     DateCode: "2024-12",
    //                     Quantity: 150,
    //                     BEL_PO_No: "PO-56789",
    //                     Vendor_Name: "ABC Electronics Pvt Ltd",
    //                     OEM_Make: "Siemens",
    //                     Manufacturing_Place: "Germany",
    //                     Reference_No: "RCPT-001"
    //                 },
    //                 {
    //                     WS_NO: 2,
    //                     GR_No: "GR2025-002",
    //                     GR_Date: "2025-01-20T09:10:00.000Z",
    //                     BEL_Part_Number: "245875415332",
    //                     MPN: "MPN-ZX90",
    //                     Batch_Lot_No: "BATCH-456",
    //                     DateCode: "2025-01",
    //                     Quantity: 300,
    //                     BEL_PO_No: "PO-99887",
    //                     Vendor_Name: "Global Tech Supplies",
    //                     OEM_Make: "Honeywell",
    //                     Manufacturing_Place: "USA",
    //                     Reference_No: "RCPT-002"
    //                 },
    //                 {
    //                     WS_NO: 3,
    //                     GR_No: "GR2025-003",
    //                     GR_Date: "2025-01-22T14:45:00.000Z",
    //                     BEL_Part_Number: "165654678900",
    //                     MPN: "MPN-QT12",
    //                     Batch_Lot_No: "BATCH-123",
    //                     DateCode: "2024-10",
    //                     Quantity: 75,
    //                     BEL_PO_No: "PO-11223",
    //                     Vendor_Name: "Precision Components Ltd",
    //                     OEM_Make: "Bosch",
    //                     Manufacturing_Place: "India",
    //                     Reference_No: "RCPT-003"
    //                 }
    //             ];

    //             const formattedDummy = dummyData.map((item) => ({
    //                 slno: item.WS_NO,
    //                 grNo: item.GR_No || "",
    //                 grDate: item.GR_Date ? item.GR_Date.split("T")[0] : "",
    //                 partNumber: item.BEL_Part_Number,
    //                 mpn: item.MPN,
    //                 batchNo: item.Batch_Lot_No,
    //                 dateCode: item.DateCode,
    //                 quantity: item.Quantity,
    //                 poNo: item.BEL_PO_No,
    //                 vendor: item.Vendor_Name,
    //                 oemMake: item.OEM_Make,
    //                 manufacture: item.Manufacturing_Place,
    //                 receiptNo: item.Reference_No || "",
    //             }));

                

    //             setPendingData(formattedDummy);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://192.168.0.149:8000/generateddetails");

                // ✅ UPDATED MAPPING (API)
                const formattedData = res.data.map((item) => ({
                    wsNumber: item.WS_NO,
                    referenceNumber: item.Reference_No || "",
                    itemDescription: item.DESCRIPTION || " Item Description",
                    poNumber: item.BEL_PO_No,
                    itemPartNumber: item.BEL_Part_Number,
                    grNumber: item.GR_No || "",
                    supplier: item.Vendor_Name,
                    quantity: item.Quantity,
                    serialNumber: item.Batch_Lot_No || "01-SN",
                }));

                setPendingData(formattedData);

            } catch {
                const dummyData = [
                    {
                        WS_NO: "01",
                        GR_No: "GR2025-001",
                        BEL_Part_Number: "423458754153",
                        Quantity: 150,
                        BEL_PO_No: "PO-56789",
                        Vendor_Name: "ABC Electronics Pvt Ltd",
                        Batch_Lot_No: "BATCH-789",
                        Reference_No: "RCPT-001"
                    },
                    {
                        WS_NO: "02",
                        GR_No: "GR2025-002",
                        BEL_Part_Number: "245875415332",
                        Quantity: 300,
                        BEL_PO_No: "PO-99887",
                        Vendor_Name: "Global Tech Supplies",
                        Batch_Lot_No: "BATCH-456",
                        Reference_No: "RCPT-002"
                    },
                    {
                        WS_NO: "03",
                        GR_No: "GR2025-003",
                        BEL_Part_Number: "165654678900",
                        Quantity: 75,
                        BEL_PO_No: "PO-11223",
                        Vendor_Name: "Precision Components Ltd",
                        Batch_Lot_No: "BATCH-123",
                        Reference_No: "RCPT-003"
                    }
                ];

                // ✅ UPDATED MAPPING (DUMMY DATA)
                const formattedDummy = dummyData.map((item) => ({
                    wsNumber: item.WS_NO,
                    referenceNumber: item.Reference_No || "",
                    itemDescription: " Item Description",
                    poNumber: item.BEL_PO_No,
                    itemPartNumber: item.BEL_Part_Number,
                    grNumber: item.GR_No,
                    supplier: item.Vendor_Name,
                    quantity: item.Quantity,
                    serialNumber: item.Batch_Lot_No || "01-SN",
                }));

                setPendingData(formattedDummy);
            }
        };

        fetchData();
    }, []);
    
    const [selectedId, setSelectedId] = useState(null);

    // const handlePartNumberClick = (row) => {
    //     axios
    //         .get("http://192.168.0.149:8000/subcontractinspectiondetails", {
    //             params: { Ref_No: row.receiptNo }
    //         })
    //         .then((res) => {
    //             setHoveredRow(res.data[0]);
    //         })
    //         .catch((err) => console.error("API error:", err));
    // };

    return (
        <Box sx={{ p: 1, minHeight: "100vh" }}>
            <Card sx={{ maxWidth: 3000, mx: "auto", borderRadius: 3, color: "#bf1212" }}>
                <CardContent>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 800, mb: 5, fontFamily: 'Roboto' }}>
                        Intender Dashboard
                    </Typography>

                    <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                        {/* Pending */}
                        <Grid item>
                            <Card
                                onClick={() => setTab("pending")}
                                sx={{
                                    width: 200,
                                    p: 2,
                                    cursor: "pointer",
                                    borderRadius: 3,
                                    textAlign: "center",
                                    background: tab === "pending"
                                        ? "linear-gradient(135deg, #1976d2, #42a5f5)"
                                        : "#e3f2fd",
                                    color: tab === "pending" ? "white" : "black",
                                }}
                            >
                                <PendingActionsIcon sx={{ fontSize: 40 }} />
                                <Typography variant="h6" fontWeight={700} fontSize={18}>Pending Conformance</Typography>
                            </Card>
                        </Grid>
                        {/* Accepted */}
                        <Grid item>
                            <Card
                                onClick={() => setTab("accepted")}
                                sx={{
                                    width: 200,
                                    p: 2,
                                    cursor: "pointer",
                                    borderRadius: 3,
                                    textAlign: "center",
                                    boxShadow: tab === "accepted"
                                        ? "0 4px 20px rgba(46,125,50,0.4)"
                                        : "0 2px 8px rgba(0,0,0,0.15)",
                                    background: tab === "accepted"
                                        ? "linear-gradient(135deg, #2e7d32, #66bb6a)"
                                        : "#e8f5e9",
                                    color: tab === "accepted" ? "white" : "black",
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <CheckCircleIcon sx={{ fontSize: 40 }} />
                                <Typography variant="h6" fontWeight={700} fontSize={17}>Accepted Conformance</Typography>
                            </Card>
                        </Grid>

                        {/* Rejected */}
                        <Grid item>
                            <Card
                                onClick={() => setTab("rejected")}
                                sx={{
                                    width: 200,
                                    p: 2,
                                    cursor: "pointer",
                                    borderRadius: 3,
                                    textAlign: "center",
                                    boxShadow: tab === "rejected"
                                        ? "0 4px 20px rgba(211,47,47,0.4)"
                                        : "0 2px 8px rgba(0,0,0,0.15)",
                                    background: tab === "rejected"
                                        ? "linear-gradient(135deg, #d32f2f, #ef5350)"
                                        : "#ffebee",
                                    color: tab === "rejected" ? "white" : "black",
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <CancelIcon sx={{ fontSize: 40 }} />
                                <Typography variant="h6" fontWeight={700} fontSize={18}>Rejected Conformance</Typography>
                            </Card>
                        </Grid>

                        {/* Total */}
                        <Grid item>
                            <Card
                                onClick={() => setTab("total")}
                                sx={{
                                    width: 200,
                                    p: 2,
                                    cursor: "pointer",
                                    borderRadius: 3,
                                    textAlign: "center",
                                    boxShadow: tab === "total"
                                        ? "0 4px 20px rgba(25,118,210,0.4)"
                                        : "0 2px 8px rgba(0,0,0,0.15)",
                                    background: tab === "total"
                                        ? "linear-gradient(135deg, #1565c0, #64b5f6)"
                                        : "#e3f2fd",
                                    color: tab === "total" ? "white" : "black",
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <SummarizeIcon sx={{ fontSize: 40 }} />
                                <Typography variant="h6" fontWeight={700}>Total </Typography>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box mt={4}>
                        {tab === "pending" && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <Paper sx={{ p: 2, mb: 2, backgroundColor: "#e3f2fd", borderRadius: "12px" }}>
                                        <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold", fontFamily: "Times New Roman" }}>
                                            Pending Conformance List
                                        </Typography>

                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    {[
                                                        "Item Part Number",
                                                        "WS Number",
                                                        "Reference Number",
                                                        "Item Description",
                                                        "PO Number",
                                                        "GR Number",
                                                        "Supplier",
                                                        "Quantity",
                                                        "Serial Number"
                                                    ].map((h) => (
                                                        <TableCell key={h} sx={{ fontWeight: 700, backgroundColor: "#1565c0", color: "white" }}>
                                                            {h}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {pendingData.map((row) => (
                                                    <TableRow key={row.wsNumber} hover onClick={() => setSelectedId(row.wsNumber)}>
                                                        <TableCell
                                                            style={{ color: "#0d47a1", fontWeight: 700, textDecoration: "underline", cursor: "pointer" }}
                                                            onClick={() => handlePartNumberClick(row)}
                                                        >
                                                            {row.itemPartNumber}
                                                        </TableCell>
                                                        <TableCell>{row.wsNumber}</TableCell>
                                                        <TableCell>{row.referenceNumber}</TableCell>
                                                        <TableCell>{row.itemDescription}</TableCell>
                                                        <TableCell>{row.poNumber}</TableCell>
                                                        
                                                        <TableCell>{row.grNumber}</TableCell>
                                                        <TableCell>{row.supplier}</TableCell>
                                                        <TableCell>{row.quantity}</TableCell>
                                                        <TableCell>{row.serialNumber}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                    {openForm && (
    <IndenterForm
        data={formData}
        onClose={() => setOpenForm(false)}
    />
)}

                                    
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
