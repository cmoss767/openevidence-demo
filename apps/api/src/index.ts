/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { log } from "@repo/logger";
import { createServer } from "./server";
import axios from "axios"

const OPENEVIDENCE_API_KEY = process.env.OPENEVIDENCE_API_KEY

const port = process.env.PORT || 5001;
const server = createServer();

server.get('/', (req, res) => {
  res.send('this is running');
});
server.post('/evidence', async (req, res) => {
  try{
    const requestData = {
      text: req.body.question,
      model: 'oe-v2'
    };
    
    const answer = await axios.post('https://api.openevidence.com/analysis', requestData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${OPENEVIDENCE_API_KEY}`
      }
    })
    console.log(answer)
    
    res.json({message:"success", data:answer.data});
  }catch(err){
    console.log(err)
    return res.status(500).json({message:"failed"})
  }
  
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
