import { Avatar, Box, Card, CardContent, Grid, Typography, LinearProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const AverageAge = (props) => {
  const average = props.data.average;

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
              Promedio de edad
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {average}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
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
