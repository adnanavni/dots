import './App.css';
import React, { useState } from 'react'

function App() {
  const [points, setPoints] = useState([])
  const [popped, setPopped] = useState([])

  const handleCircle = (e) => {
    const { clientX, clientY } = e.nativeEvent
    setPoints([...points, { x: clientX, y: clientY }])
  }

  const handleUndo = () => {
    const newPoints = [...points]
    const poppedPoint = newPoints.pop()
    if (!poppedPoint) return
    setPopped([...popped, poppedPoint])
    setPoints(newPoints)
  }

  const handleRedo = () => {
    const newPopped = [...popped]
    const poppedPoint = newPopped.pop()
    if (!poppedPoint) return
    setPoints([...points, poppedPoint])
    setPopped(newPopped)
  }

  return (
    <>
      <h2>Press anywhere in the blue area</h2>
      <button onClick={handleUndo} disabled={points.length === 0}>undo</button>
      <button onClick={handleRedo} disabled={popped.length === 0}>redo</button>
      <div className="App" onClick={handleCircle}>
        {points.map(point => (
          <div key={point.x} className='point' style={{
            left: point.x - 5 + 'px',
            top: point.y - 5 + 'px'
          }}></div>
        ))}
      </div>
    </>
  );
}

export default App;
