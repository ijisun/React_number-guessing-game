import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // 폰트 컬러 상수화
  const INITIAL_FONT_COLOR = '#000000'
  const ERROR_FONT_COLOR = '#dc2c2c'

  // useState 정의
  const [ computerNum, setComputerNum ] = useState(0) // 랜덤 숫자 저장
  const [ userInput, setUserInput ] = useState('') // 사용자 입력 값
  const [ resultMessage, setResultMessage ] = useState('정답은?') // 결과 메세지
  const [ fontColor, setFontColor ] = useState(INITIAL_FONT_COLOR)
  const [ chances, setChances ] = useState(10) // 남은 기회
  const [ history, setHistory ] = useState([]) // 입력 기록 저장
  const [ gameOver, setGameOver ] = useState(false) // 게임 종료 여부

  useEffect(() => {
    // 페이지가 처음 렌더링될 때 랜덤 숫자 생성하기
    createRandomNum()
  }, [])

  const createRandomNum = () => {
    // 랜덤 숫자 생성
    const randomNum = Math.floor(Math.random() * 100) + 1
    setComputerNum(randomNum)
  }

  const handleInputChange = (e) => {
    // 사용자 입력 처리
    setUserInput(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      playGame() // Enter 키를 누르면 playGame 함수 실행
    }
  }

  const playGame = () => {
    // 게임 로직 실행
    const userNum = Number(userInput)

    if (!userInput || isNaN(userNum)) {
      setResultMessage('숫자를 입력해주세요.')
      setFontColor(ERROR_FONT_COLOR)
      return
    }

    if (userNum < 1 || userNum > 100) {
      setResultMessage('1부터 100까지의 숫자만 입력해주세요.')
      setFontColor(ERROR_FONT_COLOR)
      return
    }

    if (history.includes(userNum)) {
      setResultMessage('입력한 숫자입니다. 다른 숫자를 입력해주세요.')
      setFontColor(ERROR_FONT_COLOR)
      return
    }

    if (userNum === computerNum) {
      setResultMessage('정답입니다!')
      setFontColor(INITIAL_FONT_COLOR)
      setGameOver(true)
    } else if (userNum > computerNum) {
      setResultMessage('DOWN')
      setFontColor(INITIAL_FONT_COLOR)
    } else if (userNum < computerNum) {
      setResultMessage('UP')
      setFontColor(INITIAL_FONT_COLOR)
    }

    setHistory([...history, userNum]) // 입력 기록 추가
    const remainingChances = chances - 1
    setChances(remainingChances)

    if (remainingChances === 0) {
      setGameOver(true)
      setResultMessage('기회가 소진되었습니다ㅜㅜ');
    }

    setUserInput('')
  }

  const restartGame = () => {
    setGameOver(false)
    setFontColor(INITIAL_FONT_COLOR)
    setChances(10)
    setHistory([])
    setUserInput('')
    setResultMessage('정답은?')
    createRandomNum()
  }

  return (
    <div id='wrapper'>
      <h1>숫자맞추기 게임</h1>
      <div className='show-result'>
        <p
          id='result-area'
          style={{ color: fontColor }}
        >{resultMessage}</p>
        <p id='chance-area'>남은 기회: {chances}번</p>
      </div>
      <input
        type='number'
        value={userInput}
        onChange={handleInputChange}
        disabled={gameOver}
        onKeyDown={handleKeyDown}
      />
      <button id='play-btn' onClick={playGame} disabled={gameOver}>
        Go!
      </button>
      <button onClick={restartGame}>
        다시 시작
      </button>
    </div>
  )
}

export default App;