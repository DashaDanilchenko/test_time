interface Props {
    time: {
        s: number,
        m: number,
        h: number,
      },
  }
  
  const StopWatch = ({time}: Props) => {
  
    const {h, m, s} = time
  
   
    return (
      
       <div className="time">
        <span>{h>=10? h : "0"+h} : </span>
        <span>{m>=10? m : "0"+m} : </span>
        <span>{s>=10? s : "0"+s}</span>
       </div>
     
    );
  }
  
  export default StopWatch;