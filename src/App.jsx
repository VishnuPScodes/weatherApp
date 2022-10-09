import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Input, Stack } from '@chakra-ui/react'
import axios from 'axios';
import {BiSearchAlt2} from 'react-icons/bi'
import { Audio } from  'react-loader-spinner'


function App() {
  
  // graph
  const [ind,setInd]=useState(0);
  const options = {
    title: {
      text: "Basic Column Chart in React"
    },
    data: [{				
              type: "column",
              dataPoints: [
                  { label: "Apple",  y: 10  },
                  { label: "Orange", y: 15  },
                  { label: "Banana", y: 25  },
                  { label: "Mango",  y: 30  },
                  { label: "Grape",  y: 28  }
              ]
     }]
 }



  const [data, setData] = useState([]);
  const [city,setCity]=useState('pune');
  const [loading,setLoading]=useState(true)

  //getting ip address of user
  useEffect(()=>{
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
       function success(position) {
         // for when getting location is a success
         console.log('latitude', position.coords.latitude, 
                     'longitude', position.coords.longitude);
       },
      function error(error_message) {
        // for when getting location results in an error
        console.error( error_message)
      }
      )  
    }
     else {
      // geolocation is not supported
      // get your location some other way
      console.log('geolocation is not enabled on this browser')
    }
  },[])
  

  //weather logs
  let logos={
    Clouds:'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
    Rain:'https://cdn-icons-png.flaticon.com/512/2864/2864448.png',
    Clear:'https://cdn-icons-png.flaticon.com/512/6974/6974833.png'
  }
 
  //getting data from api using useEffect hooks

  useEffect(()=>{
    // axios.get(`api.openweathermap.org/data/2.5/forecast?q=pune&appid=fa88f3ff08f2aad77bbd056cfbb24502`).then((res)=>{
    //   setData(res.data)
    // })

  
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fa88f3ff08f2aad77bbd056cfbb24502`, { params: { appid:'fa88f3ff08f2aad77bbd056cfbb24502'  } }).then((res)=>{
      setData(res.data.list)
      let newdata=[...data];
      newdata=newdata.filter((i)=>{return i<7})
      console.log('newdata',newdata)
      setLoading(false)
    }).catch((err)=>{
      console.log('err',err)
      setLoading(false)
    })
    console.log('data',data)
  },[city])
console.log(city)


 

  return (
    <div className="App">
      {loading==true?  <div className='loader'><Audio
    height = "120"
    width = "120"
    radius = "9"
    color = 'blue'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  /></div>:<div>
      <div className='search'>
      <Input className='search' placeholder='City name' onChange={((e)=>{setCity(e.target.value)})} >
        
      </Input>

    </div>
    <div className='days-cont'>
      
     <div onClick={(()=>{
      setInd(0)
     })} >
      <div className='day'>Sun</div>
      <div className='day'> {(data[0]?.main?.feels_like-273).toFixed(2)
}°C</div>
      <div className='climate'>
       <img height={'30px'}  src={logos[data[0]?.weather[0]?.main]} alt="" />
      </div>
      <div className='day'>{data[0]?.weather[0]?.main}</div>
     </div>

      <div onClick={(()=>{
        setInd(2)
      })}>
      <div className='day'>Mon</div>
      <div className='day'>{(data[2]?.main?.feels_like-273).toFixed(2)
}°C</div>
      <div className='climate'>
         <img height={'30px'}  src={logos[data[2]?.weather[0]?.main]} alt="" />
      </div>
      <div className='day'>{data[2]?.weather[0]?.main}</div>
     </div>

     <div onClick={(()=>{
      setInd(3)
     })}>
      <div className='day'>Tue</div>
      <div className='day'>{(data[3]?.main?.feels_like-273).toFixed(2)
}°C</div>
      <div className='climate'>
      <img height={'30px'}  src={logos[data[3]?.weather[0]?.main]} alt="" />
      </div>
      <div className='day'>{data[3]?.weather[0]?.main}</div>
     </div>

     <div onClick={(()=>{
      setInd(4)
     })}>
      <div className='day'>Wed</div>
      <div className='day'>{(data[4]?.main?.feels_like-273).toFixed(2)
}°C</div>
      <div className='climate'>
      <img height={'30px'}  src={logos[data[4]?.weather[0]?.main]} alt="" />
      </div>
      <div className='day'>{data[4]?.weather[0]?.main}</div>
     </div>

     <div onClick={(()=>{
      setInd(5)
     })}>
      <div className='day'>Thus</div>
      <div className='day'>{(data[5]?.main?.feels_like-273).toFixed(2)
}°C</div>
      <div className='climate'>
      <img height={'30px'}  src={logos[data[5]?.weather[0]?.main]} alt="" />
      </div>
      <div className='day'>{data[5]?.weather[0]?.main}</div>
     </div>

     <div onClick={(()=>{
      setInd(6)
     })}>
      <div className='day'>Fri</div>
      <div className='day'>{(data[6]?.main?.feels_like-273).toFixed(2)
}°C</div>
      <div className='climate'>
      <img height={'30px'}  src={logos[data[6]?.weather[0]?.main]} alt="" />
      </div>
      <div className='day'>{data[6]?.weather[0]?.main}</div>
     </div>


     <div onClick={(()=>{
      setInd(7)
     })}>
      <div className='day'>Sat</div>
      <div className='day'>{(data[7]?.main?.feels_like-273).toFixed(2)
}°C</div>
      <div className='climate'>
      <img height={'30px'}  src={logos[data[7]?.weather[0]?.main]} alt="" />
      </div>
      <div className='day'>{data[7]?.weather[0]?.main}</div>
     </div>
    </div> 
    
    {/* graph */}
    <div className='graph' >
    <div className='hum'>
         <h1>Humidity:{data[ind]?.main?.humidity}%</h1>
      </div>
      <div className='pres'>
        <h1>Pressure:{data[ind]?.main?.pressure}hpa</h1>
      </div>
    </div>
    
     </div>}
      
    
    </div>
  )
}

export default App
