
import { observer } from "mobx-react"
import React from "react"


export const NoPasswordOperation = observer(({ pinCode }: { pinCode: number }) => (
    <>Введите пин код: {pinCode} </>
))
