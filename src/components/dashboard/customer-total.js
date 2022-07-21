import { Avatar, Box, Card, CardContent, Grid, Typography, LinearProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const CustomerTotal = (props) => {
  const customers = props.data.customers;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              Total de clientes
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {customers}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={100}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
}