import React, { Component } from "react";

import Navbar from "../../Navbar/Navigation";
import NavbarAdmin from "../../Navbar/NavigationAdmin";

import getWeb3 from "../../../getWeb3";
import Election from "../../../contracts/Election.json";

import AdminOnly from "../../AdminOnly";

import "./AddCandidate.css";
import {Button,Box,Table,TableHead,TableRow,TableCell,TableBody,TextField,Typography,Grid,Paper} from '@mui/material'

export default class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      web3: null,
      accounts: null,
      isAdmin: false,
      header: "",
      slogan: "",
      candidates: [],
      candidateCount: undefined,
    };
  }

  componentDidMount = async () => {
    // refreshing page only once
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3: web3,
        ElectionInstance: instance,
        account: accounts[0],
      });

      // Total number of candidates
      const candidateCount = await this.state.ElectionInstance.methods
        .getTotalCandidate()
        .call();
      this.setState({ candidateCount: candidateCount });

      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }

      // Loading Candidates details
      for (let i = 0; i < this.state.candidateCount; i++) {
        const candidate = await this.state.ElectionInstance.methods
          .candidateDetails(i)
          .call();
        this.state.candidates.push({
          id: candidate.candidateId,
          header: candidate.header,
          slogan: candidate.slogan,
        });
      }

      this.setState({ candidates: this.state.candidates });
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
    }
  };
  updateHeader = (event) => {
    this.setState({ header: event.target.value });
  };
  updateSlogan = (event) => {
    this.setState({ slogan: event.target.value });
  };

  addCandidate = async () => {
    console.log('kjdnh');
    await this.state.ElectionInstance.methods
      .addCandidate(this.state.header, this.state.slogan)
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };

  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <center>Loading Web3, accounts, and contract...</center>
        </>
      );
    }
    if (!this.state.isAdmin) {
      return (
        <>
          <Navbar />
          <AdminOnly page="Add Candidate Page." />
        </>
      );
    }
    return (

      <>
        <NavbarAdmin />
        
        {/* <div className="container-main">
          <h2>Add a new candidate</h2>
          <small>Total candidates: {this.state.candidateCount}</small>
          <div className="container-item">
            <form className="form">
              <label className={"label-ac"}>
                Header
                <input
                  className={"input-ac"}
                  type="text"
                  placeholder="eg. Marcus"
                  value={this.state.header}
                  onChange={this.updateHeader}
                />
              </label>
              <label className={"label-ac"}>
                Slogan
                <input
                  className={"input-ac"}
                  type="text"
                  placeholder="eg. It is what it is"
                  value={this.state.slogan}
                  onChange={this.updateSlogan}
                />
              </label>
              <button
                className="btn-add"
                disabled={
                  this.state.header.length < 3 || this.state.header.length > 21
                }
                onClick={this.addCandidate}
              >
                Add
              </button>
            </form>
          </div>
        </div> */}
        <div style={{height:"600px"}}>
        <Grid  style={{marginTop:"110px"}}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 340,
                    width:700,
                     boxShadow: 3 ,
                     marginLeft:"100px"
                  }}
                >
          <Typography component="h1" variant="h5">
            Add Candidate
          </Typography>
                    <small>Total candidates: {this.state.candidateCount}</small>

          <Box component="form" noValidate sx={{ mt: 1 }}>
             <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              type="text"
              value={this.state.header}
                  onChange={this.updateHeader}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Party"
              type="text"
 value={this.state.slogan}
                  onChange={this.updateSlogan}            />
           
          
           <button
                className="btn-add"
              sx={{ mt: 3, mb: 2 }}
                disabled={
                  this.state.header.length < 3 || this.state.header.length > 21
                }
                onClick={this.addCandidate}
              >
                Add
              </button>
          </Box>
                </Paper>
              </Grid> 
        {loadAdded(this.state.candidates)}
      </div>
      </>
    );
  }
}
export function loadAdded(candidates) {
  const renderAdded = (candidate) => {
    return (
      <>
        {/* <div className="container-list success">
          <div
            style={{
              maxHeight: "21px",
              overflow: "auto",
            }}
          >
            {candidate.id}. <strong>{candidate.header}</strong>:{" "}
            {candidate.slogan}
          </div>
        </div> */}
       <TableRow key={candidate.id}>
              <TableCell>{candidate.id}</TableCell>
              <TableCell>{candidate.header}</TableCell>
              <TableCell>{candidate.slogan}</TableCell>
            </TableRow>
           {/* {candidate.id}.{candidate.header}:{" "}
            {candidate.slogan} */}
              
      </>
    );
  };
  return (
    <>
     <Grid >
                <Paper sx={{ display: 'flex', flexDirection: 'column',
                    width:800, boxShadow: 3,marginLeft:'900px',marginTop:"-350px", }}>
                  <h3>Candidate List</h3>
      {candidates.length < 1 ? (
          <center>No candidates added.</center>
      ) : (
        
      <Table size="large" width="1400px" style={{fontSize:"40px"}}>
        <TableHead>
          <TableRow>
            <TableCell>Sr. No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Party</TableCell>
          </TableRow>
        </TableHead>
        <TableBody size="large" width="1400px" height="200px">
          {candidates.map(renderAdded)}
        </TableBody>
      </Table>
      )}
         </Paper>
              </Grid>
    </>
  );
}
