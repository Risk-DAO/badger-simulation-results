import React, { useState } from 'react';
import './App.css';
import imageList from './imageList'

const getList = (location) => {
  return [...new Set(imageList
    .map(imgName => {
      const name = imgName.replace(".jpg", "")
      const param = name.split("+")[location]
      const [,val] = param.split("-")
      return val
    }))]
    .sort()
}

const bibList = getList(0)
const brhList = getList(1)
const vfsList = getList(2)
const clfList = getList(3)
debugger
const ListMover = props => {  
  const { name, index, setIndex, list} = props
  const prev = ()=> setIndex(index -1)
  const next = ()=> setIndex(index +1)
  const val = list[index]
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      <div>{name}:</div>
      <a onClick={prev} href="#" role="button" disabled={index == 0}>prev</a>
      <div>{val}</div>
      <a onClick={next} href="#" role="button" disabled={index == list.length-1}>next</a>
    </div>
  )
}

function App() {
  const [bibIndex, setBibIndex] = useState(0)
  const [brhIndex, setBrhIndex] = useState(0)
  const [vfsIndex, setVfsIndex] = useState(0)
  const [clfIndex, setClfIndex] = useState(0)

  const fileName = `/results/bib-${bibList[bibIndex]}+brh-${brhList[brhIndex]}+vfs-${vfsList[vfsIndex]}+clf-${clfList[clfIndex]}.jpg`
  return (
    <div className="App">
      <div className='container'>
        <article style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <div> 
            <img style={{ height: '100%', maxHeight: '60vh'}} src={fileName}/>
          </div>
          <ListMover name="bib" list={bibList} index={bibIndex} setIndex={setBibIndex}/>
          <ListMover name="brh" list={brhList} index={brhIndex} setIndex={setBrhIndex}/>
          <ListMover name="vfs" list={vfsList} index={vfsIndex} setIndex={setVfsIndex}/>
          <ListMover name="clf" list={clfList} index={clfIndex} setIndex={setClfIndex}/>
        </article>
      </div>
    </div>
  );
}

export default App;
