import React, { useEffect } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Table, TableContainer, TableRow, TableCell, TableHead, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import { IoIosArrowDropdownCircle } from "react-icons/io";

const General = (props) => {
    const useStyles = makeStyles({
        table: {
            width: 360,
        },
        tableContainer: {
            width: 360,
        },
        tableContainerLast: {
            width: 360,
            marginBottom: '0'
        },
        tableCell: {
            lineHeight: 1,
            fontSize: '0.8rem'
        },
        expantionPanel: {
            padding: 0,
            textAlign: 'center',
        },
        heading: {
            margin: 0,
        }
    });
    const classes = useStyles();
    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (let i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }
    const attributes = props.graphics;
    const Address = titleCase(attributes.Address);
    const NumStory = titleCase(attributes.NumStory)
    const FPE = attributes.WSE100yrFU + 1;
    const FFE = attributes.FFE;
    const LME = attributes.LME;
    const HasVents = attributes.YearBuilt > 1978 ? "Yes" : "No";
    const changeBackground = () => {
        if (FFE >= FPE && LME >= FPE && HasVents == "Yes") {
            document.getElementById("complianceStatus").textContent = "Full-Compliant";
            document.getElementById("complianceStatus").style.backgroundColor = "#00cc00";
            document.getElementById("complianceStatus").style.marginBottom = "2%";
        } else if (FFE >= FPE) {
            document.getElementById("complianceStatus").textContent = "Floor Compliant";
            document.getElementById("complianceStatus").style.backgroundColor = "#ffff00";
            document.getElementById("complianceStatus").style.marginBottom = "2%";
        } else {
            document.getElementById("complianceStatus").textContent = "Non-Compliant";
            document.getElementById("complianceStatus").style.backgroundColor = "#ff0000";
            document.getElementById("complianceStatus").style.marginBottom = "2%";
        }
    }
   
    useEffect(() => {
        changeBackground();
    });
    return (
        <div className="dashboardTaps">
            {attributes.Address ?
            <div>
                <div className="header-title">
                        <h6>{Address}</h6>
                    <p>(Parcel ID: {attributes.PID} {' '} | {' '} BldgID: {attributes.UnqBldgID})</p>
                </div> 
                {/*<div className="header-title-info">Locator Information</div>*/}
                <ExpansionPanel className={classes.expantionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<IoIosArrowDropdownCircle />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                       <Typography className={classes.heading}>Locator Information</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Community</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{attributes.Community}</TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Watershed</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{attributes.Watershed.charAt(0).toUpperCase() + attributes.Watershed.slice(1).toLowerCase()}</TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Flooding Source</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{attributes.FEMAStrm}</TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Flood Zone</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{attributes.FloodZone}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                    {/*<div className="header-title-info">Building Characteristics</div>*/}
                <ExpansionPanel className={classes.expantionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<IoIosArrowDropdownCircle />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Building Characteristics</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Occupancy Type</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{attributes.OccTypGen}</TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Heated Area</TableCell>
                                    <TableCell align="center" className={classes.tableCell}><NumberFormat value={attributes.HeatedArea} displayType={'text'} thousandSeparator={true} suffix={' Sq. ft.'} /> </TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Foundation Type</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{attributes.FndtnTyp.charAt(0).toUpperCase() + attributes.FndtnTyp.slice(1).toLowerCase()}</TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Number of Stories</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{NumStory}</TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Has Flood Vents</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{HasVents}</TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Year Built</TableCell>
                                    <TableCell align="center" className={classes.tableCell}>{attributes.YearBuilt}</TableCell>
                                </TableRow>
                                <TableRow hover='true'>
                                    <TableCell className={classes.tableCell}>Building Value</TableCell>
                                    <TableCell align="center" className={classes.tableCell}><NumberFormat value={attributes.NetBldgVal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>  
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
                    {/*<div className="header-title-info">Building Elivation Information <strong>(ft NAVD)</strong></div>*/}
                    <ExpansionPanel className={classes.expantionPanel}>
                        <ExpansionPanelSummary
                            expandIcon={<IoIosArrowDropdownCircle />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Building Elivation Information <strong>(ft NAVD)</strong></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>Finished Floor (FFE)</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.FFE}</TableCell>
                                        {attributes.FFE_Src.startsWith("EC") ?
                                            <TableCell align="center" className={classes.tableCell}>Surveyed</TableCell> :
                                            <TableCell align="center" className={classes.tableCell}>Derived</TableCell>
                                        }
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>Lowest Floor (LFE)</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.LFE}</TableCell>
                                        {attributes.LFE_Src.startsWith("EC") ?
                                            <TableCell align="center" className={classes.tableCell}>Surveyed</TableCell> :
                                            <TableCell align="center" className={classes.tableCell}>Derived</TableCell>
                                        }
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>Lowest Mechanical(LME)</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.LME}</TableCell>
                                        {attributes.LME_Src.startsWith("EC") ?
                                            <TableCell align="center" className={classes.tableCell}>Surveyed</TableCell> :
                                            <TableCell align="center" className={classes.tableCell}>Derived</TableCell>
                                        }
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>Lowest Adjacent Grade</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.LAG}</TableCell>
                                        {attributes.LAG_Src.startsWith("EC") ?
                                            <TableCell align="center" className={classes.tableCell}>Surveyed</TableCell> :
                                            <TableCell align="center" className={classes.tableCell}>Derived</TableCell>
                                        }
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>Highest Adjacent Grade</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.HAG}</TableCell>
                                        {attributes.HAG_Src.startsWith("EC") ?
                                            <TableCell align="center" className={classes.tableCell}>Surveyed</TableCell> :
                                            <TableCell align="center" className={classes.tableCell}>Derived</TableCell>
                                        }
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    {/*<div className="header-title-info">FEMA Flood Elevations <strong>(ft NAVD)</strong></div>*/}
                    <ExpansionPanel className={classes.expantionPanel}>
                        <ExpansionPanelSummary
                            expandIcon={<IoIosArrowDropdownCircle />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>FEMA Flood Elevations <strong>(ft NAVD)</strong></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>50% <strong>(2-yr)</strong></TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.WSE002yrEX}</TableCell>
                                        <TableCell className={classes.tableCell}>2% <strong>(50-yr)</strong></TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.WSE050yrEX}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>20% <strong>(5-yr)</strong></TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.WSE005yrEX}</TableCell>
                                        <TableCell className={classes.tableCell}>1% <strong>(100-yr)</strong></TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.WSE100yrEX}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>10% <strong>(10-yr)</strong></TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.WSE010yrEX}</TableCell>
                                        <TableCell className={classes.tableCell}>1% Future</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.WSE100yrFU} </TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>4% <strong>(25-yr)</strong></TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.WSE025yrEX}</TableCell>
                                        <TableCell className={classes.tableCell}>0.2% <strong>(500-yr)</strong></TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.WSE500yrEX}</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
             
                    {/*<div className="header-title-info">Compliance Status</div>*/}
                    <ExpansionPanel className={classes.expantionPanel}>
                        <ExpansionPanelSummary
                            expandIcon={<IoIosArrowDropdownCircle />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Locator Information</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TableContainer component={Paper} className={classes.tableContainerLast}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>Flood Protection Elevation (FPE)</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{FPE}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>Pre-/Post-FIRM</TableCell>
                                        {attributes.YearBuilt > 1978 ?
                                            <TableCell align="center" className={classes.tableCell}>Post-FIRM</TableCell> :
                                            <TableCell align="center" className={classes.tableCell}>Pre-FIRM</TableCell>
                                        }
                                    </TableRow>
                                </Table>
                                <div id="complianceStatus" className="header-title-info"></div>
                            </TableContainer><br/>
                            
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                
              </div>:
                <h3>No building data available</h3>
            }

        </div>
    )
}
export default General