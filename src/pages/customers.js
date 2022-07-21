import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import Service from '../services/http';
import * as GLOBAL from '../constants';

const Customers = () => {
  const service = new Service(GLOBAL.domain);
  const [customerData, setCustomerData] = useState([]);

  const getCustomers = async () => {
    const response = await service.get(GLOBAL.apiListCustomer);

    if( response.status == 'OK') {
      setCustomerData(response.data);
    }
  }

  useEffect(async () => {
    await getCustomers();
  }, []);

  return (
    <>
      <Head>
        <title>
          Clientes
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customerData} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
