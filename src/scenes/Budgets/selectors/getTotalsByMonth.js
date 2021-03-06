import createSelector from 'selectorator'
import { getStartFunds } from './baseSelectors'
import {
  getAmountsByTag,
  getLinkedTransfers,
  getTransferFees,
} from './getAmountsByTag'
import { round } from 'helpers/currencyHelpers'
import getMonthDates from './getMonthDates'

export const getTagTotals = createSelector(
  [getMonthDates, getAmountsByTag],
  (months, amounts) =>
    months.map(month => {
      const totals = {
        budgeted: 0,
        income: 0,
        outcome: 0,
        overspent: 0,
        available: 0,
      }

      for (const id in amounts[month]) {
        totals.budgeted = round(
          totals.budgeted + amounts[month][id].totalBudgeted
        )
        totals.income = round(totals.income + amounts[month][id].totalIncome)
        totals.outcome = round(totals.outcome + amounts[month][id].totalOutcome)
        totals.overspent = round(
          totals.overspent + amounts[month][id].totalOverspent
        )
        totals.available = round(
          totals.available + amounts[month][id].totalAvailable
        )
      }
      return totals
    })
)

export const getTotalsArray = createSelector(
  [
    getMonthDates,
    getStartFunds,
    getLinkedTransfers,
    getTransferFees,
    getTagTotals,
  ],
  (months, startFunds, linkedTransfers, transferFees, tagTotals) => {
    let prevFunds = startFunds
    let prevOverspent = 0

    const totalsByMonth = months.map((date, i) => {
      const result = {
        date,
        prevFunds,
        prevOverspent,

        // TO DISPLAY
        get toBeBudgeted() {
          return this.funds - this.budgetedInFuture
        },
        // cannot be negative or greater than funds
        get budgetedInFuture() {
          const { funds, realBudgetedInFuture } = this
          if (realBudgetedInFuture <= 0 || funds <= 0) return 0
          return realBudgetedInFuture > funds ? funds : realBudgetedInFuture
        },

        // TO CHECK
        get moneyInBudget() {
          return round(this.funds + this.available)
        },

        realBudgetedInFuture: tagTotals
          .slice(i + 1)
          .reduce((sum, totals) => round(sum + totals.budgeted), 0),

        get funds() {
          return round(
            this.prevFunds -
              this.prevOverspent -
              this.budgeted +
              this.income -
              this.transferOutcome -
              this.transferFees
          )
        },

        // TAGS
        budgeted: tagTotals[i].budgeted,
        income: tagTotals[i].income,
        outcome: tagTotals[i].outcome,
        overspent: tagTotals[i].overspent,
        available: tagTotals[i].available,

        // TRANSFERS
        transferOutcome: linkedTransfers[date]?.null || 0,
        transferFees: transferFees[date] || 0,
      }

      prevFunds = result.funds
      prevOverspent = result.overspent
      return result
    })

    return totalsByMonth
  }
)

export const getTotalsByMonth = createSelector([getTotalsArray], totals => {
  let result = {}
  for (const monthData of totals) {
    result[monthData.date] = monthData
  }
  return result
})
