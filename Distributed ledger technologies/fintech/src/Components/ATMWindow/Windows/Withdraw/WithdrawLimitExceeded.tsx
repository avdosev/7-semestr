import React from 'react'
import {dailyLimit} from "../../../../config/constants"

export const WithdrawLimitExceeded = () => {
    return <>Превышен дневной лимит в {dailyLimit}</>
}