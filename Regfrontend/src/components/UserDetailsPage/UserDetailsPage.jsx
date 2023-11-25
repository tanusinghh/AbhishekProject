// UserDetailsPage.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Paper, Grid } from '@mui/material';
import axios from 'axios';
import apis from '../../services/apis.json'
import ApiClient from '../../services/ApiClient'


const UserDetailsPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiClient.get(apis.getuser + id )
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <div class="registration-container">
    <h1> User Data</h1>

</div>
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>First Name:</strong> {userData.firstName}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Last Name:</strong> {userData.lastName}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Email:</strong> {userData.email}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Country:</strong> {userData.country}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>State:</strong> {userData.state}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>City:</strong> {userData.city}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Gender:</strong> {userData.gender}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Date of Birth:</strong> {userData.dateOfBirth}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Age:</strong> {userData.age}
          </Typography>
          <Typography variant="body1" paragraph>
           <button><Link to="/usertable" style={{textDecoration:"none"}}>back</Link></button>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
};

export default UserDetailsPage;
