//@ts-check
import React, { memo } from 'react';
import './Field.css';

function Field_() {
    return (
        <canvas id="game-filed" />
    );
}

const Field = memo(Field_);
export default Field;
