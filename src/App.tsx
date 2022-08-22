import { useEffect, useState } from 'react'

import * as C from './App.styles'

import logoImage from '../public/assets/devmemory_logo.png'
import restartIcon from '../public/svgs/restart.svg'

import { InfoItem } from './components/InfoItem'
import { Button } from './components/Button'
import { GridItem } from './components/GridItem'

import { GridItemType } from './types/GridItemType'

import { items } from './data/items'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'

function App() {
    const [playing, setPlaying] = useState<boolean>(false)
    const [timeElapsed, setTimeElapsed] = useState<number>(0)
    const [moveCount, setMoveCount] = useState<number>(0)
    const [shownCount, setShownCount] = useState<number>(0)
    const [gridItems, setGridItems] = useState<GridItemType[]>([])

    useEffect(() => {
        resetAndCreateGrid()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            if(playing) setTimeElapsed(timeElapsed => timeElapsed + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [playing, timeElapsed])

    // verify if opened are equal
    useEffect(() => {
        if(shownCount === 2){
            let opened = gridItems.filter(item => item.shown === true)
            if(opened.length === 2){
                let tmpGrid = [...gridItems]

                // if both are equal, make every "shown" permanent
                if(opened[0].item === opened[1].item){
                    for(let i in tmpGrid){
                        if(tmpGrid[i].shown){
                            tmpGrid[i].permanentShown = true
                            tmpGrid[i].shown = false
                        }
                    }

                    setGridItems(tmpGrid)
                    setShownCount(0)
                } else{
                    // if they are not equal, close all "shown"
                    setTimeout(() => {
                        for(let i in tmpGrid){
                            tmpGrid[i].shown = false
                        }
    
                        setGridItems(tmpGrid)
                        setShownCount(0)
                    }, 1000)
                }

                setMoveCount(moveCount => moveCount + 1)
            }
        }
    }, [shownCount, gridItems])

    // verify if game is over
    useEffect(() => {
        if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
            setPlaying(false)
        }
    }, [moveCount, gridItems])

    function startTheGame() {
        let tmpGrid = [...gridItems]

        tmpGrid.map(item => item.shown = true)
        setGridItems(tmpGrid)

        setTimeout(() => {
            tmpGrid.map(item => item.shown = false)
            setGridItems(tmpGrid)

            setPlaying(true)
        }, 700)
    }

    function resetAndCreateGrid() {
        setTimeElapsed(0)
        setMoveCount(0)
        setShownCount(0)

        let tmpGrid: GridItemType[] = []
        for(let i = 0; i < (items.length * 2); i++) {
            tmpGrid.push({
                item: null,
                shown: false,
                permanentShown: false
            })
        }

        for(let w = 0; w < 2; w++){
            for(let i = 0; i < items.length; i++){
                let position = -1;

                while(position < 0 || tmpGrid[position].item !== null){
                    position = Math.floor(Math.random() * (items.length * 2))
                }
                
                tmpGrid[position].item = i
            }
        }
        // setGridItems(tmpGrid)

        tmpGrid.map(item => item.shown = true)
        setGridItems(tmpGrid)

        setTimeout(() => {
            tmpGrid.map(item => item.shown = false)
            setGridItems(tmpGrid)

            setPlaying(true)
        }, 700)

        if(!playing && moveCount > 0){
            setPlaying(true)
        }
    }

    function handleItemClick(index: number){
        if(playing && index !== null && shownCount < 2){
            let tmpGrid = [...gridItems]

            if(!tmpGrid[index].permanentShown && !tmpGrid[index].shown){
                tmpGrid[index].shown = true
                setShownCount(shownCount + 1)
            }

            setGridItems(tmpGrid)
        }
    }

    return(
        <C.Container>
            <C.Info>
                <C.LogoLink href="">
                    <img src={logoImage} alt="logoImage" width="200" />
                </C.LogoLink>

                <C.InfoArea>
                    <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
                    <InfoItem label="Movimentos" value={moveCount.toString()} />
                </C.InfoArea>

                {playing || timeElapsed !== 0 ?
                    <Button label="Reiniciar" icon={restartIcon} onClick={resetAndCreateGrid} />
                :
                    <Button label="Começar" onClick={startTheGame} />
                }
            </C.Info>

            <C.GridArea>
                <C.Grid>
                    {gridItems.map((item, index) => (
                        <GridItem 
                            key={index}
                            item={item}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </C.Grid>
            </C.GridArea>
        </C.Container>
    )
}

export default App