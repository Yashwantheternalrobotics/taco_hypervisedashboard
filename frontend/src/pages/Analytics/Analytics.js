import React,{ useState , useContext } from 'react';
import { Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import assemblyImage from './pedal.png'
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
import './Analytics.css'
import BreakdownChart from './BreakdownChart';
import Button from '@mui/material/Button';
import Bargraph from './BarGraph';

const Analytics = ( { onTitleChange }) => {

  const { mode} = useContext(ModeContext);

  const [finalValue,setFinalValue] = useState("Ratchet")

  const handlePedalClick = () => {
    setFinalValue("Pedal")
  };
  
  const handleRatchetClick = () => {
    setFinalValue("Ratchet")
  };


  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
    localStorage.startdate=event.target.value
  };
  
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    localStorage.enddate=event.target.value
  };

  const datereload=()=>{
    window.location.reload(false)
  }


  
  return (
    <>
      {onTitleChange('Analytics')}
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={6} md={4} >
          <Card className='card' onClick={handlePedalClick}>
          <img
            src={assemblyImage}
            alt="pedal-assembly"
            style={{ width: '30%'  }}
          />
          <CardContent sx={{ flexGrow: 1,textAlign:'center' ,background: mode ? 'white' : '#0E1C5E' ,
                                                            color: mode ? 'black' :'white',}}>
            <Typography variant="h6" component="div" >
              PEDAL  <br /> ASSEMBLY
            </Typography>
          </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={4}  >
          <Card className='card' onClick={handleRatchetClick}>
          <img
            src={assemblyImage}
            alt="ratchet-assembly"
            style={{ width: '30%'   }}
          />
          <CardContent sx={{ flexGrow: 1 ,textAlign:'center', background: finalValue==='Ratchet' ? '#0E1C5E' : 'white',
                                                            color: finalValue==='Ratchet' ? 'white' :'black'}}>
            <Typography variant="h6" component="div" >
              RATCHET <br /> ASSEMBLY
            </Typography>
          </CardContent>
          </Card>
        </Grid> */}
      </Grid>
      <div className='analytics_line'></div>
       <Grid container justifyContent='center'sx={{ marginTop: '20px' }} spacing={1} >
        <Grid item xs={12} sm={6} md={4} >
          <Typography variant='p' gutterBottom>From Date :</Typography>
          <input id='button1' type="date" className="datepicker" value={fromDate ===''?localStorage.startdate:fromDate} onChange={handleFromDateChange} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}  >
          <Typography variant='p' gutterBottom marginLeft='2%' marginRight='3%'>To Date :</Typography>
          <input id='button2' type="date" className="datepicker" value={toDate ===''?localStorage.enddate:toDate} onChange={handleToDateChange} />
        </Grid>
        <Button variant="contained" onClick={datereload} style={{height:'40px',marginTop:'5px',backgroundColor:'#0E1C5E', color:'white'}} ><b>ANALYZE</b></Button>
      </Grid>


      <Grid container spacing={3} sx={{ marginTop: '20px' }} alignItems='center' justifyContent='center'>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ height: '400px',boxShadow:'0 10px 10px rgba(0,0,0,0.3)', borderRadius:'5px',paddingTop:'20px'}} className='card1'>
          {/* <Charts /> */}
          <Bargraph/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} >
        <Paper sx={{ height: '400px', boxShadow:'0 10px 10px rgba(0,0,0,0.3)', borderRadius:'5px'}} className='card1' >

          <BreakdownChart />
        </Paper>
      </Grid>
    </Grid>
      </>

      
  )
}

export default Analytics