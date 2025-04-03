"use client";
import { generateQuiz } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useUser  } from '@clerk/nextjs'; 

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

      //if quiz data changes i when quiz is generated , store answers in an array
      useEffect(() => {
        if (quizData) {
          setAnswers(new Array(quizData.length).fill(null));
        }
      }, [quizData]);

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
          <CardContent>
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
          </CardContent>
          <CardFooter>
            
          </CardFooter>
        </Card>
      );
    }
  


export default Quiz;