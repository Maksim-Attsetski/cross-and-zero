import React, {FC, useMemo, useState} from 'react';
import 'antd/dist/antd.css';
import './App.scss';

const App: FC = () => {
    const winPos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]

    const [game, setGame] = useState({
        step: 0,

    })
    const isZero = useMemo(() => game.step % 2 === 0 ? 'x' : 0, [game.step])

    const handleCeilClick = ({target}: any) => {
        const cellsEl = document.querySelectorAll('.game-board__cell')
        target.innerHTML = isZero
        winPos.forEach((item, i) => {
            if(cellsEl[winPos[i][0]].innerHTML === 'x' &&
                cellsEl[winPos[i][1]].innerHTML === 'x' &&
                cellsEl[winPos[i][2]].innerHTML === 'x') {
                console.log('cross win')
            }
        })
    }


    return (
        <div className='app'>
            <div className="game">
                <div className='game-step'>Ходят – {isZero}</div>
                <div className='game-board'>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8]
                        .map((item) =>
                            <div key={item} onClick={handleCeilClick} className='game-board__cell'></div>)}
                </div>
                <hr className='game__divider'/>
                <button className="game__reset">Заново</button>
            </div>
        </div>
    );
};

export default App;