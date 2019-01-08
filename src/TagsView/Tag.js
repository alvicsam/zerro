import React, { Component } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { BarChart } from './components'
import { FormattedNumber } from 'react-intl'

const formatDate = date => format(date, 'D MMMM YYYY, dd', { locale: ru })

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Title = styled.div`
  width: 200px;
  flex-shrink: 0;
  position: sticky;
  left: 0;
`

export default class Tag extends Component {
  render() {
    const { tag } = this.props
    const data = tag.metricsByMonths
      ? tag.metricsByMonths.map(m => {
          return {
            sum: m.outcome,
            date: m.date,
            content: (
              <FormattedNumber
                value={m.outcome}
                style={`currency`}
                currency={'RUB'}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            ),
            title: formatDate(m.date)
          }
        })
      : []

    return (
      <Body
        onClick={() => {
          console.log(tag)
        }}
      >
        <Title>{tag.title}</Title>
        <BarChart data={data} />
      </Body>
    )
  }
}
