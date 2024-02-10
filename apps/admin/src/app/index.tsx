/* eslint-disable no-nested-ternary */
import {  useState } from "react";
import React from "react";
import axios from 'axios';
import FadeLoader from "react-spinners/FadeLoader";

function App(): JSX.Element {

  const [inputText, setInputText] = useState('');
  const [resText, setResText] = useState("")
  const [showText, setShowText] = useState(true)
  const [loading, setLoading] = useState(false)


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  const handleButtonClick : ()=>Promise<void> = async () => {
    console.log(inputText);
    setLoading(true)
    setShowText(true)
    try {
      const response = await axios.post('http://localhost:5001/evidence', { question: inputText });
      console.log(response.data.data.text)
      setResText(response.data.data.text);
      setLoading(false)

    } catch (error) {
      console.error('Error occurred:', error);
      setLoading(false)
    }
  };
 

  return (
    <div className="bg-[#0b192f] w-full h-screen p-6 flex flex-col items-center ">
      <h1 className="text-[#c8d2f1] text-xl font-bold">
        Ask Away! 
      </h1>
      <br />
   
  <div className="flex">
      <input
        className="bg-[#162b46] text-[#c8d2f1] px-4 py-2 rounded-md border-none focus:border-[#60efd2] outline-none w-72"
        onChange={handleInputChange}
        placeholder="Enter your question"
        type="text"
        value={inputText}
      />
      <div className="m-2"/>
      <button
          className="bg-transparent border border-[#60efd2] text-[#60efd2] px-4 py-2 rounded-md transition duration-300 hover:bg-[#60efd2] hover:text-white"
          disabled={loading}
          onClick={handleButtonClick}
          type="button"
        >
            Submit to OpenEvidence
          </button>
      </div>
      <br />
      <div className="bg-[#162b46] p-6 w-120 h-72 overflow-auto " >
        {
          showText && resText ? (
          <div className="text-[#c8d2f1]">{resText}</div>
            ) : (loading) ? (
              <div className="w-full flex justify-center items-center">
            <FadeLoader color="#c8d2f1"/>
            </div>
            ):
            null
        }
      </div>
      </div>
  );
}

export default App;
