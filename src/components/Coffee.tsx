import React from 'react';
import { Coffee as CoffeeIcon } from 'lucide-react';

const Coffee = ({size = 24}: {size?: number}) => {
  return <CoffeeIcon size={size} />;
};

export default Coffee;