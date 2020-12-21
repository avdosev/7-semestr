import React from "react";

export function BooleanViewer(props: {isTrue: boolean}) {
    return <> {props.isTrue ? "Да" : "Нет"} </>
}