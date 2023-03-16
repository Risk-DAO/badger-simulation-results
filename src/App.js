import React, { useState } from 'react';
import './App.css';
import {observer} from "mobx-react"
import mainStore from './main.store';

const ListMover = props => {  
  const { name, index, setIndex, list} = props
  const prev = ()=> setIndex(index -1)
  const next = ()=> setIndex(index +1)
  const val = list[index]
  return (
    <div className='list-mover' >
      <div style={{width: 'calc(50% - 150px)', textAlign: 'right'}}>{name}:</div>
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

  const bibList = mainStore.getListByParamPosition(0)
  const brhList = mainStore.getListByParamPosition(1)
  const vfsList = mainStore.getListByParamPosition(2)
  const clfList = mainStore.getListByParamPosition(3)
  

  const fileName = `https://raw.githubusercontent.com/Risk-DAO/${mainStore.repo}/main/${mainStore.dir.length ? '' : mainStore.dir + '/'}bib-${bibList[bibIndex]}+brh-${brhList[brhIndex]}+vfs-${vfsList[vfsIndex]}+clf-${clfList[clfIndex]}.jpg`
  console.log({fileName})
  return (
    <div className="App">
      <div className='container'>
        {mainStore.loading && <article aria-busy="true"></article>}
        {!mainStore.loading && <article style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <div> 
            <img style={{ height: '100%', maxHeight: '60vh'}} src={fileName}/>
          </div>
          <ListMover name="curve initial balance" list={bibList} index={bibIndex} setIndex={setBibIndex}/>
          <ListMover name="curve recovery half life" list={brhList} index={brhIndex} setIndex={setBrhIndex}/>
          <ListMover name="eth/wbtc slippage" list={vfsList} index={vfsIndex} setIndex={setVfsIndex}/>
          <ListMover name="stress factor" list={clfList} index={clfIndex} setIndex={setClfIndex}/>
        </article>}
      </div>
    </div>
  );
}

export default observer(App);
