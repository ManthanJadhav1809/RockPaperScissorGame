import React, { useState } from 'react';
import Score from './Score';
import PaperImage from "./images/Paper.png";
import RockImage from "./images/Rock.png";
import ScissorImage from "./images/Scissor.png";
import StartImage from "./images/StartImage.png";
import "./GameMainPage.css";

export default function GameMainPage() {
    const [score, setScore] = useState({
        userScore: 0,
        computerScore: 0,
        draw: 0,
    });
    const [chance, setChance] = useState(5); // Initial chance
    const [firstImage, setFirstImage] = useState(StartImage); // Initial image is StartImage
    const [secondImage, setSecondImage] = useState(StartImage);
    const [winner, setWinner] = useState(null); // Track the winner
    const [gameOver, setGameOver] = useState(false); // Track game over status
    const [roundWinner, setRoundWinner] = useState(null); // Track the round winner
    const [draw, setDraw] = useState(false); // Track draw status
    const [resetButton, setResetButton] = useState(false); // Track reset button display status
    const [shake, setShake] = useState(false); // Track shake effect

    const handleButtonClick = (option) => {
        if (!gameOver && chance > 0) {
            setChance(prev => prev - 1);
            
            // Add shake effect
            setShake(true);
            setTimeout(() => setShake(false), 500); // Remove shake effect after animation duration
            
            // Update the state with the selected image
            switch (option) {
                case 'Rock':
                    setFirstImage(RockImage);
                    break;
                case 'Paper':
                    setFirstImage(PaperImage);
                    break;
                case 'Scissor':
                    setFirstImage(ScissorImage);
                    break;
                default:
                    break;
            }

            // Randomly select the second image out of three options
            const secondImages = [RockImage, PaperImage, ScissorImage];
            const randomIndex = Math.floor(Math.random() * 3);
            const selectedImage = secondImages[randomIndex];

            // Update the state with the selected image
            setSecondImage(selectedImage);

            // Determine the winner of this round
            determineRoundWinner(option, selectedImage);
        }
    };

    const determineRoundWinner = (userOption, computerOption) => {
        const computerOptionName = getImageOptionName(computerOption);
        console.log(userOption + " = " + computerOptionName);

        if (userOption === computerOptionName) {
            setScore(prev => ({ ...prev, draw: prev.draw + 1 }));
            setDraw(true);
            setRoundWinner('Draw');
        } else if (
            (userOption === 'Rock' && computerOptionName === 'Scissor') ||
            (userOption === 'Paper' && computerOptionName === 'Rock') ||
            (userOption === 'Scissor' && computerOptionName === 'Paper')
        ) {
            setDraw(false); 
            setScore(prevScore => ({ ...prevScore, userScore: prevScore.userScore + 1 }));
            setRoundWinner('User');
        } else {
            setDraw(false);

            setScore(prevScore => ({ ...prevScore, computerScore: prevScore.computerScore + 1 }));
            setRoundWinner('Computer');
        }

        // Check for final winner after a state update
        if (chance - 1 === 0) {
            setGameOver(true);
            setResetButton(true);

            // Determine the final winner after all rounds
            const finalWinner = score.userScore > score.computerScore 
                ? 'User'
                : 'Computer'
            setWinner(finalWinner);
            if(score.userScore===score.computerScore){
                setWinner("No one")
            }
        }
    };

    const getImageOptionName = (imageURL) => {
        // Extract the option name from the image URL
        if (imageURL.includes('Rock')) {
            return 'Rock';
        } else if (imageURL.includes('Paper')) {
            return 'Paper';
        } else if (imageURL.includes('Scissor')) {
            return 'Scissor';
        }
        return '';
    };

    const handleReset = () => {
        setScore({ userScore: 0, computerScore: 0, draw: 0 });
        setChance(5); // Reset chances
        setFirstImage(StartImage);
        setSecondImage(StartImage);
        setWinner(null);
        setGameOver(false);
        setRoundWinner(null);
        setDraw(false);
        setResetButton(false);
    };

    return (
        <div className="game-container">
            <Score score={score} chance={chance} />
            <div className="image-container">
               <div>
                 <h4>User</h4> 
                 <img 
                   src={firstImage} 
                   alt="FirstImage" 
                   className={`${shake ? 'shake' : ''} ${roundWinner === "User" ? "winner" : ""} image`} 
                 /> 
               </div>
               <div>
                 <h4>Computer</h4> 
                <img 
                  src={secondImage} 
                  alt="SecondImage" 
                  className={`${shake ? 'shake' : ''} ${roundWinner === "Computer" ? "winner" : ""} image`} 
                />                     
               </div>
            </div>
            {draw && <p className="round-winner">Draw!</p>}
            {!draw ? roundWinner && <p className="round-winner">{roundWinner} wins the round!</p> :<></>}
            {winner && <p className="game-winner">{winner} wins the game!</p>}

            <h4>Select one Option from below</h4> 
            <div className="button-container">
                <button className="btnOption" onClick={() => handleButtonClick('Rock')} disabled={gameOver}>
                    <img src={RockImage} alt=""  width={"50px"}/>
                </button>
                <button className="btnOption" onClick={() => handleButtonClick('Paper')} disabled={gameOver}>
                <img src={PaperImage} alt=""  width={"50px"}/>
                </button>
                <button className="btnOption" onClick={() => handleButtonClick('Scissor')} disabled={gameOver}>
                <img src={ScissorImage} alt=""  width={"50px"}/>
                </button>
                {resetButton && <button className="btnOption" onClick={handleReset}>Reset</button>}
            </div>
        </div>
    );
}
