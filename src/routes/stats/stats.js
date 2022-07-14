import styles from './stats.module.scss';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend, Tooltip } from 'recharts';

function Stats(props) {


        const linedata = props.data.map(item => ({ date: new Date(item.pv).getTime(), Systolinen: item.yp, Diastolinen: item.ap, Syke: item.syke }));

        const sum = props.data.reduce(
          (prevValue, currentValue) => prevValue + currentValue.yp,
          0
        );
        const avg = (sum / props.data.length).toFixed(2);
        
        const sum2 = props.data.reduce(
          (prevValue, currentValue) => prevValue + currentValue.ap,
          0
        );
        const avg2 = (sum2 / props.data.length).toFixed(2);
        
        const sum3 = props.data.reduce(
          (prevValue, currentValue) => prevValue + currentValue.syke,
          0
        );
        const avg3  = (sum3 / props.data.length).toFixed(2); 

    return(
      <div className={styles.stats}>
      
         <h2>Tilastot</h2>
       <div>
       <p> Systolinen paine keskiarvo on  { avg } mmHg </p>
        </div> 
        <div>
       <p> Diastolinen paine keskiarvo on  { avg2 } mmHg </p>
        </div>
        <div>
       <p> Syke keskiarvo on  { avg3 }  </p>
        </div>
        <div>
       <p> Huom: verenpaineesi on koholla kun paine on 140/90 tai enemmän. </p>
        </div>
    
        <br></br>

        <ResponsiveContainer width={"100%"} height={360}>
        <LineChart data={linedata}
      width={500}
      height={300}
      margin={{
        top: 20,
        right: 20,
        left: 20,
        bottom: 10
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
      type="number"
      dataKey="date" 
      domain={["dataMin", "dataMax"]} 
          scale="time"
          tickFormatter={timeStr => new Date(timeStr).toLocaleDateString("fi-FI")}

      />
<Legend />
      <YAxis />
     
      <Line
        type="linear"
        dataKey="Systolinen"
        stroke="#ff0000"
        //"#8884d8"
        activeDot={{ r: 8 }}
      />
   
      <Line 
      type="linear" 
      dataKey="Diastolinen" 
      stroke="#8884d8" 
      activeDot={{ r: 8 }}
      />

      <Line 
      type="linear" 
      dataKey="Syke" 
      stroke="#db7093" 
      activeDot={{ r: 8 }}
      />

<Tooltip labelFormatter={value => new Date(value).toLocaleDateString("fi-FI")}/>
    </LineChart>
        </ResponsiveContainer>
        </div>
        
    );
} 

export default Stats; 

 