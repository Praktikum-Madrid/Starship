import React, { FC } from 'react';
import './style.css';

interface IProps {
  text: string,
}

const Blockquote: FC<IProps> = ({ text }) => <blockquote className='blockquote'>{text}</blockquote>;

export default Blockquote;
