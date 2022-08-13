import * as C from './styles'

import { GridItemType } from '../../types/GridItemType';
import { items } from '../../data/items';

import b7Svg from '../../../public/svgs/b7.svg'

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export function GridItem({ item, onClick }: Props) {
    return(
        <C.Container onClick={onClick} showBackground={item.permanentShown || item.shown}>
            {!item.permanentShown && !item.shown && 
                <C.Icon src={b7Svg} alt="" opacity={.1} />
            }

            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt={items[item.item].name} />
            }
        </C.Container>
    )
}