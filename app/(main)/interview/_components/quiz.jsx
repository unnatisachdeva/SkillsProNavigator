"use client";

import { generateQuiz, saveQuizResult } from "@/actions/interview";
//import QuizResult from "./quiz-result";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useUser  } from '@clerk/nextjs'; 
import { toast } from "sonner";
import QuizResult from "./quiz-result";

const Quiz = () => {
    const { isSignedIn } = useUser ();
    const handleStartQuiz = () => {
        if (!isSignedIn) {
            alert("You need to be logged in to start the quiz.");
            return;
        }
        generateQuizFn(); // Call the function to generate the quiz
    };
    const [currentQuestion, setCurrentQuestion]= useState(0);
    const[ answers, setAnswers]= useState([]);
    const[ showExplanation, setShowExplanation]= useState(false);

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
        error,
      } = useFetch(generateQuiz);

      const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData: setResultData,
      } = useFetch(saveQuizResult);

      console.log(resultData);

      //if quiz data changes i when quiz is generated , store answers in an array
      useEffect(() => {
        if (quizData) {
          setAnswers(new Array(quizData.length).fill(null));
        }
      }, [quizData]);

      const handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
      };
      const handleNext= ()=>
      {
        if(currentQuestion<quizData.length-1){ //means its not the last ques 
          setCurrentQuestion(currentQuestion+1);
          setShowExplanation(false);
        }
        else{
          finishQuiz()
        }
      };
      const calculateScore = () => {
        let correct = 0;
        answers.forEach((answer, index) => {
          if (answer === quizData[index].correctAnswer) {
            correct++;
          }
        });
        return (correct / quizData.length) * 100;
      };
      
      const finishQuiz = async () => {
         //will calculate result of quiz and make api call to save result of quiz
          const score = calculateScore();
          try {
            await saveQuizResultFn(quizData, answers, score);
            toast.success("Quiz completed!");
          } catch (error) {
            toast.error(error.message || "Failed to save quiz results");
          }
        };

      //when quiz is generated show a bar loader 
      if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />;
      }


      if (error) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-500">{error.message}</p>
                </CardContent>
            </Card>
        );
    }
    const startNewQuiz = () => {
      setCurrentQuestion(0);
      setAnswers([]);
      setShowExplanation(false);
      generateQuizFn();
      setResultData(null);
    };

    //show results if quiz is completed 
    if (resultData) {
      return (
        <div className="mx-2">
          <QuizResult result={resultData} onStartNew={startNewQuiz} />
        </div>
      );
    }
      //before the quiz is generated: 
    if (!quizData) {
      return (
          <Card className="mx-2">
            <CardHeader>
              <CardTitle>Ready to test your knowledge?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This quiz contains 10 questions specific to your industry and
                skills. Take your time and choose the best answer for each question.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={generateQuizFn} className="w-full" >
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        );
      }

      const question = quizData[currentQuestion];

      return (
        <Card className="mx-2">
          <CardHeader>
            <CardTitle>Question {currentQuestion + 1} of {quizData.length}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          <p className="text-lg font-medium">{question.question}</p>
          <RadioGroup
         onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && 
        <div>
          <p className="font-medium"> Explanation: </p> 
          <p className="text-muted-foreground">  {question.explanation}</p>
          </div>} 
          </CardContent>


          <CardFooter className="flex justify-between">
          {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
          </CardFooter>
        </Card>
      );
    }
  


export default Quiz;