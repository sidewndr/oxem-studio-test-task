import {useEffect, useState} from "react";
import './main-page.scss';
import {Input} from "../../components/input/input";
import {useId} from "react";
import {Button} from "../../components/button/button";
import {currencyFormatter, numberFormatter} from "../../utils/formatters";

export const MainPage = () => {
  const id = useId()

  // Validate number on key down
  const onInputNumberKeyDown = (e) => {
    const invalidChars = ['-', '+', 'e', 'E']

    if (invalidChars.includes(e.key)) {
      e.preventDefault()
    }
  }

  // Validate number on blur
  const onInputNumberBlur = (value, setValue, min, max) => {
    if (value < min) {
      setValue(min)
    }

    if (value > max) {
      setValue(max)
    }
  }

  /* Price */
  const priceMin = 1_000_000
  const priceMax = 6_000_000
  const priceStep = 10000
  const [price, setPrice] = useState(priceMin)
  const [isPriceFocused, setIsPriceFocused] = useState(false)


  /* Initial */
  const rate = 3.5
  const initialPercentMin = 10
  const initialPercentMax = 60
  const initialPercentStep = 1
  const [initialPercent, setInitialPercent] = useState(initialPercentMin)
  const [initialValue, setInitialValue] = useState((initialPercentMin * price) / 100)
  const [isInitialPercentFocused, setIsInitialPercentFocused] = useState(false)

  useEffect(() => {
    setInitialValue((initialPercent * price) / 100)
  }, [initialPercent, price])


  /* Months */
  const monthsMin = 1
  const monthsMax = 60
  const monthsStep = 1
  const [months, setMonths] = useState(monthsMin)


  /* Payment */
  const getPayment = () => (price - initialValue) * (((rate / 100) * Math.pow((1 + (rate / 100)), months)) / (Math.pow((1 + (rate / 100)), months) - 1))
  const [payment, setPayment] = useState(getPayment())

  useEffect(() => {
    setPayment(getPayment())
  }, [price, initialValue, months, rate])


  /* Sum */
  const getSum = () => initialValue + (months * payment)
  const [sum, setSum] = useState(getSum())

  useEffect(() => {
    setSum(getSum())
  }, [initialValue, months, payment])


  /* Form submit */
  const [isLoading, setIsLoading] = useState(false)

  const onFormSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const body = {
      price,
      initialValue,
      initialPercent,
      months,
      sum,
      payment
    }

    const response = fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    response
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Status: ${res.status}. Message: ${res.statusMessage}`)
        } else {
          res.json()
        }
      })
      .then((data) => console.log(data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false))
  }



  return (
    <main className={'main-page'}>
      <h1>Рассчитайте стоимость автомобиля в лизинг</h1>

      <form onSubmit={onFormSubmit}>
        <label htmlFor={`${id}-price`}>Стоимость автомобиля</label>
        <Input
          mainInputProps={{
            type: isPriceFocused ? 'number' : 'string',
            value: isPriceFocused ? price : numberFormatter.format(price),
            min: priceMin,
            max: priceMax,
            step: priceStep,
            onChange: (e) => setPrice(Number(e.target.value)),
            onKeyDown: onInputNumberKeyDown,
            onFocus: () => setIsPriceFocused(true),
            onBlur: () => {
              setIsPriceFocused(false)
              onInputNumberBlur(price, setPrice, priceMin, priceMax)
            },
          }}
          secondaryInputProps={{
            type: 'text',
            value: '₽',
            disabled: true
          }}
          sliderProps={{
            value: price,
            onChange: (e) => setPrice(Number(e.target.value)),
            min: priceMin,
            max: priceMax,
            step: priceStep
          }}
        />

        <label htmlFor={`${id}-initial`}>Первоначальный взнос</label>
        <Input
          mainInputProps={{
            type: 'text',
            value: currencyFormatter.format(initialValue),
            disabled: true
          }}
          secondaryInputProps={{
            id: `${id}-initial`,
            type: isInitialPercentFocused ? 'number' : 'text',
            value: isInitialPercentFocused ? initialPercent : `${initialPercent}%`,
            min: initialPercentMin,
            max: initialPercentMax,
            step: initialPercentStep,
            onChange: (e) => setInitialPercent(Number(e.target.value)),
            onKeyDown: onInputNumberKeyDown,
            onFocus: () => setIsInitialPercentFocused(true),
            onBlur: () => {
              setIsInitialPercentFocused(false)
              onInputNumberBlur(initialPercent, setInitialPercent, initialPercentMin, initialPercentMax)
            }
          }}
          sliderProps={{
            value: initialPercent,
            onChange: (e) => setInitialPercent(Number(e.target.value)),
            min: initialPercentMin,
            max: initialPercentMax,
            step: initialPercentStep
          }}
        />

        <label htmlFor={`${id}-months`}>Срок лизинга</label>
        <Input
          mainInputProps={{
            type: 'number',
            value: months,
            min: monthsMin,
            max: monthsMax,
            step: monthsStep,
            onChange: (e) => setMonths(Number(e.target.value)),
            onKeyDown: onInputNumberKeyDown,
            onBlur: () => onInputNumberBlur(months, setMonths, monthsMin, monthsMax),
          }}
          secondaryInputProps={{
            type: 'text',
            value: 'мес.',
            disabled: true
          }}
          sliderProps={{
            value: months,
            onChange: (e) => setMonths(Number(e.target.value)),
            min: monthsMin,
            max: monthsMax,
            step: monthsStep
          }}
        />

        <label htmlFor={`${id}-sum`}>Сумма договора лизинга</label>
        <input
          id={`${id}-sum`}
          value={currencyFormatter.format(sum)}
          type={'text'}
          disabled
        />

        <label htmlFor={`${id}-payment`}>Ежемесячный платеж от</label>
        <input
          id={`${id}-payment`}
          value={currencyFormatter.format(payment)}
          type={'text'}
          disabled
        />

        <Button
          type={'submit'}
          isLoading={isLoading}
        >Оставить заявку</Button>
      </form>
    </main>
  )
}