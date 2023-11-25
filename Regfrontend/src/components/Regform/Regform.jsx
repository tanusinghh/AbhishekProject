import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './regform.css'
import apis from '../../services/apis.json';
import ApiClient from '../../services/ApiClient'


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
    age: '',
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [errors, setErrors] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      const selectedCountry = countries.find((country) => country.name === value);
      setStates(selectedCountry ? selectedCountry.states : []);
      setCities([]);
    }

    if (name === 'state') {
      const selectedState = states.find((state) => state.name === value);
      setCities(selectedState ? selectedState.cities : []);
    }

    if (name === 'dateOfBirth') {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        setFormData({
          ...formData,
          age: (age - 1).toString(),
          dateOfBirth: value,
        });
      } else {
        setFormData({
          ...formData,
          age: age.toString(),
          dateOfBirth: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'country', 'state', 'city', 'gender', 'dateOfBirth'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      } else {
        newErrors[field] = '';
      }
    });

    if (formData.firstName && !/^[a-zA-Z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First Name should contain only alphabetic characters';
    }

    if (formData.lastName && !/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last Name should contain only alphabetic characters';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        if (age < 14) {
          newErrors.dateOfBirth = 'User must be at least 14 years old';
        } else {
          newErrors.dateOfBirth = '';
        }
      } else {
        if (age < 14) {
          newErrors.dateOfBirth = 'User must be at least 14 years old';
        } else {
          newErrors.dateOfBirth = '';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirmSubmit = async () => {
    setConfirmationOpen(false);
    setLoading(true);

    // Validate the form
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const formattedDateOfBirth = new Date(formData.dateOfBirth).toLocaleDateString('en-GB');
        const formDataWithFormattedDate = { ...formData, dateOfBirth: formattedDateOfBirth };

        await ApiClient.post(apis.reguser, formDataWithFormattedDate);
        setLoading(false);
        setSnackbarOpen(true);

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          country: '',
          state: '',
          city: '',
          gender: '',
          dateOfBirth: '',
          age: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  console.log(formData);

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '2em' }}>
         <div className="pagetitle-rgt">
                        <Link to='/usertable'>
                        <button type="button"  class="btn btn-info">Table</button>
                        </Link>
                    </div>
                    <div class="registration-container">
    <h1>Register User</h1>

</div>
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={(e) => { e.preventDefault(); handleConfirmationOpen(); }}>
          <Grid container spacing={2}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              type="text"
              variant="outlined"
              value={formData.firstName}
              onChange={handleInputChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              type="text"
              variant="outlined"
              value={formData.lastName}
              onChange={handleInputChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Country"
              name="country"
              variant="outlined"
              value={formData.country}
              onChange={handleInputChange}
              error={Boolean(errors.country)}
              helperText={errors.country}
              margin="normal"
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="State"
              name="state"
              variant="outlined"
              value={formData.state}
              onChange={handleInputChange}
              error={Boolean(errors.state)}
              helperText={errors.state}
              margin="normal"
            >
              {states.map((state) => (
                <MenuItem key={state.code} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="City"
              name="city"
              variant="outlined"
              value={formData.city}
              onChange={handleInputChange}
              error={Boolean(errors.city)}
              helperText={errors.city}
              margin="normal"
            >
              {cities.map((city) => (
                <MenuItem key={city.name} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              error={Boolean(errors.gender)}
              margin="normal"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="transgender" control={<Radio />} label="Transgender" />
            </RadioGroup>
            {/* <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              variant="outlined"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              error={Boolean(errors.dateOfBirth)}
              helperText={errors.dateOfBirth}
              style={{ marginBottom: '1em' }}
              margin="normal"
            /> */}
            <TextField
  fullWidth

  name="dateOfBirth"
  type="date"
  variant="outlined"
  value={formData.dateOfBirth}
  onChange={handleInputChange}
  error={Boolean(errors.dateOfBirth)}
  helperText={errors.dateOfBirth}
  style={{ marginBottom: '1em' }}
/>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="text"
              variant="outlined"
              value={formData.age}
              disabled
              style={{ marginBottom: '1em' }}
              margin="normal"
            />
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            Register
          </Button>
        </form>
      </Paper>
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Confirm Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to register with the provided information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {loading && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <CircularProgress />
        </div>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert severity="success" onClose={handleSnackbarClose}>
          User registered successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegistrationForm;
