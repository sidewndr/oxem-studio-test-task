import './slider.scss'

export const Slider = (
  {
    value = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    ...rest
  }) => {
  /* Track progress size */
  const style = {
    backgroundSize: `${((value - min) * 100) / (max - min)}% 100%`
  }

  return (
    <input
      className={'slider'}
      type={'range'}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      style={style}
      {...rest}
    />
  )
}