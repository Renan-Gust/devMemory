import { useEffect, useState } from 'react'

import * as C from './App.styles'

import logoImage from '../public/assets/devmemory_logo.png'
import restartIcon from '../public/svgs/restart.svg'

import { InfoItem } from './components/InfoItem'
import { Button } from './components/Button'

import { GridItemType } from './types/gridItemType'

import { items } from './data/items'

function App() {
    const [playing, setPlaying] = useState<boolean>(false)
    const [timeElapsed, setTimeElapsed] = useState<number>(0)
    const [moveCount, setMoveCount] = useState<number>(0)
    const [showCount, setShowCount] = useState<number>(0)
    const [gridItems, setGridItems] = useState<GridItemType[]>([])

    useEffect(() => {
        resetAndCreateGrid()
    }, [])

    function resetAndCreateGrid() {
        setTimeElapsed(0)
        setMoveCount(0)
        setShowCount(0)

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

        setGridItems(tmpGrid)
        setPlaying(true)
    }

    return(
        <C.Container>
            <C.Info>
                <C.LogoLink href="">
                    <img src={logoImage} alt="logoImage" width="200" />
                </C.LogoLink>

                <C.InfoArea>
                    <InfoItem label="Tempo" value="00:00" />
                    <InfoItem label="Movimentos" value="0" />
                </C.InfoArea>

                <Button label="Reiniciar" icon={restartIcon} onClick={resetAndCreateGrid} />
            </C.Info>

            <C.GridArea>
                <C.Grid>

                </C.Grid>
            </C.GridArea>
        </C.Container>
    )
}

export default App