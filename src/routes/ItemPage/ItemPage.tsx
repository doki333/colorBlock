import { useDispatch, useSelector } from 'react-redux'
import { setCountMinus, setData, setUseItems } from 'store/reducers/tableReducer'
import SweetAlert2 from 'react-sweetalert2'

import DataTable from 'components/DataTable/DataTable'
import { RootState } from 'store/store'
import { newArr, textObjs } from 'data/dummy'

import { ISwalResult } from 'types/data'
import { resetColors } from 'store/reducers/colorReducer'

interface IItemPage {
  isAvailable: boolean
}

const ItemPage = ({ isAvailable }: IItemPage) => {
  const dispatch = useDispatch()
  const keywordData = useSelector((state: RootState) => state.table.itemKeyword)

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
