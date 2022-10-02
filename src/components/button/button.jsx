import './button.scss'
import {getClassName} from "../../utils/getClassName";
import {Loader} from "../loader/loader";

export const Button = (
  {
    children,
    onClick,
    isDisabled = false,
    isLoading = false
  }) => {

  return (
    <button
      className={getClassName({
        'button': true,
        'button_loading': isLoading
      })}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      <span>{children}</span>
      {isLoading && <Loader />}
    </button>
  )
}