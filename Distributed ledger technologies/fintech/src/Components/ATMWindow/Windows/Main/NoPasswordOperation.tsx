
import { observer } from "mobx-react"
import React from "react"
import {Range} from "immutable"

export const NoPasswordOperation = observer(({ pinCode }: { pinCode: number }) => {
    const russianTranslate = "Введите пин код: "
    if (pinCode !== undefined) {
        const ran = Range(0, pinCode?.toString().length).map(() => '*').toArray()
        return <>{russianTranslate} {ran} </>
    }

    return <>{russianTranslate}</>


})
