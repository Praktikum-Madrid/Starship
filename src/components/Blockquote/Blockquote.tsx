import React, { FC } from 'react';

interface IProps {
  text: string,
}

const styleBlockquote = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: '13px',
  fontStyle: 'oblique',
  padding: '0 25px',
  margin: '15px 0',
  borderLeft: '1px solid #ddd',
  lineHeight: '150%',
};

const Blockquote: FC<IProps> = ({ text }) => <blockquote style={styleBlockquote}>{text}</blockquote>;

export default Blockquote;
