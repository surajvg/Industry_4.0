import React from "react";
import {
  TextField,
  Checkbox,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControlLabel,
  Paper,
  Divider,
} from "@mui/material";

export default function IndenterForm() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: 20,
        // background: "#e3f2fd",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "100%", maxWidth: 1500, borderRadius: 16 }}>
        <CardContent style={{ padding: 40 }}>
          
          {/* Heading */}
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            sx={{ color: "#0d47a1", mb: 3 }}
          >
            Request for Conformance Certificate for Verifying Acceptance
          </Typography>

          {/* Intro Notice */}
          <Typography
            variant="body1"
            sx={{
              background: "#fff3e0",
              padding: 2,
              borderRadius: 2,
              mb: 3,
              borderLeft: "5px solid #fb8c00",
              fontWeight: 500,
            }}
          >
            To, Concerned Head of Testing Department
          </Typography>

          {/* Verification Details */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#f1f8e9",
              border: "1px solid #c8e6c9",
              mb: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#2e7d32", fontWeight: "bold" }}
            >
              Verification Details
            </Typography>

            {/* Details Table */}
          <Grid container spacing={2} mt={1}>
            {[
              "WS Number",
              "Reference Number",
              "Item Description",
              "PO Number",
              "Item Part Number",
              "GR Number",
              "Supplier",
              "Quantity",
              "Serial Number",
            ].map((label, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TextField
                  fullWidth
                  label={label}
                  variant="outlined"
                  size="small"
                  sx={{ background: "white" }}
                />
              </Grid>
            ))}
          </Grid>

          
            

            <Typography variant="body2" sx={{ lineHeight: 1.7, color: "#1b5e20" }}>
              The above items are procured from the above vendor. The same may
              please be fixed in the relevant sub-assembly, subunit, or unit of
              the equipment and the functional parameters of the concerned
              assembly/subassembly/subunit or equipment may be verified.
              <br />
              <strong>(a)</strong> Electrical Parameter Verification  
              <br />
              <strong>(b)</strong> ESS (Environmental Stress Screening) Requirement
            </Typography>
          </Paper>

          {/* SIGNATURE SECTION */}
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      mb: 4,
                      borderLeft: "6px solid #43a047",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 2, color: "#2e7d32" }}
                      >
                        Approvals & Signatures
                      </Typography>
          
                      <Grid container spacing={3}>
                        {[
                          "Seal & Signature of Testing Dept. Head",
                        ].map((text, i) => (
                          <Grid item xs={12} sm={6} key={i}>
                            <Paper
                              elevation={2}
                              sx={{
                                p: 3,
                                height: 130,
                                borderRadius: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#f1f8e9",
                              }}
                            >
                              <Typography>{text}</Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>

          {/* Divider */}
          <Divider sx={{ my: 4 }} />

          

          {/* Conformance Heading */}
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            sx={{ color: "#880e4f", mb: 3 }}
          >
            Conformance Certificate
          </Typography>

          {/* Intro Notice */}
          <Typography
            variant="body1"
            sx={{
              background: "#fff3e0",
              padding: 2,
              borderRadius: 2,
              mb: 3,
              borderLeft: "5px solid #fb8c00",
              fontWeight: 500,
            }}
          >
            To, SE/MI/MCE
          </Typography>

          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#f1f8e9",
              border: "1px solid #c8e6c9",
              mb: 4,
            }}
          >


          
            

            <Typography variant="body2" sx={{ lineHeight: 1.7, color: "#1b5e20" }}>
              The items were fixed in the relevant assembly or unit of equipment
            and the functional parameters were verified. The results are detailed
            below.
            </Typography>
          </Paper>

    <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#f1f8e9",
              border: "1px solid #c8e6c9",
              mb: 4,
            }}
          >
            
           {/* Project/SO Number */}
          <TextField
            fullWidth
            label="Project / Sale Order Number"
            variant="outlined"
            size="small"
            sx={{ background: "white", mb: 3 }}
          />

          {/* Result */}
          <Grid container alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Grid item>
              <Typography fontWeight="bold">Result:</Typography>
            </Grid>
            <Grid item>
              <FormControlLabel control={<Checkbox />} label="Satisfactory" />
            </Grid>
            <Grid item>
              <FormControlLabel control={<Checkbox />} label="Unsatisfactory" />
            </Grid>
          </Grid>

          {/* Serial Numbers */}
          <TextField
            fullWidth
            label="Tested Serial Numbers"
            variant="outlined"
            size="small"
            sx={{ background: "white", mb: 3 }}
          />

          {/* Remarks */}
          <TextField
            fullWidth
            label="Remarks"
            multiline
            rows={4}
            variant="outlined"
            sx={{ background: "white", mb: 3 }}
          />

          {/* Date */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ background: "white" }}
              />
            </Grid>
          </Grid>

          
            

        
          </Paper>

          
          

          {/* SIGNATURE SECTION */}
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      mb: 4,
                      borderLeft: "6px solid #43a047",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 2, color: "#2e7d32" }}
                      >
                        Approvals & Signatures
                      </Typography>
          
                      <Grid container spacing={3}>
                        {[
                          "Seal & Signature of SC / ME / MC",
                        ].map((text, i) => (
                          <Grid item xs={12} sm={6} key={i}>
                            <Paper
                              elevation={2}
                              sx={{
                                p: 3,
                                height: 130,
                                borderRadius: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#f1f8e9",
                              }}
                            >
                              <Typography>{text}</Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>

          {/* Submit Button */}
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.2,
                fontSize: 16,
                width:'3rem',
                bgcolor: "#1565c0",
                ":hover": { bgcolor: "#0d47a1" },
                marginRight:'1rem'
              }}
            >
              Approve
            </Button>
            
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.2,
                fontSize: 16,
                width:'3rem',
                bgcolor: "red",
                ":hover": { bgcolor: "red" },
              }}
            >
              REJECT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
