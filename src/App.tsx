import React, {FC, useEffect, useMemo, useState} from 'react';
import 'antd/dist/antd.css';
import './App.scss';

const App: FC = () => {
        const winPos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        const [game, setGame] = useState({
            step: 0, isGameEnd: false, isDraw: false,
        })

        const isZero = useMemo(() => game.step % 2 === 0 ? 'x' : 'o', [game.step])

        const handleCellClick = ({target}: any = null) => {
            console.log(target)
            if (game.isGameEnd || target?.innerHTML === 'x' || target?.innerHTML === 'o') return

            const cellsEl = document.querySelectorAll('.game-board__cell')
            target.innerHTML = isZero
            setGame({...game, step: game.step + 1})

            winPos.forEach((item, i) => {
                const zeroWin = cellsEl[winPos[i][0]].innerHTML === 'o' &&
                    cellsEl[winPos[i][1]].innerHTML === 'o' &&
                    cellsEl[winPos[i][2]].innerHTML === 'o'

                const crossWin = cellsEl[winPos[i][0]].innerHTML === 'x' &&
                    cellsEl[winPos[i][1]].innerHTML === 'x' &&
                    cellsEl[winPos[i][2]].innerHTML === 'x'

                if (crossWin) {
                    setAlert("win", "крестики")
                } else if (zeroWin) {
                    setAlert("win", "нолики")
                } else if (game.step === 8 && !crossWin && !zeroWin) {
                    setAlert("draw", null)
                    handleCellClick({target: null})
                }
            })
        }

        const setAlert = (state: 'win' | 'draw', winner: 'крестики' | 'нолики' | null) => {
            if (state === 'win' && winner) {
                setGame({...game, isGameEnd: true})
                alert(`${winner} победили`)
            } else if (state === 'draw') {
                setGame({...game, isGameEnd: true, isDraw: true})
                alert('ничья')
            }
        }

        const initCells = (): void => {
            const cellsEl = document.querySelectorAll('.game-board__cell')

            cellsEl.forEach((item) => item.innerHTML = '')
            setGame({step: 0, isGameEnd: false, isDraw: false})
        }

        useEffect(() => initCells(), [])

        return (
            <div className='app'>
                <div className="game">
                    <div className='game-step'>Ходят – {isZero}</div>
                    <div className='game-board'>{
                        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) =>
                            <div onClick={handleCellClick} key={item} className='game-board__cell'/>
                        )
                    }</div>
                    <hr className='game__divider'/>
                    <button className="game__reset" onClick={initCells}>Заново</button>
                </div>
            </div>
        );
    }
;

export default App;