import React from 'react';
import { Pencil as PencilIcon } from 'lucide-react';

const Pencil = ({size = 24}: {size?: number}) => {
  return <PencilIcon size={size} />;
};

export default Pencil;