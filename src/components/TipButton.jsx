import React from 'react'

export default function TipButton({tipAmount, selectTip, isSelected}) {
    

    let styles = (isSelected === tipAmount) ? 'tip-btn bg-palette-darkCyan' : 'tip-btn';

    return (
        <div className={styles} onClick={selectTip} data-tip-amount={tipAmount} > {tipAmount} % </div>
    )
}
