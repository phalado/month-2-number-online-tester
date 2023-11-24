import { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import styles from './AppStyles';

const App = () => {
  const [monthValue, setMonthValue] = useState('')
  const [monthNumber, setMonthNumber] = useState('')

  const fetchMonthNumber = async () => {
    const url = 'https://termo-solver.herokuapp.com/api/v1/month_tests/parse_month'

    const settings = {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url + "?month=" + monthValue, settings);
    const answer = await response.json();

    setMonthNumber(answer['month_number'])
  }

  return (
    <div style={styles.container}>
      <Paper elevation={4} style={styles.paper}>
        <Typography variant='h3' style={styles.title}>Month 2 Number Online Tester</Typography>
        <Typography variant='h5' style={styles.title}>Type a month to test the gem</Typography>
        <div style={styles.inputContainer}>
          <TextField color='primary' onChange={(event) => setMonthValue(event.target.value)} />
          <div>
            <Button
              color='primary'
              variant='contained'
              style={styles.Button}
              onClick={() => fetchMonthNumber()}
            >Ok</Button>
          </div>
        </div>
        {monthNumber && <Paper elevation={3} style={styles.resultContainer}>
          <Typography variant='p'>{monthNumber}</Typography>
        </Paper>}
      </Paper>
    </div>
  );
}

export default App;
