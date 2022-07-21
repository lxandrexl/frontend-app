import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CustomerForm } from '../components/dashboard/customer-form';
import { CustomerList } from '../components/dashboard/customer-list';
import { CustomerAnalytics } from '../components/dashboard/customer-analytics';
import { Deviation } from '../components/dashboard/deviation';
import { AverageAge } from '../components/dashboard/average-age';
import { CustomerTotal } from '../components/dashboard/customer-total';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import Service from '../services/http';
import * as GLOBAL from '../constants';

const Dashboard = () => {
  const service = new Service(GLOBAL.domain);
  const [kpiData, setKpiData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [updateData, setUpdateData] = useState(0);

  const getKPI = async () => {
    const response = await service.get(GLOBAL.apiKPICustomer);

    if( response.status == 'OK') {
      setKpiData(response.data);
    }
  }

  const getCustomers = async () => {
    const response = await service.get(GLOBAL.apiListCustomer);

    if( response.status == 'OK') {
      setCustomerData(response.data);
    }
  }

  const observerData = (num) => {
    setUpdateData( curr => curr + num );
  }

  useEffect(async () => {
    await getKPI();
    await getCustomers();
  }, []);

  useEffect(async () => {
    await getKPI();
    await getCustomers();
  }, [updateData])

  return (
    <>
    <Head>
      <title>
        Dashboard
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xl={4}
            lg={4}
            sm={6}
            xs={12}
          >
            <AverageAge data={kpiData} />
          </Grid>
          <Grid
            item
            xl={4}
            lg={4}
            sm={6}
            xs={12}
          >
            <Deviation data={kpiData}/>
          </Grid>
          <Grid
            item
            xl={4}
            lg={4}
            sm={6}
            xs={12}
          >
            <CustomerTotal data={kpiData} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={8}
            xs={12}
          >
            <CustomerForm updateData={observerData}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={4}
            xs={12}
          >
            <CustomerList data={customerData} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CustomerAnalytics data={customerData}/>
          </Grid>
          
          
        </Grid>
      </Container>
    </Box>
  </>
  )
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
