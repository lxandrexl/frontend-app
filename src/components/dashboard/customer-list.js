import {
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem, 
  ListItemAvatar,
  ListItemText
} from '@mui/material';

export const CustomerList = (props) =>{
  const customers = props.data.slice(0,4);

  return  (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        subtitle={`${customers.length} in total`}
        title="Clientes recientes"
      />
      <Divider />
      <List>
        {customers.map((customer, i) => (
          <ListItem
            divider={i < customers.length - 1}
            key={customer.customerId}
          >
             <ListItemAvatar>
              <img
                alt='GitHub'
                src='/static/images/products/product_5.png'
                style={{ height: 48, width: 48 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={customer.name + ' ' + customer.lastname}
              secondary={`Fecha de nacimiento:  ${customer.dateOfBirth}`}
            />
          </ListItem>
        ))}
      </List>
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
}
