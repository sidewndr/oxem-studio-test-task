import './loader.scss'
import {ReactComponent as LoaderIcon} from '../../attachments/icons/loader.svg'

export const Loader = () => {
  return (
    <div className={'loader'}>
      <LoaderIcon />
    </div>
  )
}