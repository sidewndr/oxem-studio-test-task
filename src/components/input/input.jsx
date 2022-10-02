import './input.scss'
import {getClassName} from "../../utils/getClassName";
import {Slider} from "../slider/slider";

export const Input = (
  {
    mainInputProps,
    secondaryInputProps,
    sliderProps,
    isDisabled
  }) => {
  return (
    <div className={getClassName({
      'input': true,
      'input_disabled': isDisabled
    })}>
      <input className={'input__main-input'} {...mainInputProps} />

      <input
        className={getClassName({
          'input__secondary-input': true,
          'input__secondary-input_editable': secondaryInputProps?.onChange
        })}
        {...secondaryInputProps}
      />

      <Slider {...sliderProps} />
    </div>
  )
}