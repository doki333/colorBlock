import { useDispatch, useSelector } from 'react-redux'
import SweetAlert2 from 'react-sweetalert2'

import { RootState } from 'store/store'
import { resetColors } from 'store/reducers/colorReducer'
import { setCountMinus, setUseItems } from 'store/reducers/itemReducer'
import { setData } from 'store/reducers/tableReducer'

import DataTable from 'components/DataTable/DataTable'
import { newArr, textObjs } from 'data/dummy'
import { ISwalResult } from 'types/data'

interface IItemPage {
  isAvailable: boolean
}

const ItemPage = ({ isAvailable }: IItemPage) => {
  const dispatch = useDispatch()
  const keywordData = useSelector((state: RootState) => state.item.itemKeyword)

  const handleConfirm = (result: ISwalResult) => {
    if (result.isConfirmed) {
      dispatch(setCountMinus(keywordData))
      if (keywordData === 'refreshBlocks') {
        dispatch(resetColors())
        return
      }
      dispatch(setData(newArr))
    }
  }

  const handleResolve = () => {
    dispatch(setUseItems(false))
  }

  return (
    <SweetAlert2
      show={isAvailable}
      title={textObjs[keywordData]}
      showCancelButton={keywordData !== 'removeOne'}
      showCloseButton={keywordData === 'removeOne'}
      showConfirmButton={keywordData !== 'removeOne'}
      onConfirm={handleConfirm}
      onResolve={handleResolve}
    >
      <div>{keywordData === 'removeOne' && <DataTable isClickable />}</div>
    </SweetAlert2>
  )
}

export default ItemPage
