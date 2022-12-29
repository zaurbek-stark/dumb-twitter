import './App.css';
import { useEffect, useState } from 'react';
import { openai } from './openai';
import Tweet from './Tweet';
import TweetInFeed from './TweetInFeed';
import { ProgressBar } from 'react-bootstrap';

function App() {
  const [input, setInput] = useState();
  const [outputs, setOutputs] = useState();
  const [formula, setFormula] = useState(0);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const callOpenAI = async (inputText) => {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: inputText,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0,
        best_of: 20,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      return response.data?.choices?.[0]?.text?.replace(/\n/g, '');
    }

    if(input?.length>0) { 
      const inputTextForStupidity = `On a scale of 1 to 10 in terms of stupidity, the tweet "${input}" is a `;
      const inputTextForConfidence = `On a scale of 1 to 10 in terms of stupidity, your confidence that the tweet "${input}" is stupid is a `;
      let sLevel = 1, cLevel = 1;
      callOpenAI(inputTextForStupidity).then(gpt3Result => {
        console.log('gpt3Result', gpt3Result);
        sLevel = gpt3Result*10;
      }); 
      callOpenAI(inputTextForConfidence).then(gpt3ResultConfidence => {
        console.log('gpt3ResultConfidence', gpt3ResultConfidence);
        cLevel = gpt3ResultConfidence*10;
      }); 
      const formula = 5 + sLevel*cLevel/(sLevel+cLevel) - cLevel/2;
      console.log('formula', formula);
      setFormula(formula*10);
      if (formula > 50) {
          setOutputs(outputs => {
            if (outputs) {
              return [...outputs, input];
            }
            return [input];
          });
          setErrorMsg();
        } else {
          setErrorMsg("This is too smart to be here. Go post it on Twitter.")
        }
    }
  }, [input]);

  const getProgressBarColor = () => {
    if (formula > 70) {
      return 'success';
    } else if (formula < 30) {
      return 'danger';
    }
    return 'warning';
  } 

  return (
    <div className="App">
      <Tweet setInput={setInput} errorMsg={errorMsg} />
      <div className="stupidity-level">
        <ProgressBar now={formula} label={`${formula}%`} variant={getProgressBarColor()} />
      </div>
      <div className="tweet-feed">
        {outputs?.map((output, index) => <TweetInFeed key={index} output={output} />)}
      </div>
    </div>
  );
}

export default App;
