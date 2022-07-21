import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import Service from '../../services/http';
import * as GLOBAL from '../../constants';
import Swal from 'sweetalert2'



export const CustomerForm = ({ updateData }) => {

  const service = new Service(GLOBAL.domain);
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    age: '',
    dateOfBirth: '',
  });

  const handleChange = (event) => {
    let status = true;

    if(
      values.name.trim().length > 0 &&
      values.lastname.trim().length > 0 &&
      values.age.trim().length > 0 &&
      values.dateOfBirth.trim().length > 0
    ) {
      status = false;
    } else {
      status = true;
    }

    if(event.target.value.trim().length <= 0) {
      status = true;
    } else {
      status = false;
    }

    setDisabled(status);

    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onlyNumber = (event) => {
    const theEvent = event || window.event;

  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
  }

  const saveCustomer = async () => {
    const response = await service.post(GLOBAL.apiCreateCustomer, values);

    if( response.status == 'OK') {
      Swal.fire({
        icon: 'success',
        title: 'Cliente registrado.',
      })

      setValues({
        name: '',
        lastname: '',
        age: '',
        dateOfBirth: '',
      })

      updateData(1);
    }

  }

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card sx={{ height: '100%' }}>
        <CardHeader
          subheader="Complete todo los campos"
          title="Registrar cliente"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Ingrese sus nombres"
                label="Nombres"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Ingrese sus apellidos"
                label="Apellidos"
                name="lastname"
                onChange={handleChange}
                required
                value={values.lastname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Ingrese su edad"
                label="Edad"
                name="age"
                onChange={handleChange}
                onKeyPress={onlyNumber}
                required
                value={values.age}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Ingrese su fecha de nacimiento"
                name="dateOfBirth"
                onChange={handleChange}
                required
                value={values.dateOfBirth}
                variant="outlined"
                type="date"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={saveCustomer}
            disabled={disabled}
          >
            Guardar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
