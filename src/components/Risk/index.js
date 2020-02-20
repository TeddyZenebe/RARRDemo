import React, { useEffect } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Table, TableContainer, TableRow, TableCell, TableHead, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { IoIosArrowDropdownCircle} from "react-icons/io";
import { MdDone } from "react-icons/md";
import Moment from 'react-moment';
import 'moment-timezone';
import { Doughnut } from 'react-chartjs-2';
import riskChart from '../../images/riskChart.PNG'

const Risk = (props) => {
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
    const attributes = props.graphics;
    const MultiFamilySurrounded = attributes.OccTypGen == 'Single Family Residential' ? `${attributes.RskDEvnt}-yr` : 'N/A'
    const residualRisk = Math.round(0.65 * attributes.RskTotScr);
    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (let i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }
    const Address = titleCase(attributes.Address);
    const HCFs = attributes.HCFs;
    const str2obj = str => {
        return str
            .split(';')
            .map(key => {
                return key
                    .split(',')
                    .map(val => val.trim())
            })
            .reduce((accumulator, currentValue) => {
                accumulator[currentValue[0]] = currentValue[1]
                return accumulator
            }, {})
    }
    const HCFobj = HCFs ? str2obj(HCFs) : {};
    const HCFobjArray = Object.values(HCFobj).map((persent) => { return Number(persent) }) ;
    const legend = {
        display: true,
        position: 'right',
        fullWidth: true,
        reverse: false,
        labels: {
            fontColor: '#000000'
        }
    };
    const data = {
        datasets: [{
            data: HCFobjArray,
            backgroundColor: ["#ff4500", "#4286f4", "#41f4be", "#8b41f4", "#e241f4", "#f44185", "#f4cd41"]
        }],
        labels: Object.keys(HCFobj)
    };
    const changeBackground = () => {
        if (attributes.RskTotScr < 5) {
            document.getElementById("riskScore").style.backgroundColor = "#ccff99";
        } else if (attributes.RskTotScr >= 5 && attributes.RskTotScr < 100) {
            document.getElementById("riskScore").style.backgroundColor = "#66e0ff";
        } else if (attributes.RskTotScr >= 100 && attributes.RskTotScr < 500){
            document.getElementById("riskScore").style.backgroundColor = "#ffff33";
        } else if (attributes.RskTotScr >= 500 && attributes.RskTotScr < 1000){
            document.getElementById("riskScore").style.backgroundColor = "#ff8533";
        } else {
            document.getElementById("riskScore").style.backgroundColor = "#ff3333";
        }
    }
    useEffect(() => {
        changeBackground();
    });
    return (
        <div className="dashboardTaps">
            {attributes.RskTotScr >= 0 ?
                <div>
                    <div className="header-title">
                        <h6>{Address}</h6>
                        <p>(Parcel ID: {attributes.PID} {' '} | {' '} BldgID: {attributes.UnqBldgID})</p>
                    </div> 
                    <ExpansionPanel className={classes.expantionPanel}>
                        <ExpansionPanelSummary
                            expandIcon={<IoIosArrowDropdownCircle />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Risk Component Trigger Storm Event</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>A: FFE Flooding</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskAEvnt > 0 ? `${attributes.RskAEvnt}-yr` :'N/A' }</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>B: LME Flooding</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskBEvnt > 0 ? `${attributes.RskBEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>C: LAG Flooding</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskCEvnt > 0 ? `${attributes.RskCEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>D: Property Surrounded</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskDEvnt > 0 ? `${attributes.RskDEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>E: Building Surrounded</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskEEvnt > 0 ? `${attributes.RskEEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>F: Critical Fasility Surrounded</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskFEvnt > 0 ? `${attributes.RskFEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>G: Multi-Family Surrounded</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{MultiFamilySurrounded}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>I: Potential Structural Damage</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskIEvnt > 0 ? `${attributes.RskIEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>J: Significant Improvements Flooding</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskJEvnt > 0 ? `${attributes.RskJEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>K: Moderate Improvements Flooding</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskKEvnt > 0 ? `${attributes.RskKEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>L: Vehicle Flooding</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskLEvnt > 0 ? `${attributes.RskLEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>M: Yard Flooding</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskMEvnt > 0 ? `${attributes.RskMEvnt}-yr` : 'N/A'}</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel className={classes.expantionPanel}>
                        <ExpansionPanelSummary
                            expandIcon={<IoIosArrowDropdownCircle />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Location in Risk Zone</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>N: High-Velocity Zone</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskNMult > 1 ? <MdDone /> : ''}</TableCell>
                                        <TableCell className={classes.tableCell}>P: Drainage Overflow Zone</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskPMult > 1 ? <MdDone /> : ''}</TableCell>
                                    </TableRow>
                                    <TableRow hover='true'>
                                        <TableCell className={classes.tableCell}>O: Medium-Velocity Zone</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskOMult > 1 ? <MdDone /> : ''}</TableCell>
                                        <TableCell className={classes.tableCell}>Q: Community Encroachment Area</TableCell>
                                        <TableCell align="center" className={classes.tableCell}>{attributes.RskQMult > 1 ? <MdDone /> : ''}</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className="risk-calculated-date">
                        <h6>Current Calcualated Risk</h6>
                        <p> {attributes.RunName} {' '} | {' '} <Moment format="MM/DD/YY HH:mm" >{attributes.RunDteTime}</Moment></p>
                    </div> 
                    <div id="riskScore" className="riskScore-value">Risk Score: {attributes.RskTotScr}</div>
                    <div className="chart">
                        <h6>Highest Contributing Risk Components (%)</h6>
                        {attributes.RskTotScr === 0 ? <img src={riskChart} alt="No Risk Found for this Building" className="riskChart-img" /> :
                            <Doughnut legend={legend} data={data} />
                        }   
                    </div>
                    <div className='residualRisk'>In-Place Mitigation Residual Risk : {residualRisk} </div>   
                </div> :
                <h4>No Risk Analysis Data Available </h4>
            }

        </div>
    )
}
export default Risk