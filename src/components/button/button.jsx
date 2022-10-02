import './button.scss'
import {getClassName} from "../../utils/getClassName";
import {Loader} from "../loader/loader";

export const Button = (
  {
    children,
    onClick,
    isDisabled = false,
    isLoading = false,
    ...rest
  }) => {

  return (
    <button
      className={getClassName({
        'button': true,
        'button_loading': isLoading
      })}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      {...rest}
    >
      <span>{children}</span>
      {isLoading && <Loader />}
    </button>
  )
}