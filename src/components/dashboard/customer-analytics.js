import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

let isLoaded = false;
 
export const CustomerAnalytics = (props) => {
  const theme = useTheme();
  const [customers, setCustomers] = useState([]);
  const list = props.data;


  useEffect(() => {
  }, []);

  const buildData = () => {
    let one = 0, 
        two = 0, 
        three = 0, 
        four = 0;

    list.map((customer) => {
      if(customer.age <=15 ) {
        one++;
        return
      }
      if(customer.age <=26 ) {
        two++;
        return
      }
      if(customer.age <=59 ) {
        three++;
        return
      }
      if(customer.age >= 60 ) {
        four++;
        return
      }
    });

    if(list.length == 0) {
      isLoaded = false;
    }

    const arr = [ one, two, three, four ];

    if(list.length > 0 && !isLoaded) {
      setCustomers(arr);
      isLoaded = true;
    }

    if(!arrayCompare(arr, customers)) {
      setCustomers(arr);
      isLoaded = true;
    }
  }

  buildData();

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: customers,
        label: 'Clientes',
        maxBarThickness: 10
      },
    ],
    labels: ['Adolescentes (12 - 15)', 'Jovenes (16 - 26)', 'Adultos (27 - 59)', 'Adultos mayores (60 o mas)']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card >
      <CardHeader
        title="Analisis de clientes"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
      </Box>
    </Card>
  );
};

function arrayCompare(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1)
    || !Array.isArray(_arr2)
    || _arr1.length !== _arr2.length
    ) {
      return false;
    }
  
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();
  
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return false;
       }
  }
  
  return true;
}